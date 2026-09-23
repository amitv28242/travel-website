package com.travelapp.service;

import com.travelapp.dto.BookingAdminResponse;
import com.travelapp.entity.Booking;
import com.travelapp.exception.*;
import com.travelapp.mapper.BookingMapper;
import com.travelapp.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminBookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    public Page<BookingAdminResponse> list(String q, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return bookingRepository.searchBookings(q, status, pageable)
                .map(bookingMapper::toAdminDto);
    }

    public BookingAdminResponse get(Long id) {
        return bookingMapper.toAdminDto(bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id)));
    }

    @Transactional
    public BookingAdminResponse updateStatus(Long id, String status) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        try {
            b.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }
        return bookingMapper.toAdminDto(bookingRepository.save(b));
    }

    @Transactional
    public BookingAdminResponse cancel(Long id, String reason) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        if (b.getStatus() == Booking.BookingStatus.CANCELLED)
            throw new BadRequestException("Booking already cancelled");
        if (b.getStatus() == Booking.BookingStatus.COMPLETED)
            throw new BadRequestException("Cannot cancel a completed booking");
        b.setStatus(Booking.BookingStatus.CANCELLED);
        b.setCancellationReason(reason);
        b.setCancelledAt(LocalDateTime.now());
        return bookingMapper.toAdminDto(bookingRepository.save(b));
    }
}