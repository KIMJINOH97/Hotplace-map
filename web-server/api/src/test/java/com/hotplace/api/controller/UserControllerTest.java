package com.hotplace.api.controller;

import com.hotplace.api.entity.User;
import com.hotplace.api.repository.UserRepository;
import com.hotplace.api.security.util.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    @Autowired private MockMvc mvc;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtTokenUtil jwtTokenUtil;

    @PostConstruct
    void init(){
        userRepository.save(new User(null, "www.profile/1", "kim", "kim@naver.com", "kakao", "1234"));
        userRepository.save(new User(null, "www.profile/2", "seo", "seo@naver.com", "naver", "5678"));
        userRepository.save(new User(null, "www.profile/lee", "lee", "lee@naver.com", "kakao", "9101"));
    }

    @DisplayName("1. 유저 정보 조회 테스트")
    @Test
    public void getUserInfo() throws Exception {
        User userA = findUserByProviderId("1234");
        String jwtToken = jwtTokenUtil.createToken(userA.getId(), userA.getProviderId());

        mvc
                .perform(get("/user/info")
                .header("X-Auth-Token", jwtToken))
            .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email").value(userA.getEmail()))
                .andExpect(jsonPath("$.data.name").value(userA.getName()))
                .andExpect(jsonPath("$.data.profileUrl").value(userA.getProfile()));
    }

    public User findUserByProviderId(String providerId){
        return userRepository.findByProviderId(providerId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );
    }
}