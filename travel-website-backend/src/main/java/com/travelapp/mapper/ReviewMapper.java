package com.travelapp.mapper;

import com.travelapp.dto.ReviewResponse;
import com.travelapp.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

	public ReviewResponse toDto(Review r) {
		if (r == null)
			return null;
		return ReviewResponse.builder().id(r.getId()).userId(r.getUser().getId()).userName(r.getUser().getName())
				.packageId(r.getTravelPackage() != null ? r.getTravelPackage().getId() : null)
				.packageName(r.getTravelPackage() != null ? r.getTravelPackage().getName() : null)
				.destinationId(r.getDestination() != null ? r.getDestination().getId() : null)
				.destinationName(r.getDestination() != null ? r.getDestination().getName() : null).rating(r.getRating())
				.comment(r.getComment()).status(r.getStatus().name()).createdAt(r.getCreatedAt()).build();
	}
}