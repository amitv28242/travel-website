package com.travelapp.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageResponse {
	private Long id;
	private Long destinationId;
	private String destinationName;
	private String destinationCountry;
	private String name;
	private String description;
	private BigDecimal price;
	private Integer duration;
	private Integer maxTravellers;
	private Double rating;
	private String imageUrl;
	private String inclusions;
	private String exclusions;
	private String termsAndConditions;
	private List<ItineraryResponse> itineraries;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}