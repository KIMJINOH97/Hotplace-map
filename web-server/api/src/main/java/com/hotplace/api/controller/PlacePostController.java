package com.hotplace.api.controller;

import com.hotplace.api.dto.PlaceRequest;
import com.hotplace.api.dto.PlaceResponse;
import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        return placeService.searchPlaceRequest(requestDto);
    }

    @PostMapping("/paging/places")
    public ApiForm<Page<PlaceResponse>> pagePlaces(@RequestBody PlaceRequest requestDto, Pageable pageable){
        return placeService.searchPage(requestDto, pageable);
    }
}