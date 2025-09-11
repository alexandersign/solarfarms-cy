import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function calculateROI(
  investment: number,
  annualRevenue: number,
  annualCosts: number = 0
): {
  roi: number
  paybackYears: number
  annualProfit: number
} {
  const annualProfit = annualRevenue - annualCosts
  const roi = (annualProfit / investment) * 100
  const paybackYears = investment / annualProfit
  
  return {
    roi,
    paybackYears,
    annualProfit,
  }
}

export function calculateNPV(
  initialInvestment: number,
  annualCashFlow: number,
  discountRate: number = 0.08,
  years: number = 25
): number {
  let npv = -initialInvestment
  
  for (let year = 1; year <= years; year++) {
    npv += annualCashFlow / Math.pow(1 + discountRate, year)
  }
  
  return npv
}

export function formatCompactNumber(num: number): string {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  })
  
  return formatter.format(num)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function generateSEOTitle(
  title: string,
  siteName: string = "SolarFarms.cy"
): string {
  return `${title} | ${siteName}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}
