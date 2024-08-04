export function formatAsPrice(number) {
    const formatter = new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
}