package com.githubanalyzer.repository;

import com.githubanalyzer.entity.AnalysisReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<AnalysisReport, Long> {
    Optional<AnalysisReport> findByGithubUsername(String githubUsername);
}
