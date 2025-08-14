// src/data/pricingConfig.js
/**
 * Centralized Pricing Configuration for Yala Mobile Camping
 * 
 * Base pricing structure:
 * - 1 day for 2 persons = $950
 * - Each additional person = (950/2) - 25 = $450
 * - Additional nights follow same per-person pricing
 */

export const PRICING_CONFIG = {
  // Base package configuration
  basePackage: {
    name: "Yala Mobile Camp Base Package",
    basePriceFor2Persons: 950,
    baseDuration: 1, // days
    includedPersons: 2,
    maxPersons: 10,
  },

  // Pricing calculation rules
  pricingRules: {
    // Per additional person calculation: (base_price / 2) - discount
    additionalPersonFormula: {
      basePersonPrice: 950 / 2, // $475 per person base
      discount: 25, // $25 discount per additional person
      finalAdditionalPersonPrice: (950 / 2) - 25, // $450 per additional person
    },
    
    // Night pricing (same rate applies to additional nights)
    perNightPricing: {
      for2Persons: 950,
      perAdditionalPerson: 450,
    },

    // Group discounts (optional - for future use)
    groupDiscounts: [
      { minPersons: 6, discountPercent: 5 },
      { minPersons: 8, discountPercent: 8 },
      { minPersons: 10, discountPercent: 10 },
    ],

    // Seasonal pricing multipliers (optional)
    seasonalMultipliers: {
      peak: 1.2,     // Dec-Apr (20% increase)
      standard: 1.0,  // May-Nov (standard pricing)
      offSeason: 0.9, // Special promotions (10% discount)
    },
  },

  // Service fees and taxes
  additionalFees: {
    serviceFee: 0,           // No service fee currently
    parkEntranceFee: 0,      // Included in package
    taxPercent: 0,           // No tax currently
    processingFee: 0,        // No processing fee
  },

  // Package inclusions
  inclusions: {
    basePriceIncludes: [
      "Safari tent accommodation",
      "Full-board meals (breakfast, lunch, dinner)",
      "Full-day guided safari (6 AM - 6 PM)",
      "Park entrance fees",
      "Professional wildlife guide",
      "All camping equipment",
      "Transportation within park",
      "Evening campfire experience",
    ],
    additionalPersonIncludes: [
      "All meals for additional person",
      "Bedding and camping equipment",
      "Same safari and guide services",
      "No additional park fees",
    ],
  },

  // Pricing display configuration
  displayConfig: {
    currency: "USD",
    currencySymbol: "$",
    showBreakdown: true,
    showSavings: true,
    highlightBasePriceFor2: true,
  },
};

/**
 * Calculate total price based on group size and nights
 * @param {number} persons - Number of persons
 * @param {number} nights - Number of nights
 * @param {string} season - Season type ('peak', 'standard', 'offSeason')
 * @returns {Object} Pricing breakdown
 */
export const calculatePricing = (persons = 2, nights = 1, season = 'standard') => {
  const config = PRICING_CONFIG;
  const basePrice = config.basePackage.basePriceFor2Persons;
  const additionalPersonPrice = config.pricingRules.additionalPersonFormula.finalAdditionalPersonPrice;
  
  // Calculate base price (for first 2 persons)
  let subtotal = basePrice * nights;
  
  // Calculate additional persons cost
  const additionalPersons = Math.max(0, persons - 2);
  const additionalPersonsCost = additionalPersons * additionalPersonPrice * nights;
  
  // Add additional persons cost
  subtotal += additionalPersonsCost;
  
  // Apply seasonal multiplier
  const seasonalMultiplier = config.pricingRules.seasonalMultipliers[season] || 1.0;
  subtotal = subtotal * seasonalMultiplier;
  
  // Calculate fees and taxes
  const serviceFee = config.additionalFees.serviceFee;
  const processingFee = config.additionalFees.processingFee;
  const taxAmount = (subtotal * config.additionalFees.taxPercent) / 100;
  
  const total = subtotal + serviceFee + processingFee + taxAmount;
  
  return {
    breakdown: {
      basePriceFor2: basePrice,
      basePriceFor2Total: basePrice * nights,
      additionalPersons: additionalPersons,
      additionalPersonPrice: additionalPersonPrice,
      additionalPersonsTotal: additionalPersonsCost,
      subtotal: subtotal / seasonalMultiplier, // Before seasonal adjustment
      seasonalAdjustment: subtotal - (subtotal / seasonalMultiplier),
      serviceFee,
      processingFee,
      taxAmount,
    },
    totals: {
      subtotal: Math.round(subtotal * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round((total / persons) * 100) / 100,
      perNight: Math.round((total / nights) * 100) / 100,
    },
    savings: {
      regularPricePerPerson: basePrice / 2, // $475
      discountPerAdditionalPerson: 25,
      totalSavings: additionalPersons * 25 * nights,
    },
    metadata: {
      persons,
      nights,
      season,
      seasonalMultiplier,
      currency: config.displayConfig.currency,
      lastCalculated: new Date().toISOString(),
    }
  };
};

/**
 * Get pricing for different group sizes (for display purposes)
 * @param {number} nights - Number of nights
 * @param {string} season - Season type
 * @returns {Array} Array of pricing options
 */
export const getPricingOptions = (nights = 1, season = 'standard') => {
  const options = [];
  
  for (let persons = 2; persons <= 10; persons++) {
    const pricing = calculatePricing(persons, nights, season);
    options.push({
      persons,
      ...pricing,
      isBaseOption: persons === 2,
    });
  }
  
  return options;
};

/**
 * Format price for display
 * @param {number} amount - Price amount
 * @param {string} currency - Currency code
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currency = 'USD') => {
  const config = PRICING_CONFIG.displayConfig;
  return `${config.currencySymbol}${amount.toLocaleString()}`;
};

/**
 * Get season based on date
 * @param {Date} date - Date to check
 * @returns {string} Season type
 */
export const getSeason = (date = new Date()) => {
  const month = date.getMonth() + 1; // 1-12
  
  // Peak season: December to April (12, 1, 2, 3, 4)
  if (month >= 12 || month <= 4) {
    return 'peak';
  }
  
  // Standard season: May to November
  return 'standard';
};

// Example usage and test data
export const PRICING_EXAMPLES = {
  example1: {
    description: "2 persons, 1 night, standard season",
    input: { persons: 2, nights: 1, season: 'standard' },
    expected: { total: 950 }
  },
  example2: {
    description: "3 persons, 1 night, standard season",
    input: { persons: 3, nights: 1, season: 'standard' },
    expected: { total: 950 + 450 } // $1,400
  },
  example3: {
    description: "4 persons, 2 nights, standard season",
    input: { persons: 4, nights: 2, season: 'standard' },
    expected: { total: (950 * 2) + (450 * 2 * 2) } // $3,700
  },
  example4: {
    description: "2 persons, 1 night, peak season",
    input: { persons: 2, nights: 1, season: 'peak' },
    expected: { total: 950 * 1.2 } // $1,140
  }
};

export default PRICING_CONFIG;