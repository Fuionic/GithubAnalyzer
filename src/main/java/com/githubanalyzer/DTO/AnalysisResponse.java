package com.githubanalyzer.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResponse implements Serializable {

    private static final long serialVersionUID = 1L;
    private String username;
    private Integer totalRepos;
    private Integer totalStars;
    private List<String> primaryLanguages;
    private String aiSummary;
    private String generatedAt;
}