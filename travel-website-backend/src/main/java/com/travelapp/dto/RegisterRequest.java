package com.travelapp.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

	@NotBlank(message = "Name is required")
	private String name;

	@NotBlank
	@Email(message = "Invalid email")
	private String email;

	@NotBlank
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number")
	private String phone;

	@NotBlank
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	@NotBlank
	private String confirmPassword;
}