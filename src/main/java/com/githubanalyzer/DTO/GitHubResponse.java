package com.githubanalyzer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.githubanalyzer.service.AnalyzerService;
import lombok.Data;

@Data
public class GitHubResponse {
    private String name;

    @JsonProperty("stargazers_count")
    private Integer stargazersCount;

    private String language;
}

