package com.travelapp.mapper;

import com.travelapp.dto.DestinationRequest;
import com.travelapp.dto.DestinationResponse;
import com.travelapp.entity.Destination;
import org.springframework.stereotype.Component;

@Component
public class DestinationMapper {

	public DestinationResponse toDto(Destination d) {
    if (d == null) return null;
    return DestinationResponse.builder()
            .id(d.getId())
            .name(d.getName() != null ? d.getName() : "")
            .country(d.getCountry() != null ? d.getCountry() : "")
            .description(d.getDescription() != null ? d.getDescription() : "")
            .estimatedCost(d.getEstimatedCost())
            .bestTimeToVisit(d.getBestTimeToVisit() != null ? d.getBestTimeToVisit() : "")
            .imageUrl(d.getImageUrl() != null ? d.getImageUrl() : "")
            .popularActivities(d.getPopularActivities() != null ? d.getPopularActivities() : "")
            .createdAt(d.getCreatedAt())
            .updatedAt(d.getUpdatedAt())
            .build();
	}

	public Destination toEntity(DestinationRequest req) {
		return Destination.builder().name(req.getName()).country(req.getCountry()).description(req.getDescription())
				.estimatedCost(req.getEstimatedCost()).bestTimeToVisit(req.getBestTimeToVisit())
				.imageUrl(req.getImageUrl()).popularActivities(req.getPopularActivities()).build();
	}

	public void updateEntity(Destination d, DestinationRequest req) {
		d.setName(req.getName());
		d.setCountry(req.getCountry());
		d.setDescription(req.getDescription());
		d.setEstimatedCost(req.getEstimatedCost());
		d.setBestTimeToVisit(req.getBestTimeToVisit());
		d.setImageUrl(req.getImageUrl());
		d.setPopularActivities(req.getPopularActivities());
	}
}