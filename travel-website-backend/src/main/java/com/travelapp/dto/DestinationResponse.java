package com.travelapp.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationResponse {
	private Long id;
	private String name;
	private String country;
	private String description;
	private BigDecimal estimatedCost;
	private String bestTimeToVisit;
	private String imageUrl;
	private String popularActivities;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}