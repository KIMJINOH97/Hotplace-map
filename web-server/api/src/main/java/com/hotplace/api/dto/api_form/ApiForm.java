package com.hotplace.api.dto.api_form;

import lombok.Getter;

@Getter
public class ApiForm<T> {
    private final int status;
    private final T data;
    private final String message;

    public ApiForm(int status, T data, String message){
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public static <T> ApiForm <T> succeed (T data, String message){
        return new ApiForm<T>(200, data, message);
    }

    public static <T> ApiForm <T> failed (int status, String message){
        return new ApiForm<T>(status, null, message);
    }

}
