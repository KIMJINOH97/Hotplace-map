package com.hotplace.api.place.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.place.domain.Place;
import com.hotplace.api.place.domain.PlaceRepository;
import com.hotplace.api.place.dto.PlaceRequest;
import com.hotplace.api.place.dto.PlaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.hotplace.api.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public ApiForm<List<PlaceResponse>> findAllByDong(Integer id){
        List<Place> all = placeRepository.findAllByDongId(id);
        List<PlaceResponse> places = all.stream().map(PlaceResponse::new).collect(Collectors.toList());
        return succeed(places, "검색에 성공 했습니다.");
    }

    public ApiForm<List<PlaceResponse>> searchPlaces(PlaceRequest requestDto){
        Integer gu = requestDto.getGu();
        Integer dong = requestDto.getDong();
        Integer category = requestDto.getSubCategory();
        String name = requestDto.getPlaceName();
        Float minimumKakaoRating = requestDto.getMinimumKakaoRating();
        Float minimumNaverRating = requestDto.getMinimumNaverRating();

        List<Place> result = placeRepository.findPlaceBySearch(gu, dong, category, name);

        Stream<Place> stream = result.stream();

        if(minimumKakaoRating != null){
            stream = stream.filter(o -> (o.getKakaoStar() != null && o.getKakaoStar() > minimumKakaoRating));
        }
        if(minimumNaverRating != null){
            stream = stream.filter(o -> (o.getNaverStar() != null && o.getNaverStar() > minimumNaverRating));
        }

        List<PlaceResponse> places = stream.map(PlaceResponse::new).collect(Collectors.toList());
        return succeed(places, "검색에 성공 했습니다.");
    }
}
