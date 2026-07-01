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

export type PortfolioSlide = {
  nameA: string;
  nameB: string;
  tagA: string;
  tagB: string;
  year: string;
  images: string[];
  imageWidth?: number;
  imageHeight?: number;
  unoptimizedImage?: boolean;
  href?: string;
  i18n?: {
    zh: {
      tagA: string;
      tagB: string;
      nameA?: string;
      nameB?: string;
    };
  };
};

const radianceImage = (prefix: string, frame: number) =>
  `/radiance-works/${prefix}-0${frame}.jpg?v=1`;

/** Radiance-style portfolio showcase — https://radiance.family/ */
export const portfolioSlides: PortfolioSlide[] = [
  {
    nameA: "WORLDCUP",
    nameB: "CAMPAIGN",
    tagA: "GROWTH",
    tagB: "INCENTIVE",
    year: "2026",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("plmc", n)),
  },
  {
    nameA: "SAKURA",
    nameB: "WITH DANGO",
    tagA: "SPRING",
    tagB: "SHARE TO WIN",
    year: "2026",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("urb", n)),
  },
  {
    nameA: "NEW YEAR",
    nameB: "OSECHI",
    tagA: "FESTIVE",
    tagB: "SHARE TO WIN",
    year: "2025",
    images: ["/radiance-works/spring-sakura-shiratama.jpg?v=1"],
    imageWidth: 3240,
    imageHeight: 3915,
    unoptimizedImage: true,
  },
  {
    nameA: "MANEKINEKO",
    nameB: "MEME",
    tagA: "IP EXPANSION",
    tagB: "",
    year: "2026",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("bdp", n)),
  },
  {
    nameA: "SOCIAL",
    nameB: "TEMPLATES",
    tagA: "MAVA",
    tagB: "BRANDING",
    year: "2025",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("indvd", n)),
  },
  {
    nameA: "SELECTED",
    nameB: "WORKS",
    tagA: "ACADEMIC",
    tagB: "PROJECTS",
    year: "2024",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("scrn", n)),
  },
];

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

/** Bento grid cell order from Figma Bento-Grid-Wrapper (208:10257), layer order L→R, T→B. */
export type MoreWorkGridCell = {
  size: "big" | "small";
  figmaName: string;
  /** Asset filename in public/more-work/ (underscore naming, e.g. 1_big.webp) */
  asset: string;
  image: string;
  bg: string;
};

