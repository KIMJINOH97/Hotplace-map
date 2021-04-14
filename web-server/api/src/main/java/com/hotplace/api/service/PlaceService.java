package com.hotplace.api.service;

import com.hotplace.api.controller.dto.PlaceResponseDto;
import com.hotplace.api.domain.Place;
import com.hotplace.api.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public List<PlaceResponseDto> findAllPlaces(){
        List<Place> all = placeRepository.findAll();
        List<PlaceResponseDto> responseDtos = new ArrayList<>();
        for(Place place : all){
            responseDtos.add(new PlaceResponseDto(place));
        }
        return responseDtos;
    }
}
