package com.githubanalyzer.controller;


import com.githubanalyzer.DTO.AnalysisRequest;
import com.githubanalyzer.DTO.AnalysisResponse;
import com.githubanalyzer.service.AnalyzerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/analyzer")
//http://localhost:8080/api/v1/analyzer/analyze
public class AnalyzerController {

    private final AnalyzerService analyzerService;

    public AnalyzerController(AnalyzerService analyzerService) {
        this.analyzerService = analyzerService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeGitHubProfile(@RequestBody AnalysisRequest request) {
        AnalysisResponse response = analyzerService.analyzeProfile(request);
        return ResponseEntity.ok(response);
    }
}