package com.hotplace.api.dong.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.dong.controller.DongDto;
import com.hotplace.api.dong.domain.DongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.hotplace.api.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class DongService {
    private final DongRepository dongRepository;

    public ApiForm<List<DongDto>> findAll(){
        List<DongDto> dongDtos = new ArrayList<DongDto>();
        dongRepository.findAll().forEach((dong) -> dongDtos.add(new DongDto(dong.getId(), dong.getName())));
        return succeed(dongDtos, "동 정보를 가져왔습니다.");
    }
}
