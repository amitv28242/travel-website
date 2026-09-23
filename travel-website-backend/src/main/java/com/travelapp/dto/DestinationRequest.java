package com.travelapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationRequest {

	@NotBlank(message = "Destination name is required")
	@Size(min = 2, max = 100)
	private String name;

	@NotBlank(message = "Country is required")
	@Size(min = 2, max = 100)
	private String country;

	@NotBlank(message = "Description is required")
	@Size(max = 3000)
	private String description;

	@NotNull(message = "Estimated cost is required")
	@DecimalMin(value = "0.0", inclusive = false, message = "Cost must be greater than 0")
	private BigDecimal estimatedCost;

	@NotBlank(message = "Best time to visit is required")
	private String bestTimeToVisit;

	@NotBlank(message = "Image URL is required")
	@Size(max = 500)
	private String imageUrl;

	@Size(max = 1000)
	private String popularActivities;
}