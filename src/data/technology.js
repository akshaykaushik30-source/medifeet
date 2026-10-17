import { CLOUDWALK } from './cloudwalk';

// The MediFeet comfort system, shown on the home page and every product page.
// The five technologies reuse the CloudWalk copy and clips; `spot` is where
// each one sits on the studio photo of the sandal (fractions of its width
// and height).
// Edge-cleaned for the dark green background it sits on.
export const TECH_PHOTO = '/assets/hero-shoe-women-sandal-dark.webp';

const SHORT = ['Arch support', 'Bounce back', 'Anti-skid sole', 'Anatomic footbed', 'MediFeet™ foam'];
const SPOTS = [
  { x: 0.33, y: 0.58 },
  { x: 0.12, y: 0.6 },
  { x: 0.62, y: 0.9 },
  { x: 0.84, y: 0.72 },
  { x: 0.21, y: 0.8 },
];

export const TECHNOLOGIES = CLOUDWALK.technologies.items.map((item, i) => ({ ...item, short: SHORT[i], spot: SPOTS[i] }));
