package com.hotplace.api.gu.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuRepository extends JpaRepository<Gu, Integer> {
    List<Gu> findAll();
}
