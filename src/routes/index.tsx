import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

import logo from "@/assets/pet-logo.jpeg.asset.json";
import sessionPhoto from "@/assets/tutoring-session.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  company,
  contact,
  packageTiers,
  registrationFee,
  services,
  subjects,
  tutorSubjectOptions,
} from "@/data/site";

const title = "PET Group Tutoring | Maths, Sciences & Engineering Tutors Pretoria";
const description =
  "PET Group (Pty) Ltd — Pursue Excellence Tutoring in Lotus Gardens, Pretoria. Maths Grade 8-12, Technical Maths, Maths Lit, Cambridge & IEB, varsity maths, civil engineering modules, Physical & Life Sciences and Geography. In-person and online sessions.";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "PET Group (Pty) Ltd — Pursue Excellence Tutoring",
          alternateName: ["PET Group", "Pursue Excellence Tutoring"],
          description,
          slogan: "Unlocking a learner's academic potential",
          telephone: contact.phone,
          email: contact.email,
          founder: { "@type": "Person", name: contact.ceo, jobTitle: "CEO" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "22 Amaranth Cres Street",
            addressLocality: "Lotus Gardens, Pretoria",
            postalCode: "0025",
            addressCountry: "ZA",
          },
          areaServed: "Pretoria, Gauteng and online across South Africa",
        }),
      },
    ],
  }),
});

const navLinks = [
  { href: "#subjects", label: "Subjects" },
  { href: "#support", label: "Support" },
  { href: "#pricing", label: "Pricing" },
  { href: "#online", label: "Online" },
  { href: "#careers", label: "Careers" },
  { href: "#enquire", label: "Enquire" },
  { href: "#contact", label: "Contact" },
];

