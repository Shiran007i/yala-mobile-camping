// src/utils/pricingTests.js
/**
 * Pricing Calculation Test Utility
 * Use this to verify your pricing calculations are working correctly
 */

import { calculatePricing, PRICING_CONFIG } from '../data/pricingConfig';

// Test scenarios based on your requirements
export const PRICING_TEST_CASES = [
  {
    name: "Base Package - 2 persons, 1 night, standard season",
    input: { persons: 2, nights: 1, season: 'standard' },
    expected: {
      total: 950,
      basePriceTotal: 950,
      additionalPersons: 0,
      additionalCost: 0,
      savings: 0
    }
  },
  {
    name: "3 persons, 1 night, standard season",
    input: { persons: 3, nights: 1, season: 'standard' },
    expected: {
      total: 950 + 450, // $1,400
      basePriceTotal: 950,
      additionalPersons: 1,
      additionalCost: 450,
      savings: 25
    }
  },
  {
    name: "4 persons, 1 night, standard season",
    input: { persons: 4, nights: 1, season: 'standard' },
    expected: {
      total: 950 + (450 * 2), // $1,850
      basePriceTotal: 950,
      additionalPersons: 2,
      additionalCost: 900,
      savings: 50
    }
  },
  {
    name: "2 persons, 2 nights, standard season",
    input: { persons: 2, nights: 2, season: 'standard' },
    expected: {
      total: 950 * 2, // $1,900
      basePriceTotal: 1900,
      additionalPersons: 0,
      additionalCost: 0,
      savings: 0
    }
  },
  {
    name: "4 persons, 2 nights, standard season",
    input: { persons: 4, nights: 2, season: 'standard' },
    expected: {
      total: (950 * 2) + (450 * 2 * 2), // $3,700
      basePriceTotal: 1900,
      additionalPersons: 2,
      additionalCost: 1800,
      savings: 100
    }
  },
  {
    name: "6 persons, 3 nights, standard season",
    input: { persons: 6, nights: 3, season: 'standard' },
    expected: {
      total: (950 * 3) + (450 * 4 * 3), // $8,250
      basePriceTotal: 2850,
      additionalPersons: 4,
      additionalCost: 5400,
      savings: 300
    }
  },
  {
    name: "2 persons, 1 night, peak season (20% increase)",
    input: { persons: 2, nights: 1, season: 'peak' },
    expected: {
      total: 950 * 1.2, // $1,140
      basePriceTotal: 950,
      seasonalAdjustment: 190,
      additionalPersons: 0,
      savings: 0
    }
  },
  {
    name: "4 persons, 1 night, peak season",
    input: { persons: 4, nights: 1, season: 'peak' },
    expected: {
      total: (950 + 900) * 1.2, // $2,220
      basePriceTotal: 950,
      additionalCost: 900,
      seasonalAdjustment: 370,
      additionalPersons: 2,
      savings: 50
    }
  }
];

/**
 * Run all pricing tests and return results
 */
