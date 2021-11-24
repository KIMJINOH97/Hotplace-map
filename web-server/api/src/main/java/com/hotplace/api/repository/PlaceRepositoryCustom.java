package com.hotplace.api.repository;

import com.hotplace.api.dto.PlaceRequest;
import com.hotplace.api.dto.PlaceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlaceRepositoryCustom {
    List<PlaceResponse> search(final PlaceRequest condition);
    Page<PlaceResponse> searchPage(PlaceRequest condition, Pageable pageable);
    List<PlaceResponse> searchByLocation(Double leftTopLatitude, Double leftTopLongitude,Double rightDownLatitude, Double rightDownLongitude,  PlaceRequest requestDto);
}
