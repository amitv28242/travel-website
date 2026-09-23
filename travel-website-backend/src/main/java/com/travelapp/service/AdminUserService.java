package com.travelapp.service;

import com.travelapp.dto.UserAdminResponse;
import com.travelapp.entity.Booking;
import com.travelapp.entity.User;
import com.travelapp.exception.*;
import com.travelapp.mapper.UserMapper;
import com.travelapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final UserMapper userMapper;

    public Page<UserAdminResponse> list(String query, String role, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return userRepository.searchUsers(query, role, status, pageable)
                .map(u -> userMapper.toAdminDto(u, countBookings(u.getId())));
    }

    public UserAdminResponse get(Long id) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        return userMapper.toAdminDto(u, countBookings(id));
    }

    @Transactional
    public UserAdminResponse updateStatus(Long id, String status, String requesterEmail) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        if (u.getEmail().equals(requesterEmail))
            throw new BadRequestException("You cannot change your own status");
        try {
            u.setStatus(User.Status.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status. Use ACTIVE or DISABLED");
        }
        return userMapper.toAdminDto(userRepository.save(u), countBookings(id));
    }

    @Transactional
    public void delete(Long id, String requesterEmail) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        if (u.getEmail().equals(requesterEmail))
            throw new BadRequestException("You cannot delete your own account");
        if (u.getRole() == User.Role.ADMIN)
            throw new BadRequestException("Cannot delete an ADMIN account via this endpoint");

        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(id);
        boolean hasActive = bookings.stream().anyMatch(b ->
                b.getStatus() == Booking.BookingStatus.PENDING
                        || b.getStatus() == Booking.BookingStatus.CONFIRMED);
        if (hasActive)
            throw new BadRequestException("Cannot delete a user with active bookings");

        userRepository.delete(u);
    }

    private long countBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).size();
    }
}