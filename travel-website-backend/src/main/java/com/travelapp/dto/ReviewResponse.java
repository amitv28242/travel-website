package com.travelapp.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {
	private Long id;
	private Long userId;
	private String userName;
	private Long packageId;
	private String packageName;
	private Long destinationId;
	private String destinationName;
	private Integer rating;
	private String comment;
	private String status;
	private LocalDateTime createdAt;
}