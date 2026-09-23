package com.travelapp.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PackageRequest {

    @NotNull(message = "Destination ID is required")
    private Long destinationId;

    @NotBlank(message = "Package name is required")
    @Size(min = 3, max = 200)
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 3000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull(message = "Duration is required")
    @Min(value = 1)
    private Integer duration;

    @NotNull(message = "Max travellers is required")
    @Min(value = 1)
    private Integer maxTravellers;

    @NotBlank(message = "Image URL is required")
    @Size(max = 500)
    private String imageUrl;

    @Size(max = 2000)
    private String inclusions;

    @Size(max = 2000)
    private String exclusions;

    @Size(max = 3000)
    private String termsAndConditions;

    @Valid
    private List<ItineraryRequest> itineraries;
}