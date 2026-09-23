package com.travelapp.service;

import com.travelapp.dto.*;
import com.travelapp.entity.*;
import com.travelapp.exception.*;
import com.travelapp.mapper.ReviewMapper;
import com.travelapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TravelPackageRepository packageRepository;
    private final DestinationRepository destinationRepository;
    private final ReviewMapper reviewMapper;

    public Page<ReviewResponse> list(Long packageId, Long destinationId, String status, int page, int size) {
    Review.ReviewStatus enumStatus = null;
    if (status != null && !status.isBlank()) {
        try {
            enumStatus = Review.ReviewStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }
    }
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    return reviewRepository.findFiltered(packageId, destinationId, enumStatus, pageable)
            .map(reviewMapper::toDto);
    }

    @Transactional
    public ReviewResponse create(String email, ReviewRequest req) {
        if (req.getPackageId() == null && req.getDestinationId() == null)
            throw new BadRequestException("Review must target a package or destination");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Review.ReviewBuilder b = Review.builder()
                .user(user).rating(req.getRating()).comment(req.getComment())
                .status(Review.ReviewStatus.PENDING);

        if (req.getPackageId() != null) {
            TravelPackage p = packageRepository.findById(req.getPackageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Package not found"));
            b.travelPackage(p);
        }
        if (req.getDestinationId() != null) {
            Destination d = destinationRepository.findById(req.getDestinationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
            b.destination(d);
        }
        return reviewMapper.toDto(reviewRepository.save(b.build()));
    }

    @Transactional
    public ReviewResponse moderate(Long id, String status) {
        Review r = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        try {
            r.setStatus(Review.ReviewStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }
        return reviewMapper.toDto(reviewRepository.save(r));
    }

    @Transactional
    public void delete(Long id) {
        if (!reviewRepository.existsById(id))
            throw new ResourceNotFoundException("Review not found");
        reviewRepository.deleteById(id);
    }
}