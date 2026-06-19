package com.githubanalyzer.ExceptionHandler;

import com.githubanalyzer.DTO.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(WebClientException.class)
    public ResponseEntity<ErrorResponse> handleWebClientException(WebClientResponseException ex) {
        String coustomMessage = "Error while communicating with GitHub API: ";
        HttpStatus status = (HttpStatus) ex.getStatusCode();

        if(status == HttpStatus.NOT_FOUND){
            coustomMessage = "The requested GitHub user profile could not be found.";
        }

        ErrorResponse error = new ErrorResponse(
                status.value(),
                coustomMessage + ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, status);
    }
}
