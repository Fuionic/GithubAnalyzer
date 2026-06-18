package com.githubanalyzer.service;

import com.githubanalyzer.DTO.AnalysisRequest;
import com.githubanalyzer.DTO.AnalysisResponse;
import com.githubanalyzer.DTO.GitHubResponse;
import com.githubanalyzer.entity.AnalysisReport;
import com.githubanalyzer.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AnalyzerService {

    private GitHubService gitHubService;
    private ReportRepository reportRepository;

    public AnalyzerService(GitHubService gitHubService , ReportRepository reportRepository){
        this.gitHubService  = gitHubService;
        this.reportRepository = reportRepository;
    }

    public AnalysisResponse analyzeProfile(AnalysisRequest request) {
        String username = extractUsername(request.getGithubUrl());

        Optional<AnalysisReport> existingReport = reportRepository.findByGithubUsername(username);
        if (existingReport.isPresent()) {
            return mapToResponse(existingReport.get());
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

        String languagesString = uniqueLanguages.stream().collect(Collectors.joining(", "));
        if (languagesString.isEmpty()) {
            languagesString = "None Specified";
        }

        String temporaryAiSummary = "### Technical Profile: " + username + "\n" +
                "Live telemetry captured from external GitHub clusters.\n\n" +
                "* **Tech Stack Stack:** High density across [" + languagesString + "] ecosystems.\n" +
                "* **Community Footprint:** Aggregated " + totalStars + " total repository stars.";

        AnalysisReport newReport = new AnalysisReport();
        newReport.setGithubUsername(username);
        newReport.setTotalRepos(totalRepos);
        newReport.setTotalStars(totalStars);
        newReport.setPrimaryLanguages(languagesString);
        newReport.setAiSummary(temporaryAiSummary);
        newReport.setUpdatedAt(LocalDateTime.now());

        AnalysisReport savedReport = reportRepository.save(newReport);
        return mapToResponse(savedReport);
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