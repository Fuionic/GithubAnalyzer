package com.githubanalyzer.controller;

import com.githubanalyzer.DTO.LoginRequest;
import com.githubanalyzer.DTO.RegisterRequest;
import com.githubanalyzer.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.githubanalyzer.repository.UserRepository;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }
        String email = (String) authentication.getPrincipal();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(Map.of("name", user.getName(), "email", user.getEmail())))
                .orElse(ResponseEntity.status(401).body(Map.of("message", "User not found")));
    }

    //http://localhost:8080/api/v1/auth/signup
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody RegisterRequest request) {
        String token = authService.registerLocalUser(request);
        return ResponseEntity.ok(Map.of("token", token));
    }

    //http://localhost:8080/api/v1/auth/login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.authenticateLocalUser(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}