package com.travelapp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryResponse {
	private Long id;
	private Integer dayNumber;
	private String title;
	private String description;
}