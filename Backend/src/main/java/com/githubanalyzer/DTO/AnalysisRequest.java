package com.githubanalyzer.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AnalysisRequest {

    private String githubUrl;
    private boolean forceRefresh;

    public boolean isForceRefresh() {
        return forceRefresh;
    }
}
