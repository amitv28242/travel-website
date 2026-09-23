export const destinations = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    description:
      'Explore modern architecture, luxury experiences and unforgettable city attractions.',
    activities: ['Desert safari', 'Burj Khalifa', 'Dhow cruise'],
    price: 45999,
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Indian Ocean',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    description:
      'Experience crystal-clear waters, beautiful beaches and peaceful island escapes.',
    activities: ['Beach resort', 'Snorkeling', 'Sunset cruise'],
    price: 39999,
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    description:
      'Discover iconic landmarks, charming streets and the timeless beauty of Paris.',
    activities: ['Eiffel Tower', 'Museum tour', 'Seine cruise'],
    price: 89999,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    image:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80',
    description:
      'Discover a vibrant city filled with modern attractions, culture and experiences.',
    activities: ['Sentosa', 'Night safari', 'Marina Bay'],
    price: 75999,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    description:
      'Enjoy tropical landscapes, cultural experiences and relaxing island adventures.',
    activities: ['Ubud tour', 'Waterfall visit', 'Beach club'],
    price: 42999,
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Europe',
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    description:
      'Experience spectacular mountains, peaceful villages and breathtaking scenery.',
    activities: ['Alpine train', 'Lake cruise', 'Mountain hike'],
    price: 99999,
  },
];

export const packages = [
  {
    id: 'pkg-dubai-explorer',
    title: 'Dubai Explorer',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    price: 49999,
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    description:
      'Experience the highlights of Dubai with a carefully planned travel experience.',
    inclusions: ['Hotel stay', 'Airport transfer', 'City tour', 'Breakfast'],
    exclusions: ['Flight tickets', 'Personal expenses'],
    itinerary: [
      'Arrival and hotel check-in',
      'Burj Khalifa and Dubai Marina',
      'Desert safari and dinner',
      'Souk visit and free day',
      'Departure',
    ],
  },
  {
    id: 'pkg-maldives-escape',
    title: 'Maldives Escape',
    destination: 'Maldives',
    duration: '4 Days / 3 Nights',
    price: 39999,
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    description:
      'Relax among beautiful beaches and experience a peaceful island getaway.',
    inclusions: ['Beach resort', 'Airport pickup', 'Snorkeling', 'Breakfast'],
    exclusions: ['Flight tickets', 'Optional water sports'],
    itinerary: [
      'Arrival and lounge transfer',
      'Beach and island exploration',
      'Snorkeling trip',
      'Sunset cruise',
      'Departure',
    ],
  },
  {
    id: 'pkg-paris-getaway',
    title: 'Paris Getaway',
    destination: 'Paris, France',
    duration: '6 Days / 5 Nights',
    price: 89999,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    description:
      'Explore iconic landmarks, charming streets and the beauty of Paris.',
    inclusions: ['Hotel accommodation', 'City tours', 'Breakfast'],
    exclusions: ['Museum tickets', 'Shopping'],
    itinerary: [
      'Arrival and welcome tour',
      'Eiffel Tower and Seine river cruise',
      'Louvre and city center',
      'Day trip and shopping',
      'Departure',
    ],
  },
  {
    id: 'pkg-kerala-honeymoon',
    title: 'Kerala Honeymoon',
    destination: 'Kerala, India',
    duration: '5 Days / 4 Nights',
    price: 34999,
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    description:
      'A romantic getaway featuring greenery, backwaters, and memorable private experiences.',
    inclusions: ['Resort stay', 'Houseboat', 'Breakfast'],
    exclusions: ['Flight tickets', 'Spa'],
    itinerary: [
      'Arrival in Kochi',
      'Munnar sightseeing',
      'Backwater cruise',
      'Romantic stay',
      'Departure',
    ],
  },
];

export const testimonials = [
  {
    name: 'Ananya Menon',
    location: 'Kerala, India',
    review:
      'The entire travel experience was smooth and well organized. Everything was planned beautifully, and we could simply enjoy our trip.',
  },
  {
    name: 'Rahul Nair',
    location: 'Kochi, India',
    review:
      'From planning to the actual journey, the support was excellent. The package was well organized and the experience was memorable.',
  },
  {
    name: 'Meera Thomas',
    location: 'Bangalore, India',
    review:
      'A wonderful travel experience with great planning and support. I would definitely consider them for my future trips.',
  },
];

export const profile = {
  name: 'Priya Nair',
  email: 'priya.nair@example.com',
  phone: '+91 98765 43210',
  memberSince: '2024',
};

export const bookings = [
  {
    id: 'BK-2024-001',
    packageName: 'Dubai Explorer',
    date: '20 Oct 2026',
    travelers: 2,
    status: 'Confirmed',
  },
  {
    id: 'BK-2024-002',
    packageName: 'Kerala Honeymoon',
    date: '12 Nov 2026',
    travelers: 2,
    status: 'Pending',
  },
];
