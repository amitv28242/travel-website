package com.travelapp.service;

import com.travelapp.dto.*;
import com.travelapp.entity.*;
import com.travelapp.exception.ResourceNotFoundException;
import com.travelapp.mapper.PackageMapper;
import com.travelapp.repository.DestinationRepository;
import com.travelapp.repository.TravelPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final TravelPackageRepository packageRepository;
    private final DestinationRepository destinationRepository;
    private final PackageMapper packageMapper;

    public Page<PackageResponse> filter(String destination, BigDecimal minPrice, BigDecimal maxPrice,
                                    Integer duration, Double minRating, int page, int size, String sortBy) {
    Pageable pageable = PageRequest.of(page, size,
            Sort.by(sortBy == null ? "rating" : sortBy).descending());
    // TEMP: no filters — just return all
    return packageRepository.findAll(pageable).map(packageMapper::toDto);
    }

    public PackageResponse get(Long id) {
        return packageMapper.toDto(packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found: " + id)));
    }

    @Transactional
    public PackageResponse create(PackageRequest req) {
        Destination dest = destinationRepository.findById(req.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        TravelPackage p = packageMapper.toEntity(req, dest);
        if (req.getItineraries() != null) {
            List<PackageItinerary> list = req.getItineraries().stream()
                    .map(i -> packageMapper.toItineraryEntity(i, p)).toList();
            p.setItineraries(list);
        }
        return packageMapper.toDto(packageRepository.save(p));
    }

    @Transactional
    public PackageResponse update(Long id, PackageRequest req) {
        TravelPackage p = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found: " + id));
        Destination dest = destinationRepository.findById(req.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        p.setDestination(dest);
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        p.setDuration(req.getDuration());
        p.setMaxTravellers(req.getMaxTravellers());
        p.setImageUrl(req.getImageUrl());
        p.setInclusions(req.getInclusions());
        p.setExclusions(req.getExclusions());
        p.setTermsAndConditions(req.getTermsAndConditions());

        if (req.getItineraries() != null) {
            p.getItineraries().clear();
            p.getItineraries().addAll(req.getItineraries().stream()
                    .map(i -> packageMapper.toItineraryEntity(i, p)).toList());
        }
        return packageMapper.toDto(packageRepository.save(p));
    }

    @Transactional
    public void delete(Long id) {
        if (!packageRepository.existsById(id))
            throw new ResourceNotFoundException("Package not found: " + id);
        packageRepository.deleteById(id);
    }
}