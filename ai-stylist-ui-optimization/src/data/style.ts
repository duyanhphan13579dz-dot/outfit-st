/* ============================================================
   ATELIER — Style Data
   Structured to mirror real engine output (AI recommendation,
   body analysis, wardrobe, style DNA). UI-only layer.
   ============================================================ */

const IMG = {
  smartCasual: "https://images.pexels.com/photos/37679594/pexels-photo-37679594.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  minimalW: "https://images.pexels.com/photos/19169447/pexels-photo-19169447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  street: "https://images.pexels.com/photos/29226094/pexels-photo-29226094.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  classic: "https://images.pexels.com/photos/31959300/pexels-photo-31959300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  smartCasual2: "https://images.pexels.com/photos/27852498/pexels-photo-27852498.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  street2: "https://images.pexels.com/photos/15880276/pexels-photo-15880276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  minimalW2: "https://images.pexels.com/photos/8484111/pexels-photo-8484111.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  street3: "https://images.pexels.com/photos/7236438/pexels-photo-7236438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  classicW: "https://images.pexels.com/photos/4646955/pexels-photo-4646955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  minimalW3: "https://images.pexels.com/photos/13143531/pexels-photo-13143531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  // wardrobe squares
  knit: "https://images.pexels.com/photos/18533648/pexels-photo-18533648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=650&w=650",
  jeans: "https://images.pexels.com/photos/18533668/pexels-photo-18533668.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=650&w=650",
  shoes: "https://images.pexels.com/photos/10210779/pexels-photo-10210779.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=650&w=650",
  watch: "https://images.pexels.com/photos/38797596/pexels-photo-38797596.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=650&w=650",
};

export interface ScoreBreakdown {
  overall: number;
  body: number;
  proportion: number;
  style: number;
  color: number;
  occasion: number;
}

export interface OutfitItem {
  name: string;
  detail: string;
  image: string;
}

export interface Outfit {
  id: string;
  name: string;
  style: string;
  image: string;
  score: number;
  reasons: string[];
  scores: ScoreBreakdown;
  why: string;
  items: {
    top: OutfitItem;
    bottom: OutfitItem;
    shoes: OutfitItem;
    accessories: OutfitItem;
  };
}

export const todayOutfit: Outfit = {
  id: "o-today",
  name: "Smart Casual",
  style: "Smart Casual",
  image: IMG.smartCasual,
  score: 92,
  reasons: [
    "Designed for your proportions",
    "Tuned to today's weather",
    "Your best color palette",
  ],
  scores: { overall: 92, body: 90, proportion: 94, style: 91, color: 89, occasion: 93 },
  why: "This combination balances your rectangular frame with a structured blazer that adds shoulder definition, while the monochrome base elongates your silhouette. The warm neutrals sit inside your seasonal palette, so the look reads effortless rather than styled.",
  items: {
    top: { name: "Wool Blend Blazer", detail: "Charcoal · Tailored", image: IMG.smartCasual },
    bottom: { name: "Pleated Trousers", detail: "Stone · High-rise", image: IMG.jeans },
    shoes: { name: "Leather Loafers", detail: "Tan · Minimal", image: IMG.shoes },
    accessories: { name: "Silver Watch", detail: "Brushed · Slim", image: IMG.watch },
  },
};

