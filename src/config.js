// Store-wide settings shown in several places on the site. Change them here only.
export const FREE_SHIPPING_THRESHOLD = 1999;
export const FREE_SHIPPING_LABEL = `₹${FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}`;

// Promo codes accepted in the bag and on the cart page, as a fraction off the subtotal.
export const PROMO_CODES = { NEW5: 0.05, COMFORT5: 0.05 };

export const formatPrice = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

// Customer support. Put the WhatsApp / phone number in international format
// without "+" or spaces (e.g. '919876543210'); until then, "Contact support"
// opens an email instead.
export const SUPPORT_EMAIL = 'info@medifeetcare.com';
export const SUPPORT_PHONE = '';
export const supportLink = () =>
  SUPPORT_PHONE ? `https://wa.me/${SUPPORT_PHONE}` : `mailto:${SUPPORT_EMAIL}`;
