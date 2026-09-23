package com.travelapp.repository;

import com.travelapp.entity.Destination;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

	@Query("SELECT d FROM Destination d WHERE " + "LOWER(d.name) LIKE LOWER(CONCAT('%',:q,'%')) OR "
			+ "LOWER(d.country) LIKE LOWER(CONCAT('%',:q,'%'))")
	Page<Destination> search(@Param("q") String query, Pageable pageable);
}