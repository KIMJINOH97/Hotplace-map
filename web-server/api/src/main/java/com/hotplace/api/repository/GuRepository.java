package com.hotplace.api.repository;

import com.hotplace.api.entity.Gu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuRepository extends JpaRepository<Gu, Integer> {
    List<Gu> findAll();
}
