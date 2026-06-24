package com.githubanalyzer.service;

import com.githubanalyzer.DTO.LoginRequest;
import com.githubanalyzer.DTO.RegisterRequest;
import com.githubanalyzer.entity.User;
import com.githubanalyzer.repository.UserRepository;
import com.githubanalyzer.Security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public String registerLocalUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setProvider("local");

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return jwtUtils.generateToken(user.getEmail());
    }

    public String authenticateLocalUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!"local".equals(user.getProvider())) {
            throw new IllegalArgumentException("This email is registered via " + user.getProvider() + " login.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        return jwtUtils.generateToken(user.getEmail());
    }
}