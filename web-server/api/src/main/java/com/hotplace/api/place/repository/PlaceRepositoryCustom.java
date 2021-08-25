package com.hotplace.api.place.repository;

import com.hotplace.api.place.dto.PlaceRequest;
import com.hotplace.api.place.dto.PlaceResponse;

import java.util.List;

public interface PlaceRepositoryCustom {
    List<PlaceResponse> search(final PlaceRequest condition);
}
