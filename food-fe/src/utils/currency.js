const currencyConfig = {
  India: { symbol: "₹", rate: 1 },
  America: { symbol: "$", rate: 1 / 85 }
};

export function formatPrice(priceInINR, userCountry) {
  const config = currencyConfig[userCountry] ?? currencyConfig.India;
  const converted = priceInINR * config.rate;

  const displayPrice = userCountry === "India"
    ? Math.round(converted)
    : converted.toFixed(2);

  return `${config.symbol} ${displayPrice}`;
}
