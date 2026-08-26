import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  MapPin,
  Phone,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useState } from "react";

import allAges from "@/assets/all-ages.jpg";
import backpackMode from "@/assets/backpack-mode.jpg";
import logo from "@/assets/backpack-logo.png";
import jacketMode from "@/assets/jacket-mode.jpg";
import pulloverMode from "@/assets/pullover-mode.jpg";
import sizeRange from "@/assets/size-range.jpg";
import { socialIcons } from "@/components/social-icons";
import { Button } from "@/components/ui/button";
import { brand, faqs, features, modes, sizeRows, socials } from "@/data/backpack";

const title = "3in1 Backpack | Denim Backpack, Jacket & Pullover in One";
const description =
  "The 3in1 Backpack turns into a denim jacket and a pullover, with a full metal zip and detachable hoodie cap. Unisex sizes from 0-6 months to adult Large, R500 to R3500. Order online, courier delivery nationwide. Pretoria.";

export const Route = createFileRoute("/backpack")({
  component: BackpackPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const modeImages = [backpackMode, jacketMode, pulloverMode];

const rand = (v: string) => v;

function BackpackPage() {
  const [activeMode, setActiveMode] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const orderLink = (size: string) =>
    `${brand.whatsapp}?text=${encodeURIComponent(
      `Hi 3in1 Backpack! I'd like to order the denim 3-in-1 in size ${size}. My delivery address is:`,
    )}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img
              src={logo}
              alt="3in1 Backpack logo"
              width={1024}
              height={1024}
              className="h-11 w-11 object-contain"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold uppercase tracking-tight text-primary sm:text-base">
                3in1 Backpack
              </span>
              <span className="block text-[11px] text-muted-foreground">{brand.handle}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {[
              { href: "#modes", label: "3 in 1" },
              { href: "#sizes", label: "Sizes & prices" },
              { href: "#order", label: "Order" },
              { href: "#info", label: "More info" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm">
            <a href={brand.whatsapp} target="_blank" rel="noreferrer">
              Order now
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="bg-hero-gradient text-primary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> Denim · Unisex · All ages
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Backpack. Jacket. Pullover. One denim piece.
              </h1>
              <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
                {rand(brand.tagline)} A full metal zip and a detachable hoodie cap let you switch
                looks in seconds — made for everyone from 0 – 6 month babies to adult Large.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <a href="#sizes">See sizes &amp; prices</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href={brand.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp {brand.phone}
                  </a>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
                {[
                  { k: "R500", v: "From, babies" },
                  { k: "9 sizes", v: "Baby to adult L" },
                  { k: "Courier", v: "Nationwide" },
                ].map((i) => (
                  <div key={i.k}>
                    <dt className="font-display font-bold">{i.k}</dt>
                    <dd className="text-primary-foreground/75">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <img
              src={allAges}
              alt="Family of all ages wearing the denim 3in1 backpack jacket"
              width={1600}
              height={1008}
              className="w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="rounded-xl bg-secondary/10 p-2.5 text-secondary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 modes */}
        <section id="modes" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Three ways to wear it
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tap a mode to see it. Same garment, same zip — just folded differently.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {modes.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setActiveMode(i)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeMode === i
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {i + 1}. {m.name}
              </button>
            ))}
          </div>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <img
              src={modeImages[activeMode]}
              alt={`Denim 3in1 worn as a ${modes[activeMode]!.name.toLowerCase()}`}
              width={1200}
              height={1200}
              loading="lazy"
              className="w-full rounded-3xl border border-border bg-card object-cover"
            />
            <div>
              <h3 className="font-display text-2xl font-bold">{modes[activeMode]!.name} mode</h3>
              <p className="mt-3 text-muted-foreground">{modes[activeMode]!.blurb}</p>
              <ul className="mt-6 space-y-3">
                {modes[activeMode]!.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {modeImages.map((img, i) => (
              <figure key={modes[i]!.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={img}
                  alt={`${modes[i]!.name} mode of the denim 3in1 backpack`}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="px-4 py-3 text-sm font-semibold">{modes[i]!.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Sizes & prices */}
        <section id="sizes" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Sizes &amp; prices
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                From toddlers to grandparents
              </h2>
              <p className="mt-4 text-muted-foreground">
                Baby to teen sizes go by age; from 16 years we use Small, Medium and Large. All
                prices in South African Rand and include the detachable hoodie cap.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Size</th>
                      <th className="px-4 py-3 font-semibold">Age</th>
                      <th className="px-4 py-3 font-semibold">Fit</th>
                      <th className="px-4 py-3 font-semibold">Chest</th>
                      <th className="px-4 py-3 font-semibold">Length</th>
                      <th className="px-4 py-3 font-semibold">Price</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {sizeRows.map((r) => (
                      <tr key={r.size} className="border-t border-border">
                        <td className="px-4 py-3 font-display font-bold">{r.size}</td>
                        <td className="px-4 py-3">{r.ageRange}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.fit}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.chest}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.length}</td>
                        <td className="px-4 py-3 font-display font-bold text-secondary">
                          R{r.price}
                        </td>
                        <td className="px-4 py-3">
                          <Button asChild size="sm" variant="outline">
                            <a href={orderLink(r.size)} target="_blank" rel="noreferrer">
                              Order
                            </a>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 grid items-center gap-6 md:grid-cols-2">
              <img
                src={sizeRange}
                alt="Toddler, kids and adult denim 3in1 sizes laid out with detachable hoods"
                width={1600}
                height={1008}
                loading="lazy"
                className="w-full rounded-3xl object-cover"
              />
              <div className="rounded-3xl border border-border bg-card p-6">
                <Ruler className="h-6 w-6 text-secondary" />
                <h3 className="mt-4 font-display text-xl font-bold">How to measure</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Measure around the fullest part of the chest with the arms down, then measure from
                  the shoulder seam to where you want the hem to sit. Match those numbers to the
                  chart — if you fall between two sizes, take the bigger one so the backpack fold
                  still sits comfortably.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Order */}
        <section id="order" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="rounded-3xl bg-card-gradient p-8 text-primary-foreground md:p-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Order online</h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/90">
              Send us your size, quantity and delivery address. We confirm stock, send payment
              details, and your parcel goes out by courier with a tracking number.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Phone, t: "1. Send your order", d: `WhatsApp or call ${brand.phone}` },
                { icon: ShieldCheck, t: "2. Pay securely", d: "EFT or instant payment on confirmation" },
                { icon: Truck, t: "3. Courier delivery", d: brand.delivery },
              ].map((s) => (
                <div key={s.t} className="rounded-2xl bg-primary-foreground/10 p-5">
                  <s.icon className="h-5 w-5" />
                  <p className="mt-3 font-display font-bold">{s.t}</p>
                  <p className="mt-1 text-sm text-primary-foreground/85">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <a href={brand.whatsapp} target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={brand.phoneHref}>Call {brand.phone}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* More info / FAQ */}
        <section id="info" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              More info
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Everything else you might ask
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                  >
                    {f.q}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-secondary transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & socials */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Find us</h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-secondary" />
                  <a href={brand.phoneHref} className="hover:text-primary">
                    {brand.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-secondary" />
                  <a href={brand.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                    {brand.address}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 text-secondary" />
                  {brand.delivery}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">
                Follow us on every platform — {brand.handle}
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {socials.map((s) => {
                  const Icon = socialIcons[s.name]!;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-3 py-4 text-xs font-semibold text-muted-foreground transition-colors hover:border-secondary hover:text-primary"
                    >
                      <Icon className="h-7 w-7 text-secondary" />
                      {s.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="h-9 w-9 object-contain"
            />
            <span>© {new Date().getFullYear()} 3in1 Backpack. {brand.address}</span>
          </div>
          <span>{brand.handle}</span>
        </div>
      </footer>
    </div>
  );
}
