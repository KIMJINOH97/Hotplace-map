package com.hotplace.api.service;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.entity.Place;
import com.hotplace.api.repository.PlaceRepository;
import com.hotplace.api.dto.PlaceRequest;
import com.hotplace.api.dto.PlaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.hotplace.api.dto.api_form.ApiForm.succeed;
import static com.hotplace.api.service.CoordinateUtil.*;

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

    public ApiForm<List<PlaceResponse>> searchPlaceRequest(PlaceRequest requestDto){
        List<PlaceResponse> places = placeRepository.search(requestDto);
       return succeed(places,"검색에 성공 했습니다.");
    }

    public ApiForm<Page<PlaceResponse>> searchPage(PlaceRequest request, Pageable pageable){
        Page<PlaceResponse> page = placeRepository.searchPage(request, pageable);
        return succeed(page, "페이지 검색에 성공 했습니다.");
    }

    public ApiForm<List<PlaceResponse>> searchPlacesByCurrentLocation(Double latitude, Double longitude, Double distance) {
        Double leftTopLatitude = latitude - ONE_KILOMETER_LATITUDE * distance;
        Double leftTopLongitude = longitude - ONE_KILOMETER_LONGITUDE * distance;
        Double rightDownLatitude = latitude + ONE_KILOMETER_LATITUDE * distance;
        Double rightDownLongitude = longitude + ONE_KILOMETER_LONGITUDE * distance;

        return succeed(placeRepository.findPlaceByDistance(leftTopLatitude, rightDownLatitude, leftTopLongitude, rightDownLongitude)
                .stream()
                .filter(o -> calculateTwoCoordinate(Double.valueOf(o.getLatitudeY()), Double.valueOf(o.getLongitudeX()),
                        latitude, longitude) < distance)
                .map(PlaceResponse::new)
                .collect(Collectors.toList()), "현재 위치 중심으로 조회에 성공했습니다.");
    }

    public ApiForm<List<PlaceResponse>> searchPlacesByLocation(Double latitude, Double longitude, Double distance, PlaceRequest requestDto) {
        Double leftTopLatitude = latitude - ONE_KILOMETER_LATITUDE * distance;
        Double leftTopLongitude = longitude - ONE_KILOMETER_LONGITUDE * distance;
        Double rightDownLatitude = latitude + ONE_KILOMETER_LATITUDE * distance;
        Double rightDownLongitude = longitude + ONE_KILOMETER_LONGITUDE * distance;

        List<PlaceResponse> result =
                placeRepository
                .searchByLocation(leftTopLatitude, leftTopLongitude, rightDownLatitude, rightDownLongitude, requestDto)
                .stream()
                .filter(o -> calculateTwoCoordinate(Double.valueOf(o.getLatitudeY()), Double.valueOf(o.getLongitudeX()), latitude, longitude) < distance)
                .collect(Collectors.toList());

        return succeed(result,"현재 위치 중심과 조건으로 조회에 성공했습니다.");

    }
}
