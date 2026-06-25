package com.githubanalyzer.service;

import com.githubanalyzer.DTO.GitHubResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Service
public class GitHubService {

    private final WebClient githubWebClient;

    public GitHubService(WebClient githubWebClient) {
        this.githubWebClient = githubWebClient;
    }

    public List<GitHubResponse> getUserRepos(String username) {
        return githubWebClient.get()
                .uri("/users/{username}/repos?per_page=100&sort=updated", username)
                .retrieve()
                .bodyToFlux(GitHubResponse.class)
                .collectList()
                .block();
    }
}