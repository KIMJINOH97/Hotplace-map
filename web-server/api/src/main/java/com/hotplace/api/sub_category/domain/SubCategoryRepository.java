package com.hotplace.api.sub_category.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    @Override
    @Query("select S from SubCategory S join fetch S.category")
    List<SubCategory> findAll();
}
