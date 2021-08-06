package com.hotplace.api.place.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

    List<Place> findAllByDongId(Integer id);
    List<Place> findByGuIdAndDongIdAndSubCategoryIdAndNameContains(Integer gu, Integer dong, Integer category, String name);

    @Query("select P from Place P where P.gu.id = :gu and P.dong.id=:dong and" +
            " P.subCategory.id=:subCategory and P.name like %:name% and P.longitude_x is not null")
    List<Place> findPlaceBySearch(@Param("gu") Integer gu, @Param("dong") Integer dong,
                                  @Param("subCategory") Integer subCategory, @Param("name") String name);

}
