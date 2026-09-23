package com.travelapp.mapper;

import com.travelapp.dto.*;
import com.travelapp.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PackageMapper {

	public PackageResponse toDto(TravelPackage p) {
		if (p == null)
			return null;

		List<ItineraryResponse> itineraries = p.getItineraries() == null ? List.of()
				: p.getItineraries().stream().sorted((a, b) -> a.getDayNumber().compareTo(b.getDayNumber()))
						.map(this::toItineraryDto).toList();

		return PackageResponse.builder().id(p.getId()).destinationId(p.getDestination().getId())
				.destinationName(p.getDestination().getName()).destinationCountry(p.getDestination().getCountry())
				.name(p.getName()).description(p.getDescription()).price(p.getPrice()).duration(p.getDuration())
				.maxTravellers(p.getMaxTravellers()).rating(p.getRating()).imageUrl(p.getImageUrl())
				.inclusions(p.getInclusions()).exclusions(p.getExclusions())
				.termsAndConditions(p.getTermsAndConditions()).itineraries(itineraries).createdAt(p.getCreatedAt())
				.updatedAt(p.getUpdatedAt()).build();
	}

	public ItineraryResponse toItineraryDto(PackageItinerary i) {
		if (i == null)
			return null;
		return ItineraryResponse.builder().id(i.getId()).dayNumber(i.getDayNumber()).title(i.getTitle())
				.description(i.getDescription()).build();
	}

	public PackageItinerary toItineraryEntity(ItineraryRequest req, TravelPackage owner) {
		return PackageItinerary.builder().travelPackage(owner).dayNumber(req.getDayNumber()).title(req.getTitle())
				.description(req.getDescription()).build();
	}

	public TravelPackage toEntity(PackageRequest req, Destination destination) {
		return TravelPackage.builder().destination(destination).name(req.getName()).description(req.getDescription())
				.price(req.getPrice()).duration(req.getDuration()).maxTravellers(req.getMaxTravellers())
				.imageUrl(req.getImageUrl()).inclusions(req.getInclusions()).exclusions(req.getExclusions())
				.termsAndConditions(req.getTermsAndConditions()).rating(0.0).build();
	}
}