package com.hotplace.api.place.controller;

import com.hotplace.api.place.dto.PlaceResponseDto;
import com.hotplace.api.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PlacePostController {

    private final PlaceService placeService;

    @GetMapping("/places")
    public List<PlaceResponseDto> findAllPlaces(){
        return placeService.findAllPlaces();
    }
}
