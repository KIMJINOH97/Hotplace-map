package com.hotplace.api.place.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hotplace.api.category.domain.Category;
import com.hotplace.api.dong.domain.Dong;
import com.hotplace.api.gu.domain.Gu;
import com.hotplace.api.sub_category.domain.SubCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "PLACE")
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Integer id;
    private String name;

    // 'GU' 테이블과 N:1 관계
    @ManyToOne
    @JoinColumn(name = "gu_id")
    @JsonIgnore
    private Gu gu;

    // 'Dong' 테이블과 N:1 관계
    @ManyToOne
    @JoinColumn(name = "dong_id")
    @JsonIgnore
    private Dong dong;

    @Column(name = "phone_number")
    private String phoneNumber;
    private String longitude_x;
    private String latitude_y;

    @Column(name = "road_address")
    private String roadAddress;
    private String address;

    @Column(name = "naver_star_rate")
    private float naverStar;

    @Column(name = "instagram_hashtag")
    private int instagramHashtag;

    @Column(name = "kakao_star_rate")
    private float kakaoStar;

    @ManyToOne @JoinColumn (name = "category_id")
    private Category category;

    @ManyToOne @JoinColumn (name = "sub_category_id")
    private SubCategory subCategory;

    @Column(name = "naver_blog_review_count")
    private int naverBlogReview;

    @Column(name = "naver_buyer_review_count")
    private int naverBuyerReview;

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