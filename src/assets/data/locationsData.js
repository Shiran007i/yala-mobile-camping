// src/data/locationsData.js
/**
 * Updated Locations Data - Integrated with Dynamic Pricing System
 * This file now works seamlessly with the pricing configuration
 */

import camp3 from "/src/assets/images/camp3.webp";
import { PRICING_CONFIG, calculatePricing, formatPrice } from './pricingConfig';

// Base location data structure
export const YALA_LOCATION_DATA = {
  id: 2,
  name: "Yala Mobile Camp",
  location: "Yala National Park",
  coordinates: [6.3725, 81.5185],
  
  // Pricing integration - now references the pricing config
  price_per_night: PRICING_CONFIG.basePackage.basePriceFor2Persons,
  pricing_model: "dynamic", // Indicates this location uses dynamic pricing
  base_persons: PRICING_CONFIG.basePackage.includedPersons,
  additional_person_price: PRICING_CONFIG.pricingRules.additionalPersonFormula.finalAdditionalPersonPrice,
  
  // Location details
  rating: 4.9,
  max_guests: PRICING_CONFIG.basePackage.maxPersons,
  difficulty: "Easy",
  elevation: "30m",
  best_season: "February - July",
  
  // Images
  image_url: camp3,
  gallery: [camp3],
  
  // Descriptions
  description: "An exclusive camping experience inside the heart of Yala jungle. For $950 (per 2 persons), enjoy full-board meals, a full-day guided safari, and one night in our comfortable safari tents — surrounded by the raw sights and sounds of the wild.",
  
  detailed_description: "Yala Wilderness Camp offers a truly unique opportunity to stay inside the untouched wilderness of Sri Lanka's most iconic national park. Nestled deep within Yala's jungle, our camp blends comfort with raw adventure — where leopards roam, elephants wander nearby, and the calls of nocturnal creatures become your night's soundtrack. This all-inclusive package includes full-board meals, a full-day guided safari, park entrance fees, and comfortable safari tent accommodation.",
  
  // What's included - now references pricing config
  included: PRICING_CONFIG.inclusions.basePriceIncludes,
  
  // Location-specific amenities
  amenities: [
    "Safari Tours",
    "Wildlife Viewing", 
    "Guided Tours",
    "Photography Tours",
    "Night Sounds Experience"
  ],
  
  // Available activities
  activities: [
    {
      name: "Morning Safari Drive",
      duration: "4 hours",
      difficulty: "Easy",
      time: "6:00 AM - 10:00 AM"
    },
    {
      name: "Evening Safari Drive", 
      duration: "4 hours",
      difficulty: "Easy",
      time: "3:00 PM - 7:00 PM"
    },
    {
      name: "Full Day Safari",
      duration: "8 hours", 
      difficulty: "Easy",
      time: "6:00 AM - 6:00 PM"
    },
    {
      name: "Bird Watching Session",
      duration: "2 hours",
      difficulty: "Easy",
      time: "Dawn & Dusk"
    },
    {
      name: "Night Wildlife Sounds Experience",
      duration: "1 hour", 
      difficulty: "Easy",
      time: "After dinner"
    },
    {
      name: "Campfire Experience",
      duration: "2 hours",
      difficulty: "Easy", 
      time: "Evening"
    }
  ],
  
  // Weather information
  weather: {
    temp: "25-35°C",
    humidity: "60-75%",
    rainfall: "Very Low (Feb-Jul)",
    best_months: ["February", "March", "April", "May", "June", "July"]
  },
  
  // Wildlife spotting chances
  wildlife_chances: {
    leopard: "85%",
    elephant: "95%", 
    sloth_bear: "60%",
    spotted_deer: "100%",
    peacock: "100%",
    water_buffalo: "70%",
    crocodile: "80%"
  },
  
  // Seasonal information
  seasonal_info: {
    peak_season: {
      months: ["December", "January", "February", "March", "April"],
      description: "Best wildlife viewing, dry weather, premium rates",
      multiplier: 1.2
    },
    standard_season: {
      months: ["May", "June", "July", "August", "September", "October", "November"],  
      description: "Good weather, fewer crowds, standard rates",
      multiplier: 1.0
    }
  }
};

// Helper functions for location data

/**
 * Get pricing for this location based on group size and dates
 */
export const getLocationPricing = (persons = 2, nights = 1, checkInDate = new Date()) => {
  // Determine season based on check-in date
  const month = checkInDate.getMonth() + 1;
  const season = (month >= 12 || month <= 4) ? 'peak' : 'standard';
  
  return calculatePricing(persons, nights, season);
};

/**
 * Get formatted price display for location card
 */
export const getLocationPriceDisplay = (persons = 2, nights = 1) => {
  const pricing = getLocationPricing(persons, nights);
  return {
    total: formatPrice(pricing.totals.total),
    perPerson: formatPrice(pricing.totals.perPerson),
    perNight: formatPrice(pricing.totals.perNight),
    savings: pricing.savings.totalSavings > 0 ? formatPrice(pricing.savings.totalSavings) : null
  };
};

/**
 * Generate pricing examples for different group sizes
 */
export const getLocationPricingExamples = () => {
  const examples = [];
  
  // Generate examples for 2-8 persons, 1 night
  for (let persons = 2; persons <= 8; persons++) {
    const pricing = getLocationPricing(persons, 1);
    examples.push({
      persons,
      price: formatPrice(pricing.totals.total),
      perPerson: formatPrice(pricing.totals.perPerson),
      savings: pricing.savings.totalSavings > 0 ? formatPrice(pricing.savings.totalSavings) : null,
      isBase: persons === 2
    });
  }
  
  return examples;
};

/**
 * Export as array for compatibility with existing code
 */
export const locations = [YALA_LOCATION_DATA];

// Export individual location for direct access
export default YALA_LOCATION_DATA;

// Additional helper data

export const LOCATION_HIGHLIGHTS = [
  {
    icon: "award",
    title: "World's Highest Leopard Density", 
    description: "85% chance of leopard sightings"
  },
  {
    icon: "users",
    title: "Flexible Group Sizes",
    description: "2-10 persons with smart pricing"
  },
  {
    icon: "star",
    title: "All-Inclusive Package",
    description: "Meals, safari, guides, and accommodation"
  },
  {
    icon: "calendar",
    title: "Year-Round Experience",
    description: "Great wildlife viewing in any season"
  }
];

export const BOOKING_BENEFITS = [
  {
    title: "Smart Pricing",
    description: "Pay less per person in larger groups",
    icon: "trending-down"
  },
  {
    title: "No Hidden Fees", 
    description: "All-inclusive transparent pricing",
    icon: "check-circle"
  },
  {
    title: "Seasonal Rates",
    description: "Peak season premium, standard season value", 
    icon: "calendar"
  },
  {
    title: "Group Discounts",
    description: "$25 discount per additional person",
    icon: "users"
  }
];

// Pricing display helpers for UI components
export const PRICING_DISPLAY_CONFIG = {
  showPriceBreakdown: true,
  showSavingsHighlight: true,
  showSeasonalInfo: true,
  showPerPersonRates: true,
  currency: PRICING_CONFIG.displayConfig.currency,
  currencySymbol: PRICING_CONFIG.displayConfig.currencySymbol
};

// Export pricing config for components that need it
export { PRICING_CONFIG, calculatePricing, formatPrice } from './pricingConfig';