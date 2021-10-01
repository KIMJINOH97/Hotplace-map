package com.hotplace.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
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

    @JsonProperty("minimum_instagram_hashtag")
    private Integer minimumInstagramHashtag;


}
