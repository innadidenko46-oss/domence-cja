# DOMENCE website: project rules

A marketing site in Polish for an installer of smart home systems, IP cameras and video intercoms. It is built with React, Vite, Tailwind v4 and React Router, and deployed by Vercel (`vercel.json`). Every page is prerendered to static HTML at build time, then React takes it over in the browser.

- **Adding a page:** add the route in `src/routes.tsx` (with `file`, the page's source, so the build preloads its code) **and** its title and description in `src/data/pages.json`. The build (`scripts/prerender.mjs`) writes `dist/<route>/index.html` with the page's content, title, description, canonical address and structured data, plus `404.html`, `sitemap.xml` and `robots.txt`. It stops when the two lists differ or a description is longer than 170 characters.
- **Titles and meta come only from `src/data/pages.json`** (the build, and `src/components/RouteMeta.tsx` for moves between pages). Don't set `document.title` anywhere else.
- **Search landing pages** (Warszawa, wideodomofon, zalanie, bez kucia) share one template, `src/pages/LandingPage.tsx`. Their copy lives in `src/data/landings.ts`. A new one needs an entry there, a route and a `pages.json` entry.
- **Old addresses:** `/pakiety`, `/multimedia` and `/kalkulator` are 308 redirects in `vercel.json`, also listed in `REDIRECTS` in `src/routes.tsx` (the build checks both match). Old `#/` links are rewritten in `src/main.tsx`.
- **Rendering on the server:** components must render the same on the build server and in the browser. Anything that depends on the address query, the window or the time goes in an effect or behind a "mounted" flag (see `src/pages/EnquiryPage.tsx`).

## Who the site is for

- **Decided buyers only.** The site is for people who definitely want a smart home and won't waste the team's time. Its job is to bring in qualified enquiries, not a high number of them.
- **One form.** The enquiry at `/zapytanie` (`src/components/EnquiryForm.tsx`) is the only form. `/kontakt` shows the contact details and sends visitors to the enquiry.
- **Keep the qualifying question.** The enquiry asks when the installation is planned (`INSTALL_TIMELINES` in `src/config/site.ts`). Don't remove it to make the form shorter.
- **E-mail only is a choice.** The visitor picks "Zadzwońcie" or "Tylko e-mail" (`src/components/ContactChoice.tsx`). With e-mail only, the phone is optional, the e-mail required, and the lead says "proszę nie dzwonić". Copy promising contact says "odezwiemy się", never "oddzwonimy".
- **No exact prices on the site for now.** Scope and price come after a call.
- **No fixed packages.** The first question everywhere is what the visitor wants: "Inteligentny dom", "Kamery i wideodomofon" or "Jedno i drugie" (`src/data/interests.ts`). The house stage (in construction or finished) is asked on step 2 of the enquiry, together with the size. `/jak-zaczac`, the home chooser and landing pages open `/zapytanie?chce=dom|kamery|oba` (optionally `&etap=budowa|gotowy`) at step 2; old `?state=` links still work.
- **Not a calculator.** The `/zapytanie` page is a short enquiry before the contact details. Never call it a "kalkulator" or an "ankieta".
- **One call to action, the same words everywhere:** `CTA` in `src/config/site.ts` ("Odbierz propozycję dla swojego domu", short form "Odbierz propozycję" in the header and the mobile bar). Never "Dobierz zestaw": the engineer proposes the scope after the call.

## Language

- **Words a non-technical client knows.** Write for clients who are not deep into the subject. Describe what the house does for them, e.g. "zakręca wodę, gdy czujnik wykryje wyciek", not the hardware behind it.
- **No model numbers, protocols or jargon in copy.** For example: 3EM-63T, BLU TRV, ANPR, DeepinViewX, mmWave, NVR, PoE, DALI-2, Gen3/Gen4, AI.
  - If a technical term is truly needed, put it in a secondary "Więcej szczegółów" spot and explain it in plain words next to it.
- **Polish typography.**
  - Sentence case in headings and labels, no capital-letter labels.
  - "i" instead of "&".
  - A non-breaking space after one-letter words (a, i, o, u, w, z). `node scripts/check-copy.mjs --fix` inserts the missing ones; the build fails without them.
- **Watch out for non-breaking spaces when editing copy.** Text replacements must match them: use the `[\s ]` regex, not a plain space.

## What the site may promise

- **Only automations and features Shelly and Hikvision products can deliver, and only ones the company actually installs.** That covers:
  - lighting, blinds and heating;
  - leak and gas detection with valve shut-off;
  - energy metering;
  - motion sensors;
  - cameras, video intercoms and access by face, card or code;
  - gate and garage control;
  - network equipment for these devices (cables to cameras, a cabinet, a separate network for the devices). We do not provide the internet connection or Wi-Fi for the household, so never promise "szybki internet" or "Wi-Fi w całym domu".
- **Not offered, never mention:**
  - garden watering;
  - alarm systems (no sirens, "intruz", arming);
  - surge protection as a service;
  - audio and music, multiroom sound, multimedia or home cinema (a "Film" scene with blinds and light is fine);
  - voice assistants and voice commands;
  - third-party locks;
  - EV chargers;
  - air conditioning;
  - internet connection or household Wi-Fi;
  - radar perimeter protection and AI search in recordings.
- **Never state that we work only with these two brands.** Describe features and benefits. Brand names may appear as product facts in secondary detail, but not as a limitation.
- **No claims about other companies.** Compare with typical solutions in neutral, factual words (e.g. "kamery na Wi-Fi z nagraniami w chmurze"), or list questions worth asking any installer.

## Company facts (2026-10)

- **New company.** No finished projects yet, so no "nasze realizacje", case studies, reviews or "gotowe domy" wording. Saying plainly that we are a new company is fine. Use stock photos only for rooms and devices, never as people or projects presented as ours.
- **Region:** Warszawa i okolice. Not the whole of Poland.
- **Before installation:** a free call and a free check of the house, then the plan and price in writing.
- **After installation the client gets only two things:**
  - training for the household;
  - free configuration.

  Do not promise schematics, measurement reports, documentation or service after the warranty.
- **Not on the site for now:** no warranty period, no PN-HD norm, no SEP qualifications. Checking drawings is possible but not a target offer, so don't advertise it.
- **Installation time** depends on the scope. The date is given in writing with the plan.
- **Lead engineer:** Yevhen Mukha, "Inżynier prowadzący", the client's one contact from the first call to the training. No photo yet, and don't use a stock portrait. The phone number is not shown for now.

## Content honesty

- **No invented facts.** Don't make up phone numbers, names, addresses, reviews, project counts or certifications.
- **Company details live in `src/config/site.json`** (read by the site through `src/config/site.ts` and by the build): address of the site, e-mail, phone, Telegram, response time, engineer, and the legal details (company name, address, NIP, REGON, KRS) shown in the footer, on `/kontakt`, in the privacy policy and in the structured data. Blocks that use empty fields stay hidden. Put in only real, working details.
- **Finished homes and client quotes** go in `FINISHED_HOMES` and `CLIENT_QUOTES` in `src/config/site.ts`. The home-page block stays hidden while both are empty. Add only real homes with their own photos, and quotes the client agreed in writing to publish.
- **Photos must match the text next to them.** No duplicate photos within one page. Stock photos are Unsplash ids shown through `src/components/Photo.tsx`.

## Privacy, statistics and security

- **Browser storage:** none. No cookies, no localStorage, so no consent banner. The enquiry answers are kept in memory only (`src/lib/enquiryDraft.ts`). Don't add storage or tracking cookies.
- **Privacy policy** is a page, `/polityka-prywatnosci` (`src/pages/PrivacyPage.tsx`), linked from the form and the footer. Update it when a new service handles visitor data.
- **Statistics:** Plausible without cookies, on only when `VITE_PLAUSIBLE_DOMAIN` is set (`src/lib/analytics.ts`). The goal is "Zapytanie" (an enquiry the form service accepted); "Zapytanie: krok" and "Zapytanie e-mailem" show the funnel, "Zapytanie: błąd" a form service that refused an enquiry.
- **Where an enquiry came from:** the lead carries the first and last page of the visit, UTM tags and the referring site (`src/lib/visitSource.ts`, memory only, no personal data), plus the exact consent text the visitor ticked.
- **Form service:** `VITE_FORM_ENDPOINT` (and `VITE_FORM_ACCESS_KEY` for Web3Forms). Without it the form says honestly that the visitor still has to send the prepared e-mail. A hidden field catches bots.
- **Build variables** are set in the Vercel project (Settings → Environment Variables); see `.env.example`. The build prints a warning while they are empty.
- **Security headers** (Content-Security-Policy and others) are in `vercel.json`. A new outside service (form, statistics, images) must be added to the policy. Inline scripts are not allowed, so the prerender keeps all HTML in place.
- **Fonts are self-hosted** (`@fontsource-variable`), no requests to Google.

## Design system (short)

- **Colours from the logo:**
  - petrol for buttons, icons and dark bands: `petrol-700` fills, `petrol-900` bands;
  - amber (the logo's orange) as the warm accent: `amber-700`/`amber-800` for small text on light backgrounds, `amber-600` for large emphasis, `amber-400` buttons (`.btn-accent`) only on dark bands;
  - the logo itself is two colours (petrol and amber), no blue and no gradients; its rules and files are in `docs/brand.md`, its geometry in `src/brand/brand.mjs` (regenerate files with `node scripts/build-brand.mjs`);
  - gray-50/white backgrounds, 2px radius.
- **Type:** Outfit for display, Plus Jakarta Sans for body. No monospace font anywhere. Body copy at least 16px (`text-base`) on phones.
- **Classes to reuse:**
  - `.eyebrow` for an occasional section label (sentence case), at most one per three sections;
  - `.btn-engineering-primary` (petrol) and `.btn-secondary` on light backgrounds, `.btn-accent` and the outline `.btn-on-dark` on dark bands (all 44px minimum height, in `@layer components` so utilities on the same element win).
  - The selected state of every choice, tab and card is petrol: `bg-petrol-50 border-petrol-700 ring-1 ring-petrol-700`.
- **Motion:** CSS only (`index.css`: `.hero-stagger`, `.reveal`, `animate-fade-up`), transform and opacity, nothing hidden before JavaScript runs, all off under reduced motion. No animation library.
- **Tabs and accordions** keep every panel in the HTML and hide the closed ones with `hidden`, so search engines read all the copy.
- **Text contrast:** at least 4.5:1. Don't use `gray-400` text on light backgrounds.

## Checks before committing

- `npm run lint` (`tsc --noEmit`) and `npm run build` pass. The build runs `scripts/check-copy.mjs` first: it reads only copy (JSX text, strings, `pages.json`, `site.json`) and fails on copy that breaks the rules above (warranty, alarms, audio, EV, jargon, "oddzwonimy", "ankieta"/"kalkulator", track-record claims and similar) or misses a non-breaking space. Fix the copy, don't loosen the rule.
- `npm run preview` serves the built site the way Vercel does (redirects, 404, headers) on port 4173.
- GitHub Actions (`.github/workflows/ci.yml`) runs the same checks on every push and pull request.
- What only the owner can do before launch (domain, e-mail, form service, legal details) is in `docs/launch-checklist.md`.
