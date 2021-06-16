package com.hotplace.api.gu.service;

import com.hotplace.api.api_form.ApiForm;
import com.hotplace.api.gu.controller.GuDto;
import com.hotplace.api.gu.domain.GuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.hotplace.api.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class GuService {
    private final GuRepository guRepository;

    public ApiForm<List<GuDto>> findAll(){
        List<GuDto> guDtos = new ArrayList<GuDto>();
        guRepository.findAll().forEach((gu) -> guDtos.add(new GuDto(gu.getId(), gu.getName())));
        return succeed(guDtos, "구 정보를 가져왔습니다.");
    }
}
