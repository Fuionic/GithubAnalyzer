package com.githubanalyzer.controller;

import com.githubanalyzer.DTO.GithubRepo_Response;
import com.githubanalyzer.DTO.GithubUser_Response;
import com.githubanalyzer.service.GithubService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/githubuser")
public class Gituser {

    private final GithubService githubService;

    public Gituser(GithubService githubService){
        this.githubService = githubService;
    }

    //http://localhost:8080/githubuser/{username}
    @GetMapping("/{username}")
    public GithubUser_Response getUserProfile(@PathVariable String username){
        return githubService.getuserProfile(username);
    }

    //http://localhost:8080/githubuser/{username}/repos
    @GetMapping("/{username}/repos")
    public GithubRepo_Response[] getuserREpos(@PathVariable String username){
        return githubService.getUserRepos(username);
    }

    //http://localhost:8080/githubuser/{username}/stars
    @GetMapping("/{username}/stars")
    public String getStars(@PathVariable String username) {
        int stars = githubService.getTotalStars(username);
        return "Total Stars: " + stars;
    }





}
