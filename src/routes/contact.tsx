import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { RequestForm } from "@/components/forms/RequestForm";
import { canonicalLink, pageMeta } from "@/config/seo";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: `Contact Us — ${site.name}, Narkatiaganj`,
      description:
        "Contact SD Digital Hub in Narkatiaganj, West Champaran. Phone, WhatsApp, email, business hours, location map and an enquiry form answered within 24 hours.",
      path: "/contact",
    }),
    links: canonicalLink("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Contact us</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Tell us what you need
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Send your details and a short description of your requirement. A team member replies
          within 24 hours — by phone, WhatsApp or email, whichever suits you.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <section aria-labelledby="contact-form-heading">
          <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <h2 id="contact-form-heading" className="text-2xl font-semibold tracking-tight">
              Send a contact request
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">Fields marked with * are required.</p>
            <div className="mt-6">
              <RequestForm
                kind="contact"
                submitLabel="Send request"
                detailsLabel="Additional details"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-details-heading" className="space-y-8">
          <div>
            <h2 id="contact-details-heading" className="text-2xl font-semibold tracking-tight">
              Contact details
            </h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-subtle">Phone</span>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {site.phone}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-subtle">WhatsApp</span>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Message us on WhatsApp
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-subtle">Email</span>
                  <a href={`mailto:${site.email}`} className="hover:text-primary">
                    {site.email}
                  </a>
                  <br />
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {site.supportEmail} (support)
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-subtle">Address</span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-subtle">Business hours</span>
                  {site.businessHours.map((entry) => (
                    <span key={entry.days} className="block">
                      {entry.days}: {entry.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title={`Map showing ${site.address.full}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
