package com.travelapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {

	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100)
	private String name;

	@NotBlank(message = "Phone is required")
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number")
	private String phone;
}