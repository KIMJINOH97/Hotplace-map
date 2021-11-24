package com.hotplace.api.service;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.dto.GuDto;
import com.hotplace.api.repository.GuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.hotplace.api.dto.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class GuService {
    private final GuRepository guRepository;

    public ApiForm<List<GuDto>> findAll(){
        List<GuDto> guDtos = new ArrayList<GuDto>();
        guRepository.findAllByOrderByName().forEach((gu) -> guDtos.add(new GuDto(gu.getId(), gu.getName())));
        return succeed(guDtos, "구 정보를 가져왔습니다.");
    }
}
