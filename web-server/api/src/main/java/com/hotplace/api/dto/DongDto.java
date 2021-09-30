package com.hotplace.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DongDto {
    private int dongId;
    private String dongName;

    public DongDto(int dongId, String dongName){
        this.dongId = dongId;
        this.dongName = dongName;
    }
}
