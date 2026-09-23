package com.travelapp.service;

import com.travelapp.dto.*;
import com.travelapp.entity.User;
import com.travelapp.exception.*;
import com.travelapp.mapper.UserMapper;
import com.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserProfileResponse getProfile(String email) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toProfileDto(u);
    }

    @Transactional
    public UserProfileResponse updateProfile(String email, UpdateProfileRequest req) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        u.setName(req.getName());
        u.setPhone(req.getPhone());
        return userMapper.toProfileDto(userRepository.save(u));
    }

    @Transactional
    public void changePassword(String email, ChangePasswordRequest req) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!passwordEncoder.matches(req.getCurrentPassword(), u.getPassword()))
            throw new BadRequestException("Current password is incorrect");
        if (!req.getNewPassword().equals(req.getConfirmPassword()))
            throw new BadRequestException("New passwords do not match");
        u.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(u);
    }
}