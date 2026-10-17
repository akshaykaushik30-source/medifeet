// Content for the CloudWalk product page (#product).

const poster = (name) => `/assets/posters/${name}.webp`;
const video = (name) => ({ video: `/assets/${name}.mp4`, poster: poster(name) });

export const CLOUDWALK = {
  id: 'cloudwalk',
  name: 'CloudWalk Perfect Sandal',
  shortName: 'CloudWalk',
  gender: 'women',
  category: 'sandals',
  price: 2499,
  compareAtPrice: 3299,
  sizes: [
    { size: '4', available: true },
    { size: '5', available: true },
    { size: '6', available: true },
    { size: '7', available: true },
    { size: '8', available: true },
    { size: '9', available: false },
  ],
  // Brown is the colour in every photo and video. Graphite and Olive are shown
  // as a tinted preview of the same photo until their own photos are added.
  colors: [
    { name: 'Brown', swatch: '#6B4226' },
    { name: 'Graphite', swatch: '#4A4A48', preview: 'grayscale(1) brightness(0.62) contrast(1.15)' },
    { name: 'Olive', swatch: '#6B6B3A', preview: 'sepia(0.55) hue-rotate(38deg) saturate(1.25) brightness(0.82)' },
  ],
  photo: '/assets/hero-shoe-women-sandal.webp',
  gallery: [
    { type: 'image', label: 'Studio' },
    { type: 'video', label: 'Turn', ...video('video-product-360') },
    { type: 'video', label: 'On foot', ...video('video-on-foot') },
    { type: 'video', label: 'Detail', ...video('video-detail') },
    { type: 'video', label: 'Flex', ...video('video-flexibility') },
  ],

  technologies: {
    eyebrow: 'Inside the CloudWalk',
    title: 'Five technologies. One shoe.',
    text: 'Thoughtfully designed to bring support, cushioning and everyday comfort together in one easy-to-wear sandal.',
    items: [
      { kicker: '01 — Arch support', title: 'Alignment & Balance', text: 'A contoured footbed designed to support the natural shape of your foot, helping you move comfortably throughout the day.', ...video('video-tech-arch-support') },
      { kicker: '02 — Bounce back', title: 'Responsive Cushioning', text: 'Responsive cushioning helps soften the impact of everyday movement, giving each step a comfortable, cushioned feel.', ...video('video-tech-bounce-back') },
      { kicker: '03 — Anti-skid sole', title: 'Grip & Stability', text: 'A textured outsole designed to provide reliable traction and stability across everyday surfaces.', ...video('video-tech-anti-skid') },
      { kicker: '04 — Anatomic footbed', title: 'Soft, Moulding Comfort', text: 'A foot-shaped footbed designed to cradle your feet and provide supportive comfort for extended everyday wear.', ...video('video-tech-anatomic-footbed') },
      { kicker: '05 — MediFeet™ foam', title: 'Cushioned Footbed Technology', text: 'Lightweight, shock-absorbing foam designed to add cushioning beneath the footbed and support comfortable movement throughout the day.', ...video('video-tech-foam') },
    ],
  },

  layers: {
    eyebrow: 'Sole layers / Concept diagram',
    title: 'Three layers. One comfort system.',
    image: '/assets/shoe-story/070.webp',
    // y: where each layer sits in the image, as a fraction of its height.
    items: [
      { letter: 'A', title: 'Anatomic footbed', text: 'Contoured to follow the natural form of the foot.', y: 0.36 },
      { letter: 'B', title: 'MediFeet foam', text: 'Lightweight cushioning designed to absorb everyday impact.', y: 0.57 },
      { letter: 'C', title: 'Anti-skid outsole', text: 'Textured construction designed for everyday grip and stability.', y: 0.76 },
    ],
  },

  comparison: {
    eyebrow: 'The comfort difference',
    title: 'Medifeet vs Regular Footwear',
    text: 'See how thoughtful construction comes together for everyday comfort.',
    rows: [
      ['Arch / Footbed', 'Contoured', 'Varies by style'],
      ['Cushioning', 'Cushioned', 'Varies by style'],
      ['Fit', 'Adjustable', 'Varies by style'],
      ['Grip', 'Traction', 'Varies by style'],
      ['Weight', 'Lightweight', 'Varies by style'],
      ['Everyday Wear', 'Comfort-focused', 'Depends on style'],
    ],
  },

  motion: {
    eyebrow: 'See it in motion',
    title: 'Made for real-life steps.',
    text: 'From morning walks to everyday errands, CloudWalk is designed for women who want comfortable footwear for everyday wear.',
    items: [
      { title: 'A day in CloudWalk', text: 'A closer look at comfort in everyday motion.', ...video('video-lifestyle-walk') },
      { title: 'Inside the cushioning', text: 'See the technology behind every step.', ...video('video-cushioning') },
    ],
  },

  reviews: {
    eyebrow: 'Customer reviews',
    title: 'Comfort, in their words.',
    rating: 4.8,
    count: 124,
    // Shows a "sample" note on the page. Set to false once these are replaced
    // with real customer reviews (e.g. from your Shopify reviews app).
    sample: true,
    items: [
      { name: 'Priya R.', stars: 5, title: 'All-day comfort', text: 'Supportive from the first wear, lightweight enough for a full day, and easy to adjust.', verified: true },
      { name: 'Sneha M.', stars: 5, title: 'True-to-size fit', text: 'Comfortable, supportive and easy to wear throughout the day.', verified: true },
    ],
  },

  moreWays: {
    eyebrow: 'More ways to CloudWalk',
    title: 'You may also like',
    tagline: 'Lightweight · Supportive · Everyday comfort',
  },

  guidance: {
    eyebrow: 'A little guidance',
    title: 'Good to know.',
    items: [
      { label: 'Care', q: 'How do I care for my sandals?', a: 'Wipe with a soft, damp cloth and let them air-dry naturally. Avoid soaking or machine washing.' },
      { label: 'Sizing', q: 'How do I choose my size?', a: 'Measure from heel to longest toe on both feet. Use the larger measurement with our size chart.', action: 'size-chart' },
      { label: 'Delivery', q: 'When will my order arrive?', a: 'Delivery times vary by pincode. Enter your pincode to see the estimated delivery timeline.', action: 'pincode' },
      { label: 'Exchanges', q: 'Can I exchange my size?', a: 'Keep your pair unworn and in its original packaging. Contact support to arrange an eligible exchange.', action: 'support' },
      { label: 'Returns', q: 'Can I return my pair?', a: 'Check the return policy for eligibility and timelines, then contact support.', action: 'support' },
    ],
  },

  support: {
    title: 'Here for your next step.',
    text: 'Need help with your fit, footwear, delivery or order? Talk to the Medifeet team.',
    cta: 'Contact support',
  },
};
