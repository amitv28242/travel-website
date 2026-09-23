package com.travelapp.controller;

import com.travelapp.dto.*;
import com.travelapp.service.AdminBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminBookingController {

    private final AdminBookingService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookingAdminResponse>>> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(q, status, page, size), "OK"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingAdminResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id), "OK"));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<BookingAdminResponse>> updateStatus(
            @PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success(
                service.updateStatus(id, status), "Booking status updated"));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingAdminResponse>> cancel(
            @PathVariable Long id,
            @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(ApiResponse.success(
                service.cancel(id, reason), "Booking cancelled"));
    }
}