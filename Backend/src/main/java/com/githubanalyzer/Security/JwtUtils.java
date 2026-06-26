package com.githubanalyzer.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

//    private final String SECRET = "MY-super-secret-key-for-jwt-token-generation-key-123456@##9fg9g";
//    private final SecretKey jwtSecret = Keys.hmacShaKeyFor(SECRET.getBytes());
    private final SecretKey jwtSecret;
    private final long jwtExpirationMs = 86400000;

    public JwtUtils(@Value("${app.jwt.secret}") String secretString) {
        byte[] keyBytes = Decoders.BASE64.decode(secretString);
        this.jwtSecret = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(jwtSecret, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            logger.error("JWT Token validation failed: {}", e.getMessage());
            return false;
        }
    }
}