export const outfits: Outfit[] = [
  todayOutfit,
  {
    id: "o-minimal",
    name: "Soft Minimal",
    style: "Minimal",
    image: IMG.minimalW,
    score: 88,
    reasons: ["Quiet luxury palette", "Flatters your height", "All-day comfort"],
    scores: { overall: 88, body: 86, proportion: 90, style: 89, color: 91, occasion: 85 },
    why: "A clean, tonal ensemble that leans on texture instead of pattern. The elongated line of the knit and skirt组合 lengthens the body and keeps the eye moving vertically — exactly what suits your proportions.",
    items: {
      top: { name: "Oversized Knit", detail: "Cream · Merino", image: IMG.knit },
      bottom: { name: "Pencil Skirt", detail: "Black · Midi", image: IMG.jeans },
      shoes: { name: "Leather Flats", detail: "Off-white · Pointed", image: IMG.shoes },
      accessories: { name: "Gold Hoops", detail: "Fine · Huggie", image: IMG.watch },
    },
  },
  {
    id: "o-street",
    name: "City Street",
    style: "Streetwear",
    image: IMG.street,
    score: 81,
    reasons: ["Weekend energy", "Layered proportions", "Statement sneakers"],
    scores: { overall: 81, body: 83, proportion: 78, style: 88, color: 80, occasion: 76 },
    why: "Relaxed layers with a confident outer shell. The dropped shoulder and wider leg create a contemporary silhouette that works with your frame when balanced by a fitted base layer.",
    items: {
      top: { name: "Boxy Hoodie", detail: "Heather · Cotton", image: IMG.knit },
      bottom: { name: "Wide Denim", detail: "Indigo · Loose", image: IMG.jeans },
      shoes: { name: "Chunky Trainers", detail: "White · Panel", image: IMG.shoes },
      accessories: { name: "Crossbody Bag", detail: "Black · Compact", image: IMG.watch },
    },
  },
  {
    id: "o-classic",
    name: "Tailored Classic",
    style: "Classic",
    image: IMG.classic,
    score: 90,
    reasons: ["Boardroom ready", "Sharp proportions", "Timeless navy"],
    scores: { overall: 90, body: 88, proportion: 92, style: 90, color: 87, occasion: 94 },
    why: "A precise two-piece that respects traditional tailoring. Peak lapels and a single-breasted cut give your frame clean vertical structure without overwhelming it.",
    items: {
      top: { name: "Navy Suit Jacket", detail: "Wool · Peak lapel", image: IMG.classic },
      bottom: { name: "Tailored Trousers", detail: "Navy · Slim", image: IMG.jeans },
      shoes: { name: "Oxford Shoes", detail: "Black · Leather", image: IMG.shoes },
      accessories: { name: "Silk Tie", detail: "Burgundy · Slim", image: IMG.watch },
    },
  },
  {
    id: "o-smart2",
    name: "Light Smart",
    style: "Smart Casual",
    image: IMG.smartCasual2,
    score: 86,
    reasons: ["Bright but balanced", "Summer weight", "Easy to wear"],
    scores: { overall: 86, body: 85, proportion: 87, style: 85, color: 88, occasion: 86 },
    why: "A breathable take on smart casual. The lighter top lifts the palette toward your best colors while keeping the structure that flatters your shoulders.",
    items: {
      top: { name: "Linen Shirt", detail: "White · Relaxed", image: IMG.knit },
      bottom: { name: "Chino Trousers", detail: "Beige · Tapered", image: IMG.jeans },
      shoes: { name: "Suede Loafers", detail: "Tan · Soft", image: IMG.shoes },
      accessories: { name: "Leather Belt", detail: "Brown · Slim", image: IMG.watch },
    },
  },
  {
    id: "o-street2",
    name: "Off-Duty",
    style: "Streetwear",
    image: IMG.street2,
    score: 79,
    reasons: ["Coffee-run ease", "Neutral layering", "Everyday staple"],
    scores: { overall: 79, body: 80, proportion: 77, style: 84, color: 78, occasion: 74 },
    why: "An unfussy everyday rotation. Keeping the outer layer neutral lets your sneakers carry the personality without throwing off your proportions.",
    items: {
      top: { name: "Crew Knit", detail: "Grey · Fine", image: IMG.knit },
      bottom: { name: "Slim Denim", detail: "Dark · Stretch", image: IMG.jeans },
      shoes: { name: "Canvas Trainers", detail: "Cream · Low", image: IMG.shoes },
      accessories: { name: "Cap", detail: "Black · Soft", image: IMG.watch },
    },
  },
];

/* ---------------- Body Profile ---------------- */
export interface BodyMetric {
  label: string;
  value: string;
  note: string;
}

