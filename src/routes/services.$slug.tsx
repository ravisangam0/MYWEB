import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { RequestForm } from "@/components/forms/RequestForm";
import { ServiceIcon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { canonicalLink, jsonLd, pageMeta, seo } from "@/config/seo";
import { getServiceBySlug } from "@/data/services";
import { site } from "@/data/site";
import { getTeamMembersByIds } from "@/data/team";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Service not found | ${site.name}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    return {
      meta: pageMeta({
        title: `${service.title} | ${site.name}`,
        description: service.shortDescription,
        path: `/services/${service.slug}`,
        type: "article",
      }),
      links: canonicalLink(`/services/${service.slug}`),
      scripts: jsonLd({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        url: `${seo.canonical}/services/${service.slug}`,
        provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
        areaServed: "India",
      }),
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const members = getTeamMembersByIds(service.teamMemberIds);

  return (
    <article className="pb-4">
      <div className="container-page pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/services" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All services
          </Link>
        </nav>

        <header className="mt-8 max-w-3xl reveal">
          <div className="flex items-center gap-3">
            <ServiceIcon name={service.icon} className="size-6 text-primary" />
            <p className="eyebrow">Service</p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
            {service.shortDescription}
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-xl border border-border">
          <img
            src={service.image}
            alt={`${service.title} illustration`}
            width={1200}
            height={800}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>

      <div className="container-page mt-14 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>
          </section>

          <section className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">What this is</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.whatItIs}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Who it&apos;s useful for</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.whoItIsFor}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">What you get</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm text-secondary-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Tools &amp; technologies</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {members.length > 0 ? (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Who you&apos;ll work with</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {members.map((member) => (
                  <li key={member.id}>
                    <Link
                      to="/team/$slug"
                      params={{ slug: member.slug }}
                      className="group flex gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        width={912}
                        height={1200}
                        loading="lazy"
                        className="size-16 rounded-md object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block font-medium">{member.name}</span>
                        <span className="block text-sm text-muted-foreground">{member.role}</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary">
                          View profile
                          <ArrowRight
                            className="size-3 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">Request this service</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll save your request and open WhatsApp so you can send it straight to our
              team.
            </p>
            <div className="mt-6">
              <RequestForm
                kind="service"
                serviceName={service.title}
                submitLabel="Request Service"
                detailsLabel="Additional details"
              />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
