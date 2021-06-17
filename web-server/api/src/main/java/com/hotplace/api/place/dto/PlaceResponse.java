package com.hotplace.api.place.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hotplace.api.place.domain.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PlaceResponse {
    private String name;
    private String address;
    private String gu;
    private String dong;
    private String longitude_x;
    private String latitude_y;

    @JsonProperty("naver_star")
    private Float naverStar;

    @JsonProperty("kakao_star")
    private Float kakaoStar;

    @JsonProperty("instagram_hashtag")
    private Integer instagramHashtag;

    @JsonProperty("naver_url")
    private String naverUrl;

    @JsonProperty("kakao_url")
    private String kakaoUrl;

    @JsonProperty("instagram_url")
    private String instagramUrl;

    @JsonProperty("homepage_url")
    private String homepageUrl;

    public PlaceResponse(Place place){
        this.name = place.getName();
        this.address = place.getAddress();
        this.gu = place.getGu().getName();
        this.dong = place.getDong().getName();
        this.longitude_x = place.getLongitude_x();
        this.latitude_y = place.getLatitude_y();
        this.naverStar = place.getNaverStar();
        this.kakaoStar = place.getKakaoStar();
        this.instagramHashtag = place.getInstagramHashtag();
        this.naverUrl = place.getNaverUrl();
        this.kakaoUrl = place.getKakaoUrl();
        this.instagramUrl = place.getInstagramUrl();
        this.homepageUrl = place.getHomepageUrl();
    }
}
