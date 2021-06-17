package com.hotplace.api.dong.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DongRepository extends JpaRepository<Dong, Integer> {

    List<Dong> findAllByGuId(Integer id);
}
