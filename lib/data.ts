export const profile = {
  name: "Spencer Gabor",
  role: ["Illustrator,", "designer", "&", "animator"],
  location: "Brooklyn, New York",
  email: "SpencerGabor9@gmail.com",
  clientsLabel: "Clients Include",
  clients:
    "Apple, Amazon, Adobe, Google, Nike, The New York Times, Lululemon, NPR",
};

export type Work = {
  title: string;
  image: string;
  /** background color used as a fallback behind transparent artwork */
  bg: string;
  slug?: string;
  subtitle?: string;
};

export type YearbookCard = Work & {
  textColor?: string;
  visualRotate?: string;
  visualScale?: number;
  visualTop?: string;
};

/** Cards stacked behind the wordmark in the hero. */
export const heroCards: Work[] = [
  { title: "Hero sample 1", image: "/works/hero-1.png", bg: "#ede6d3" },
  { title: "Hero sample 2", image: "/works/hero-2.png", bg: "#ede6d3" },
  { title: "Hero sample 3", image: "/works/hero-3.png", bg: "#ede6d3" },
  { title: "Hero sample 4", image: "/works/hero-4.png", bg: "#ede6d3" },
];

/** Featured project cards (6-card showcase). */
export const featured: YearbookCard[] = [
  {
    title: "Purrfect for pets",
    slug: "purrfect-for-pets",
    subtitle: "UTSÅDD collection",
    image: "/yearbook/purrfect-for-pets.png",
    bg: "#bdb1ff",
    visualRotate: "0deg",
    visualScale: 0.85,
    visualTop: "-55%",
  },
  {
    title: "Made with care",
    slug: "made-with-care",
    subtitle: "Handmade for the home",
    image: "/yearbook/made-with-care.png",
    bg: "#d7c7a2",
    visualRotate: "8deg",
    visualScale: 0.7,
    visualTop: "-52%",
  },
  {
    title: "2024 news",
    slug: "2024-news",
    subtitle: "Product launches",
    image: "/yearbook/2024-news.png",
    bg: "#e5f1dc",
    visualRotate: "0deg",
    visualScale: 0.9,
    visualTop: "-50%",
  },
  {
    title: "Going full circle",
    slug: "going-full-circle",
    subtitle: "Sustainability",
    image: "/yearbook/going-full-circle.png",
    bg: "#ecf1f3",
    visualRotate: "8deg",
    visualScale: 0.5,
    visualTop: "-58%",
  },
  {
    title: "Colour pop!",
    slug: "colour-pop",
    subtitle: "Bold and bright interiors",
    image: "/yearbook/colour-pop.png",
    bg: "#75c2ee",
    visualRotate: "10deg",
    visualScale: 0.5,
    visualTop: "-55%",
  },
  {
    title: "The natural touch",
    slug: "the-natural-touch",
    subtitle: "Rustic organic interiors",
    image: "/yearbook/the-natural-touch.png",
    bg: "#bfd0c6",
    visualRotate: "8deg",
    visualScale: 0.95,
    visualTop: "-54%",
  },
];

export function getFeaturedBySlug(slug: string) {
  return featured.find((work) => work.slug === slug);
}

export type BrandMarqueeItem = {
  title: string;
  image: string;
};

/** Row 1 — scrolls left. From isadeburgh.com carousel section. */
export const brandMarqueeRowLeft: BrandMarqueeItem[] = [
  { title: "Magic mind", image: "/brand-marquee/magic_mind_bottle_mini.png" },
  { title: "Earthbar", image: "/brand-marquee/earth_bar.png" },
  { title: "colgate", image: "/brand-marquee/colgate.png" },
  { title: "Little saints", image: "/brand-marquee/little_saints.png" },
  { title: "symbiome", image: "/brand-marquee/symboime.png" },
  { title: "de soi", image: "/brand-marquee/de_soi.png" },
  { title: "faherty", image: "/brand-marquee/faherty_mini.png" },
  { title: "wild elements", image: "/brand-marquee/wild_elements.png" },
];

/** Row 2 — scrolls right. From isadeburgh.com carousel section. */
export const brandMarqueeRowRight: BrandMarqueeItem[] = [
  { title: "PALM & PAWS", image: "/brand-marquee/palm_and_paws.png" },
  { title: "Sidedish", image: "/brand-marquee/sidedish.png" },
  { title: "QUICKSILVER SCIENTIFIC", image: "/brand-marquee/quicksilver_scientific.png" },
  { title: "Brami", image: "/brand-marquee/brami_mini.png" },
  { title: "fx chocolate", image: "/brand-marquee/fx_chocolate.png" },
];

/** More Work grid items. */
export const moreWork: Work[] = [
  { title: "Frugo", image: "/works/frugo.png", bg: "#ede6d3" },
  { title: "Whop", image: "/works/whop.png", bg: "#ede6d3" },
  { title: "Brompton", image: "/works/brompton.jpg", bg: "#ede6d3" },
  { title: "260 Collins", image: "/works/collins.jpg", bg: "#ede6d3" },
  { title: "Do Good", image: "/works/do-good.png", bg: "#ede6d3" },
  { title: "ShakeShack", image: "/works/shakeshack.png", bg: "#ede6d3" },
  { title: "Shred", image: "/works/shred.png", bg: "#ede6d3" },
  { title: "Caulfield Cup", image: "/works/caulfield-cup.png", bg: "#ede6d3" },
  { title: "DreamVault", image: "/works/dreamvault.jpg", bg: "#ede6d3" },
];

export const about = {
  title: "about",
  bio: [
    "Spencer Gabor is an illustrator, designer and muralist based in Brooklyn, New York.",
    "His work is headlined by bold and zaney characters, abstract shapes and bright colors.",
    "Clients include Apple, Amazon, Adobe, NPR, Lululemon, The New York Times, Harvard Business Review, Twilio, ShakeShack, Jagermeister, SkullCandy, & Others",
  ],
};

export const social = {
  email: "mailto:spencergabor9@gmail.com",
  instagram: "http://instagram.com/spencergab",
  linkedin: "https://www.linkedin.com/in/spencergabor",
};

export const footer = {
  title: "Contact",
  email: "spencergabor9@gmail.com",
  links: [
    { label: "Instagram", href: social.instagram },
    { label: "Dribbble", href: "http://dribbble.com/spencergabor" },
  ],
  copyright: "All rights reserved 2026 inc Gabor",
};

/** Accent colors available in the color picker (bottom-right). */
export const accentColors = [
  "#cbcbcb",
  "#ffd23f",
  "#7ed957",
  "#4cc9f0",
  "#ff6b9d",
];
