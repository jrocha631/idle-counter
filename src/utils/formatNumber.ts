export function formatNumber(n: number): string {
  const abs = Math.abs(n)
  if (abs >= 1_000_000) {
    // Compact notation for very large numbers (e.g., 1.2M)
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
  }
  // Use group separators for readability for numbers below 1M
  return new Intl.NumberFormat('en-US').format(n)
}

