# SD Digital Hub — Main Website

Production website for **SD Digital Hub** ("Your Digital Partner"), a digital agency
founded in 2026 in Narkatiaganj, West Champaran, Bihar, India.

Live: https://sddigitalhub.in
Blog (separate website): https://blog.sddigitalhub.in
Demo (separate website): https://demo.sddigitalhub.in

This repository contains the **main website only**. There is no admin panel, no CMS,
no chat system and no blog/demo content management here. The main website only links
to the blog and demo sites.

---

## Technology stack

| Concern    | Technology                                                              |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | TanStack Start v1 (React 19, file-based routing, server functions, SSR) |
| Build tool | Vite 7                                                                  |
| Language   | TypeScript                                                              |
| Styling    | Tailwind CSS v4 (semantic design tokens in `src/styles.css`)            |
| Icons      | Lucide                                                                  |
| UI         | Radix primitives (dialog, sheet, accordion)                             |
| Validation | Zod (client **and** server)                                             |
| Backend    | Lovable Cloud (PostgreSQL, Row Level Security)                          |
| Animation  | CSS transitions / keyframes only (no animation library needed)          |

> Note: the project brief specified Next.js. This project runs on TanStack Start,
> which provides the same capabilities (file-based routes, SSR, server-side
> functions, head/SEO metadata, sitemap and robots). Every requirement is
> implemented with the equivalent TanStack Start API.

---

## Folder structure

```
src/
  routes/
    __root.tsx                 header, footer, session ping, 404 + error states
    index.tsx                  home page
    services.index.tsx         /services
    services.$slug.tsx         /services/:slug  (+ service request form)
    team.index.tsx             /team
    team.$slug.tsx             /team/:slug
    about.tsx                  /about
    contact.tsx                /contact (no chat, by design)
    privacy-policy.tsx
    refund-policy.tsx
    replacement-policy.tsx
    terms-and-conditions.tsx
    sitemap[.]xml.tsx          dynamic /sitemap.xml
  components/
    layout/Header.tsx          responsive header, scroll-compacting
    layout/Footer.tsx          navigation, social, legal, closing CTA
    forms/RequestForm.tsx      one form used by contact, callback and service requests
    CallbackDialog.tsx         "Request a Callback" modal
    FaqAccordion.tsx
    WorkflowTimeline.tsx
    LegalPage.tsx
    Icon.tsx
    ui/                        shared primitives
  data/
    site.ts                    // EDITABLE COMPANY DETAILS
    services.ts                // EDITABLE SERVICES
    team.ts                    // EDITABLE TEAM MEMBERS
    social-links.ts            // EDITABLE SOCIAL LINKS
    workflow.ts                // EDITABLE WORKFLOW
    faqs.ts                    // EDITABLE FAQ
    legal.ts                   legal document content
  config/
    seo.ts                     // EDITABLE SEO DETAILS
  lib/
    validations.ts             shared Zod schemas
    requests.functions.ts      server functions: submit request, session tracking
  assets/
    hero.jpg, about.jpg, services/*.jpg, team/*.jpg
public/
  robots.txt
supabase/
  migrations/                  database schema
```

---

## Editing content (no database knowledge required)

### Services — `src/data/services.ts`

Marked `// EDITABLE SERVICES`. Each service is a plain TypeScript object:

```ts
{
  (id,
    title,
    slug,
    shortDescription,
    description,
    whatItIs,
    whoItIsFor,
    icon,
    image,
    benefits,
    technologies,
    featured,
    isActive,
    teamMemberIds);
}
```

- **Add** a service: copy an entry, change the values, give it a unique `id` and `slug`.
- **Hide** a service: set `isActive: false` (it disappears from `/services` and the sitemap).
- **Highlight** a service: set `featured: true` (larger card on the home page).
- **Change the image**: drop a new file into `src/assets/services/` and update the import at the top of the file.
- **Assign team members**: list their `id` values from `data/team.ts` in `teamMemberIds`.

Services are **code managed**. There are no service database tables and no admin panel for them.

### Team members — `src/data/team.ts`

Marked `// EDITABLE TEAM MEMBERS`. Each member has `id, name, slug, role, shortBio,
fullBio, experience, skills, responsibilities, image, socialLinks, isActive,
relatedServiceIds`. Set `isActive: false` to hide a member. Photos go in
`src/assets/team/` — the shipped entries use a neutral placeholder image and contain
no invented achievements, so replace them with real details.

The service ↔ team relationship is defined purely in TypeScript
(`teamMemberIds` / `relatedServiceIds`). No join table exists.

### Everything else

- Company name, tagline, phone, WhatsApp number, emails, address, business hours,
  blog/demo URLs, Google Analytics ID → `src/data/site.ts`
