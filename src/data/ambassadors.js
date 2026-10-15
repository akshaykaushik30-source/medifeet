// MediFeet brand ambassadors shown in the home page hero, each paired with a
// product they front. `from` is the lowest selling price in that category.
export const AMBASSADORS = [
  {
    id: 'bobby-deol',
    name: 'Bobby Deol',
    role: 'Actor & Brand Ambassador',
    tagline: "Every step tells a story. Bobby Deol's starts with MediFeet.",
    image: '/assets/medifeet_home/img_0_35_104_bobby_deol_portrait.png',
    cutout: '/assets/ambassador-bobby-deol-full-cutout.webp',
    // Full-length shot: keep the feet (and his shoes) in view instead of fading out.
    fullBody: true,
    shop: 'men',
    product: { image: '/assets/hero-shoe-men-derby.webp', label: "Men's formal shoes", from: 1100 },
  },
  {
    id: 'gurpreet-ghuggi',
    name: 'Gurpreet Ghuggi',
    role: 'Actor & Brand Ambassador',
    tagline: 'German technology. All-day comfort. Gurpreet Ghuggi approved.',
    image: '/assets/ambassador-gurpreet-ghuggi.jpg',
    cutout: '/assets/ambassador-gurpreet-ghuggi-cutout.webp',
    shop: 'men',
    product: { image: '/assets/hero-shoe-men-slide.webp', label: "Men's comfort slippers", from: 999 },
  },
  {
    id: 'shilpa-shetty',
    name: 'Shilpa Shetty',
    role: 'Actor & Brand Ambassador',
    tagline: 'Comfort that keeps pace with a busy day. Shilpa Shetty walks with MediFeet.',
    image: '/assets/medifeet-reel-5-shilpa-shetty-ambassador.jpg',
    cutout: '/assets/ambassador-shilpa-shetty-cutout.webp',
    shop: 'shop',
    product: { image: '/assets/hero-shoe-women-loafer.webp', label: "Women's loafers", from: 1425 },
  },
];
