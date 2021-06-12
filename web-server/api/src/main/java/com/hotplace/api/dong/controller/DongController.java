package com.hotplace.api.dong.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.dong.domain.DongRepository;
import com.hotplace.api.dong.service.DongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class DongController {
    private final DongService dongService;

    @GetMapping("/dong")
    public ApiForm<List<DongDto>> findAll(){
        return dongService.findAll();
    }
}
