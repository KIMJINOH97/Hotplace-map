package com.hotplace.api.place.repository;

import com.hotplace.api.place.dto.PlaceRequest;
import com.hotplace.api.place.dto.PlaceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlaceRepositoryCustom {
    List<PlaceResponse> search(final PlaceRequest condition);
    Page<PlaceResponse> searchPage(PlaceRequest condition, Pageable pageable);
}
