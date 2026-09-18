import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import heroImage from "@/assets/hero.jpg";
import { CallbackDialog } from "@/components/CallbackDialog";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServiceIcon } from "@/components/Icon";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { Button } from "@/components/ui/button";
import { canonicalLink, jsonLd, pageMeta, seo } from "@/config/seo";
import { faqs } from "@/data/faqs";
import { activeServices } from "@/data/services";
import { about, site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({
      title: `${site.name} — ${site.tagline} | Digital Agency in Narkatiaganj, Bihar`,
      description:
        "SD Digital Hub is a digital agency in Narkatiaganj, West Champaran. We build websites, online stores, mobile apps, branding and search visibility for growing businesses.",
      path: "/",
    }),
    links: canonicalLink("/"),
    scripts: jsonLd({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.name,
      slogan: site.tagline,
      description: site.description,
      url: site.url,
      email: site.email,
      telephone: site.phone,
      foundingDate: site.founded,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Narkatiaganj",
        addressRegion: "Bihar",
        postalCode: "845455",
        addressCountry: "IN",
      },
      openingHours: "Mo-Sa 10:00-19:00",
      makesOffer: activeServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${seo.canonical}/services/${service.slug}`,
        },
      })),
    }),
  }),
  component: HomePage,
});

function HomePage() {
  const featured = activeServices.filter((service) => service.featured);
  const rest = activeServices.filter((service) => !service.featured);

  return (
    <>
      {/* Hero */}
      <section className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="reveal">
          <p className="eyebrow">Digital agency · Since {site.founded}</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            We build the digital side of your business —{" "}
            <span className="text-primary">properly.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground">
            Websites, online stores, mobile apps, branding and search visibility for businesses in
            Narkatiaganj and beyond. Built fast, built secure, and explained in plain language —
            with support that continues after launch.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CallbackDialog>
              <Button size="lg">
                Request a Callback
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </CallbackDialog>
            <Button asChild size="lg" variant="outline">
              <a href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                Book a Demo
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              "Direct contact with the people building it",
              "Performance and security by default",
              "Clear scope and pricing before work starts",
              "Support and maintenance after launch",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <img
              src={heroImage}
              alt="Abstract layered interface panels connected by thin lines, representing digital systems"
              width={1440}
              height={1088}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="container-page py-16 md:py-24" aria-labelledby="services-heading">
        <div className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">What we do</p>
            <h2
              id="services-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Services built around outcomes
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/services">
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featured.map((service) => (
            <Link
              key={service.id}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <img
                src={service.image}
                alt={`${service.title} illustration`}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <ServiceIcon name={service.icon} className="size-6 text-primary" />
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.shortDescription}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Explore service
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {rest.map((service) => (
            <Link
              key={service.id}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="group bg-background p-6 transition-colors hover:bg-surface"
            >
              <ServiceIcon name={service.icon} className="size-5 text-accent" />
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Details
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Capability / proof */}
      <section
        className="border-y border-border bg-surface/40"
        aria-labelledby="capabilities-heading"
      >
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow">Capabilities</p>
          <h2
            id="capabilities-heading"
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Everything your digital presence needs, under one roof
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-center gap-3 border-b border-border py-3 text-sm"
              >
                <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Workflow */}
      <section className="container-page py-16 md:py-24" aria-labelledby="workflow-heading">
        <p className="eyebrow">How we work</p>
        <h2
          id="workflow-heading"
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          A simple, predictable process
        </h2>
        <div className="mt-10">
          <WorkflowTimeline />
        </div>
      </section>

      {/* Why us */}
      <section className="container-page py-16 md:py-24" aria-labelledby="why-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Why {site.name}</p>
            <h2 id="why-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A small team, fully accountable
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{about.mission}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">
                More about us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {about.approach.map((item) => (
              <div key={item.title} className="bg-background p-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 md:py-24" aria-labelledby="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Questions, answered
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Still unsure about something? Ask us directly — we answer honestly, even when the
              answer is no.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-4">
        <div className="rounded-xl border border-border bg-surface p-8 md:p-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to start?</h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Tell us what you need. We&apos;ll reply within 24 hours with a clear next step — no
                obligation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CallbackDialog>
                <Button size="lg">Request a Callback</Button>
              </CallbackDialog>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