export const runPricingTests = () => {
  console.log('🧪 Running Pricing Calculation Tests...\n');
  
  const results = PRICING_TEST_CASES.map(testCase => {
    const { persons, nights, season } = testCase.input;
    const result = calculatePricing(persons, nights, season);
    
    const test = {
      name: testCase.name,
      input: testCase.input,
      actual: {
        total: result.totals.total,
        basePriceTotal: result.breakdown.basePriceFor2Total,
        additionalPersons: result.breakdown.additionalPersons,
        additionalCost: result.breakdown.additionalPersonsTotal,
        savings: result.savings.totalSavings,
        seasonalAdjustment: result.breakdown.seasonalAdjustment
      },
      expected: testCase.expected,
      passed: true,
      errors: []
    };
    
    // Check each expected value
    Object.keys(testCase.expected).forEach(key => {
      const expected = testCase.expected[key];
      const actual = test.actual[key];
      
      if (Math.abs(actual - expected) > 0.01) { // Allow for small floating point differences
        test.passed = false;
        test.errors.push(`${key}: expected ${expected}, got ${actual}`);
      }
    });
    
    return test;
  });
  
  // Print results
  results.forEach(test => {
    const status = test.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${test.name}`);
    
    if (!test.passed) {
      console.log('   Errors:', test.errors);
      console.log('   Input:', test.input);
      console.log('   Expected:', test.expected);
      console.log('   Actual:', test.actual);
    }
    
    console.log(`   Total: $${test.actual.total} (${test.input.persons} persons, ${test.input.nights} nights, ${test.input.season})`);
    
    if (test.actual.savings > 0) {
      console.log(`   💰 Savings: $${test.actual.savings}`);
    }
    
    console.log('');
  });
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log(`📊 Test Results: ${passedCount}/${totalCount} passed`);
  
  if (passedCount === totalCount) {
    console.log('🎉 All tests passed! Pricing calculations are working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the pricing configuration.');
  }
  
  return results;
};

/**
 * Test a specific pricing scenario
 */
export const testPricingScenario = (persons, nights, season = 'standard') => {
  const result = calculatePricing(persons, nights, season);
  
  console.log(`💰 Pricing for ${persons} persons, ${nights} nights, ${season} season:`);
  console.log('');
  console.log('📋 Breakdown:');
  console.log(`   Base Package (2 persons): $${result.breakdown.basePriceFor2Total}`);
  
  if (result.breakdown.additionalPersons > 0) {
    console.log(`   Additional Persons (${result.breakdown.additionalPersons}): $${result.breakdown.additionalPersonsTotal}`);
    console.log(`   💸 Savings: $${result.savings.totalSavings} ($25 x ${result.breakdown.additionalPersons} x ${nights})`);
  }
  
  if (result.breakdown.seasonalAdjustment > 0) {
    console.log(`   🌟 Seasonal Adjustment: $${result.breakdown.seasonalAdjustment.toFixed(2)}`);
  }
  
  console.log('');
  console.log('💵 Totals:');
  console.log(`   Total: $${result.totals.total}`);
  console.log(`   Per Person: $${result.totals.perPerson}`);
  console.log(`   Per Night: $${result.totals.perNight}`);
  
  return result;
};

/**
 * Generate pricing table for documentation
 */
export const generatePricingTable = () => {
  console.log('📊 Pricing Table (Standard Season, 1 Night):');
  console.log('');
  console.log('Persons | Total Price | Per Person | Savings');
  console.log('--------|-------------|------------|--------');
  
  for (let persons = 2; persons <= 10; persons++) {
    const result = calculatePricing(persons, 1, 'standard');
    const savings = result.savings.totalSavings > 0 ? `$${result.savings.totalSavings}` : '-';
    
    console.log(`${persons.toString().padEnd(7)} | $${result.totals.total.toString().padEnd(10)} | $${result.totals.perPerson.toString().padEnd(9)} | ${savings}`);
  }
  
  console.log('');
  console.log('📊 Pricing Table (Peak Season, 1 Night):');
  console.log('');
  console.log('Persons | Total Price | Per Person | Savings');
  console.log('--------|-------------|------------|--------');
  
  for (let persons = 2; persons <= 10; persons++) {
    const result = calculatePricing(persons, 1, 'peak');
    const savings = result.savings.totalSavings > 0 ? `$${result.savings.totalSavings}` : '-';
    
    console.log(`${persons.toString().padEnd(7)} | $${result.totals.total.toString().padEnd(10)} | $${result.totals.perPerson.toString().padEnd(9)} | ${savings}`);
  }
};

/**
 * Quick pricing summary for specific scenarios
 */
export const getQuickPricingSummary = () => {
  return {
    basePackage: {
      persons: 2,
      nights: 1,
      price: calculatePricing(2, 1).totals.total,
      description: "Base package for 2 persons"
    },
    additionalPerson: {
      formula: "Base person price - discount",
      calculation: `($${PRICING_CONFIG.pricingRules.additionalPersonFormula.basePersonPrice} - $${PRICING_CONFIG.pricingRules.additionalPersonFormula.discount})`,
      result: PRICING_CONFIG.pricingRules.additionalPersonFormula.finalAdditionalPersonPrice,
      description: "Cost per additional person per night"
    },
    savings: {
      perAdditionalPerson: PRICING_CONFIG.pricingRules.additionalPersonFormula.discount,
      description: "Savings per additional person per night"
    },
    seasonalRates: {
      standard: "May-November (1.0x multiplier)",
      peak: "December-April (1.2x multiplier)",
      description: "Seasonal pricing adjustments"
    }
  };
};

// Export for easy testing in console
if (typeof window !== 'undefined') {
  window.pricingTests = {
    runPricingTests,
    testPricingScenario,
    generatePricingTable,
    getQuickPricingSummary
  };
}

export default {
  runPricingTests,
  testPricingScenario,
  generatePricingTable,
  getQuickPricingSummary,
  PRICING_TEST_CASES
};