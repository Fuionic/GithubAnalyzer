package com.githubanalyzer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient gitHubWebClient(@org.springframework.beans.factory.annotation.Value("${GITHUB_TOKEN:}") String githubToken){
        org.springframework.web.reactive.function.client.WebClient.Builder builder = WebClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github.v3+json");
                
        if (githubToken != null && !githubToken.isEmpty()) {
            builder.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + githubToken);
        }
        
        return builder.build();
    }
}
