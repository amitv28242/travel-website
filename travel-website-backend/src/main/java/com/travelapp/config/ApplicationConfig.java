package com.travelapp.config;

import com.travelapp.entity.User;
import com.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

	private final UserRepository userRepository;

	@Bean
	UserDetailsService userDetailsService() {
		return username -> {
			User user = userRepository.findByEmail(username)
					.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
			return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
					user.getStatus() == User.Status.ACTIVE, true, true, true,
					List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
		};
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
		return cfg.getAuthenticationManager();
	}
}