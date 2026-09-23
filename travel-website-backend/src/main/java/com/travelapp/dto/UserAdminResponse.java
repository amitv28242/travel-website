package com.travelapp.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAdminResponse {
	private Long id;
	private String name;
	private String email;
	private String phone;
	private String role;
	private String status;
	private long totalBookings;
	private LocalDateTime createdAt;
}