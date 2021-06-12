package com.hotplace.api.api_form;

import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public static <T> ApiForm <T> succeed (int status, T data, String message){
        return new ApiForm<T>(status, data, message);
    }

    public static <T> ApiForm <T> failed (int status, String message){
        return new ApiForm<T>(status, null, message);
    }

}
