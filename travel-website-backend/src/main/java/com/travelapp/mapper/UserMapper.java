package com.travelapp.mapper;

import com.travelapp.dto.UserAdminResponse;
import com.travelapp.dto.UserProfileResponse;
import com.travelapp.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

	public UserProfileResponse toProfileDto(User u) {
		if (u == null)
			return null;
		return UserProfileResponse.builder().id(u.getId()).name(u.getName()).email(u.getEmail()).phone(u.getPhone())
				.role(u.getRole().name()).status(u.getStatus().name()).createdAt(u.getCreatedAt()).build();
	}

	public UserAdminResponse toAdminDto(User u, long totalBookings) {
		if (u == null)
			return null;
		return UserAdminResponse.builder().id(u.getId()).name(u.getName()).email(u.getEmail()).phone(u.getPhone())
				.role(u.getRole().name()).status(u.getStatus().name()).totalBookings(totalBookings)
				.createdAt(u.getCreatedAt()).build();
	}
}