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
  `/radiance-works/${prefix}-0${frame}.jpg`;

/** Radiance-style portfolio showcase — https://radiance.family/ */
export const portfolioSlides: PortfolioSlide[] = [
  {
    nameA: "BIDAPP",
    nameB: "SDK",
    tagA: "STRATEGY",
    tagB: "DIGITAL",
    year: "2024",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("bdp", n)),
    i18n: {
      zh: { tagA: "策略", tagB: "数字", nameB: "软件开发包" },
    },
  },
  {
    nameA: "UNITS",
    nameB: "COMMUNITY",
    tagA: "BRANDING",
    tagB: "DIGITAL",
    year: "2023",
    images: ["/radiance-works/spring-sakura-shiratama.jpg"],
    imageWidth: 3240,
    imageHeight: 3915,
    unoptimizedImage: true,
    i18n: {
      zh: { tagA: "品牌", tagB: "数字", nameB: "社区" },
    },
  },
  {
    nameA: "POLEMICA",
    nameB: "PLATFORM",
    tagA: "BRAND",
    tagB: "IDENTITY",
    year: "2021",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("plmc", n)),
    i18n: {
      zh: { tagA: "品牌", tagB: "形象", nameB: "平台" },
    },
  },
  {
    nameA: "URBAN",
    nameB: "AMENITIES",
    tagA: "STRATEGY",
    tagB: "BRANDING",
    year: "2022",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("urb", n)),
    i18n: {
      zh: { tagA: "策略", tagB: "品牌", nameA: "都市", nameB: "设施" },
    },
  },
  {
    nameA: "INDIEVID",
    nameB: "LABEL",
    tagA: "IDENTITY,",
    tagB: "WEBSITE",
    year: "2022",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("indvd", n)),
    i18n: {
      zh: { tagA: "形象", tagB: "网站", nameB: "厂牌" },
    },
  },
  {
    nameA: "SCREEN",
    nameB: "BLASTERS",
    tagA: "READYMAG",
    tagB: "WEBSITE",
    year: "2022",
    images: [1, 2, 3, 4, 5].map((n) => radianceImage("scrn", n)),
    i18n: {
      zh: { tagA: "网站", tagB: "建站", nameA: "屏幕", nameB: "爆破手" },
    },
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

export type ProjectListItem = {
  title: string;
  slug: string;
  image: string;
};

/** Spencer Gabor–style projects list (about page module). */
export const projectsList: ProjectListItem[] = [
  { title: "Brompton", slug: "brompton", image: "/works/brompton.jpg" },
  { title: "260 Collins", slug: "260-collins", image: "/works/collins.jpg" },
  { title: "ShakeShack", slug: "shakeshack", image: "/works/shakeshack.png" },
  {
    title: "Caulfield Cup",
    slug: "caulfield-cup",
    image: "/works/caulfield-cup.png",
  },
  { title: "Jaffa", slug: "jaffa", image: "/works/jaffa.jpg" },
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
