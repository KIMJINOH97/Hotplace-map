package com.hotplace.api.service;

import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.dto.DongDto;
import com.hotplace.api.repository.DongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.hotplace.api.dto.api_form.ApiForm.succeed;

@RequiredArgsConstructor
@Service
public class DongService {
    private final DongRepository dongRepository;

    public ApiForm<List<DongDto>> findAll(){
        List<DongDto> dongDtos = new ArrayList<DongDto>();
        dongRepository.findAll().forEach((dong) -> dongDtos.add(new DongDto(dong.getId(), dong.getName())));
        return succeed(dongDtos, "동 정보를 가져왔습니다.");
    }

    public ApiForm<List<DongDto>> findAllByGuId(Integer guId){
        List<DongDto> dongDtos = dongRepository.findAllByGuIdOrderByName(guId)
                .stream()
                .map(o -> new DongDto(o.getId(), o.getName()))
                .collect(Collectors.toList());
        return succeed(dongDtos,"해당 구의 동 정보를 가져왔습니다.");
    }
}
