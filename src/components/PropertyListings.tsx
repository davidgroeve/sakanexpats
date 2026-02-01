'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface Property {
  id: number;
  title: string;
  price: number;
  sqm: number;
  city: string;
  district: string;
  type: 'residential' | 'investment' | 'neom';
  expatFriendly: boolean;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
}

export default function PropertyListings() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [filters, setFilters] = useState({
    propertyType: '',
    city: '',
    priceRange: ''
  });

  const mockProperties: Property[] = [
    {
      id: 1,
      title: "Luxury Villa in Riyadh Diplomatic Quarter",
      price: 2500000,
      sqm: 450,
      city: "Riyadh",
      district: "Diplomatic Quarter",
      type: "residential",
      expatFriendly: true,
      image: "/api/placeholder/400/300",
      bedrooms: 5,
      bathrooms: 4
    },
    {
      id: 2,
      title: "Modern Apartment in Jeddah Corniche",
      price: 850000,
      sqm: 180,
      city: "Jeddah",
      district: "Corniche",
      type: "residential",
      expatFriendly: true,
      image: "/api/placeholder/400/300",
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 3,
      title: "Commercial Space in Dammam",
      price: 1200000,
      sqm: 320,
      city: "Dammam",
      district: "Business District",
      type: "investment",
      expatFriendly: true,
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "NEOM Waterfront Villa",
      price: 4500000,
      sqm: 650,
      city: "NEOM",
      district: "Oxagon",
      type: "neom",
      expatFriendly: true,
      image: "/api/placeholder/400/300",
      bedrooms: 6,
      bathrooms: 5
    },
    {
      id: 5,
      title: "Family Home in Riyadh",
      price: 1800000,
      sqm: 380,
      city: "Riyadh",
      district: "Al-Malaz",
      type: "residential",
      expatFriendly: true,
      image: "/api/placeholder/400/300",
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 6,
      title: "Investment Property in Jeddah",
      price: 950000,
      sqm: 210,
      city: "Jeddah",
      district: "Al-Rawdah",
      type: "investment",
      expatFriendly: false,
      image: "/api/placeholder/400/300"
    }
  ];

  const filteredProperties = mockProperties.filter(property => {
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    if (filters.city && property.city !== filters.city) return false;
    return true;
  });

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.properties.title}
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.properties.filters.propertyType}
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{t.properties.filters.propertyType}</option>
                <option value="residential">{t.properties.filters.residential}</option>
                <option value="investment">{t.properties.filters.investment}</option>
                <option value="neom">{t.properties.filters.neom}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.properties.filters.city}
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{t.properties.filters.city}</option>
                <option value="Riyadh">{t.properties.filters.riyadh}</option>
                <option value="Jeddah">{t.properties.filters.jeddah}</option>
                <option value="Dammam">{t.properties.filters.dammam}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.properties.filters.priceRange}
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Price</option>
                <option value="0-1000000">Under 1M SAR</option>
                <option value="1000000-3000000">1M - 3M SAR</option>
                <option value="3000000+">Above 3M SAR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Property Image</span>
                </div>
                {property.expatFriendly && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t.properties.expatFriendly}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {property.price.toLocaleString('en-US')} SAR
                  </div>
                  <div className="text-sm text-gray-600">
                    {property.sqm} {t.properties.sqm}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.city}, {property.district}
                </div>

                {property.bedrooms && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7h8m0 0v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m8 0H8" />
                      </svg>
                      {property.bathrooms} Baths
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    {t.properties.savings}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}