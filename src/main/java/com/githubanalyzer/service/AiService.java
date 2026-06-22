package com.githubanalyzer.service;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateProfileSummary(String username, int totalRepos, int totalStars, List<String> languages) {
        String languagesString = String.join(", " , languages);

        String prompt = String.format(
                "You are an expert technical recruiter assistant. Analyze this candidate's raw profile statistics:\n" +
                        "- GitHub Username: %s\n" +
                        "- Total Public Repositories: %d\n" +
                        "- Total Repository Stars: %d\n" +
                        "- Programming Languages Used: [%s]\n\n" +
                        "Provide a highly professional markdown summary containing:\n" +
                        "1. **Core Technical Strengths**\n" +
                        "2. **Ecosystem Impact** (Based on star counts)\n" +
                        "3. **Recruiter Verdict** (What roles they fit best). Keep it clear and concise.",
                username, totalRepos, totalStars, languagesString
        );

        return this.chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}