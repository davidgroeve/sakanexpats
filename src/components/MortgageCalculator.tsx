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
    { bank: t.banks.alrajhi, rate: 3.75, logo: '🏦' },
    { bank: t.banks.snb, rate: 3.85, logo: '🏛️' },
    { bank: t.banks.riyadh, rate: 3.95, logo: '💰' },
    { bank: t.banks.sabb, rate: 4.10, logo: '🏧' },
    { bank: t.banks.alinma, rate: 4.25, logo: '🏤' }
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
    <section id="finance" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            {t.finance.title}
          </h2>
          <p className="text-xl text-muted-foreground/80 font-medium max-w-2xl mx-auto">
            {t.finance.subtitle}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Calculator Form */}
          <div className="card-luxury p-10 bg-white">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
              {t.finance.calculate}
            </h3>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/70 ml-1">
                  {t.finance.propertyValue}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                    className="w-full px-5 py-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-lg"
                    placeholder="1,500,000"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">SAR</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/70 ml-1">
                  {t.finance.downPayment}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    className="w-full px-5 py-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-lg"
                    placeholder="300,000"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">SAR</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/70 ml-1">
                  {t.finance.loanTerm}
                </label>
                <select
                  value={formData.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                  className="w-full px-5 py-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-lg appearance-none cursor-pointer"
                >
                  <option value="10">10 {t.finance.years}</option>
                  <option value="15">15 {t.finance.years}</option>
                  <option value="20">20 {t.finance.years}</option>
                  <option value="25">25 {t.finance.years}</option>
                </select>
              </div>

              <button
                onClick={calculateMortgage}
                className="w-full px-8 py-4 pomegranate-gradient text-white text-lg font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-primary/30"
              >
                {t.finance.calculate}
              </button>
            </div>

            {/* Results */}
            {results && (
              <div className="mt-10 p-8 pomegranate-gradient text-white rounded-2xl shadow-2xl shadow-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-4">{t.finance.monthlyPaymentLabel}</h4>
                <div className="text-5xl font-extrabold mb-8 flex items-baseline">
                  {results.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  <span className="text-xl font-bold ml-2">SAR</span>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                  <div>
                    <div className="text-white/60 text-xs font-bold uppercase mb-1">{t.finance.totalAmount}</div>
                    <div className="text-lg font-bold">{formatCurrency(results.totalAmount)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs font-bold uppercase mb-1">{t.finance.interestRate}</div>
                    <div className="text-lg font-bold">{results.selectedBank?.rate}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bank Rates Comparison */}
          <div>
            <h3 className="text-2xl font-bold mb-8">{t.finance.bankRatesTitle}</h3>
            <div className="space-y-4">
              {saudiBanks.map((bank, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-primary/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                      <div className="text-4xl bg-muted/30 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-primary/5 transition-colors">{bank.logo}</div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{bank.bank}</h4>
                        <p className="text-sm text-muted-foreground font-medium">{t.finance.available}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-primary">{bank.rate}%</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.finance.annualRate}</div>
                    </div>
                  </div>

                  {index === 0 && results && (
                    <div className="mt-4 pt-4 border-t border-border animate-in fade-in duration-500">
                      <div className="bg-primary/5 px-4 py-2 rounded-full inline-flex items-center">
                        <div className="text-sm text-primary font-bold flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          {t.finance.bestRate}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-10 bg-foreground text-white rounded-3xl shadow-2xl shadow-black/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-6 relative z-10">
                {t.finance.requirementsTitle}
              </h4>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1 underline-offset-4 decoration-primary text-primary font-bold text-xs">1</span>
                  <span className="text-white/90 font-medium">{t.finance.requirement1}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1 text-primary font-bold text-xs">2</span>
                  <span className="text-white/90 font-medium">{t.finance.requirement2}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1 text-primary font-bold text-xs">3</span>
                  <span className="text-white/90 font-medium">{t.finance.requirement3}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1 text-primary font-bold text-xs">4</span>
                  <span className="text-white/90 font-medium">{t.finance.requirement4}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-1 text-primary font-bold text-xs">5</span>
                  <span className="text-white/90 font-medium">{t.finance.requirement5}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}