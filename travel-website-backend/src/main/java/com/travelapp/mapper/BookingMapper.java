package com.travelapp.mapper;

import com.travelapp.dto.BookingAdminResponse;
import com.travelapp.dto.BookingRequest;
import com.travelapp.dto.BookingResponse;
import com.travelapp.entity.Booking;
import com.travelapp.entity.TravellerDetail;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookingMapper {

	public BookingResponse toUserDto(Booking b) {
		if (b == null)
			return null;
		return BookingResponse.builder().id(b.getId()).bookingReference(b.getBookingReference())
				.packageName(b.getTravelPackage().getName())
				.destination(b.getTravelPackage().getDestination().getName()).travelDate(b.getTravelDate())
				.numberOfTravellers(b.getNumberOfTravellers()).totalAmount(b.getTotalAmount())
				.status(b.getStatus().name()).bookingDate(b.getCreatedAt())
				.travellers(toTravellerDtos(b.getTravellers())).build();
	}

	public BookingAdminResponse toAdminDto(Booking b) {
		if (b == null)
			return null;
		return BookingAdminResponse.builder().id(b.getId()).bookingReference(b.getBookingReference())
				.userId(b.getUser().getId()).userName(b.getUser().getName()).userEmail(b.getUser().getEmail())
				.packageName(b.getTravelPackage().getName())
				.destination(b.getTravelPackage().getDestination().getName()).travelDate(b.getTravelDate())
				.numberOfTravellers(b.getNumberOfTravellers()).totalAmount(b.getTotalAmount())
				.status(b.getStatus().name()).bookingDate(b.getCreatedAt())
				.cancellationReason(b.getCancellationReason()).cancelledAt(b.getCancelledAt())
				.travellers(toTravellerDtos(b.getTravellers())).build();
	}

	public List<BookingResponse.TravellerDto> toTravellerDtos(List<TravellerDetail> travellers) {
		if (travellers == null)
			return List.of();
		return travellers.stream().map(t -> new BookingResponse.TravellerDto(t.getFullName(), t.getAge(), t.getGender(),
				t.getPhone(), t.getEmail(), t.getIdNumber())).toList();
	}

	public TravellerDetail toTravellerEntity(BookingRequest.TravellerRequest r, Booking booking) {
		return TravellerDetail.builder().booking(booking).fullName(r.getFullName()).age(r.getAge())
				.gender(r.getGender()).phone(r.getPhone()).email(r.getEmail()).idNumber(r.getIdNumber()).build();
	}
}