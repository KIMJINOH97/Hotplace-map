package com.hotplace.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "PLACE", indexes = {
        @Index(name = "placeMultiIndex", columnList = "latitude_y, longitude_x")
})
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Integer id;
    private String name;

    // 'GU' 테이블과 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gu_id")
    @JsonIgnore
    private Gu gu;

    // 'Dong' 테이블과 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_id")
    @JsonIgnore
    private Dong dong;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "longitude_x")
    private Double longitudeX;

    @Column(name = "latitude_y")
    private Double latitudeY;

    @Column(name = "road_address")
    private String roadAddress;
    private String address;

    @Column(name = "naver_star_rate")
    private Float naverStar;

    @Column(name = "instagram_hashtag")
    private Integer instagramHashtag;

    @Column(name = "kakao_star_rate")
    private Float kakaoStar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "sub_category_id")
    private SubCategory subCategory;

    @Column(name = "naver_blog_review_count")
    private Integer naverBlogReview;

    @Column(name = "naver_buyer_review_count")
    private Integer naverBuyerReview;

    @Column(name = "naver_url")
    private String naverUrl;

    @Column(name = "instagram_url")
    private String instagramUrl;

    @Column(name = "kakao_url")
    private String kakaoUrl;

    @Column(name = "kakao_id")
    private String kakaoId;

    @Column(name = "homepage_url")
    private String homepageUrl;

}
