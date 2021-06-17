package com.hotplace.api.sub_category.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.sub_category.controller.SubCategoryDto;
import com.hotplace.api.sub_category.domain.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.hotplace.api.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public ApiForm<List<SubCategoryDto>> findAll(){
        List<SubCategoryDto> subCategory = subCategoryRepository.findAll().stream().map(o -> new SubCategoryDto(o))
                .collect(Collectors.toList());
        return succeed(subCategory, "성공적으로 받아왔습니다.");
    }

}
