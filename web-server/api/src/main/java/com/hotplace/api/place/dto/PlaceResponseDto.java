package com.hotplace.api.place.dto;

import com.hotplace.api.place.domain.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PlaceResponseDto {
    private String name;
    private String address;
    private String gu;
    private String dong;

    public PlaceResponseDto(Place place){
        this.name = place.getName();
        this.address = place.getAddress();
        this.gu = place.getGu().getName();
        this.dong = place.getDong().getName();
    }
}