- Social profile URLs → `src/data/social-links.ts` (placeholders are `#`)
- Workflow steps → `src/data/workflow.ts`
- FAQ → `src/data/faqs.ts`
- Legal text → `src/data/legal.ts`
- SEO defaults → `src/config/seo.ts`

---

## Local development

```bash
npm install
npm run dev      # http://localhost:8080
npm run lint
npm run build
npm run preview
```

## Environment variables

See `.env.example`. Only public, browser-safe backend values are used in the app.
The service-role key and database password are never used, never committed and
never exposed to the browser.

Business values (site URL, WhatsApp number, blog/demo URLs, analytics ID) live in
`src/data/site.ts` rather than environment variables, so they are easy to find and edit.

---

## Database

Four tables, all created by the migration in `supabase/migrations/`:

| Table               | Purpose                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------- |
| `service_requests`  | service_name, name, email, phone, business_name, additional_details, status, timestamps |
| `contact_requests`  | name, email, phone, business_name, message, status, timestamps                          |
| `callback_requests` | name, email, phone, business_name, additional_details, status, timestamps               |
| `website_sessions`  | session_id, ip_hash, user_agent, created_at, last_seen_at, expires_at, is_active        |

`status` is an enum: `pending`, `completed`, `cancelled`.
Indexes exist on `status`, `created_at` and `ip_hash` for the request tables and on
`session_id`, `ip_hash`, `is_active`, `expires_at` for sessions. An
`update_updated_at_column()` trigger maintains `updated_at`.

There are **no** service, team, blog, demo, chat, CRM or admin tables.

### Row Level Security

RLS is enabled on all four tables and **no table grants read, update or delete
access to public visitors**. Submissions do not go through direct table inserts at
all — they go through a single validated, rate-limited database function
(`submit_website_request`) called from a server function. Session records are only
reachable through `touch_website_session`. Nothing submitted through the website can
be read back from the browser.

---

## Security

- **Server-side validation** of every field (length, email format, phone format) in
  the server function _and_ again inside the database function — browser validation
  is never trusted.
- **Rate limiting**: max 5 submissions per hour per visitor, enforced in the
  database (works correctly on serverless/edge deployments).
- **Session protection**: at most **3 active sessions per network address**. A
  session is created once per visitor and refreshed roughly every 10 minutes — page
  views do not create new sessions. Expired sessions stop counting and stale rows
  are cleaned up during the same call, so no scheduled job is required.
- **Privacy**: the raw IP address is never stored. Only a salted, irreversible
  SHA-256 hash is kept, used solely for rate limiting and the session limit.
- **Cookies**: one essential session cookie, `HttpOnly`, `Secure`, `SameSite=Lax`,
  30-minute expiry. No sensitive data in `localStorage`.
- **CSRF**: server functions run behind the framework CSRF middleware (`src/start.ts`).
- **Error handling**: raw database errors are logged server-side only; visitors see
  plain-language messages.
- **WhatsApp safety**: for service requests, WhatsApp only opens _after_ the database
  write succeeds. If the write fails, an error is shown and WhatsApp does not open.
- No service-role key, database password or private token exists in the codebase.

---

## SEO

- Per-route metadata via TanStack Start `head()`: title, description, canonical,
  Open Graph and Twitter/X tags — including dynamic metadata for
  `/services/:slug` and `/team/:slug`.
- Structured data: `LocalBusiness` with offers on the home page, `Service` on each
  service detail page. Only data that is actually visible is marked up.
- `/sitemap.xml` is generated from the code-managed services and team lists plus the
  static pages. Blog and demo URLs are intentionally excluded.
- `public/robots.txt` allows crawling and points at the sitemap.
- Semantic headings (one `h1` per page), descriptive alt text, internal linking.

## Analytics

Optional. Put a measurement ID in `googleAnalyticsId` in `src/data/site.ts` to
enable analytics; with an empty value the site works exactly as normal.

## Accessibility

Semantic landmarks, skip-to-content link, labelled form fields with inline error
messages, accessible modal and accordion (Radix), visible focus outlines, keyboard
navigable menus, and full support for `prefers-reduced-motion`.

---

## Deployment

Publish from Lovable, or deploy the repository to any host that supports the build
output (`npm run build`). For a custom domain, point `sddigitalhub.in` at the host
and confirm HTTPS is active. `src/data/site.ts` `url` must match the live domain so
canonical URLs and the sitemap stay correct.

## Troubleshooting

| Symptom                          | Check                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| Form shows "could not submit"    | Backend reachable; server logs for the failing database call |
| "Sent several requests recently" | Rate limit (5/hour per visitor) — expected behaviour         |
| Service missing from `/services` | `isActive: false` in `src/data/services.ts`                  |
| Team member missing              | `isActive: false` in `src/data/team.ts`                      |
| Map shows the wrong place        | Update `address.mapQuery` in `src/data/site.ts`              |
| Social icon leads nowhere        | Placeholder `#` in `src/data/social-links.ts`                |
