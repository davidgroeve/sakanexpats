'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface SavedProperty {
  id: number;
  title: string;
  price: number;
  city: string;
  sqm: number;
  image: string;
  savedDate: string;
}

interface UserListing {
  id: number;
  title: string;
  price: number;
  views: number;
  inquiries: number;
  status: 'active' | 'pending' | 'sold';
  postedDate: string;
}

export default function UserDashboard() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [activeTab, setActiveTab] = useState<'saved' | 'listings' | 'profile'>('saved');

  const mockSavedProperties: SavedProperty[] = [
    {
      id: 1,
      title: t.items.villaRiyadh,
      price: 2500000,
      city: t.properties.filters.riyadh,
      sqm: 450,
      image: "/images/property_riyadh_villa.png",
      savedDate: "2024-01-15"
    },
    {
      id: 2,
      title: t.items.apartmentJeddah,
      price: 850000,
      city: t.properties.filters.jeddah,
      sqm: 180,
      image: "/images/property_jeddah_apartment.png",
      savedDate: "2024-01-10"
    }
  ];

  const mockListings: UserListing[] = [
    {
      id: 1,
      title: t.items.familyMalaz,
      price: 1800000,
      views: 145,
      inquiries: 12,
      status: 'active',
      postedDate: "2024-01-05"
    },
    {
      id: 2,
      title: t.items.commercialDammam,
      price: 1200000,
      views: 89,
      inquiries: 5,
      status: 'active',
      postedDate: "2024-01-08"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      sold: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <section id="dashboard" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            {t.dashboard.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="pomegranate-gradient text-white p-8 rounded-3xl shadow-xl shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl font-extrabold mb-2">{mockSavedProperties.length}</div>
            <div className="text-white/80 font-bold uppercase tracking-wider text-xs">{t.dashboard.savedProperties}</div>
          </div>

          <div className="bg-foreground text-white p-8 rounded-3xl shadow-xl shadow-black/10 transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl font-extrabold mb-2">{mockListings.length}</div>
            <div className="text-white/80 font-bold uppercase tracking-wider text-xs">{t.dashboard.myListings}</div>
          </div>

          <div className="bg-white border border-primary/10 p-8 rounded-3xl shadow-lg shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl font-extrabold text-primary mb-2">
              {mockListings.reduce((sum, listing) => sum + listing.views, 0)}
            </div>
            <div className="text-muted-foreground font-bold uppercase tracking-wider text-xs">{t.dashboard.totalViews}</div>
          </div>

          <div className="bg-white border border-primary/10 p-8 rounded-3xl shadow-lg shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-4xl font-extrabold text-primary mb-2">
              {mockListings.reduce((sum, listing) => sum + listing.inquiries, 0)}
            </div>
            <div className="text-muted-foreground font-bold uppercase tracking-wider text-xs">{t.dashboard.totalInquiries}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-12">
          <nav className="-mb-px flex space-x-12">
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-2 border-b-4 font-bold text-sm transition-all duration-300 ${activeTab === 'saved'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {t.dashboard.savedProperties}
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-2 border-b-4 font-bold text-sm transition-all duration-300 ${activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {t.dashboard.myListings}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-4 font-bold text-sm transition-all duration-300 ${activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {t.dashboard.profile}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-screen">
          {activeTab === 'saved' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">{t.dashboard.savedProperties}</h3>
              {mockSavedProperties.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-gray-500 mb-4">{t.dashboard.noSaved}</p>
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    {t.dashboard.browse}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mockSavedProperties.map((property) => (
                    <div key={property.id} className="card-luxury group overflow-hidden">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8">
                        <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{property.title}</h4>
                        <div className="text-xl font-extrabold text-primary mb-4">
                          {formatCurrency(property.price)}
                        </div>
                        <div className="flex items-center text-sm font-medium text-muted-foreground mb-6">
                          <svg className="w-5 h-5 mr-2 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {property.city} • <span className="ml-1 uppercase">{property.sqm} {t.properties.sqm}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button className="w-full px-5 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20">
                            {t.dashboard.contact}
                          </button>
                          <button className="w-full px-5 py-3 border-2 border-primary/10 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300">
                            {t.dashboard.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">{t.dashboard.myListings}</h3>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                  {t.dashboard.addNew}
                </button>
              </div>

              {mockListings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-gray-500 mb-4">{t.dashboard.noListings}</p>
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    {t.dashboard.createFirst}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockListings.map((listing) => (
                    <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold">{listing.title}</h4>
                            {getStatusBadge(listing.status)}
                          </div>
                          <div className="text-xl font-bold text-primary mb-2">
                            {formatCurrency(listing.price)}
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {listing.views} {t.dashboard.views}
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {listing.inquiries} {t.dashboard.inquiries}
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {t.dashboard.posted} {new Date(listing.postedDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                            {t.dashboard.edit}
                          </button>
                          <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            {t.dashboard.analytics}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">{t.dashboard.profile}</h3>
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="max-w-2xl">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <div className="ml-6">
                      <h4 className="text-xl font-semibold">John Doe</h4>
                      <p className="text-gray-600">john.doe@example.com</p>
                      <p className="text-sm text-gray-500">{t.dashboard.memberSince} January 2024</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.dashboard.fullName}</label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.dashboard.email}</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.dashboard.phone}</label>
                      <input
                        type="tel"
                        defaultValue="+966 50 123 4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.dashboard.iqama}</label>
                      <input
                        type="text"
                        defaultValue="2xxxxxxx"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.dashboard.bio}</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t.dashboard.bioPlaceholder}
                    ></textarea>
                  </div>

                  <div className="mt-8 flex space-x-4">
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      {t.dashboard.saveChanges}
                    </button>
                    <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      {t.dashboard.cancel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}