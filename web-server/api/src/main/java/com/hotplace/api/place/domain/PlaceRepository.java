package com.hotplace.api.place.domain;

import com.hotplace.api.place.dto.PlaceResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

    List<Place> findAllByDongId(Integer id);
    List<Place> findByGuIdAndDongIdAndCategoryIdAndNameContains(Integer gu, Integer dong, Integer category, String name);
    List<Place> findByGuIdAndDongIdAndCategoryId(Integer gu, Integer dong, Integer category);

}
