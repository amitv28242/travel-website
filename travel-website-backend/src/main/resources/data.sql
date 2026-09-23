-- =============================================================
--  TravelGo – Database seed data
--  Run AFTER schema creation.
--  Keep spring.sql.init.mode=never if using DataInitializer,
--  OR set it to `always` to execute this on startup.
-- =============================================================

CREATE DATABASE IF NOT EXISTS travel_db;
USE travel_db;
SHOW TABLES;
DESCRIBE travel_packages;

-- =============================================
-- DESTINATIONS
-- =============================================

INSERT IGNORE INTO destinations
(id, name, country, description, estimated_cost, best_time_to_visit, image_url, popular_activities, created_at, updated_at)
VALUES
-- --- INDIA ---
(1, 'Goa', 'India',
 'Sun-kissed beaches, vibrant nightlife, and Portuguese-era heritage.',
 15000.00, 'October to March',
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
 'Beach Parties, Water Sports, Fort Tours', NOW(), NOW()),

(2, 'Manali', 'India',
 'Snow-capped Himalayan mountains and adventure sports.',
 20000.00, 'March to June',
 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
 'Trekking, Skiing, Paragliding', NOW(), NOW()),

(3, 'Jaipur', 'India',
 'The Pink City, famous for its royal palaces and vibrant bazaars.',
 18000.00, 'November to February',
 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
 'Amber Fort, Hawa Mahal, Shopping', NOW(), NOW()),

(4, 'Kerala', 'India',
 'God''s Own Country, known for its serene backwaters and lush greenery.',
 25000.00, 'September to March',
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
 'Houseboat Cruises, Ayurveda, Tea Plantations', NOW(), NOW()),

(5, 'Agra', 'India',
 'Home to the iconic Taj Mahal, a symbol of eternal love.',
 12000.00, 'October to March',
 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
 'Taj Mahal, Agra Fort, Fatehpur Sikri', NOW(), NOW()),

(6, 'Ladakh', 'India',
 'A high-altitude desert with stunning landscapes and Buddhist monasteries.',
 35000.00, 'June to September',
 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
 'Pangong Lake, Nubra Valley, Monastery Tours', NOW(), NOW()),

(7, 'Andaman Islands', 'India',
 'Pristine beaches, coral reefs, and a relaxed island vibe.',
 40000.00, 'October to May',
 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
 'Scuba Diving, Snorkeling, Island Hopping', NOW(), NOW()),

(8, 'Varanasi', 'India',
 'One of the world''s oldest living cities, spiritual heart of India.',
 10000.00, 'October to March',
 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
 'Ganga Aarti, Boat Rides, Temple Visits', NOW(), NOW()),

(9, 'Udaipur', 'India',
 'The City of Lakes, known for its romantic palaces and sunsets.',
 16000.00, 'September to March',
 'https://images.unsplash.com/photo-1587299195898-47232c535609?w=800',
 'Lake Pichola, City Palace, Jag Mandir', NOW(), NOW()),

(10, 'Rishikesh', 'India',
 'Yoga capital of the world, nestled in the foothills of the Himalayas.',
 8000.00, 'September to April',
 'https://images.unsplash.com/photo-1591019981407-2f5fa0e7b5c4?w=800',
 'River Rafting, Yoga, Bungee Jumping', NOW(), NOW()),

-- --- INTERNATIONAL ---
(11, 'Paris', 'France',
 'The City of Light, renowned for its art, fashion, and cuisine.',
 120000.00, 'April to June, October to November',
 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
 'Eiffel Tower, Louvre Museum, Seine River Cruise', NOW(), NOW()),

(12, 'Bali', 'Indonesia',
 'The Island of the Gods, with lush rice terraces and vibrant culture.',
 80000.00, 'April to October',
 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
 'Ubud Monkey Forest, Tanah Lot, Surfing', NOW(), NOW()),

