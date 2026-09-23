package com.travelapp.repository;

import com.travelapp.entity.User;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE " +
           "(:q IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%',:q,'%')) " +
           " OR LOWER(u.email) LIKE LOWER(CONCAT('%',:q,'%'))) AND " +
           "(:role IS NULL OR u.role = :role) AND " +
           "(:status IS NULL OR u.status = :status)")
    Page<User> searchUsers(@Param("q") String query,
                           @Param("role") String role,
                           @Param("status") String status,
                           Pageable pageable);
}