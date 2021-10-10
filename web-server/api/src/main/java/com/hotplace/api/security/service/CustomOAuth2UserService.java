package com.hotplace.api.security.service;

import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("OAuth2 를 이용하여 사용자 정보를 받아 온 뒤 저장.");

        // accessToken이 있는 userRequest를 통해 oAuthUser 객체 만듬.
        DefaultOAuth2UserService defaultUserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = defaultUserService.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        log.info("사용자가 이용하는 SNS: " + registrationId);

        // resource server 에서 받아온 정보들 -> attributes 이용해 DB 저장
        OAuth2Attribute oAuth2attribute = OAuth2Attribute.of(registrationId, oAuth2User.getAttributes());

        User user = userRepository.findByProviderId(oAuth2attribute.getProviderId())
                .orElseGet(() -> userRepository.save(oAuth2attribute.toEntity()));

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }

}
