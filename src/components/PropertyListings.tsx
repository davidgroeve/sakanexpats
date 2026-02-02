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
      title: t.items.villaRiyadh,
      price: 2500000,
      sqm: 450,
      city: t.properties.filters.riyadh,
      district: t.items.districts.diplomatic,
      type: "residential",
      expatFriendly: true,
      image: "/images/property_riyadh_villa.png",
      bedrooms: 5,
      bathrooms: 4
    },
    {
      id: 2,
      title: t.items.apartmentJeddah,
      price: 850000,
      sqm: 180,
      city: t.properties.filters.jeddah,
      district: t.items.districts.corniche,
      type: "residential",
      expatFriendly: true,
      image: "/images/property_jeddah_apartment.png",
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 3,
      title: t.items.commercialDammam,
      price: 1200000,
      sqm: 320,
      city: t.properties.filters.dammam,
      district: t.items.districts.business,
      type: "investment",
      expatFriendly: true,
      image: "/images/property_dammam_commercial.png"
    },
    {
      id: 4,
      title: t.items.villaNeom,
      price: 4500000,
      sqm: 650,
      city: "NEOM",
      district: t.items.districts.oxagon,
      type: "neom",
      expatFriendly: true,
      image: "/images/property_neom_villa.png",
      bedrooms: 6,
      bathrooms: 5
    },
    {
      id: 5,
      title: t.items.familyRiyadh,
      price: 1800000,
      sqm: 380,
      city: t.properties.filters.riyadh,
      district: t.items.districts.alMalaz,
      type: "residential",
      expatFriendly: true,
      image: "/images/property_riyadh_family.png",
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 6,
      title: t.items.investmentJeddah,
      price: 950000,
      sqm: 210,
      city: t.properties.filters.jeddah,
      district: t.items.districts.alRawdah,
      type: "investment",
      expatFriendly: false,
      image: "/images/property_jeddah_investment.png"
    }
  ];

  const filteredProperties = mockProperties.filter(property => {
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    // Special handling for cities since they are now localized strings in the filter
    if (filters.city) {
      const cityMatch =
        (filters.city === 'Riyadh' && property.city === t.properties.filters.riyadh) ||
        (filters.city === 'Jeddah' && property.city === t.properties.filters.jeddah) ||
        (filters.city === 'Dammam' && property.city === t.properties.filters.dammam) ||
        (filters.city === 'NEOM' && property.city === "NEOM");
      if (!cityMatch) return false;
    }
    return true;
  });

  return (
    <section id="properties" className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            {t.properties.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Filters */}
        <div className="mb-16 glass-morphism p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/70 ml-1">
                {t.properties.filters.propertyType}
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="">{t.properties.filters.propertyType}</option>
                <option value="residential">{t.properties.filters.residential}</option>
                <option value="investment">{t.properties.filters.investment}</option>
                <option value="neom">{t.properties.filters.neom}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/70 ml-1">
                {t.properties.filters.city}
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="">{t.properties.filters.city}</option>
                <option value="Riyadh">{t.properties.filters.riyadh}</option>
                <option value="Jeddah">{t.properties.filters.jeddah}</option>
                <option value="Dammam">{t.properties.filters.dammam}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/70 ml-1">
                {t.properties.filters.priceRange}
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="">{t.properties.anyPrice}</option>
                <option value="0-1000000">{t.properties.under1M}</option>
                <option value="1000000-3000000">{t.properties.oneToThreeM}</option>
                <option value="3000000+">{t.properties.above3M}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <div key={property.id} className="card-luxury group overflow-hidden">
              <div className="relative overflow-hidden h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {property.expatFriendly && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-primary/30">
                    {t.properties.expatFriendly}
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-extrabold text-primary">
                    {property.price.toLocaleString('en-US')} <span className="text-sm font-bold">SAR</span>
                  </div>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    {property.sqm} {t.properties.sqm}
                  </div>
                </div>

                <div className="flex items-center text-sm font-medium text-muted-foreground mb-6">
                  <svg className="w-5 h-5 mr-2 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.city}, {property.district}
                </div>

                {property.bedrooms && (
                  <div className="flex items-center justify-between text-sm font-bold text-muted-foreground bg-muted/50 p-3 rounded-xl mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} {t.properties.beds}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7h8m0 0v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m8 0H8" />
                      </svg>
                      {property.bathrooms} {t.properties.baths}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-5 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20">
                    {t.properties.viewDetails}
                  </button>
                  <button className="flex-1 px-5 py-3 border-2 border-primary/10 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300">
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