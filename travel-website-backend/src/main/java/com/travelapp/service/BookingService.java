package com.travelapp.service;

import com.travelapp.dto.*;
import com.travelapp.entity.*;
import com.travelapp.exception.*;
import com.travelapp.mapper.BookingMapper;
import com.travelapp.repository.*;
import com.travelapp.util.BookingReferenceGenerator;
import com.travelapp.util.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TravelPackageRepository packageRepository;
    private final BookingMapper bookingMapper;
    private final BookingReferenceGenerator referenceGenerator;

    @Transactional
    public BookingResponse createBooking(String email, BookingRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        TravelPackage pkg = packageRepository.findById(req.getPackageId())
                .orElseThrow(() -> new ResourceNotFoundException("Package not found"));

        if (req.getNumberOfTravellers() > pkg.getMaxTravellers())
            throw new BadRequestException("Exceeds max travellers for this package");
        if (req.getTravellers().size() != req.getNumberOfTravellers())
            throw new BadRequestException("Traveller count mismatch");

        BigDecimal total = pkg.getPrice()
                .multiply(BigDecimal.valueOf(req.getNumberOfTravellers()));

        Booking booking = Booking.builder()
                .bookingReference(referenceGenerator.next())
                .user(user)
                .travelPackage(pkg)
                .travelDate(req.getTravelDate())
                .numberOfTravellers(req.getNumberOfTravellers())
                .totalAmount(total)
                .status(Booking.BookingStatus.CONFIRMED)
                .build();

        List<TravellerDetail> travellers = req.getTravellers().stream()
                .map(t -> bookingMapper.toTravellerEntity(t, booking))
                .toList();
        booking.setTravellers(travellers);
        bookingRepository.save(booking);

        return bookingMapper.toUserDto(booking);
    }

    public List<BookingResponse> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(bookingMapper::toUserDto).toList();
    }

    public BookingResponse getBooking(String email, Long id) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!b.getUser().getEmail().equals(email))
            throw new BadRequestException("Not authorized");
        return bookingMapper.toUserDto(b);
    }

    @Transactional
    public BookingResponse cancelBooking(String email, Long id) {
        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!b.getUser().getEmail().equals(email))
            throw new BadRequestException("Not authorized");
        if (b.getStatus() == Booking.BookingStatus.CANCELLED)
            throw new BadRequestException("Already cancelled");
        if (b.getTravelDate().isBefore(LocalDate.now().plusDays(
                Constants.MIN_CANCEL_HOURS_BEFORE_TRAVEL / 24)))
            throw new BadRequestException("Cannot cancel within 48 hours of travel");
        b.setStatus(Booking.BookingStatus.CANCELLED);
        return bookingMapper.toUserDto(bookingRepository.save(b));
    }
}