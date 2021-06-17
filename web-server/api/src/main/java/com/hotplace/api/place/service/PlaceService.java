package com.hotplace.api.place.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.place.domain.Place;
import com.hotplace.api.place.domain.PlaceRepository;
import com.hotplace.api.place.dto.PlaceRequest;
import com.hotplace.api.place.dto.PlaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.hotplace.api.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public ApiForm<List<PlaceResponse>> findAllByDong(Integer id){
        List<Place> all = placeRepository.findAllByDongId(id);
        List<PlaceResponse> places = all.stream().map(o -> new PlaceResponse(o)).collect(Collectors.toList());
        return succeed(places, "검색에 성공 했습니다.");
    }

    public ApiForm<List<PlaceResponse>> searchPlaces(PlaceRequest requestDto){
        Integer gu = requestDto.getGu();
        Integer dong = requestDto.getDong();
        Integer category = requestDto.getSubCategory();
        String name = requestDto.getPlaceName();
        List<Place> all = placeRepository.findByGuIdAndDongIdAndCategoryIdAndNameContains(gu, dong, category, name);
        List<PlaceResponse> places = all.stream().map(o -> new PlaceResponse(o)).collect(Collectors.toList());
        return succeed(places, "검색에 성공 했습니다.");
    }
}
