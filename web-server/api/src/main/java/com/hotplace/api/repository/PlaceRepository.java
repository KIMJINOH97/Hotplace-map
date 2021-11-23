package com.hotplace.api.repository;

import com.hotplace.api.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> , PlaceRepositoryCustom{

    List<Place> findAllByDongId(Integer id);

    List<Place> findByGuIdAndDongIdAndSubCategoryIdAndNameContains(Integer gu, Integer dong, Integer category, String name);

    @Query("select P from Place P where P.gu.id = :gu and P.dong.id=:dong and" +
            " P.subCategory.id=:subCategory and P.name like %:name% and P.longitudeX is not null")
    List<Place> findPlaceBySearch(@Param("gu") Integer gu, @Param("dong") Integer dong,
                                  @Param("subCategory") Integer subCategory, @Param("name") String name);

    @Query("select P from Place P where (P.latitudeY between :leftLat and :rightLat) " +
            "and (P.longitudeX between :leftLong and :rightLong)")
    List<Place> findPlaceByDistance(@Param("leftLat") double leftLat, @Param("rightLat") double rightLat,
                                    @Param("leftLong") double leftLong, @Param("rightLong") double rightLong);
}
