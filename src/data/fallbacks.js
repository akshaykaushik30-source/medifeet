// Local cut-out photos of each kind of shoe. A product card shows one only if
// the product's own photo (served from Shopify's CDN) can't load, so the shop
// never shows empty tiles.
const tile = (name) => `/assets/tiles/${name}.webp`;

export const CATEGORY_PHOTOS = {
  women: {
    slippers: [tile('desk_product_image_45a5df')],
    sandals: [tile('desk_product_image_64c439'), tile('desk_product_image_5dc7bc')],
    loafers: [tile('desk_product_image_5748a7'), tile('desk_product_image_ee0159'), tile('desk_product_image_edaaad'), tile('prod-sole-healer')],
    heels: [tile('desk_product_image_bed441')],
  },
  men: {
    slippers: [tile('desk_product_image_05ccc3')],
    sandals: [tile('desk_product_image_8df6ad')],
    shoes: [tile('prod-posture-derby'), tile('prod-ergostrut-oxford'), tile('prod-bioflex')],
  },
};

export const fallbackPhoto = (product, index = 0) => {
  const list = CATEGORY_PHOTOS[product.gender]?.[product.category];
  return list ? list[index % list.length] : undefined;
};
