package com.hotplace.api.gu.controller;

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
