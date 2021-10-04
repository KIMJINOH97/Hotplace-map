package com.hotplace.api.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import com.hotplace.api.security.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2CustomSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String providerId = oauth2User.getName();
        System.out.println("인증 성공 success handler provider id : " + providerId);

        User user = userRepository.findByProviderId(providerId).orElseThrow(
                () -> new AuthenticationCredentialsNotFoundException("회원이 존재하지 않습니다.")
        );

        String token = jwtTokenUtil.createToken(user.getId(), user.getProviderId());

        log.info("회원 인증 성공, 유저 정보 반환");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_OK);
        response.setCharacterEncoding("utf-8");
        response.getWriter()
                .write(objectMapper.writeValueAsString(
                        TokenResponse.of(user.getId(), user.getProviderId(), user.getEmail(),
                                user.getProfile(), token)
                ));

    }
}
