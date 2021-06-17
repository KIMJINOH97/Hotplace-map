package com.hotplace.api.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaceRequestDto {
    private Integer gu;
    private Integer dong;

    @JsonProperty("sub_category")
    private Integer subCategory;

    @JsonProperty("place_name")
    private String placeName;

    public PlaceRequestDto(Integer gu, Integer dong, Integer subCategory, String placeName){
        this.gu = gu;
        this.dong = dong;
        this.subCategory = subCategory;
        this.placeName = placeName;
    }
}
