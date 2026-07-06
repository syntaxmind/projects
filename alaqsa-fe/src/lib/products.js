export function formatPrice(amount, currencyCode = "eur") {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100);
}

export function getVariantPrice(variant) {
  const price = variant?.calculated_price;
  if (!price) return null;
  return {
    amount: price.calculated_amount,
    currency: price.currency_code || "eur",
    formatted: formatPrice(price.calculated_amount, price.currency_code || "eur"),
  };
}

export function getProductPrice(product) {
  const variant = product?.variants?.[0];
  return getVariantPrice(variant);
}

export function getProductImage(product) {
  return product?.thumbnail || product?.images?.[0]?.url || null;
}
