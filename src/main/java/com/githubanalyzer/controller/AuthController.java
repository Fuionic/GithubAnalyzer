package com.githubanalyzer.controller;

import com.githubanalyzer.DTO.LoginRequest;
import com.githubanalyzer.DTO.RegisterRequest;
import com.githubanalyzer.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody RegisterRequest request) {
        String token = authService.registerLocalUser(request);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.authenticateLocalUser(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}