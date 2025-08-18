// src/constants/transportationData.js - Fixed for Vite with proper imports

// Import all destination images at the top
import kandyTempleImage from '../assets/images/destinations/kandy-temple-tooth.webp';
import colomboTowerImage from '../assets/images/destinations/colombo-lotus-tower.webp';
import mirissaBeachImage from '../assets/images/destinations/mirissa-beach.webp';
import ellaRockImage from '../assets/images/destinations/ella-rock.webp';
import bentotaBeachImage from '../assets/images/destinations/bentota-beach.webp';
import gallefortImage from '../assets/images/destinations/galle-fort.webp';
import nuwereliateaImage from '../assets/images/destinations/nuwara-eliya-tea.webp';
import sigiriyaRockImage from '../assets/images/destinations/sigiriya-rock.webp';

// Import new images (add these to your src/assets/images/destinations/ folder)
import colomboAirportImage from '../assets/images/destinations/colombo-airport.webp';
import arugamBayImage from '../assets/images/destinations/arugam-bay.webp';
import udawalaweImage from '../assets/images/destinations/udawalawe-elephants.webp';
import kataragamaImage from '../assets/images/destinations/kataragama-temple.webp';
import hambantotaImage from '../assets/images/destinations/hambantota-port.webp';
import tissaLakeImage from '../assets/images/destinations/tissa-lake.webp';

export const TRANSPORTATION_DATA = [
  {
    id: 1,
    title: "Airport Transfer Service",
    description: "Comfortable pickup and drop-off from Bandaranaike International Airport (CMB) to Yala National Park area.",
    destination: {
      name: "Colombo Airport",
      image: colomboAirportImage  // Use imported image
    },
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
    destination: {
      name: "Colombo City",
      image: colomboTowerImage  // Use imported image
    },
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
    title: "Kandy Transfer Service",
    description: "Transportation between cultural capital Kandy and Yala National Park.",
    destination: {
      name: "Kandy",
      image: kandyTempleImage  // Use imported image
    },
    features: [
      "Flexible pickup times",
      "Cultural city connection",
      "Experienced local drivers",
      "Tourist guide available"
    ],
    duration: "3-4 hours",
    vehicleTypes: ["Car", "Van", "Tuk-Tuk"],
    price: "From $60 USD",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Ella Hill Country Transfer",
    description: "Scenic transfer from the beautiful hill station of Ella to Yala camping sites.",
    destination: {
      name: "Ella Rock",
      image: ellaRockImage  // Use imported image
    },
    features: [
      "Mountain scenic route",
      "Photography stops",
      "Local guide insights",
      "Comfortable vehicles"
    ],
    duration: "2-3 hours",
    vehicleTypes: ["Car", "Van"],
    price: "From $45 USD",
    icon: "Camera"
  },
  {
    id: 5,
    title: "Galle Fort Transfer",
    description: "Historical coastal transfer from UNESCO World Heritage Galle Fort to Yala.",
    destination: {
      name: "Galle Fort",
      image: gallefortImage  // Use imported image
    },
    features: [
      "Coastal scenic route",
      "Historical insights",
      "Professional drivers",
      "Flexible timing"
    ],
    duration: "2 hours",
    vehicleTypes: ["Car", "Van", "Bus"],
    price: "From $40 USD",
    icon: "Coffee"
  },
  {
    id: 6,
    title: "Mirissa Beach Transfer",
    description: "Coastal transfer from the stunning Mirissa Beach area to Yala National Park.",
    destination: {
      name: "Mirissa Beach",
      image: mirissaBeachImage  // Use imported image
    },
    features: [
      "Beach to wildlife transition",
      "Scenic coastal drive",
      "Quick response time",
      "Affordable rates"
    ],
    duration: "1.5 hours",
    vehicleTypes: ["Tuk-Tuk", "Car", "Van"],
    price: "From $35 USD",
    icon: "Tent"
  }
];

// Trending Destinations with imported images
export const TRENDING_DESTINATIONS = [
  {
    id: 1,
    name: "Sigiriya Rock",
    image: sigiriyaRockImage,
    distance: "2.5 hours from Yala",
    description: "Ancient rock fortress"
  },
  {
    id: 2,
    name: "Nuwara Eliya",
    image: nuwereliateaImage, 
    distance: "4 hours from Yala",
    description: "Hill country tea plantations"
  },
  {
    id: 3,
    name: "Bentota Beach",
    image: bentotaBeachImage,
    distance: "3 hours from Yala", 
    description: "Golden sandy beaches"
  },
  {
    id: 4,
    name: "Arugam Bay",
    image: arugamBayImage,
    distance: "1 hour from Yala",
    description: "Surfing paradise"
  },
  {
    id: 5,
    name: "Udawalawe",
    image: udawalaweImage,
    distance: "2 hours from Yala",
    description: "Elephant sanctuary"
  },
  {
    id: 6,
    name: "Kataragama",
    image: kataragamaImage,
    distance: "30 minutes from Yala",
    description: "Sacred pilgrimage site"
  },
  {
    id: 7,
    name: "Hambantota",
    image: hambantotaImage, 
    distance: "1.5 hours from Yala",
    description: "Modern port city"
  },
  {
    id: 8,
    name: "Tissamaharama",
    image: tissaLakeImage,
    distance: "20 minutes from Yala", 
    description: "Ancient royal city"
  }
];

// Arrow Ceylon Tours Advertisement Data (unchanged)
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