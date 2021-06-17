package com.hotplace.api.place.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.place.dto.PlaceRequest;
import com.hotplace.api.place.dto.PlaceResponse;
import com.hotplace.api.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class PlacePostController {

    private final PlaceService placeService;

    @GetMapping("/places")
    public ApiForm<List<PlaceResponse>> findAllPlacesByDong(@RequestParam("dong") Integer id){
        System.out.println("test :"+id);
        return placeService.findAllByDong(id);
    }

    @PostMapping("/places")
    public ApiForm<List<PlaceResponse>> searchPlaces(@RequestBody PlaceRequest requestDto){
        return placeService.searchPlaces(requestDto);
    }
}
