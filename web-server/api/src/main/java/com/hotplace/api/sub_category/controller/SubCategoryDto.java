package com.hotplace.api.sub_category.controller;

import com.hotplace.api.sub_category.domain.SubCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubCategoryDto {
    private Integer id;
    private String name;

    public SubCategoryDto(SubCategory subCategory){
        this.id = subCategory.getId();
        this.name = subCategory.getName();
    }
}
