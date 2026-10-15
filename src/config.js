// Store-wide settings shown in several places on the site. Change them here only.
export const FREE_SHIPPING_THRESHOLD = 1999;
export const FREE_SHIPPING_LABEL = `₹${FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}`;

// Promo codes accepted in the bag and on the cart page, as a fraction off the subtotal.
export const PROMO_CODES = { NEW5: 0.05, COMFORT5: 0.05 };

export const formatPrice = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;
