package com.githubanalyzer.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties (ignoreUnknown = true)  //Ignore unknown properties
public class GithubRepo_Response {

    private String name;

    @JsonProperty("stargazers_count")
    private int stars;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getStars() {
        return stars;
    }
    public void setStars(int stars) {
        this.stars = stars;
    }

}
