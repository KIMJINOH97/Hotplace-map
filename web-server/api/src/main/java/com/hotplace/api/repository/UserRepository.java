package com.hotplace.api.repository;

import com.hotplace.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByProviderId(String providerId);
}
