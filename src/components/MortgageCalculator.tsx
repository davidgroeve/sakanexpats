'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface BankRates {
  bank: string;
  rate: number;
  logo: string;
}

export default function MortgageCalculator() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  const [formData, setFormData] = useState({
    propertyValue: '',
    downPayment: '',
    loanTerm: '20'
  });

  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalAmount: number;
    selectedBank: BankRates | null;
  } | null>(null);

  const saudiBanks: BankRates[] = [
    { bank: 'Al Rajhi Bank', rate: 3.75, logo: '🏦' },
    { bank: 'Saudi National Bank (SNB)', rate: 3.85, logo: '🏛️' },
    { bank: 'Riyadh Bank', rate: 3.95, logo: '💰' },
    { bank: 'SABB', rate: 4.10, logo: '🏧' },
    { bank: 'Alinma Bank', rate: 4.25, logo: '🏤' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMortgage = () => {
    const propertyValue = parseFloat(formData.propertyValue);
    const downPayment = parseFloat(formData.downPayment);
    const loanTerm = parseFloat(formData.loanTerm);
    
    if (!propertyValue || !downPayment || !loanTerm) return;
    
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = saudiBanks[0].rate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = monthlyPayment * numberOfPayments;
    
    setResults({
      monthlyPayment,
      totalAmount,
      selectedBank: saudiBanks[0]
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="finance" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.finance.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.finance.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Mortgage Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.finance.propertyValue}
                </label>
                <input
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 1500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.finance.downPayment}
                </label>
                <input
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 300000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.finance.loanTerm}
                </label>
                <select
                  value={formData.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="25">25 Years</option>
                </select>
              </div>

              <button
                onClick={calculateMortgage}
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {t.finance.calculate}
              </button>
            </div>

            {/* Results */}
            {results && (
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Your Monthly Payment</h4>
                <div className="text-3xl font-bold text-primary mb-4">
                  {formatCurrency(results.monthlyPayment)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t.finance.totalAmount}:</span>
                    <span className="font-semibold">{formatCurrency(results.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.finance.interestRate}:</span>
                    <span className="font-semibold">{results.selectedBank?.rate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">
                      {formatCurrency(parseFloat(formData.propertyValue) - parseFloat(formData.downPayment))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bank Rates Comparison */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Current Saudi Bank Rates</h3>
            <div className="space-y-4">
              {saudiBanks.map((bank, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{bank.logo}</div>
                      <div>
                        <h4 className="text-lg font-semibold">{bank.bank}</h4>
                        <p className="text-sm text-gray-600">Home financing available</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{bank.rate}%</div>
                      <div className="text-sm text-gray-600">Annual Rate</div>
                    </div>
                  </div>
                  
                  {index === 0 && results && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">
                          ✓ Best rate for your calculation
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Saudi Mortgage Requirements
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Minimum 30% down payment for expats</li>
                <li>• Maximum loan term of 25 years</li>
                <li>• Property must be completed and registered</li>
                <li>• Valid Iqama and employment contract required</li>
                <li>• Minimum salary requirements apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}