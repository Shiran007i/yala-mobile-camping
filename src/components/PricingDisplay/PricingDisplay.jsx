// src/components/PricingDisplay/PricingDisplay.jsx
/**
 * Reusable Pricing Display Component
 * Shows dynamic pricing with breakdown, savings, and seasonal information
 */

import React from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingDown, 
  Calendar, 
  Info,
  Star 
} from 'lucide-react';
import { calculatePricing, formatPrice, getSeason } from '../../data/pricingConfig';

const PricingDisplay = ({ 
  persons = 2, 
  nights = 1, 
  checkInDate = new Date(),
  showBreakdown = true,
  showSavings = true,
  showSeasonalInfo = true,
  compact = false,
  className = ""
}) => {
  // Calculate pricing data
  const season = getSeason(checkInDate);
  const pricingData = calculatePricing(persons, nights, season);

  if (compact) {
    return (
      <div className={`bg-emerald-50 border border-emerald-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              ${pricingData.totals.total}
            </div>
            <div className="text-sm text-emerald-700">
              {persons} {persons === 1 ? 'person' : 'persons'} • {nights} {nights === 1 ? 'night' : 'nights'}
            </div>
            {pricingData.savings.totalSavings > 0 && showSavings && (
              <div className="text-xs text-green-600 font-medium">
                Save ${pricingData.savings.totalSavings}!
              </div>
            )}
          </div>
          <div className="text-right">
            <Users className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">
              ${pricingData.totals.perPerson}/person
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-emerald-50 border border-emerald-200 rounded-lg p-6 ${className}`}>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
        Price Breakdown
      </h4>
      
      <div className="space-y-3">
        {showBreakdown && (
          <>
            {/* Base Package */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Base Package (2 persons)</span>
                <span className="text-xs text-gray-600">
                  ${pricingData.breakdown.basePriceFor2} × {nights} {nights === 1 ? 'night' : 'nights'}
                </span>
              </div>
              <span className="font-medium">
                ${pricingData.breakdown.basePriceFor2Total}
              </span>
            </div>

            {/* Additional Persons */}
            {pricingData.breakdown.additionalPersons > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Additional Persons ({pricingData.breakdown.additionalPersons})
                  </span>
                  <span className="text-xs text-gray-600">
                    ${pricingData.breakdown.additionalPersonPrice} × {pricingData.breakdown.additionalPersons} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>
                <span className="font-medium">
                  ${pricingData.breakdown.additionalPersonsTotal}
                </span>
              </div>
            )}

            {/* Savings Display */}
            {pricingData.savings.totalSavings > 0 && showSavings && (
              <div className="flex justify-between items-center text-green-700 bg-green-100 p-2 rounded">
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">You Save!</span>
                    <span className="text-xs">($25 discount per additional person)</span>
                  </div>
                </div>
                <span className="font-semibold">
                  -${pricingData.savings.totalSavings}
                </span>
              </div>
            )}

            {/* Seasonal Adjustment */}
            {pricingData.breakdown.seasonalAdjustment > 0 && showSeasonalInfo && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                  <span className="text-sm">
                    Seasonal Rate ({season === 'peak' ? 'Peak Season' : 'Standard Season'})
                  </span>
                </div>
                <span className="font-medium">
                  +${pricingData.breakdown.seasonalAdjustment.toFixed(2)}
                </span>
              </div>
            )}

            {/* Service Fees */}
            <div className="flex justify-between text-gray-600">
              <span className="text-sm">Service fee</span>
              <span>$0</span>
            </div>
          </>
        )}

        {/* Total */}
        <div className="border-t border-emerald-200 pt-3 mt-3">
          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-emerald-600">
              ${pricingData.totals.total}
            </span>
          </div>
          
          {/* Per person breakdown */}
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Per person</span>
            <span>${pricingData.totals.perPerson}</span>
          </div>
          
          {nights > 1 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Per night</span>
              <span>${pricingData.totals.perNight}</span>
            </div>
          )}
        </div>
      </div>

      {/* Season Information */}
      {showSeasonalInfo && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Info className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">
              {season === 'peak' ? 'Peak Season' : 'Standard Season'} 
              {season === 'peak' && ' (20% seasonal rate)'}
            </span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            {season === 'peak' 
              ? 'Dec-Apr: Best wildlife viewing, higher rates'
              : 'May-Nov: Great weather, standard rates'
            }
          </p>
        </div>
      )}
    </div>
  );
};

// Pricing comparison component for multiple group sizes
export const PricingComparison = ({ nights = 1, checkInDate = new Date(), className = "" }) => {
  const season = getSeason(checkInDate);
  const groupSizes = [2, 4, 6, 8];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2 text-blue-600" />
        Group Size Pricing
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {groupSizes.map(persons => {
          const pricing = calculatePricing(persons, nights, season);
          const isBase = persons === 2;
          
          return (
            <div 
              key={persons} 
              className={`p-4 rounded-lg border-2 ${
                isBase 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {isBase && (
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-4 w-4 text-emerald-600 mr-1" />
                  <span className="text-xs font-medium text-emerald-700">BASE</span>
                </div>
              )}
              
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {persons} {persons === 1 ? 'Person' : 'Persons'}
                </div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">
                  ${pricing.totals.total}
                </div>
                <div className="text-sm text-gray-600">
                  ${pricing.totals.perPerson}/person
                </div>
                
                {pricing.savings.totalSavings > 0 && (
                  <div className="mt-2 text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                    Save ${pricing.savings.totalSavings}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Additional persons: $450/night each (save $25!)
        </p>
        <p className="text-xs text-gray-500 mt-1">
          All prices include accommodation, meals, safari, and guides
        </p>
      </div>
    </div>
  );
};

// Simple pricing card for location listings
export const PricingCard = ({ 
  basePrice = 950, 
  additionalPersonPrice = 450, 
  maxGuests = 10,
  className = "" 
}) => {
  return (
    <div className={`bg-emerald-50 border border-emerald-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-emerald-600">
            ${basePrice}
          </div>
          <div className="text-sm text-emerald-700 font-medium">
            Complete package for 2 persons
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Additional person: ${additionalPersonPrice}/night
          </div>
          <div className="text-xs text-green-600 font-medium">
            Save $25 per additional person!
          </div>
        </div>
        <div className="text-right">
          <Users className="h-8 w-8 text-emerald-600 mx-auto mb-1" />
          <span className="text-xs text-gray-600">Up to {maxGuests}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;