package com.githubanalyzer.Security;

import com.githubanalyzer.entity.User;
import com.githubanalyzer.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public OAuth2SuccessHandler(JwtUtils jwtUtils, UserRepository userRepository) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String providerId = authentication.getName();

        String clientRegistrationId = request.getRequestURI().contains("github") ? "github" : "google";

        if (email == null && "github".equals(clientRegistrationId)) {
            email = oAuth2User.getAttribute("login") + "@github.com";
        }

        if (email == null) {
            throw new IllegalArgumentException("Email address could not be retrieved from provider.");
        }

        User user = userRepository.findByEmail(email).orElseGet(User::new);
        user.setEmail(email);
        user.setName(name != null ? name : oAuth2User.getAttribute("login"));
        user.setProvider(clientRegistrationId);
        user.setProviderId(providerId);

        userRepository.save(user);

        String token = jwtUtils.generateToken(email);

        String targetUrl = "http://localhost:5173/?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}