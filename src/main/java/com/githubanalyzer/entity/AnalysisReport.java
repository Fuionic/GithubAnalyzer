package com.githubanalyzer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_reports", indexes = {@Index(name = "idx_github_username", columnList = "github_username")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "github_username", nullable = false, unique = true)
    private String githubUsername;

    @Column(name = "total_repos")
    private Integer totalRepos;

    @Column(name = "total_stars")
    private Integer totalStars;

    @Column(name = "primary_languages")
    private String primaryLanguages;

    @Lob
    @Column(name = "ai_summary", columnDefinition = "LONGTEXT")
    private String aiSummary;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
