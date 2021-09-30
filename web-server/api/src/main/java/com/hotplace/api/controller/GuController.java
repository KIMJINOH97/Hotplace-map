package com.hotplace.api.controller;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.dto.GuDto;
import com.hotplace.api.service.GuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class GuController {
    private final GuService guService;

    @GetMapping("/gu")
    public ApiForm<List<GuDto>> findAll(){
        return guService.findAll();
    }

}
