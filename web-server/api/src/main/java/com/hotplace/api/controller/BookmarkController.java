package com.hotplace.api.controller;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping("/bookmark")
    public ApiForm<?> getBookmark(@AuthenticationPrincipal OAuth2User oAuth2User){
     return bookmarkService.findAll(oAuth2User.getAttribute("user"));
    }

    @PostMapping("/bookmark/{id}")
    public ApiForm<?> createBookmark(
            @AuthenticationPrincipal OAuth2User oAuth2User,
            @PathVariable("id") Integer id
    ){
        return bookmarkService.createBookmark(oAuth2User.getAttribute("user"),id);
    }

    @DeleteMapping("/bookmark/{id}")
    public ApiForm<?> deleteBookmark(
            @AuthenticationPrincipal OAuth2User oAuth2User,
            @PathVariable("id") Integer id
    ){
        return bookmarkService.deleteBookmark(oAuth2User.getAttribute("user"),id);
    }
}
