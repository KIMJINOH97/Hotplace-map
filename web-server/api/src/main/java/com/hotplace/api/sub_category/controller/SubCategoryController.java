package com.hotplace.api.sub_category.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.sub_category.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @GetMapping("/sub_category")
    public ApiForm<List<SubCategoryDto>> findAll(){
        return subCategoryService.findAll();
    }
}
