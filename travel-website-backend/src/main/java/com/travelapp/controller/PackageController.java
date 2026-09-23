package com.travelapp.controller;

import com.travelapp.dto.*;
import com.travelapp.service.PackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PackageResponse>>> list(
        @RequestParam(required = false) String destination,
        @RequestParam(required = false) BigDecimal minPrice,
        @RequestParam(required = false) BigDecimal maxPrice,
        @RequestParam(required = false) Integer duration,
        @RequestParam(required = false) Double minRating,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "9") int size,
        @RequestParam(required = false) String sort) {
            return ResponseEntity.ok(ApiResponse.success(
            service.filter(destination, minPrice, maxPrice, duration, minRating, page, size, sort),"OK"));
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PackageResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id), "OK"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PackageResponse>> create(@Valid @RequestBody PackageRequest req) {
        return ResponseEntity.ok(ApiResponse.success(service.create(req), "Package created"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PackageResponse>> update(
            @PathVariable Long id, @Valid @RequestBody PackageRequest req) {
        return ResponseEntity.ok(ApiResponse.success(service.update(id, req), "Package updated"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Package deleted"));
    }
}