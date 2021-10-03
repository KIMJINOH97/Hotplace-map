package com.hotplace.api.security.util;

import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import com.hotplace.api.security.provider.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenUtil {

    private final UserRepository userRepository;
    @Value("${spring.security.jwt.secret-key}")
    private String secretKey;

    private long tokenValidTime = 30 * 60 * 1000L;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(Integer userId, String providerId){
        Claims claims = Jwts.claims().setSubject(providerId);
        claims.put("user_id", userId);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getPayload(String token){
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Authentication getAuthentication(String token){
        String providerId = getPayload(token);
        User user = userRepository.findByProviderId(providerId).orElseThrow(
                () -> new AuthenticationCredentialsNotFoundException("존재하지 않는 회원입니다.")
        );

        Map<String, Object> attribute = createAttribute(user);
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(Role.USER.getKey());

        DefaultOAuth2User defaultUser = new DefaultOAuth2User(Collections.singleton(authority),
                attribute, "providerId");

        return new OAuth2AuthenticationToken(defaultUser,
                Collections.singleton(authority), user.getProvider().toLowerCase());
    }

    public Map<String, Object> createAttribute(User user){
        Map<String, Object> attribute = new HashMap<>();
        attribute.put("providerId", user.getProviderId());
        attribute.put("user", user);
        return attribute;
    }


    public String resolveToken(HttpServletRequest request){
        return request.getHeader("X-Auth-Token");
    }

    public boolean validateToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        }catch (Exception e){
            log.error(e.getMessage());
            return false;
        }
    }

}
