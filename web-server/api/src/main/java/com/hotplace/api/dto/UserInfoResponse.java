package com.hotplace.api.dto;

import com.hotplace.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private String email;
    private String name;
    private String profileUrl;

    public static UserInfoResponse toResponse (User user){
        return new UserInfoResponse(user.getEmail(), user.getName(), user.getProfile());
    }
}
