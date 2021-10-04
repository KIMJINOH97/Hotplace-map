package com.hotplace.api.security.handler;

import lombok.Getter;

@Getter
public class TokenResponse {
    private Integer userId;
    private String providerId;
    private String email;
    private String profileUrl;
    private String token;

    public TokenResponse(Integer userId, String providerId, String email, String profileUrl, String token) {
        this.userId = userId;
        this.providerId = providerId;
        this.email = email;
        this.profileUrl = profileUrl;
        this.token = token;
    }

    public static TokenResponse of(Integer userId, String providerId, String email, String profileUrl, String token){
        return new TokenResponse(userId, providerId, email, profileUrl, token);
    }

}