export const bodyProfile = {
  name: "Alex",
  height: "178 cm",
  weight: "72 kg",
  metrics: [
    { label: "Body Shape", value: "Rectangle", note: "Shoulders and hips sit close in width — structure adds definition." },
    { label: "Proportion", value: "Balanced", note: "Even vertical division; vertical lines elongate your frame." },
    { label: "Style Goal", value: "Look taller", note: "Monochrome bases and high-rise cuts support this goal." },
    { label: "Skin Tone", value: "Warm Olive", note: "Earthy neutrals and off-whites sit best near the face." },
    { label: "Posture", value: "Upright", note: "You carry structure well — tailored pieces read sharp." },
  ] as BodyMetric[],
};

/* ---------------- Style DNA ---------------- */
export const styleDNA = [
  { name: "Smart Casual", value: 92 },
  { name: "Minimal", value: 86 },
  { name: "Classic", value: 78 },
  { name: "Streetwear", value: 44 },
  { name: "Bohemian", value: 31 },
];

/* ---------------- Best Colors ---------------- */
export const bestColors = [
  { name: "Navy", hex: "#1f2937" },
  { name: "Cream", hex: "#efe7d4" },
  { name: "Olive", hex: "#6b6f4c" },
  { name: "Charcoal", hex: "#2c2c2c" },
  { name: "Brown", hex: "#6b4f3a" },
  { name: "Sand", hex: "#c9b79c" },
];

/* ---------------- Wardrobe ---------------- */
export type WardrobeCategory = "All" | "Tops" | "Bottoms" | "Shoes" | "Accessories";

export interface WardrobeItem {
  id: string;
  name: string;
  category: Exclude<WardrobeCategory, "All">;
  detail: string;
  color: string;
  worn: number;
  image: string;
}

export const wardrobe: WardrobeItem[] = [
  { id: "w1", name: "Wool Blend Blazer", category: "Tops", detail: "Charcoal · Tailored", color: "#2c2c2c", worn: 24, image: IMG.smartCasual },
  { id: "w2", name: "Merino Knit", category: "Tops", detail: "Cream · Soft", color: "#efe7d4", worn: 31, image: IMG.knit },
  { id: "w3", name: "Linen Shirt", category: "Tops", detail: "White · Relaxed", color: "#f5f1e8", worn: 18, image: IMG.knit },
  { id: "w4", name: "Pleated Trousers", category: "Bottoms", detail: "Stone · High-rise", color: "#c9b79c", worn: 22, image: IMG.jeans },
  { id: "w5", name: "Wide Denim", category: "Bottoms", detail: "Indigo · Loose", color: "#2f3a52", worn: 15, image: IMG.jeans },
  { id: "w6", name: "Tailored Chinos", category: "Bottoms", detail: "Beige · Tapered", color: "#cbb195", worn: 27, image: IMG.jeans },
  { id: "w7", name: "Leather Loafers", category: "Shoes", detail: "Tan · Minimal", color: "#6b4f3a", worn: 33, image: IMG.shoes },
  { id: "w8", name: "Oxford Shoes", category: "Shoes", detail: "Black · Leather", color: "#1f1f1f", worn: 12, image: IMG.shoes },
  { id: "w9", name: "Silver Watch", category: "Accessories", detail: "Brushed · Slim", color: "#9aa0a6", worn: 41, image: IMG.watch },
  { id: "w10", name: "Leather Belt", category: "Accessories", detail: "Brown · Slim", color: "#6b4f3a", worn: 29, image: IMG.watch },
];

/* ---------------- AI Stylist ---------------- */
export const quickActions = [
  "What should I wear today?",
  "Make me look taller",
  "What goes with these pants?",
  "Rate my outfit",
];

export interface ChatMessage {
  id: string;
  role: "stylist" | "user";
  text: string;
  insight?: string[];
}

export const initialChat: ChatMessage[] = [
  {
    id: "c1",
    role: "stylist",
    text: "Good morning, Alex. I've prepared today's look for you — a smart casual ensemble tuned to your proportions and the weather. Want the full breakdown?",
    insight: ["Smart Casual · 92/100", "Best for: today's 22°C"],
  },
];
