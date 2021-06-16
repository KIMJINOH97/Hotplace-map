package com.hotplace.api.place.controller;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.place.dto.PlaceResponseDto;
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
    public ApiForm<List<PlaceResponseDto>> findAllPlacesByDong(@RequestParam("dong") Integer id){
        System.out.println("test :"+id);
        return placeService.findAllByDong(id);
    }

}
