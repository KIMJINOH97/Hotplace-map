package com.hotplace.api.repository;

import com.hotplace.api.entity.Dong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DongRepository extends JpaRepository<Dong, Integer> {
    List<Dong> findAllByGuIdOrderByName(Integer id);
}
