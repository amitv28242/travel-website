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
public class BookingResponse {
	private Long id;
	private String bookingReference;
	private String packageName;
	private String destination;
	private LocalDate travelDate;
	private Integer numberOfTravellers;
	private BigDecimal totalAmount;
	private String status;
	private LocalDateTime bookingDate;
	private List<TravellerDto> travellers;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class TravellerDto {
		private String fullName;
		private Integer age;
		private String gender;
		private String phone;
		private String email;
		private String idNumber;
	}
}