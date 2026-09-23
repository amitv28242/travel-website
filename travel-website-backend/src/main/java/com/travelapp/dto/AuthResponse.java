package com.travelapp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
	private String token;
	private String email;
	private String name;
	private String role;
	private String tokenType;

	public AuthResponse(String token, String email, String name, String role) {
		this.token = token;
		this.email = email;
		this.name = name;
		this.role = role;
		this.tokenType = "Bearer";
	}
}