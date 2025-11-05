export function formatINR(amount) {
  if (amount === null || amount === undefined || amount === '') return '';
  // Ensure it's a number
  const num = Number(amount);
  if (Number.isNaN(num)) return amount;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);
}
