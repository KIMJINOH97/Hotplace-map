package com.hotplace.api.security.handler;

import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import com.hotplace.api.security.service.PrincipalDetails;
import com.hotplace.api.security.util.CookieUtils;
import com.hotplace.api.security.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final CookieUtils cookieUtils;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        PrincipalDetails oauth2User = (PrincipalDetails) authentication.getPrincipal();

        String providerId = oauth2User.getUserProviderId();
        logger.info("인증 성공? success handler provider id : " + providerId);

        User user = userRepository.findByProviderId(providerId).orElseThrow(
                () -> new AuthenticationCredentialsNotFoundException("회원이 존재하지 않습니다.")
        );

        String token = jwtTokenUtil.createToken(user.getId(), user.getProviderId());

        //HttpOnly=false //REST_API 로 사용가능한 쿠키
        response.addCookie(cookieUtils.generateNormalCookie("X-AUTH-TOKEN", token, 2000000000));

        if (response.isCommitted()) { //redirect loop 방지
            logger.debug("Response has already been committed. Unable to redirect.");
            return;
        }

        getRedirectStrategy().sendRedirect(request,response,"/"); //root page 로 이동
    }
}
