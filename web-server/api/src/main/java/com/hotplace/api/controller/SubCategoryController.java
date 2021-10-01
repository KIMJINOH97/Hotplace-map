package com.hotplace.api.controller;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.dto.SubCategoryDto;
import com.hotplace.api.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @GetMapping("/sub_category")
    public ApiForm<List<SubCategoryDto>> findAll(){
        return subCategoryService.findAll();
    }
}
