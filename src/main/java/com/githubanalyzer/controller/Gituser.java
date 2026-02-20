package com.githubanalyzer.controller;

import com.githubanalyzer.DTO.GithubUser_Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/githubuser")
public class Gituser {


    private final RestTemplate restTemplate = new RestTemplate();

    //http://localhost:8080/githubuser/{username}
    @GetMapping("{username}")
    public GithubUser_Response getGitUser(@PathVariable String username) {
        String url = "https://api.github.com/users/" + username;

        GithubUser_Response response = restTemplate.getForObject(url , GithubUser_Response.class);

        return response;
    }
}
