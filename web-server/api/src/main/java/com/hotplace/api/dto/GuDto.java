package com.hotplace.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GuDto {
    private int guId;
    private String guName;

    public GuDto(int guId, String guName){
        this.guId = guId;
        this.guName = guName;
    }
}