export const moreWorkGridLayout: MoreWorkGridCell[] = [
  { size: "big", figmaName: "1-big", asset: "1_big.webp", image: "/more-work/1_big.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片3", asset: "1_small.webp", image: "/more-work/1_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片4", asset: "2_small.webp", image: "/more-work/2_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片21", asset: "3_small.webp", image: "/more-work/3_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片6", asset: "4_small.webp", image: "/more-work/4_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片9", asset: "5_small.webp", image: "/more-work/5_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片10", asset: "6_small.webp", image: "/more-work/6_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片11", asset: "7_small.webp", image: "/more-work/7_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片12", asset: "8_small.webp", image: "/more-work/8_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片1", asset: "9_small.webp", image: "/more-work/9_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片7", asset: "10_small.webp", image: "/more-work/10_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片15", asset: "11_small.webp", image: "/more-work/11_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片17", asset: "12_small.webp", image: "/more-work/12_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片16", asset: "13_small.webp", image: "/more-work/13_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片23", asset: "14_small.webp", image: "/more-work/14_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片19", asset: "15_small.webp", image: "/more-work/15_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片22", asset: "16_small.webp", image: "/more-work/16_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "250770", asset: "17_small.webp", image: "/more-work/17_small.webp", bg: "#ffffff" },
  { size: "big", figmaName: "卡片18", asset: "2_big.webp", image: "/more-work/2_big.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片24", asset: "18_small.webp", image: "/more-work/18_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片17", asset: "19_small.webp", image: "/more-work/19_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片1", asset: "20_small.webp", image: "/more-work/20_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片21", asset: "21_small.webp", image: "/more-work/21_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片21", asset: "22_small.webp", image: "/more-work/22_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片1", asset: "23_small.webp", image: "/more-work/23_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片14", asset: "24_small.webp", image: "/more-work/24_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "250769", asset: "25_small.webp", image: "/more-work/25_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片23", asset: "26_small.webp", image: "/more-work/26_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片17", asset: "27_small.webp", image: "/more-work/27_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "250769", asset: "28_small.webp", image: "/more-work/28_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片7", asset: "29_small.webp", image: "/more-work/29_small.webp", bg: "#ffffff" },
  { size: "big", figmaName: "卡片5", asset: "3_big.webp", image: "/more-work/3_big.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片21", asset: "30_small.webp", image: "/more-work/30_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片22", asset: "31_small.webp", image: "/more-work/31_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片2", asset: "32_small.webp", image: "/more-work/32_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片21", asset: "33_small.webp", image: "/more-work/33_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片8", asset: "34_small.webp", image: "/more-work/34_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片16", asset: "35_small.webp", image: "/more-work/35_small.webp", bg: "#ffffff" },
  { size: "small", figmaName: "卡片1", asset: "36_small.webp", image: "/more-work/36_small.webp", bg: "#ffffff" },
];

/** More Work grid items. */
export const moreWork: Work[] = [
  { title: "Project 01", image: "/works/project-01.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 02", image: "/works/project-02.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 03", image: "/works/project-03.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 04", image: "/works/project-04.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 05", image: "/works/project-05.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 06", image: "/works/project-06.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 07", image: "/works/project-07.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 08", image: "/works/project-08.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 09", image: "/works/project-09.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 10", image: "/works/project-10.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 11", image: "/works/project-11.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 12", image: "/works/project-12.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 13", image: "/works/project-13.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 14", image: "/works/project-14.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 15", image: "/works/project-15.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 16", image: "/works/project-16.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 17", image: "/works/project-17.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 18", image: "/works/project-18.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 19", image: "/works/project-19.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 20", image: "/works/project-20.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 21", image: "/works/project-21.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 22", image: "/works/project-22.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 23", image: "/works/project-23.jpg?v=2", bg: "#ede6d3" },
  { title: "Project 24", image: "/works/project-24.jpg?v=2", bg: "#ede6d3" },
];

export type ProjectListItem = {
  title: string;
  slug: string;
  image: string;
};

/** Spencer Gabor–style projects list (about page module). */
export const projectsList: ProjectListItem[] = [
  { title: "Brompton", slug: "brompton", image: "/works/brompton.jpg?v=1" },
  { title: "260 Collins", slug: "260-collins", image: "/works/collins.jpg?v=1" },
  { title: "ShakeShack", slug: "shakeshack", image: "/works/shakeshack.png?v=1" },
  {
    title: "Caulfield Cup",
    slug: "caulfield-cup",
    image: "/works/caulfield-cup.png?v=1",
  },
  { title: "Jaffa", slug: "jaffa", image: "/works/jaffa.jpg?v=1" },
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
  wechat: "#wechat",
};

export const footer = {
  ctaHref: social.email,
  copyright: "© Copyright & stuff...",
  socialLinks: [
    { id: "linkedin", href: social.linkedin, label: "LinkedIn" },
    { id: "email", href: social.email, label: "Email" },
    { id: "wechat", href: social.wechat, label: "WeChat" },
  ],
};

export type CollectionLayout =
  | "default"
  | "media-before-title"
  | "media-after-count"
  | "media-first";

export type CollectionItem = {
  name: string;
  count: number;
  slug: string;
  href: string;
  images: string[];
  layout: CollectionLayout;
  mediaVariant?: "nature" | "details";
  icon: "urban" | "nature" | "golf" | "replastic" | "details";
};

/** Floema "The Collections" section — https://www.floema.com/en */
export const collectionsOverview: CollectionItem[] = [
  {
    name: "Urban",
    count: 50,
    slug: "urban",
    href: "https://www.floema.com/en/products/urban",
    icon: "urban",
    layout: "default",
    images: [
      "/collections/urban/01.jpg",
      "/collections/urban/02.jpg",
      "/collections/urban/03.jpg",
      "/collections/urban/04.jpg",
      "/collections/urban/05.jpg",
      "/collections/urban/06.jpg",
    ],
  },
  {
    name: "Nature",
    count: 38,
    slug: "nature",
    href: "https://www.floema.com/en/products/nature",
    icon: "nature",
    layout: "media-before-title",
    mediaVariant: "nature",
    images: [
      "/collections/nature/01.png",
      "/collections/nature/02.png",
      "/collections/nature/03.png",
      "/collections/nature/04.png",
      "/collections/nature/05.png",
      "/collections/nature/06.png",
    ],
  },
  {
    name: "Golf",
    count: 62,
    slug: "golf",
    href: "https://www.floema.com/en/products/golf",
    icon: "golf",
    layout: "media-after-count",
    images: [
      "/collections/golf/01.png",
      "/collections/golf/02.jpg",
      "/collections/golf/03.png",
      "/collections/golf/04.png",
      "/collections/golf/05.png",
      "/collections/golf/06.png",
    ],
  },
  {
    name: "RePlastic",
    count: 1,
    slug: "replastic",
    href: "https://www.floema.com/en/products/replastic",
    icon: "replastic",
    layout: "media-first",
    images: [
      "/collections/replastic/01.jpg",
      "/collections/replastic/02.jpg",
      "/collections/replastic/03.jpg",
      "/collections/replastic/04.jpg",
      "/collections/replastic/05.jpg",
      "/collections/replastic/06.jpg",
    ],
  },
  {
    name: "Details",
    count: 0,
    slug: "details",
    href: "https://www.floema.com/en/products/details",
    icon: "details",
    layout: "default",
    mediaVariant: "details",
    images: [
      "/collections/details/01.jpg",
      "/collections/details/02.jpg",
      "/collections/details/03.jpg",
      "/collections/details/04.jpg",
      "/collections/details/05.jpg",
      "/collections/details/06.jpg",
    ],
  },
];

/** Accent colors available in the color picker (bottom-right). */
export const accentColors = [
  "#cbcbcb",
  "#ffd23f",
  "#7ed957",
  "#4cc9f0",
  "#ff6b9d",
];
