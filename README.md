# PET Group Tutoring — Pursue Excellence Tutoring

**PET Group (Pty) Ltd** is a Pretoria-based tutoring company with 6 years of experience, VAT registered, operating from its own office in Lotus Gardens and offering online sessions nationwide.

**Live app:** https://pet-group-learn.lovable.app

---

## What the website does

| Section | Purpose |
| --- | --- |
| Hero | Brand introduction, logo, and a direct call to book a session |
| Credentials | 6 years of existence, VAT registered, own office |
| Subjects | Every curriculum we tutor, grouped by level |
| Support | Homework assistance, past papers, crossdays/crossnights, progress feedback |
| Pricing | One-on-one packages with tabs for 1 hour, 1h30, and 2 hour sessions |
| Online | How remote sessions work |
| About | Company story and teaching approach |
| Careers | Application form for tutors who want to join |
| Enquire | Enquiry form for undecided parents, plus WhatsApp option |
| Contact | Phone, email, address and map link |

## Subjects offered

- Mathematics — Grade 8 to 12 (CAPS)
- Varsity Mathematics — first and second year university modules
- College Civil Engineering — N1–N6 modules
- Cambridge & IEB Mathematics — IGCSE, AS/A Level, IEB
- Technical Mathematics — Grade 10 to 12
- Mathematical Literacy — Grade 10 to 12
- Physical Sciences — Grade 10 to 12
- Life Sciences — Grade 10 to 12
- Geography — Grade 10 to 12

## Pricing (one-on-one packages, per month)

A once-off **R100 registration fee** applies to all packages.

| Package | Frequency | 1 hour | 1h 30min | 2 hours |
| --- | --- | --- | --- | --- |
| Standard | 2 days / week (8 sessions) | R1 100 | R1 500 | R1 900 |
| Plus | 3 days / week (12 sessions) | R1 600 | R2 100 | R2 700 |
| Premium | 4 days / week (16 sessions) | R2 100 | R2 800 | R3 500 |
| Elite | 5 days / week (20 sessions) | R2 600 | R3 400 | R4 200 |

## Extra services

- Daily homework assistance and corrections
- Exam past-paper drilling with memo walkthroughs
- Crossdays and crossnights every exam season at our office
- Diagnostic assessments and regular progress reports for parents

## Contact

- **CEO:** Messiah Ndou
- **Phone / WhatsApp:** +27 71 576 8614
- **Email:** info@petgroup.co.za
- **Office:** 22 Amaranth Cres Street, Lotus Gardens, Pretoria, 0025

---

## Technical overview

Built with [Lovable](https://lovable.dev).

- **Framework:** TanStack Start (React 19, SSR) with Vite 7
- **Styling:** Tailwind CSS v4 with semantic design tokens in `src/styles.css`
- **Fonts:** Sora (headings) and Manrope (body)
- **Content:** all subjects, pricing and contact details live in `src/data/site.ts` — edit that one file to update the site
- **Pages:** `src/routes/index.tsx` (tutoring site), `src/routes/backpack.tsx` (3-in-1 Backpack store)
- **SEO:** per-route metadata plus JSON-LD so "PET Group" is findable on search engines
- **App install:** `public/manifest.webmanifest` lets parents install the site as an app on their phone

### Project structure

```
src/
  routes/       page routes (index, backpack) and root layout
  data/         site content: subjects, packages, contact, results
  components/   shared UI pieces
  styles.css    design tokens and global styles
public/         icons, manifest, robots.txt
```

### Running locally

You need Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

### Updating content

1. Prices and packages → `packageTiers` in `src/data/site.ts`
2. Subjects → `subjects` in `src/data/site.ts`
3. Contact details → `contact` in `src/data/site.ts`
4. Extra services → `services` in `src/data/site.ts`

## Continue building

Open the project in the [Lovable editor](https://lovable.dev/projects/d5dfe2bd-ad07-42f9-bc8f-b86ded70b321). Every change in Lovable is committed straight to this repository, and pushes to `main` on GitHub sync back into Lovable.
