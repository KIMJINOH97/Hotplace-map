package com.hotplace.api.repository;


import com.hotplace.api.dto.PlaceRequest;
import com.hotplace.api.dto.PlaceResponse;
import com.hotplace.api.dto.QPlaceResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

import static com.hotplace.api.entity.QPlace.*;
import static org.springframework.util.StringUtils.*;

public class PlaceRepositoryCustomImpl implements PlaceRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public PlaceRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<PlaceResponse> search(PlaceRequest condition) {
        List<PlaceResponse> result = queryFactory
                .select(new QPlaceResponse(
                        place.name,
                        place.address,
                        place.longitudeX,
                        place.latitudeY,
                        place.naverStar,
                        place.kakaoStar,
                        place.instagramHashtag,
                        place.naverUrl,
                        place.kakaoUrl,
                        place.instagramUrl,
                        place.homepageUrl
                ))
                .from(place)
                .where(guEq(condition.getGu()),
                        dongEq(condition.getDong()),
                        subCategoryEq(condition.getSubCategory()),
                        placeNameContains(condition.getPlaceName()),
                        minimumKakaoRatingGoe(condition.getMinimumKakaoRating()),
                        minimumNaverRatingGoe(condition.getMinimumNaverRating()),
                        minimumInstagramHashtagGoe(condition.getMinimumInstagramHashtag())
                ).fetch();

        return result;
    }

    @Override
    public Page<PlaceResponse> searchPage(PlaceRequest condition, Pageable pageable) {
        List<PlaceResponse> result = queryFactory
                .select(new QPlaceResponse(
                        place.name,
                        place.address,
                        place.longitudeX,
                        place.latitudeY,
                        place.naverStar,
                        place.kakaoStar,
                        place.instagramHashtag,
                        place.naverUrl,
                        place.kakaoUrl,
                        place.instagramUrl,
                        place.homepageUrl
                ))
                .from(place)
                .where(guEq(condition.getGu()),
                        dongEq(condition.getDong()),
                        subCategoryEq(condition.getSubCategory()),
                        placeNameContains(condition.getPlaceName()),
                        minimumKakaoRatingGoe(condition.getMinimumKakaoRating()),
                        minimumNaverRatingGoe(condition.getMinimumNaverRating()),
                        minimumInstagramHashtagGoe(condition.getMinimumInstagramHashtag()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .selectFrom(place)
                .where(guEq(condition.getGu()),
                        dongEq(condition.getDong()),
                        subCategoryEq(condition.getSubCategory()),
                        placeNameContains(condition.getPlaceName()),
                        minimumKakaoRatingGoe(condition.getMinimumKakaoRating()),
                        minimumNaverRatingGoe(condition.getMinimumNaverRating()),
                        minimumInstagramHashtagGoe(condition.getMinimumInstagramHashtag()))
                .fetchCount();

        return new PageImpl<>(result, pageable, total);
    }

    private BooleanExpression guEq(Integer gu){
        return gu == null ? null : place.gu.id.eq(gu);
    }

    private BooleanExpression dongEq(Integer dong){
        return dong == null ? null : place.dong.id.eq(dong);
    }

    private BooleanExpression subCategoryEq(Integer subCategory){
        return subCategory == null ? null : place.subCategory.id.eq(subCategory);
    }

    private BooleanExpression placeNameContains(String placeName){
        return !hasLength(placeName) ? null : place.name.contains(placeName);
    }

    private BooleanExpression minimumKakaoRatingGoe(Float minimumKakaoRating){
        return minimumKakaoRating == null ? null : place.kakaoStar.goe(minimumKakaoRating);
    }

    private BooleanExpression minimumNaverRatingGoe(Float minimumNaverRating){
        return minimumNaverRating == null ? null : place.naverStar.goe(minimumNaverRating);
    }

    private BooleanExpression minimumInstagramHashtagGoe(Integer minimumInstagramHashtag){
        return minimumInstagramHashtag == null ? null : place.instagramHashtag.goe(minimumInstagramHashtag);
    }
}
