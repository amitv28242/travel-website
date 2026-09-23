package com.travelapp.service;

import com.travelapp.dto.DashboardStatsResponse;
import com.travelapp.entity.Booking;
import com.travelapp.entity.Review;
import com.travelapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStatsService {

    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;
    private final TravelPackageRepository packageRepository;
    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;

    public DashboardStatsResponse getStats() {
        List<Booking> bookings = bookingRepository.findAll();
        BigDecimal revenue = bookings.stream()
                .filter(b -> b.getStatus() == Booking.BookingStatus.CONFIRMED
                        || b.getStatus() == Booking.BookingStatus.COMPLETED)
                .map(Booking::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardStatsResponse.builder()
                .totalUsers(userRepository.count())
                .totalDestinations(destinationRepository.count())
                .totalPackages(packageRepository.count())
                .totalBookings(bookingRepository.count())
                .pendingBookings(bookingRepository.countByStatus(Booking.BookingStatus.PENDING))
                .confirmedBookings(bookingRepository.countByStatus(Booking.BookingStatus.CONFIRMED))
                .cancelledBookings(bookingRepository.countByStatus(Booking.BookingStatus.CANCELLED))
                .completedBookings(bookingRepository.countByStatus(Booking.BookingStatus.COMPLETED))
                .totalReviews(reviewRepository.count())
                .pendingReviews(reviewRepository.countByStatus(Review.ReviewStatus.PENDING))
                .totalRevenue(revenue)
                .build();
    }
}