package com.travelapp.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {
	private boolean success;
	private String message;
	private T data;
	private int status;
	private LocalDateTime timestamp;

	public static <T> ApiResponse<T> success(T data, String message) {
		return ApiResponse.<T>builder().success(true).message(message).data(data).status(200)
				.timestamp(LocalDateTime.now()).build();
	}

	public static <T> ApiResponse<T> error(String message, int status) {
		return ApiResponse.<T>builder().success(false).message(message).status(status).timestamp(LocalDateTime.now())
				.build();
	}
}