export const contact = {
  ceo: "Messiah Ndou",
  phone: "+27 71 576 8614",
  phoneHref: "tel:+27715768614",
  whatsapp: "https://wa.me/27715768614",
  email: "info@petgroup.co.za",
  address: "22 Amaranth Cres Street, Lotus Gardens, Pretoria, 0025",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=22+Amaranth+Cres+Street+Lotus+Gardens+Pretoria+0025",
};

export type Subject = {
  title: string;
  levels: string;
  description: string;
};

export const subjects: Subject[] = [
  {
    title: "Mathematics",
    levels: "Grade 8 – 12",
    description:
      "Full CAPS Mathematics coverage: algebra, functions, trigonometry, calculus, analytical geometry and exam technique.",
  },
  {
    title: "Varsity Mathematics",
    levels: "University modules",
    description:
      "First and second year modules: calculus, linear algebra, differential equations and engineering mathematics.",
  },
  {
    title: "College Civil Engineering",
    levels: "N1 – N6 modules",
    description:
      "Engineering Science, Mathematics N1–N6, Building Science and Quantity Surveying support for TVET students.",
  },
  {
    title: "Cambridge & IEB Mathematics",
    levels: "IGCSE, AS/A Level, IEB",
    description:
      "Curriculum-specific tutoring aligned to Cambridge and IEB syllabi, past papers and marking rubrics.",
  },
  {
    title: "Technical Mathematics",
    levels: "Grade 10 – 12",
    description:
      "Technical Maths tailored for technical schools, with strong focus on applications and formula mastery.",
  },
  {
    title: "Mathematical Literacy",
    levels: "Grade 10 – 12",
    description:
      "Finance, measurement, data handling, maps and plans taught through real-life problem solving.",
  },
  {
    title: "Physical Sciences",
    levels: "Grade 10 – 12",
    description:
      "Physics and Chemistry: mechanics, electricity, organic chemistry, stoichiometry and practical prep.",
  },
  {
    title: "Life Sciences",
    levels: "Grade 10 – 12",
    description:
      "Structured content mastery, diagrams, terminology and exam-style question drilling.",
  },
  {
    title: "Geography",
    levels: "Grade 10 – 12",
    description:
      "Climatology, geomorphology, settlement and economic geography plus mapwork and GIS calculations.",
  },
];

export type Package = {
  name: string;
  days: string;
  sessions: string;
  price: number;
  featured?: boolean;
};

export type PackageTier = {
  id: string;
  duration: string;
  note: string;
  packages: Package[];
};

const tierPackages = (prices: [number, number, number, number]): Package[] => [
  { name: "Standard", days: "2 days per week", sessions: "8 sessions / month", price: prices[0] },
  { name: "Plus", days: "3 days per week", sessions: "12 sessions / month", price: prices[1], featured: true },
  { name: "Premium", days: "4 days per week", sessions: "16 sessions / month", price: prices[2] },
  { name: "Elite", days: "5 days per week", sessions: "20 sessions / month", price: prices[3] },
];

export const packageTiers: PackageTier[] = [
  {
    id: "1-hour",
    duration: "1 hour per session",
    note: "Focused one-on-one support",
    packages: tierPackages([1100, 1600, 2100, 2600]),
  },
  {
    id: "90-min",
    duration: "1 hour 30 minutes per session",
    note: "Our most popular option",
    packages: tierPackages([1500, 2100, 2800, 3400]),
  },
  {
    id: "2-hours",
    duration: "2 hours per session",
    note: "Deep-dive and catch-up learners",
    packages: tierPackages([1900, 2700, 3500, 4200]),
  },
];

export const registrationFee = 100;
