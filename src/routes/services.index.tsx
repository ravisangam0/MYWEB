import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CallbackDialog } from "@/components/CallbackDialog";
import { ServiceIcon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { canonicalLink, pageMeta } from "@/config/seo";
import { activeServices } from "@/data/services";
import { site } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: pageMeta({
      title: `Services — Web, E-Commerce, Apps, SEO & Branding | ${site.name}`,
      description:
        "Website design and development, e-commerce stores, mobile apps, SEO and digital marketing, branding and graphic design — delivered by SD Digital Hub.",
      path: "/services",
    }),
    links: canonicalLink("/services"),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Services</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Digital work, delivered end to end
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Each service below is a complete engagement — planning, execution, testing and handover.
          Pick the one closest to your need; we&apos;ll tell you honestly if something else fits
          better.
        </p>
      </header>

      <div className="mt-16 space-y-16 md:space-y-24">
        {activeServices.map((service, index) => (
          <article
            key={service.id}
            className="grid items-center gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:gap-14"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="flex items-center gap-3">
                <ServiceIcon name={service.icon} className="size-5 text-primary" />
                <span className="font-mono text-xs text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {service.featured ? (
                  <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-primary">
                    Featured
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.title}
              </h2>
              <p className="mt-4 leading-relaxed text-secondary-foreground">
                {service.shortDescription}
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {service.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="text-sm text-muted-foreground">
                    · {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/services/$slug" params={{ slug: service.slug }}>
                    View service
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <CallbackDialog>
                  <Button variant="outline">Request a Callback</Button>
                </CallbackDialog>
              </div>
            </div>

            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className={`overflow-hidden rounded-xl border border-border transition-colors hover:border-border-strong ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
              aria-label={`View ${service.title}`}
            >
              <img
                src={service.image}
                alt={`${service.title} illustration`}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
