// src/constants/transportationData.js
export const TRANSPORTATION_DATA = [
  {
    id: 1,
    title: "Airport Transfer Service",
    description: "Comfortable pickup and drop-off from Bandaranaike International Airport (CMB) to Yala National Park area.",
    features: [
      "Air-conditioned vehicles",
      "Professional drivers", 
      "Meet & greet service",
      "Luggage assistance"
    ],
    duration: "4-5 hours",
    vehicleTypes: ["Car (1-3 pax)", "Van (4-8 pax)", "Bus (9+ pax)"],
    price: "From $80 USD",
    icon: "Car"
  },
  {
    id: 2,
    title: "Colombo City Transfer",
    description: "Direct transfer from Colombo city hotels to your camping location in Yala.",
    features: [
      "Hotel pickup service",
      "Scenic route options",
      "Rest stops included",
      "Bottled water provided"
    ],
    duration: "4 hours",
    vehicleTypes: ["Car (1-3 pax)", "Van (4-8 pax)"],
    price: "From $70 USD",
    icon: "Mountain"
  },
  {
    id: 3,
    title: "Inter-City Transport",
    description: "Transportation between major cities like Kandy, Galle, Nuwara Eliya and Yala.",
    features: [
      "Flexible pickup times",
      "Multiple city connections",
      "Experienced local drivers",
      "Tourist guide available"
    ],
    duration: "2-6 hours",
    vehicleTypes: ["Car", "Van", "Tuk-Tuk"],
    price: "From $50 USD",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Safari Vehicle Service",
    description: "Specialized 4WD safari vehicles for Yala National Park game drives.",
    features: [
      "Open-top safari jeeps",
      "Experienced safari drivers",
      "Park entry assistance",
      "Photography equipment storage"
    ],
    duration: "3-6 hours",
    vehicleTypes: ["4WD Safari Jeep (up to 6 pax)"],
    price: "From $45 USD",
    icon: "Camera"
  },
  {
    id: 5,
    title: "Custom Tour Transport",
    description: "Personalized transportation for multi-day tours and custom itineraries.",
    features: [
      "Flexible scheduling",
      "Multiple destination stops",
      "English-speaking drivers",
      "Customizable routes"
    ],
    duration: "As per itinerary",
    vehicleTypes: ["Car", "Van", "Bus", "Luxury Vehicle"],
    price: "Contact for quote",
    icon: "Coffee"
  },
  {
    id: 6,
    title: "Local Area Shuttle",
    description: "Short-distance transportation within Yala area for shopping, dining, or sightseeing.",
    features: [
      "On-demand service",
      "Local area expertise",
      "Quick response time",
      "Affordable rates"
    ],
    duration: "30 minutes - 2 hours",
    vehicleTypes: ["Tuk-Tuk", "Car"],
    price: "From $15 USD",
    icon: "Tent"
  }
];

// Arrow Ceylon Tours Advertisement Data
export const ARROW_TOURS_DATA = {
  companyName: "Arrow Ceylon Tours",
  tagline: "Your Gateway to Sri Lanka's Wonders",
  description: "Discover Sri Lanka with our expertly crafted tour packages and custom-made itineraries. From cultural heritage sites to pristine beaches, we offer comprehensive travel solutions with reliable transportation.",
  websiteUrl: "https://arrow-tours-sihd.vercel.app",
  features: [
    "Custom-made tour packages",
    "Professional tour guides",
    "Comfortable transportation",
    "24/7 customer support",
    "Competitive pricing",
    "Local expertise"
  ],
  popularPackages: [
    {
      name: "Cultural Triangle Tour",
      duration: "3 Days",
      highlights: ["Anuradhapura", "Polonnaruwa", "Sigiriya"]
    },
    {
      name: "Hill Country Explorer",
      duration: "4 Days", 
      highlights: ["Kandy", "Nuwara Eliya", "Ella"]
    },
    {
      name: "Southern Coast Adventure",
      duration: "5 Days",
      highlights: ["Galle", "Mirissa", "Yala"]
    },
    {
      name: "Complete Sri Lanka",
      duration: "10 Days",
      highlights: ["All major attractions", "Multiple cities"]
    }
  ],
  contactInfo: {
    phone: "+94 71 234 5678",
    email: "info@arrowceylontours.com",
    whatsapp: "94712345678"
  }
};