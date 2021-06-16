package com.hotplace.api.place.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.place.domain.Place;
import com.hotplace.api.place.domain.PlaceRepository;
import com.hotplace.api.place.dto.PlaceResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.hotplace.api.api_form.ApiForm.succeed;

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

    public ApiForm<List<PlaceResponseDto>> findAllByDong(Integer id){

        List<Place> all = placeRepository.findAllByDongId(id);
        List<PlaceResponseDto> collect = all.stream().map(o -> new PlaceResponseDto(o)).collect(Collectors.toList());
        return succeed(collect, "hi");
    }
}
