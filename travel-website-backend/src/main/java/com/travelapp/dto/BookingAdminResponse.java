package com.travelapp.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingAdminResponse {
	private Long id;
	private String bookingReference;
	private Long userId;
	private String userName;
	private String userEmail;
	private String packageName;
	private String destination;
	private LocalDate travelDate;
	private Integer numberOfTravellers;
	private BigDecimal totalAmount;
	private String status;
	private LocalDateTime bookingDate;
	private String cancellationReason;
	private LocalDateTime cancelledAt;
	private List<BookingResponse.TravellerDto> travellers;
}