package com.travelapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "traveller_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravellerDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", nullable = false)
	private Booking booking;

	@Column(name = "full_name", nullable = false)
	private String fullName;

	private Integer age;

	private String gender;

	private String phone;

	private String email;

	@Column(name = "id_number")
	private String idNumber;
}