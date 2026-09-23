package com.travelapp.repository;

import com.travelapp.entity.Review;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE " +
           "(:packageId IS NULL OR r.travelPackage.id = :packageId) AND " +
           "(:destinationId IS NULL OR r.destination.id = :destinationId) AND " +
           "(:status IS NULL OR r.status = :status)")
    Page<Review> findFiltered(@Param("packageId") Long packageId,
                              @Param("destinationId") Long destinationId,
                              @Param("status") Review.ReviewStatus status,
                              Pageable pageable);

    long countByStatus(Review.ReviewStatus status);
}