package com.hotplace.api.place.dto;

import com.hotplace.api.place.domain.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PlaceResponse {
    private String name;
    private String address;
    private String gu;
    private String dong;
    private String longitude_x;
    private String latitude_y;

    public PlaceResponse(Place place){
        this.name = place.getName();
        this.address = place.getAddress();
        this.gu = place.getGu().getName();
        this.dong = place.getDong().getName();
        this.longitude_x = place.getLongitude_x();
        this.latitude_y = place.getLatitude_y();
    }
}
