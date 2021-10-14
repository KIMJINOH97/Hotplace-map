package com.hotplace.api.repository;

import com.hotplace.api.dto.PlaceResponse;
import com.hotplace.api.entity.Bookmark;
import com.hotplace.api.entity.Place;
import com.hotplace.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark,Integer> {


    @Query("select new com.hotplace.api.dto.PlaceResponse(p) " +
            "from User u " +
            "join  u.bookmarks b " +
            "join  b.place p " +
            "where u.id = :id")
    List<PlaceResponse> findBookmarks(@Param("id") Integer id);


    Optional<Bookmark> findByUserAndPlace(User user , Place place);
}
