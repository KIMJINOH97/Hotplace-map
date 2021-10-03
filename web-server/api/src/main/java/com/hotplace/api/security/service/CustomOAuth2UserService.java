package com.hotplace.api.security.service;

import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest = " + userRequest);
        // accessToken이 있는 userRequest를 통해 oAuthUser 객체 만듬.
        DefaultOAuth2UserService defaultUserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = defaultUserService.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        System.out.println("registrationId = " + registrationId);

        // 카카오 resource server에서 받아온 정보들 -> attributes 이용해 DB 저장
        String providerId = oAuth2User.getName();
        LinkedHashMap<String, Object> kakaoAccount = (LinkedHashMap<String, Object>)oAuth2User.getAttributes().get("kakao_account");

        String email = (String) kakaoAccount.get("email");
        String profileImageUrl = (String) ((LinkedHashMap<String, Object>)kakaoAccount.get("profile")).get("profile_image_url");

        User user = userRepository.findByProviderId(providerId)
                .orElseGet(() -> userRepository.save(
                        new User(null, profileImageUrl, null, email, registrationId, providerId)
                ));

        System.out.println("user = " + user);
        System.out.println("profileImageUrl = " + profileImageUrl);

        return oAuth2User;
    }

}
