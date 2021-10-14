package com.hotplace.api.service;

import com.hotplace.api.dto.PlaceResponse;
import com.hotplace.api.dto.api_form.ApiForm;
import com.hotplace.api.entity.Bookmark;
import com.hotplace.api.entity.Place;
import com.hotplace.api.entity.User;
import com.hotplace.api.repository.BookmarkRepository;
import com.hotplace.api.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PlaceRepository placeRepository;

    @Transactional(readOnly = true)
    public ApiForm<?> findAll(User user){
        try{
            return ApiForm.succeed(bookmarkRepository.findBookmarks(user.getId()),"북마크 조회 성공!");
        }
        catch (Exception e){
            return ApiForm.failed(404,e.getMessage());
        }

    }

    @Transactional
    public ApiForm<?> createBookmark(User user , Integer placeId){
        try{
            Place place = placeRepository.findById(placeId)
                    .orElseThrow(() -> new RuntimeException("해당 place_id 는 유효하지 않음!"));

            bookmarkRepository.findByUserAndPlace(user,place)
                    .ifPresent(o -> {throw new IllegalStateException("해당 place_id 는 이미 북마크로 되어있음");});

            bookmarkRepository.save(
                    Bookmark.builder()
                    .place(place)
                    .user(user)
                    .build());

            return ApiForm.succeed(new PlaceResponse(place),"북마크 생성 성공!");
        }catch (Exception e){
            return ApiForm.failed(404,e.getMessage());
        }
    }


}
