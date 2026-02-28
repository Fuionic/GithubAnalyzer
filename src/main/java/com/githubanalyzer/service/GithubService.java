package com.githubanalyzer.service;

import com.githubanalyzer.DTO.GithubRepo_Response;
import com.githubanalyzer.DTO.GithubUser_Response;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GithubService {

    private final RestTemplate restTemplate = new RestTemplate();

    public GithubUser_Response getuserProfile(String username){
        String url = "https://api.github.com/users/" + username;
        return restTemplate.getForObject(url , GithubUser_Response.class);
    }

    public GithubRepo_Response[] getUserRepos(String username){
        String url = "https://api.github.com/users/" + username + "/repos";
        return restTemplate.getForObject(url , GithubRepo_Response[].class);
    }

    public int getTotalStars(String username){
        GithubRepo_Response[] repos = getUserRepos(username);
        int totalStars = 0;

        if(repos != null){
            for (GithubRepo_Response repo : repos) {
                totalStars += repo.getStars();
            }
        }
        return totalStars;
    }
}
