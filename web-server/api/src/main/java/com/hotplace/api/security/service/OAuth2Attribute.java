package com.hotplace.api.security.service;

import com.hotplace.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.LinkedHashMap;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
@ToString
public class OAuth2Attribute {
    String profileUrl;
    String name;
    String email;
    String registrationId;
    String providerId;

    public OAuth2Attribute(){}

    public static OAuth2Attribute of(String registrationId, String providerId, Map<String, Object> attributes){
        if (registrationId.equals("kakao")){
            return ofKakao(registrationId, providerId, attributes);
        }else{
            return ofNaver(registrationId, providerId, attributes);
        }
    }

    public static OAuth2Attribute ofKakao(String registrationId, String providerId, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        return OAuth2Attribute.builder()
                .profileUrl((String) ((LinkedHashMap<String, Object>)kakaoAccount.get("profile")).get("profile_image_url"))
                .name((String) properties.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .registrationId(registrationId)
                .providerId(providerId)
                .build();
    }

    public static OAuth2Attribute ofNaver(String registrationId, String providerId, Map<String, Object> attributes) {
        Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");
        return OAuth2Attribute.builder()
                .profileUrl((String) naverResponse.get("profile_image"))
                .name((String) naverResponse.get("name"))
                .email((String) naverResponse.get("email"))
                .registrationId(registrationId)
                .providerId(providerId)
                .build();
    }

    public User toEntity(){
        return new User(null, profileUrl, name, email, registrationId, providerId);
    }

}
