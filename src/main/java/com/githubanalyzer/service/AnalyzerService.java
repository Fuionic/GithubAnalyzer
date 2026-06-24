package com.githubanalyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.githubanalyzer.DTO.AnalysisRequest;
import com.githubanalyzer.DTO.AnalysisResponse;
import com.githubanalyzer.DTO.GitHubResponse;
import com.githubanalyzer.entity.AnalysisReport;
import com.githubanalyzer.repository.ReportRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class AnalyzerService {

    private final GitHubService gitHubService;
    private final ReportRepository reportRepository;
    private final AiService aiService;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String REDIS_KEY_PREFIX = "profile::";
    private static final long CACHE_EXPIRY_HOURS = 4;

    public AnalyzerService(GitHubService gitHubService, ReportRepository reportRepository,
                           AiService aiService, RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.gitHubService = gitHubService;
        this.reportRepository = reportRepository;
        this.aiService = aiService;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public AnalysisResponse analyzeProfile(AnalysisRequest request) {
        String username = extractUsername(request.getGithubUrl());
        String redisKey = REDIS_KEY_PREFIX + username;

        if (request.isForceRefresh()) {
            redisTemplate.delete(redisKey);
        } else {
            Object cachedData = redisTemplate.opsForValue().get(redisKey);
            if (cachedData != null) {
                return objectMapper.convertValue(cachedData, AnalysisResponse.class);
            }
        }

        Optional<AnalysisReport> existingReportOpt = reportRepository.findByGithubUsername(username);

        if (!request.isForceRefresh() && existingReportOpt.isPresent()) {
            AnalysisReport existingReport = existingReportOpt.get();
            if (isCacheFresh(existingReport.getUpdatedAt())) {
                AnalysisResponse response = mapToResponse(existingReport);
                redisTemplate.opsForValue().set(redisKey, response, CACHE_EXPIRY_HOURS, TimeUnit.HOURS);
                return response;
            }
        }

        List<GitHubResponse> repos = gitHubService.getUserRepos(username);

        int totalRepos = repos.size();
        int totalStars = 0;
        Set<String> uniqueLanguages = new HashSet<>();

        for (GitHubResponse repo : repos) {
            if (repo.getStargazersCount() != null) {
                totalStars += repo.getStargazersCount();
            }
            if (repo.getLanguage() != null && !repo.getLanguage().isBlank()) {
                uniqueLanguages.add(repo.getLanguage());
            }
        }

        String languagesString = uniqueLanguages.isEmpty() ? "None Specified" : String.join(", ", uniqueLanguages);
        List<String> languageList = uniqueLanguages.stream().collect(Collectors.toList());

        String liveAiSummary = aiService.generateProfileSummary(
                username, totalRepos, totalStars, languageList
        );

        AnalysisReport reportToSave = existingReportOpt.orElseGet(AnalysisReport::new);

        reportToSave.setGithubUsername(username);
        reportToSave.setTotalRepos(totalRepos);
        reportToSave.setTotalStars(totalStars);
        reportToSave.setPrimaryLanguages(languagesString);
        reportToSave.setAiSummary(liveAiSummary);
        reportToSave.setUpdatedAt(LocalDateTime.now());

        AnalysisReport savedReport = reportRepository.save(reportToSave);
        AnalysisResponse finalResponse = mapToResponse(savedReport);
        redisTemplate.opsForValue().set(redisKey, finalResponse, CACHE_EXPIRY_HOURS, TimeUnit.HOURS);

        return finalResponse;
    }

    private boolean isCacheFresh(LocalDateTime updatedAt) {
        if (updatedAt == null) return false;
        return updatedAt.isAfter(LocalDateTime.now().minusHours(CACHE_EXPIRY_HOURS));
    }

    private String extractUsername(String url) {
        if (url == null || !url.contains("github.com/")) {
            throw new IllegalArgumentException("Invalid profile target URL");
        }
        return url.substring(url.lastIndexOf("/") + 1).trim();
    }

    private AnalysisResponse mapToResponse(AnalysisReport report) {
        return AnalysisResponse.builder()
                .username(report.getGithubUsername())
                .totalRepos(report.getTotalRepos())
                .totalStars(report.getTotalStars())
                .primaryLanguages(List.of(report.getPrimaryLanguages().split(", ")))
                .aiSummary(report.getAiSummary())
                .generatedAt(report.getUpdatedAt().toString())
                .build();
    }
}