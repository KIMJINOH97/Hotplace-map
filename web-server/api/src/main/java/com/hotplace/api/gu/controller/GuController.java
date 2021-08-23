package com.hotplace.api.gu.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.gu.service.GuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.hotplace.api.api_form.ApiForm.succeed;

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
