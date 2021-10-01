package com.hotplace.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hotplace.api.entity.Place;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaceResponse {
    private String name;
    private String address;

    @JsonProperty("longitude_x")
    private String longitudeX;

    @JsonProperty("latitude_y")
    private String latitudeY;

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
        this.longitudeX = place.getLongitudeX();
        this.latitudeY = place.getLatitudeY();
        this.naverStar = place.getNaverStar();
        this.kakaoStar = place.getKakaoStar();
        this.instagramHashtag = place.getInstagramHashtag();
        this.naverUrl = place.getNaverUrl();
        this.kakaoUrl = place.getKakaoUrl();
        this.instagramUrl = place.getInstagramUrl();
        this.homepageUrl = place.getHomepageUrl();
    }

    @QueryProjection
    public PlaceResponse(String name, String address, String longitudeX, String latitudeY, Float naverStar, Float kakaoStar, Integer instagramHashtag, String naverUrl, String kakaoUrl, String instagramUrl, String homepageUrl) {
        this.name = name;
        this.address = address;
        this.longitudeX = longitudeX;
        this.latitudeY = latitudeY;
        this.naverStar = naverStar;
        this.kakaoStar = kakaoStar;
        this.instagramHashtag = instagramHashtag;
        this.naverUrl = naverUrl;
        this.kakaoUrl = kakaoUrl;
        this.instagramUrl = instagramUrl;
        this.homepageUrl = homepageUrl;
    }
}