(13, 'Dubai', 'United Arab Emirates',
 'A futuristic city of skyscrapers, luxury shopping, and desert adventures.',
 90000.00, 'November to March',
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
 'Burj Khalifa, Desert Safari, Palm Jumeirah', NOW(), NOW()),

(14, 'Tokyo', 'Japan',
 'A dazzling mix of ultra-modern and traditional, from neon lights to ancient temples.',
 150000.00, 'March to May, September to November',
 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
 'Shibuya Crossing, Senso-ji Temple, Mount Fuji', NOW(), NOW()),

(15, 'Rome', 'Italy',
 'The Eternal City, an open-air museum of ancient history and vibrant culture.',
 110000.00, 'April to June, September to October',
 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
 'Colosseum, Vatican City, Trevi Fountain', NOW(), NOW());

-- =============================================
-- TRAVEL PACKAGES  (one or more per destination)
-- =============================================

INSERT IGNORE INTO travel_packages
(id, destination_id, name, description, price, duration, max_travellers, rating,
 image_url, inclusions, exclusions, terms_and_conditions, created_at, updated_at)
VALUES
-- Goa
(1, 1, 'Goa Beach Escape',
 '4-day beachside retreat with water sports and sunset cruises.',
 25000.00, 4, 10, 4.5,
 'https://images.unsplash.com/photo-1587922546307-776227941871?w=800',
 'Hotel, Breakfast, Airport Transfer, Water Sports',
 'Flights, Lunch, Dinner, Personal expenses',
 'Standard cancellation policy applies.', NOW(), NOW()),