const mailto = (subject: string, body: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function HomePage() {
  const [activeTier, setActiveTier] = useState(packageTiers[1]!.id);
  const tier = packageTiers.find((t) => t.id === activeTier) ?? packageTiers[0]!;

  const [tutor, setTutor] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    subjectsTaught: "",
    experience: "",
  });
  const [enquiry, setEnquiry] = useState({
    parent: "",
    email: "",
    phone: "",
    grade: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="PET Group Pursue Excellence Tutoring logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold text-primary sm:text-base">
                PET Group (Pty) Ltd
              </span>
              <span className="block text-xs text-muted-foreground">Pursue Excellence Tutoring</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm">
            <a href={contact.phoneHref}>Call us</a>
          </Button>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="bg-hero-gradient text-primary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" /> Unlocking a learner's potential
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                Maths, Sciences &amp; Engineering tutoring that lifts marks
              </h1>
              <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
                From Grade 8 Mathematics to varsity modules and TVET Civil Engineering — taught in
                small one-on-one sessions in Lotus Gardens, Pretoria, or online anywhere in South
                Africa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <a href="#pricing">See packages &amp; prices</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp {contact.phone}
                  </a>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
                {[
                  { k: "Grades 8–12", v: "CAPS, IEB & Cambridge" },
                  { k: "Varsity", v: "Maths & engineering" },
                  { k: "Online", v: "Live virtual classes" },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="font-display font-bold">{item.k}</dt>
                    <dd className="text-primary-foreground/75">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <img
                src={sessionPhoto.url}
                alt="PET Group tutor teaching inverse functions to learners in a group session"
                className="w-full rounded-3xl object-cover shadow-soft"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section id="subjects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              What we teach
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Subjects &amp; modules</h2>
            <p className="mt-4 text-muted-foreground">
              Every learner is placed with a tutor who specialises in their curriculum and grade.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <article
                key={subject.title}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
              >
                <BookOpen className="h-6 w-6 text-secondary" />
                <h3 className="mt-4 text-lg font-bold">{subject.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                  {subject.levels}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{subject.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                One-on-one packages
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Monthly tutoring prices</h2>
              <p className="mt-4 text-muted-foreground">
                Choose your session length, then the number of days per week. All packages are
                billed monthly and include a once-off registration fee of R{registrationFee}.
              </p>
            </div>

            <div className="mt-8 inline-flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2">
              {packageTiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTier(t.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    t.id === activeTier
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t.duration}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{tier.note}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tier.packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`relative flex flex-col rounded-3xl p-6 ${
                    pkg.featured
                      ? "bg-card-gradient text-primary-foreground shadow-soft"
                      : "border border-border bg-card"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                      Popular
                    </span>
                  )}
                  <h3 className="font-display text-lg font-bold">{pkg.name} Package</h3>
                  <ul
                    className={`mt-4 space-y-2 text-sm ${
                      pkg.featured ? "text-primary-foreground/90" : "text-muted-foreground"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {pkg.days}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {pkg.sessions}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {tier.duration}
                    </li>
                  </ul>
                  <p className="mt-6 font-display text-3xl font-extrabold">
                    R{pkg.price.toLocaleString("en-ZA")}
                    <span className="text-sm font-semibold"> /month</span>
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      pkg.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    Plus R{registrationFee} once-off registration
                  </p>
                  <Button
                    asChild
                    className="mt-6"
                    variant={pkg.featured ? "secondary" : "default"}
                  >
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        `${pkg.name} Package enquiry (${tier.duration})`,
                      )}`}
                    >
                      Enrol now
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Online */}
        <section id="online" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Learn from anywhere
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Online tutoring sessions</h2>
              <p className="mt-4 text-muted-foreground">
                Can't get to Lotus Gardens? We run the same one-on-one packages as live online
                sessions with a shared digital whiteboard, recorded notes and homework follow-up.
                Online pricing matches the in-person packages above.
              </p>
              <Button asChild className="mt-6">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Book an online session
                </a>
              </Button>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Monitor, t: "Live video lessons", d: "Interactive whiteboard tutoring." },
                { icon: CalendarCheck, t: "Flexible times", d: "Afternoons, evenings and weekends." },
                { icon: Users, t: "One-on-one focus", d: "Full tutor attention every session." },
                { icon: GraduationCap, t: "Exam prep", d: "Past papers, tests and memo walkthroughs." },
              ].map((item) => (
                <li key={item.t} className="rounded-2xl bg-muted/70 p-5">
                  <item.icon className="h-5 w-5 text-secondary" />
                  <h3 className="mt-3 text-base font-bold">{item.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                More information
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">About PET Group</h2>
              <p className="mt-4 text-muted-foreground">
                PET Group (Pty) Ltd trades as Pursue Excellence Tutoring, a Pretoria-based tutoring
                company founded to unlock every learner's academic potential. We specialise in the
                subjects learners fear most — Mathematics, Physical Sciences and Life Sciences —
                and extend that support to Technical Mathematics, Mathematical Literacy, Geography,
                Cambridge and IEB curricula, university mathematics and TVET Civil Engineering
                modules.
              </p>
              <p className="mt-4 text-muted-foreground">
                Sessions are structured: diagnostic assessment first, then a term plan, weekly
                sessions, homework checks and past-paper exam preparation. Parents receive progress
                feedback so you always know where your child stands.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8">
              <h3 className="font-display text-xl font-bold">Information for parents</h3>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Who tutors?</strong> Subject specialists led
                  by our CEO, {contact.ceo}.
                </li>
                <li>
                  <strong className="text-foreground">How do I register?</strong> Call or WhatsApp{" "}
                  {contact.phone}, or email {contact.email}. Registration is R{registrationFee}{" "}
                  once-off.
                </li>
                <li>
                  <strong className="text-foreground">Where are sessions held?</strong> At{" "}
                  {contact.address}, or online.
                </li>
                <li>
                  <strong className="text-foreground">Can we change packages?</strong> Yes —
                  upgrade or downgrade at the start of any month.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Speak to us today</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <a
              href={contact.phoneHref}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
            >
              <Phone className="h-6 w-6 text-secondary" />
              <h3 className="mt-4 font-bold">Call or WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {contact.ceo} (CEO)
                <br />
                {contact.phone}
              </p>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
            >
              <Mail className="h-6 w-6 text-secondary" />
              <h3 className="mt-4 font-bold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">{contact.email}</p>
            </a>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
            >
              <MapPin className="h-6 w-6 text-secondary" />
              <h3 className="mt-4 font-bold">Visit us</h3>
              <p className="mt-1 text-sm text-muted-foreground">{contact.address}</p>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-hero-gradient text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="PET Group logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="text-sm">
              <p className="font-display font-bold">PET Group (Pty) Ltd</p>
              <p className="text-primary-foreground/80">Unlocking a learner's academic potential</p>
            </div>
          </div>
          <div className="text-sm text-primary-foreground/85">
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.address}</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 py-4 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} PET Group (Pty) Ltd — Pursue Excellence Tutoring
        </div>
      </footer>
    </div>
  );
}
