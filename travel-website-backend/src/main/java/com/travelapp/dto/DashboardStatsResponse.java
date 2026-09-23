package com.travelapp.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {
	private long totalUsers;
	private long totalDestinations;
	private long totalPackages;
	private long totalBookings;
	private long pendingBookings;
	private long confirmedBookings;
	private long cancelledBookings;
	private long completedBookings;
	private long totalReviews;
	private long pendingReviews;
	private BigDecimal totalRevenue;
}