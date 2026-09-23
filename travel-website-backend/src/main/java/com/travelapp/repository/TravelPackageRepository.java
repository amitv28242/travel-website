package com.travelapp.repository;

import com.travelapp.entity.TravelPackage;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {

    @Query("""
        SELECT p FROM TravelPackage p
        WHERE (:destination IS NULL OR LOWER(p.destination.name) LIKE LOWER(CONCAT('%', :destination, '%')))
          AND (:minPrice IS NULL OR p.price >= :minPrice)
          AND (:maxPrice IS NULL OR p.price <= :maxPrice)
          AND (:duration IS NULL OR p.duration = :duration)
          AND (:minRating IS NULL OR p.rating >= :minRating)
    """)
    Page<TravelPackage> filter(
            @Param("destination") String destination,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("duration") Integer duration,
            @Param("minRating") Double minRating,
            Pageable pageable
    );
}