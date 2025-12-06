import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate savings percentage
 */
export function calculateSavingsPercentage(monthlyPrice: number, yearlyPrice: number): number {
  const annualMonthlyPrice = monthlyPrice * 12;
  const savings = ((annualMonthlyPrice - yearlyPrice) / annualMonthlyPrice) * 100;
  return Math.round(savings);
}

/**
 * Scroll to element with offset
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
