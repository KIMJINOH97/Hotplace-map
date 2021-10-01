package com.hotplace.api.controller;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.dto.DongDto;
import com.hotplace.api.service.DongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class DongController {
    private final DongService dongService;

    @GetMapping("/dong/{id}")
    public ApiForm<List<DongDto>> findAllByGuId(@PathVariable("id") Integer guId){
        return dongService.findAllByGuId(guId);
    }
}
