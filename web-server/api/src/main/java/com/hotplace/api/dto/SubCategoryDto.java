package com.hotplace.api.dto;

import com.hotplace.api.entity.SubCategory;
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
