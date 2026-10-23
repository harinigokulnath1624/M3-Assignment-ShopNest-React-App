export const formatINR = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

export const getDiscountPercent = (product) =>
  Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
