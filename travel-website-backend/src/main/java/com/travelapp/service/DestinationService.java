package com.travelapp.service;

import com.travelapp.dto.*;
import com.travelapp.entity.Destination;
import com.travelapp.exception.ResourceNotFoundException;
import com.travelapp.mapper.DestinationMapper;
import com.travelapp.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DestinationService {

    private final DestinationRepository destinationRepository;
    private final DestinationMapper destinationMapper;

    public Page<DestinationResponse> list(String query, String sortBy, int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(sortBy == null ? "name" : sortBy).ascending());
        Page<Destination> result = (query == null || query.isBlank())
                ? destinationRepository.findAll(pageable)
                : destinationRepository.search(query, pageable);
        return result.map(destinationMapper::toDto);
    }

    public DestinationResponse get(Long id) {
        return destinationMapper.toDto(destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found: " + id)));
    }

    @Transactional
    public DestinationResponse create(DestinationRequest req) {
        return destinationMapper.toDto(
                destinationRepository.save(destinationMapper.toEntity(req)));
    }

    @Transactional
    public DestinationResponse update(Long id, DestinationRequest req) {
        Destination d = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found: " + id));
        destinationMapper.updateEntity(d, req);
        return destinationMapper.toDto(destinationRepository.save(d));
    }

    @Transactional
    public void delete(Long id) {
        if (!destinationRepository.existsById(id))
            throw new ResourceNotFoundException("Destination not found: " + id);
        destinationRepository.deleteById(id);
    }
}