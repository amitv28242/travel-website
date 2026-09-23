package com.travelapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequest {

	private Long packageId;
	private Long destinationId;

	@NotNull
	@Min(1)
	@Max(5)
	private Integer rating;

	@NotBlank
	@Size(min = 5, max = 2000)
	private String comment;
}