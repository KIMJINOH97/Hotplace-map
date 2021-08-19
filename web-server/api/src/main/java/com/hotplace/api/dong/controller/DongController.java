package com.hotplace.api.dong.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.dong.service.DongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class DongController {
    private final DongService dongService;

    @GetMapping("/dong/{id}")
    public ApiForm<List<DongDto>> findAllByGuId(@PathVariable("id") Integer guId){
        return dongService.findAllByGuId(guId);
    }
}
