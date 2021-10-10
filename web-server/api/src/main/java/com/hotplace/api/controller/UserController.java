package com.hotplace.api.controller;

import com.hotplace.api.dto.UserInfoResponse;
import com.hotplace.api.dto.api_form.ApiForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.hotplace.api.dto.api_form.ApiForm.succeed;

@Slf4j
@RequestMapping("/user")
@RestController
public class UserController {

    @GetMapping("/info")
    public ApiForm<UserInfoResponse> getUserInfo(@AuthenticationPrincipal OAuth2User oAuth2User){
        log.info("user info controller");
        return succeed(UserInfoResponse.toResponse(oAuth2User.getAttribute("user")),
                "유저 정보 반환에 성공했습니다.");
    }
}
