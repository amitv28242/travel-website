package com.travelapp.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

	@NotNull
	private Long packageId;

	@NotNull
	@FutureOrPresent
	private LocalDate travelDate;

	@NotNull
	@Min(1)
	private Integer numberOfTravellers;

	@NotEmpty
	@Valid
	private List<TravellerRequest> travellers;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TravellerRequest {
		@NotBlank
		private String fullName;
		@NotNull
		@Min(0)
		@Max(120)
		private Integer age;
		@NotBlank
		private String gender;
		@NotBlank
		private String phone;
		@NotBlank
		@Email
		private String email;
		private String idNumber;
	}
}