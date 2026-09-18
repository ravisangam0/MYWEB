import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { canonicalLink, pageMeta } from "@/config/seo";
import { activeServices } from "@/data/services";
import { site } from "@/data/site";
import { getTeamMemberBySlug } from "@/data/team";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const member = getTeamMemberBySlug(params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Profile not found | ${site.name}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { member } = loaderData;
    return {
      meta: pageMeta({
        title: `${member.name} — ${member.role} | ${site.name}`,
        description: member.shortBio,
        path: `/team/${member.slug}`,
        type: "profile",
      }),
      links: canonicalLink(`/team/${member.slug}`),
    };
  },
  component: TeamMemberPage,
});

function TeamMemberPage() {
  const { member } = Route.useLoaderData();
  const related = activeServices.filter((service) => member.relatedServiceIds.includes(service.id));

  return (
    <article className="container-page py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/team" className="inline-flex items-center gap-1.5 hover:text-foreground">
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All team members
        </Link>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="reveal overflow-hidden rounded-xl border border-border bg-surface lg:sticky lg:top-28 lg:self-start">
          <img
            src={member.image}
            alt={member.name}
            width={912}
            height={1200}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">{member.role}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{member.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">{member.fullBio}</p>

          <dl className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Experience</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{member.experience}</dd>
            </div>
            <div>
              <dt className="eyebrow">Skills</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Responsibilities</h2>
            <ul className="mt-4 space-y-2.5">
              {member.responsibilities.map((item) => (
                <li
                  key={item}
                  className="border-b border-border pb-2.5 text-sm text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">Related services</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((service) => (
                  <li key={service.id}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-border-strong"
                    >
                      {service.title}
                      <ArrowRight
                        className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {member.socialLinks.length > 0 ? (
            <section className="mt-10">
              <h2 className="eyebrow">Connect</h2>
              <ul className="mt-3 flex flex-wrap gap-3">
                {member.socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-3">
            <CallbackDialog>
              <Button size="lg">Request a Callback</Button>
            </CallbackDialog>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact {site.name}</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
