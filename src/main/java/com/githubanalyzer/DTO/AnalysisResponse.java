package com.githubanalyzer.DTO;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class AnalysisResponse {
    private String username;
    private Integer totalRepos;
    private Integer totalStars;
    private List<String> primaryLanguages;
    private String aiSummary;
    private String generatedAt;
}