'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiStar } from 'react-icons/fi';
import { THEME } from '@/styles/theme';

// Types
import type { BillingCycle, PlanId } from '@/types/subscription';

// Components
import {
  PricingCard,
  BillingToggle,
  ComparisonTable,
  PaymentSection,
  FAQSection,
} from '@/components/subscription';

// Constants
import { PRICING_PLANS, FAQ_DATA, COMPARISON_FEATURES } from '@/constants/subscription';

// Hooks
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SubscriptionPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('');
  const [mounted, setMounted] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Custom hooks for animations
  useScrollAnimation([heroRef, pricingRef, comparisonRef, faqRef]);

  // Mount effect for initial animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized plans with dynamic pricing
  const plans = useMemo(() => 
    PRICING_PLANS.map(plan => ({
      ...plan,
      price: plan.id === 'free' 
        ? plan.basePrice 
        : billingCycle === 'monthly' 
          ? plan.monthlyPrice 
          : plan.yearlyPrice,
      period: plan.id === 'free' 
        ? 'Forever' 
        : billingCycle === 'monthly' 
          ? 'per month' 
          : 'per year',
    })),
    [billingCycle]
  );

  // Memoized selected plan details
  const selectedPlanDetails = useMemo(
    () => plans.find(p => p.id === selectedPlan),
    [plans, selectedPlan]
  );

  // Callbacks to prevent unnecessary re-renders
  const handleBillingToggle = useCallback(() => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  }, []);

  const handleSelectPlan = useCallback((planId: PlanId) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      router.push('/profile');
    } else {
      setTimeout(() => {
        const paymentSection = document.getElementById('payment-section');
        paymentSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [router]);

  return (
    <div className={`min-h-screen ${THEME.colors.background.page} relative overflow-hidden`}>
      {/* Animated Background Particles */}
      <div className="particles-bg pointer-events-none">
        <div className="particle bg-primary/5" style={{ width: '300px', height: '300px', top: '10%', left: '5%', animationDelay: '0s' }} />
        <div className="particle bg-secondary/5" style={{ width: '200px', height: '200px', top: '60%', right: '10%', animationDelay: '2s' }} />
        <div className="particle bg-purple-200/10" style={{ width: '150px', height: '150px', bottom: '20%', left: '15%', animationDelay: '4s' }} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="text-center mb-12 scroll-fade-in" 
          aria-labelledby="pricing-title"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm animate-float">
            <FiStar size={16} aria-hidden="true" className="text-yellow-400 fill-current" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Upgrade Your Career Journey</span>
          </div>
          <h1 
            id="pricing-title" 
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-700 ${mounted ? 'animate-blur-in' : 'opacity-0'}`}
          >
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect Plan</span>
          </h1>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
            Unlock premium features and stand out to recruiters with our professional plans
          </p>
        </section>

        {/* Billing Toggle */}
        <div className={`transition-all duration-700 delay-200 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
          <BillingToggle
            billingCycle={billingCycle}
            onToggle={handleBillingToggle}
          />
        </div>

        {/* Pricing Cards with Stagger Animation */}
        <section 
          ref={pricingRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-fade-in"
          aria-label="Pricing plans"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`animate-stagger-${index + 1} h-full`}
            >
              <PricingCard
                plan={plan}
                billingCycle={billingCycle}
                onSelect={handleSelectPlan}
              />
            </div>
          ))}
        </section>

        {/* Features Comparison */}
        <div ref={comparisonRef} className="scroll-fade-in">
          <ComparisonTable features={COMPARISON_FEATURES} />
        </div>

        {/* Payment Section */}
        {selectedPlan && selectedPlan !== 'free' && selectedPlanDetails && (
          <div className="animate-scaleIn">
            <PaymentSection 
              plan={selectedPlanDetails}
              billingCycle={billingCycle}
            />
          </div>
        )}

        {/* FAQ Section */}
        <div ref={faqRef} className="scroll-fade-in">
          <FAQSection faqs={FAQ_DATA} />
        </div>
      </main>
    </div>
  );
}
