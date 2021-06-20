package com.hotplace.api.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PlaceRequest {
    private Integer gu;
    private Integer dong;



    @JsonProperty("sub_category")
    private Integer subCategory;

    @JsonProperty("place_name")
    private String placeName;

    @JsonProperty("minimum_kakao_rating")
    private Float minimumKakaoRating;

    @JsonProperty("minimum_naver_rating")
    private Float minimumNaverRating;

    public PlaceRequest(Integer gu, Integer dong, Integer subCategory, String placeName, Float minimumKakaoRating, Float minimumNaverRating) {
        this.gu = gu;
        this.dong = dong;
        this.subCategory = subCategory;
        this.placeName = placeName;
        this.minimumKakaoRating = minimumKakaoRating;
        this.minimumNaverRating = minimumNaverRating;
    }
}
