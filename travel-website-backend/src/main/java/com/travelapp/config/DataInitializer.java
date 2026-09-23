package com.travelapp.config;

import com.travelapp.entity.User;
import com.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Bean
	CommandLineRunner seedAdmin() {
		return args -> {
			if (userRepository.findByEmail("admin@travelgo.com").isEmpty()) {
				User admin = User.builder().name("Admin").email("admin@travelgo.com").phone("9999999999")
						.password(passwordEncoder.encode("Admin@123")).role(User.Role.ADMIN).status(User.Status.ACTIVE)
						.build();
				userRepository.save(admin);
				log.info("✅ Seeded admin: admin@travelgo.com / Admin@123");
			} else {
				log.info("Admin already exists, skipping seed.");
			}
		};
	}
}