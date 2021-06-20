package com.hotplace.api.place.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

    List<Place> findAllByDongId(Integer id);
    List<Place> findByGuIdAndDongIdAndSubCategoryIdAndNameContains(Integer gu, Integer dong, Integer category, String name);
    List<Place> findByGuIdAndDongIdAndCategoryId(Integer gu, Integer dong, Integer category);

}
