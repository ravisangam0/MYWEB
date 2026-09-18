import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { site } from "@/data/site";
import { socialLinks } from "@/data/social-links";

const pages = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Team", to: "/team" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const;

const legal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Refund Policy", to: "/refund-policy" },
  { label: "Replacement Policy", to: "/replacement-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="container-page py-14 md:py-20">
        <div className="flex flex-col gap-6 border-b border-border pb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something meaningful.
          </h2>
        </div>

        <div className="grid gap-10 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="text-sm text-primary">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.shortDescription}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                {site.address.full}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Pages">
            <p className="eyebrow">Pages</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {pages.map((page) => (
                <li key={page.to}>
                  <Link
                    to={page.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More">
            <p className="eyebrow">More</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={site.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Demo <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Support
                </a>
              </li>
            </ul>

            <p className="eyebrow mt-8">Follow</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <link.icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legal.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8">Hours</p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {site.businessHours.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.hours}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Founded {site.founded} · Narkatiaganj, Bihar, India</p>
        </div>
      </div>
    </footer>
  );
}
