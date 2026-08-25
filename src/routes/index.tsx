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

        {/* Credentials */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                t: `${company.yearsActive} years of existence`,
                d: "Established tutoring track record with Pretoria families.",
              },
              {
                icon: BadgeCheck,
                t: "VAT registered company",
                d: "PET Group (Pty) Ltd — proper invoices for every payment.",
              },
              {
                icon: Building2,
                t: "Our own office",
                d: contact.address,
              },
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-3">
                <span className="rounded-xl bg-secondary/10 p-2.5 text-secondary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{item.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
                </div>
              </div>
            ))}
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

        {/* Support */}
        <section id="support" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Beyond weekly lessons
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Homework, past papers &amp; exam camps</h2>
              <p className="mt-4 text-muted-foreground">
                Included with every package — the extra support that turns understanding into marks.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft"
                >
                  <ClipboardList className="h-6 w-6 text-secondary" />
                  <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-card-gradient p-8 text-primary-foreground md:p-10">
              <h3 className="font-display text-2xl font-bold">Exam season crossdays &amp; crossnights</h3>
              <p className="mt-3 max-w-3xl text-primary-foreground/90">
                Every exam season we open our Lotus Gardens office for marathon revision sessions —
                full-day crossdays and supervised crossnights where learners work through past
                papers, memos and problem sets with tutors on hand from start to finish.
              </p>
              <Button asChild className="mt-6" variant="secondary">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Ask about the next crossnight
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing */}

        <section id="pricing" className="py-16 md:py-24">
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
                company with {company.yearsActive} years of existence, VAT registered, and operating
                from our own office at {contact.address}. We specialise in the subjects learners
                fear most — Mathematics, Physical Sciences and Life Sciences — and extend that
                support to Technical Mathematics, Mathematical Literacy, Geography, Cambridge and
                IEB curricula, university mathematics and TVET Civil Engineering modules.
              </p>
              <p className="mt-4 text-muted-foreground">
                Sessions are structured: diagnostic assessment first, then a term plan, weekly
                sessions, homework assistance, past-paper exam preparation and exam-season
                crossdays and crossnights. Parents receive progress feedback so you always know
                where your child stands.
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

        {/* Careers */}
        <section id="careers" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Careers at PET Group
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Become a PET Group tutor</h2>
              <p className="mt-4 text-muted-foreground">
                We are always looking for strong, patient subject specialists to join our team in
                Lotus Gardens and online. If you know your content and love teaching, we want to
                hear from you.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "Relevant qualification or current studies in your subject",
                  "Grade 8–12 CAPS, IEB, Cambridge, TVET or varsity content mastery",
                  "Available for afternoons, weekends and exam-season crossdays",
                  "Professional, reliable and great with learners and parents",
                ].map((req) => (
                  <li key={req} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    {req}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Subjects in demand: {tutorSubjectOptions.join(", ")}.
              </p>
            </div>

            <form
              className="rounded-3xl border border-border bg-card p-6 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailto(
                  `Tutor application — ${tutor.name || "PET Group"}`,
                  [
                    `Name: ${tutor.name}`,
                    `Email: ${tutor.email}`,
                    `Phone: ${tutor.phone}`,
                    `Qualification: ${tutor.qualification}`,
                    `Subjects: ${tutor.subjectsTaught}`,
                    "",
                    "Experience:",
                    tutor.experience,
                  ].join("\n"),
                );
              }}
            >
              <h3 className="font-display text-xl font-bold">Apply to tutor with us</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete the form and we&apos;ll open an email to {contact.email} with your details.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="tutor-name">Full name</Label>
                  <Input
                    id="tutor-name"
                    required
                    value={tutor.name}
                    onChange={(e) => setTutor({ ...tutor, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tutor-phone">Phone number</Label>
                  <Input
                    id="tutor-phone"
                    required
                    value={tutor.phone}
                    onChange={(e) => setTutor({ ...tutor, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="tutor-email">Email address</Label>
                  <Input
                    id="tutor-email"
                    type="email"
                    required
                    value={tutor.email}
                    onChange={(e) => setTutor({ ...tutor, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tutor-qual">Highest qualification</Label>
                  <Input
                    id="tutor-qual"
                    value={tutor.qualification}
                    onChange={(e) => setTutor({ ...tutor, qualification: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tutor-subjects">Subjects you can teach</Label>
                  <Input
                    id="tutor-subjects"
                    value={tutor.subjectsTaught}
                    onChange={(e) => setTutor({ ...tutor, subjectsTaught: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="tutor-exp">Teaching experience</Label>
                  <Textarea
                    id="tutor-exp"
                    rows={4}
                    value={tutor.experience}
                    onChange={(e) => setTutor({ ...tutor, experience: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full sm:w-auto">
                Send application
              </Button>
            </form>
          </div>
        </section>

        {/* Parent enquiry */}
        <section id="enquire" className="bg-muted/60 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Not sure yet?
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Parent enquiry</h2>
              <p className="mt-4 text-muted-foreground">
                If you&apos;re unsure which package, subject or session length suits your child,
                send us an enquiry. We&apos;ll advise honestly — no obligation, no pressure.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-secondary" /> {contact.phone} ({contact.ceo}, CEO)
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-secondary" /> {contact.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" /> {contact.address}
                </p>
              </div>
            </div>
            <form
              className="rounded-3xl border border-border bg-card p-6 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailto(
                  `Parent enquiry — ${enquiry.parent || "PET Group"}`,
                  [
                    `Parent / guardian: ${enquiry.parent}`,
                    `Email: ${enquiry.email}`,
                    `Phone: ${enquiry.phone}`,
                    `Grade / subject: ${enquiry.grade}`,
                    "",
                    "Question:",
                    enquiry.message,
                  ].join("\n"),
                );
              }}
            >
              <h3 className="font-display text-xl font-bold">Ask us a question</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="p-name">Your name</Label>
                  <Input
                    id="p-name"
                    required
                    value={enquiry.parent}
                    onChange={(e) => setEnquiry({ ...enquiry, parent: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-phone">Phone number</Label>
                  <Input
                    id="p-phone"
                    required
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-email">Email address</Label>
                  <Input
                    id="p-email"
                    type="email"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-grade">Grade &amp; subject</Label>
                  <Input
                    id="p-grade"
                    placeholder="e.g. Grade 11 Maths"
                    value={enquiry.grade}
                    onChange={(e) => setEnquiry({ ...enquiry, grade: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="p-msg">Your question</Label>
                  <Textarea
                    id="p-msg"
                    rows={4}
                    required
                    value={enquiry.message}
                    onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="submit">Send enquiry</Button>
                <Button asChild variant="outline">
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp us instead
                  </a>
                </Button>
              </div>
            </form>
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
