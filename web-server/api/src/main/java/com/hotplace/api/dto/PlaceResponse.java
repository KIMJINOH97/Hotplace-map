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

    private Integer id;

    private String name;

    private String address;

    @JsonProperty("road_address")
    private String roadAddress;

    @JsonProperty("phone_number")
    private String phoneNumber;

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

    @JsonProperty("naver_blog_review_count")
    private Integer naverBlogReview;

    @JsonProperty("naver_buyer_review_count")
    private Integer naverBuyerReview;

    @JsonProperty("naver_url")
    private String naverUrl;

    @JsonProperty("kakao_url")
    private String kakaoUrl;

    @JsonProperty("instagram_url")
    private String instagramUrl;

    @JsonProperty("homepage_url")
    private String homepageUrl;

    public PlaceResponse(Place place){
        this.id = place.getId();
        this.roadAddress = place.getRoadAddress();
        this.phoneNumber = place.getPhoneNumber();
        this.name = place.getName();
        this.address = place.getAddress();
        this.longitudeX = place.getLongitudeX();
        this.latitudeY = place.getLatitudeY();
        this.naverStar = place.getNaverStar();
        this.kakaoStar = place.getKakaoStar();
        this.instagramHashtag = place.getInstagramHashtag();
        this.naverBlogReview = place.getNaverBlogReview();
        this.naverBuyerReview = place.getNaverBuyerReview();
        this.naverUrl = place.getNaverUrl();
        this.kakaoUrl = place.getKakaoUrl();
        this.instagramUrl = place.getInstagramUrl();
        this.homepageUrl = place.getHomepageUrl();
    }

//    @QueryProjection
//    public PlaceResponse(String name, String address, String longitudeX, String latitudeY, Float naverStar, Float kakaoStar, Integer instagramHashtag, String naverUrl, String kakaoUrl, String instagramUrl, String homepageUrl) {
//        this.name = name;
//        this.address = address;
//        this.longitudeX = longitudeX;
//        this.latitudeY = latitudeY;
//        this.naverStar = naverStar;
//        this.kakaoStar = kakaoStar;
//        this.instagramHashtag = instagramHashtag;
//        this.naverUrl = naverUrl;
//        this.kakaoUrl = kakaoUrl;
//        this.instagramUrl = instagramUrl;
//        this.homepageUrl = homepageUrl;
//    }

    @QueryProjection
    public PlaceResponse(
            Integer id,
            String name,
            String address,
            String roadAddress,
            String phoneNumber,
            String longitudeX,
            String latitudeY,
            Float naverStar,
            Float kakaoStar,
            Integer instagramHashtag,
            Integer naverBlogReview,
            Integer naverBuyerReview,
            String naverUrl,
            String kakaoUrl,
            String instagramUrl,
            String homepageUrl
    ){
        this.id = id;
        this.name = name;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phoneNumber = phoneNumber;
        this.longitudeX = longitudeX;
        this.latitudeY = latitudeY;
        this.naverStar = naverStar;
        this.kakaoStar = kakaoStar;
        this.instagramHashtag = instagramHashtag;
        this.naverBlogReview = naverBlogReview;
        this.naverBuyerReview = naverBuyerReview;
        this.naverUrl = naverUrl;
        this.kakaoUrl = kakaoUrl;
        this.instagramUrl = instagramUrl;
        this.homepageUrl = homepageUrl;
    }
}
