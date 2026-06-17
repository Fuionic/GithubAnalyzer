package com.githubanalyzer.service;

import com.githubanalyzer.repository.ReportRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyzerService {

    private GitHubService gitHubService;
    private ReportRepository reportRepository;

    public AnalyzerService(GitHubService gitHubService , ReportRepository reportRepository){
        this.gitHubService  = gitHubService;
        this.reportRepository = reportRepository;
    }


}
