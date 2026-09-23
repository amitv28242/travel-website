package com.travelapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryRequest {

	@NotNull(message = "Day number is required")
	@Min(value = 1)
	private Integer dayNumber;

	@NotBlank(message = "Title is required")
	@Size(max = 200)
	private String title;

	@NotBlank(message = "Description is required")
	@Size(max = 2000)
	private String description;
}