package com.hotplace.api.security.config;

import com.hotplace.api.security.filter.JwtAuthenticationFilter;
import com.hotplace.api.security.handler.OAuth2CustomSuccessHandler;
import com.hotplace.api.security.provider.CustomOAuth2Provider;
import com.hotplace.api.security.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public final CustomOAuth2UserService customOAuth2UserService;
    public final OAuth2CustomSuccessHandler oAuth2CustomSuccessHandler;
    public final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //@formatter:off
        http
                .httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .headers().frameOptions().disable() // h2화면 보이게 처리
            .and()
                .authorizeRequests() // url 권한 관리
                .antMatchers("/", "/oauth2/**", "/h2-console/**", "/h2-console")
                .permitAll()
                .anyRequest().authenticated() // 위 주소 뺀 나머지 인증과정 거침
            .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
            .and()
                .successHandler(oAuth2CustomSuccessHandler)
            .and()
                .addFilterBefore(jwtAuthenticationFilter, OAuth2LoginAuthenticationFilter.class);

    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(
            @Value("${spring.security.oauth2.client.registration.kakao.client-id}") String kakaoClientId,
            @Value("${spring.security.oauth2.client.registration.kakao.client-secret}") String kakaoClientSecret
    ){
        List<ClientRegistration> registrations = new ArrayList<>();
        registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
                .clientId(kakaoClientId)
                .clientSecret(kakaoClientSecret)
                .jwkSetUri("temp")
                .build());

        return new InMemoryClientRegistrationRepository(registrations);
    }
}
