package com.travelapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "package_itineraries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageItinerary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "package_id", nullable = false)
	private TravelPackage travelPackage;

	@Column(name = "day_number", nullable = false)
	private Integer dayNumber;

	@Column(nullable = false)
	private String title;

	@Column(length = 2000)
	private String description;
}