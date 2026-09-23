package com.travelapp.controller;

import com.travelapp.dto.*;
import com.travelapp.service.DestinationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationService service;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DestinationResponse>>> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false, defaultValue = "name") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(q, sort, page, size), "OK"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DestinationResponse>> get(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id), "OK"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationResponse>> create(@Valid @RequestBody DestinationRequest req) {
        return ResponseEntity.ok(ApiResponse.success(service.create(req), "Destination created"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationResponse>> update(
            @PathVariable Long id, @Valid @RequestBody DestinationRequest req) {
        return ResponseEntity.ok(ApiResponse.success(service.update(id, req), "Destination updated"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Destination deleted"));
    }
}