// The product catalogue imported from Shopify (see scripts/import-shopify.py).
// Loaded on demand so the home page doesn't download it.
let catalogPromise;

export const loadCatalog = () => {
  if (!catalogPromise) {
    catalogPromise = import('./products.json').then((module) => module.default);
  }
  return catalogPromise;
};

export const CATEGORY_LABELS = {
  slippers: 'Slippers',
  sandals: 'Sandals',
  loafers: 'Loafers',
  heels: 'Heels',
  shoes: 'Shoes',
};

export const GENDER_LABELS = { women: 'Women', men: 'Men' };

// Shopify's CDN resizes on request; ask for roughly the size we display.
export const productImage = (url, width = 800) => {
  if (!url || !url.startsWith('http')) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('width', width);
    return u.toString();
  } catch {
    return url;
  }
};

export const discountPercent = (product) =>
  product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

export const productRoute = (product) => `product/${product.id}`;
