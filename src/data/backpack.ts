export const brand = {
  name: "3in1 Backpack",
  handle: "@3in1Backpack",
  tagline: "One denim piece. Backpack, jacket and pullover.",
  phone: "067 190 1021",
  phoneHref: "tel:0671901021",
  whatsapp: "https://wa.me/27671901021",
  email: "orders@3in1backpack.co.za",
  address: "929 Attar Street, Lotus Gardens, Pretoria 0008",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=929+Attar+Street+Lotus+Gardens+Pretoria+0008",
  delivery: "Courier delivery nationwide across South Africa",
};

export type SizeRow = {
  size: string;
  ageRange: string;
  fit: string;
  chest: string;
  length: string;
  price: number;
};

/** Full size and price list — babies through adults. */
export const sizeRows: SizeRow[] = [
  { size: "000", ageRange: "0 – 6 months", fit: "Baby", chest: "44 cm", length: "30 cm", price: 500 },
  { size: "00", ageRange: "6 – 12 months", fit: "Baby", chest: "48 cm", length: "34 cm", price: 700 },
  { size: "0", ageRange: "1 – 3 years", fit: "Toddler", chest: "56 cm", length: "40 cm", price: 1400 },
  { size: "1", ageRange: "5 – 6 years", fit: "Kids", chest: "64 cm", length: "46 cm", price: 1500 },
  { size: "2", ageRange: "6 – 12 years", fit: "Kids", chest: "76 cm", length: "54 cm", price: 1600 },
  { size: "3", ageRange: "13 – 16 years", fit: "Teen", chest: "88 cm", length: "62 cm", price: 2000 },
  { size: "S", ageRange: "Adult 16+", fit: "Small", chest: "96 cm", length: "66 cm", price: 2500 },
  { size: "M", ageRange: "Adult 16+", fit: "Medium", chest: "104 cm", length: "69 cm", price: 3000 },
  { size: "L", ageRange: "Adult 16+", fit: "Large", chest: "112 cm", length: "72 cm", price: 3500 },
];

export type Mode = {
  name: string;
  blurb: string;
  points: string[];
};

export const modes: Mode[] = [
  {
    name: "Backpack",
    blurb: "Fold it down and it becomes a structured denim backpack with padded straps.",
    points: ["Main zip compartment", "Front zip pocket", "Adjustable padded straps"],
  },
  {
    name: "Jacket",
    blurb: "Unfold and zip up for a classic unisex denim jacket that fits over anything.",
    points: ["Full-length metal zip", "Collar or hood", "Side hand pockets"],
  },
  {
    name: "Pullover",
    blurb: "Half-zip the front and wear it as a relaxed denim pullover.",
    points: ["Half-zip styling", "Kangaroo pocket", "Elasticated cuffs and hem"],
  },
];

export const features = [
  {
    title: "100% denim",
    description: "Heavy-wash cotton denim with orange contrast stitching that only gets better with age.",
  },
  {
    title: "Detachable hoodie cap",
    description: "The hood zips off completely, so you can wear it hooded, collared or as a backpack.",
  },
  {
    title: "Full metal zip",
    description: "One YKK-style metal zip runs the transformation — no buttons to lose, no clips to break.",
  },
  {
    title: "Unisex fit",
    description: "One cut designed for everyone, from 0 – 6 months babies to adult Large.",
  },
];

export const faqs = [
  {
    q: "How does the 3-in-1 transformation work?",
    a: "The garment is built around one continuous metal zip. Zipped closed and folded, the body becomes the backpack shell and the sleeves become the straps. Unzipped, it opens into a full jacket. Half-zipped with the hood removed, it wears as a pullover.",
  },
  {
    q: "Is it really unisex?",
    a: "Yes. Every size from 000 to Large uses the same unisex block — a relaxed straight cut with a slightly dropped shoulder that works for all genders.",
  },
  {
    q: "How do I choose a size?",
    a: "Baby to teen sizes go by age (0 – 6 months up to 13 – 16 years). From 16 years and up we use Small, Medium and Large. If you are between sizes, check the chest measurement in the size chart and take the larger size.",
  },
  {
    q: "How do I order and pay?",
    a: `Send your size, quantity and delivery address on WhatsApp or call ${brand.phone}. We confirm stock, send payment details, and dispatch once payment reflects.`,
  },
  {
    q: "How is delivery handled?",
    a: "All orders are delivered by courier anywhere in South Africa, usually within 2 – 4 working days after payment. You get a tracking number as soon as the parcel is collected. Collection at our Lotus Gardens office is also available.",
  },
  {
    q: "Can I wash it?",
    a: "Machine wash cold inside out with the hood detached and all zips closed, then line dry in the shade. Do not tumble dry.",
  },
];

export type Social = {
  name: string;
  url: string;
};

export const socials: Social[] = [
  { name: "Instagram", url: "https://instagram.com/3in1Backpack" },
  { name: "Facebook", url: "https://facebook.com/3in1Backpack" },
  { name: "TikTok", url: "https://tiktok.com/@3in1Backpack" },
  { name: "X", url: "https://x.com/3in1Backpack" },
  { name: "YouTube", url: "https://youtube.com/@3in1Backpack" },
  { name: "WhatsApp", url: brand.whatsapp },
  { name: "Pinterest", url: "https://pinterest.com/3in1Backpack" },
  { name: "LinkedIn", url: "https://linkedin.com/company/3in1Backpack" },
];
