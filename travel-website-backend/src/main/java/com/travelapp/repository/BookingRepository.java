package com.travelapp.repository;

import com.travelapp.entity.Booking;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);

	long countByStatus(Booking.BookingStatus status);

	@Query("SELECT b FROM Booking b WHERE " + "(:q IS NULL OR LOWER(b.bookingReference) LIKE LOWER(CONCAT('%',:q,'%')) "
			+ " OR LOWER(b.user.email) LIKE LOWER(CONCAT('%',:q,'%')) "
			+ " OR LOWER(b.travelPackage.name) LIKE LOWER(CONCAT('%',:q,'%'))) AND "
			+ "(:status IS NULL OR b.status = :status)")
	Page<Booking> searchBookings(@Param("q") String query, @Param("status") String status, Pageable pageable);
}