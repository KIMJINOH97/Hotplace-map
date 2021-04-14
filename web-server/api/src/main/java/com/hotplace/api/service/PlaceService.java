package com.hotplace.api.service;

import com.hotplace.api.domain.Place;
import com.hotplace.api.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public List<Place> findAllPlaces(){
        return placeRepository.findAll();
    }
}