(2, 1, 'Goa Party Weekend',
 '3-day getaway with nightlife, beach clubs and a sunset cruise.',
 18000.00, 3, 8, 4.3,
 'https://images.unsplash.com/photo-1519821172144-4f87d3b56c74?w=800',
 'Hotel, Breakfast, Club Entry, Cruise',
 'Flights, Alcohol, Personal expenses',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Manali
(3, 2, 'Manali Adventure',
 '5-day mountain adventure with trekking and paragliding.',
 35000.00, 5, 8, 4.7,
 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800',
 'Hotel, All Meals, Trekking, Guide',
 'Flights, Insurance, Personal expenses',
 'Weather-dependent activities.', NOW(), NOW()),
(4, 2, 'Manali Honeymoon Special',
 '6-day romantic retreat with candle-light dinners and a private cottage.',
 55000.00, 6, 4, 4.8,
 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
 'Private Cottage, All Meals, Sightseeing, Candle-light Dinner',
 'Flights, Personal expenses',
 'Weather-dependent activities.', NOW(), NOW()),

-- Jaipur
(5, 3, 'Royal Rajasthan',
 '4-day heritage tour of Jaipur palaces, forts and bazaars.',
 22000.00, 4, 12, 4.6,
 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
 'Hotel, Breakfast, Guided Tours, Elephant Ride',
 'Flights, Lunch, Dinner, Shopping',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Kerala
(6, 4, 'Kerala Backwaters Bliss',
 '6-day houseboat cruise through Alleppey and Kumarakom.',
 40000.00, 6, 10, 4.8,
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
 'Houseboat, All Meals, Ayurveda Session, Guide',
 'Flights, Personal expenses',
 'Standard cancellation policy applies.', NOW(), NOW()),
(7, 4, 'Kerala Tea & Spice Trail',
 '5-day tour of Munnar tea gardens and Thekkady spice plantations.',
 32000.00, 5, 10, 4.6,
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
 'Hotel, Breakfast, Plantation Tours, Guide',
 'Flights, Lunch, Dinner',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Agra
(8, 5, 'Taj Mahal Day Tour',
 '2-day quick tour of the Taj Mahal and Agra Fort.',
 9500.00, 2, 15, 4.4,
 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
 'Hotel, Breakfast, Monument Tickets, Guide',
 'Flights, Lunch, Dinner, Shopping',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Ladakh
(9, 6, 'Ladakh Road Trip',
 '7-day epic road trip covering Leh, Nubra and Pangong Lake.',
 65000.00, 7, 6, 4.9,
 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
 'SUV, Hotel, All Meals, Permits, Guide',
 'Flights, Insurance, Personal expenses',
 'Acclimatization required; weather dependent.', NOW(), NOW()),

-- Andaman
(10, 7, 'Andaman Island Hopper',
 '6-day island tour covering Port Blair, Havelock and Neil.',
 55000.00, 6, 8, 4.7,
 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
 'Ferry, Hotel, Breakfast, Snorkeling',
 'Flights, Lunch, Dinner',
 'Weather-dependent ferries.', NOW(), NOW()),

-- Varanasi
(11, 8, 'Varanasi Spiritual Sojourn',
 '3-day tour with Ganga Aarti, boat ride and Sarnath.',
 15000.00, 3, 12, 4.5,
 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
 'Hotel, Breakfast, Boat Ride, Guide',
 'Flights, Lunch, Dinner',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Udaipur
(12, 9, 'Udaipur Lake Romance',
 '4-day romantic escape through Udaipur''s lakes and palaces.',
 28000.00, 4, 6, 4.7,
 'https://images.unsplash.com/photo-1587299195898-47232c535609?w=800',
 'Heritage Hotel, Breakfast, Boat Ride, City Tour',
 'Flights, Lunch, Dinner',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Rishikesh
(13, 10, 'Rishikesh Adventure Weekend',
 '3-day rafting, camping and yoga retreat.',
 12000.00, 3, 15, 4.6,
 'https://images.unsplash.com/photo-1591019981407-2f5fa0e7b5c4?w=800',
 'Camp, All Meals, Rafting, Yoga Sessions',
 'Transport to Rishikesh, Personal expenses',
 'Standard cancellation policy applies.', NOW(), NOW()),

-- Paris
(14, 11, 'Parisian Dream',
 '5-day classic tour of Paris with Eiffel Tower and Louvre.',
 125000.00, 5, 8, 4.9,
 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
 'Hotel, Breakfast, City Pass, Seine Cruise',
 'Flights, Visa, Lunch, Dinner',
 'Visa required; weather dependent.', NOW(), NOW()),

-- Bali
(15, 12, 'Bali Tropical Escape',
 '7-day island escape with Ubud, Seminyak and Nusa Penida.',
 90000.00, 7, 10, 4.8,
 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
 'Villa, Breakfast, Island Tours, Airport Transfer',
 'Flights, Visa, Lunch, Dinner',
 'Weather-dependent activities.', NOW(), NOW()),

-- Dubai
(16, 13, 'Dubai Luxury Getaway',
 '4-day luxury tour with Burj Khalifa and desert safari.',
 95000.00, 4, 8, 4.7,
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
 '5-Star Hotel, Breakfast, City Tour, Desert Safari',
 'Flights, Visa, Lunch, Dinner',
 'Visa required.', NOW(), NOW()),

-- Tokyo
(17, 14, 'Tokyo Neon Nights',
 '6-day tour of Tokyo''s modern and traditional highlights.',
 160000.00, 6, 8, 4.9,
 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
 'Hotel, Breakfast, JR Pass, Guided Tours',
 'Flights, Visa, Lunch, Dinner',
 'Visa required.', NOW(), NOW()),

-- Rome
(18, 15, 'Roman Holiday',
 '5-day tour covering the Colosseum, Vatican and Trevi Fountain.',
 115000.00, 5, 8, 4.8,
 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
 'Hotel, Breakfast, Skip-the-line Tickets, Guide',
 'Flights, Visa, Lunch, Dinner',
 'Visa required.', NOW(), NOW());

-- =============================================
-- PACKAGE ITINERARIES
-- =============================================

INSERT IGNORE INTO package_itineraries (package_id, day_number, title, description) VALUES
-- Package 1: Goa Beach Escape
(1, 1, 'Arrival', 'Airport pickup and hotel check-in.'),
(1, 2, 'Beach Day', 'Water sports and beach relaxation.'),
(1, 3, 'Heritage Tour', 'Visit old Goa churches and forts.'),
(1, 4, 'Departure', 'Checkout and airport drop.'),

-- Package 2: Goa Party Weekend
(2, 1, 'Arrival & Beach Club', 'Check-in and evening at a beach club.'),
(2, 2, 'Sunset Cruise', 'Day at leisure, evening sunset cruise.'),
(2, 3, 'Departure', 'Checkout and airport drop.'),

-- Package 3: Manali Adventure
(3, 1, 'Arrival in Manali', 'Transfer and hotel check-in.'),
(3, 2, 'Solang Valley', 'Snow activities and paragliding.'),
(3, 3, 'Rohtang Pass', 'Full-day excursion.'),
(3, 4, 'Old Manali', 'Temples, cafes, and local market.'),
(3, 5, 'Departure', 'Transfer to airport.'),

-- Package 4: Manali Honeymoon Special
(4, 1, 'Arrival', 'Private cottage check-in and welcome drink.'),
(4, 2, 'Solang Valley', 'Snow activities for two.'),
(4, 3, 'Romantic Dinner', 'Candle-light dinner under the stars.'),
(4, 4, 'Kullu & Naggar', 'Sightseeing and heritage walk.'),
(4, 5, 'Local Manali', 'Temples, cafes and shopping.'),
(4, 6, 'Departure', 'Checkout and transfer.'),

-- Package 5: Royal Rajasthan
(5, 1, 'Arrival in Jaipur', 'Hotel check-in and evening bazaar walk.'),
(5, 2, 'Amber Fort', 'Fort tour and elephant ride.'),
(5, 3, 'City Palace & Hawa Mahal', 'Palace tours and shopping.'),
(5, 4, 'Departure', 'Checkout and transfer.'),

-- Package 6: Kerala Backwaters Bliss
(6, 1, 'Arrival in Kochi', 'Hotel check-in and city tour.'),
(6, 2, 'Drive to Alleppey', 'Board houseboat and cruise backwaters.'),
(6, 3, 'Kumarakom', 'Village walk and bird sanctuary.'),
(6, 4, 'Thekkady', 'Spice plantation tour.'),
(6, 5, 'Ayurveda Day', 'Relaxation and ayurvedic massage.'),
(6, 6, 'Departure', 'Transfer to airport.'),

-- Package 7: Kerala Tea & Spice Trail
(7, 1, 'Arrival in Kochi', 'Check-in and evening walk.'),
(7, 2, 'Munnar', 'Drive and tea plantation tour.'),
(7, 3, 'Munnar Sightseeing', 'Eravikulam National Park and Mattupetty Dam.'),
(7, 4, 'Thekkady', 'Spice plantation and Periyar boat ride.'),
(7, 5, 'Departure', 'Transfer to airport.'),

-- Package 8: Taj Mahal Day Tour
(8, 1, 'Arrival & Sunset View', 'Check-in, sunset view of Taj from Mehtab Bagh.'),
(8, 2, 'Taj Mahal & Agra Fort', 'Sunrise Taj visit and Agra Fort tour.'),

-- Package 9: Ladakh Road Trip
(9, 1, 'Arrival in Leh', 'Rest day for acclimatization.'),
(9, 2, 'Leh Local', 'Shanti Stupa and Leh Palace.'),
(9, 3, 'Nubra Valley', 'Drive over Khardung La; camel ride at Hunder.'),
(9, 4, 'Pangong Lake', 'Full-day drive to Pangong Tso.'),
(9, 5, 'Back to Leh', 'Return via Chang La.'),
(9, 6, 'Magnetic Hill', 'Visit Magnetic Hill and Sangam.'),
(9, 7, 'Departure', 'Transfer to airport.'),

-- Package 10: Andaman Island Hopper
(10, 1, 'Arrival Port Blair', 'Cellular Jail and Light & Sound show.'),
(10, 2, 'Havelock', 'Ferry to Havelock; Radhanagar Beach.'),
(10, 3, 'Elephant Beach', 'Snorkeling and water sports.'),
(10, 4, 'Neil Island', 'Bharatpur and Laxmanpur beaches.'),
(10, 5, 'Port Blair', 'Corbyn''s Cove and shopping.'),
(10, 6, 'Departure', 'Transfer to airport.'),

-- Package 11: Varanasi Spiritual Sojourn
(11, 1, 'Arrival & Ganga Aarti', 'Check-in, evening Ganga Aarti.'),
(11, 2, 'Sunrise Boat Ride', 'Boat ride and temple tour.'),
(11, 3, 'Sarnath & Departure', 'Visit Sarnath and transfer.'),

-- Package 12: Udaipur Lake Romance
(12, 1, 'Arrival in Udaipur', 'Heritage hotel check-in.'),
(12, 2, 'City Palace & Lake Pichola', 'Palace tour and boat ride.'),
(12, 3, 'Jag Mandir & Saheliyon Ki Bari', 'Sightseeing and gardens.'),
(12, 4, 'Departure', 'Checkout and transfer.'),

-- Package 13: Rishikesh Adventure Weekend
(13, 1, 'Arrival & Camp', 'Camp check-in and evening yoga.'),
(13, 2, 'River Rafting', '16km rafting and cliff jumping.'),
(13, 3, 'Departure', 'Morning yoga and checkout.'),

-- Package 14: Parisian Dream
(14, 1, 'Arrival in Paris', 'Hotel check-in and evening walk.'),
(14, 2, 'Eiffel Tower', 'Summit visit and Trocadéro.'),
(14, 3, 'Louvre & Seine', 'Louvre tour and Seine river cruise.'),
(14, 4, 'Versailles', 'Day trip to Palace of Versailles.'),
(14, 5, 'Departure', 'Transfer to airport.'),

-- Package 15: Bali Tropical Escape
(15, 1, 'Arrival in Bali', 'Villa check-in and welcome drink.'),
(15, 2, 'Ubud', 'Monkey forest and rice terraces.'),
(15, 3, 'Tanah Lot', 'Temple visit and sunset.'),
(15, 4, 'Nusa Penida', 'Day trip with snorkeling.'),
(15, 5, 'Seminyak', 'Beach day and shopping.'),
(15, 6, 'Spa Day', 'Balinese spa and leisure.'),
(15, 7, 'Departure', 'Transfer to airport.'),

-- Package 16: Dubai Luxury Getaway
(16, 1, 'Arrival in Dubai', 'Hotel check-in and Marina walk.'),
(16, 2, 'City Tour', 'Burj Khalifa and Dubai Mall.'),
(16, 3, 'Desert Safari', 'Dune bashing and BBQ dinner.'),
(16, 4, 'Departure', 'Transfer to airport.'),

-- Package 17: Tokyo Neon Nights
(17, 1, 'Arrival in Tokyo', 'Hotel check-in and evening walk in Shinjuku.'),
(17, 2, 'Shibuya & Harajuku', 'Crossing, Meiji Shrine and shopping.'),
(17, 3, 'Asakusa & Ueno', 'Senso-ji temple and Ueno Park.'),
(17, 4, 'Mount Fuji Day Trip', 'Full-day excursion to Mt. Fuji and Hakone.'),
(17, 5, 'Akihabara & Ginza', 'Electronics and luxury shopping.'),
(17, 6, 'Departure', 'Transfer to airport.'),

-- Package 18: Roman Holiday
(18, 1, 'Arrival in Rome', 'Hotel check-in and evening walk.'),
(18, 2, 'Ancient Rome', 'Colosseum, Roman Forum and Palatine Hill.'),
(18, 3, 'Vatican City', 'Vatican Museums and St. Peter''s Basilica.'),
(18, 4, 'Trevi & Pantheon', 'Fountain, Pantheon and Piazza Navona.'),
(18, 5, 'Departure', 'Transfer to airport.');
