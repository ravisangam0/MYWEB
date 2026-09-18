import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { canonicalLink, pageMeta } from "@/config/seo";
import { site } from "@/data/site";
import { activeTeam } from "@/data/team";

export const Route = createFileRoute("/team/")({
  head: () => ({
    meta: pageMeta({
      title: `Our Team | ${site.name}`,
      description:
        "Meet the people behind SD Digital Hub — development, design and digital marketing, working directly with every client.",
      path: "/team",
    }),
    links: canonicalLink("/team"),
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Team</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          The people doing the work
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {site.name} is deliberately small. You talk to the people building your project, not to an
          account manager passing messages along.
        </p>
      </header>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
        {activeTeam.map((member) => (
          <article key={member.id} className="group">
            <Link to="/team/$slug" params={{ slug: member.slug }} className="block">
              <div className="overflow-hidden rounded-xl border border-border bg-surface transition-colors group-hover:border-border-strong">
                <img
                  src={member.image}
                  alt={member.name}
                  width={912}
                  height={1200}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-semibold tracking-tight">{member.name}</h2>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.shortBio}
                </p>
                <p className="mt-3 text-xs text-subtle">Experience: {member.experience}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.skills.slice(0, 5).map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Full profile
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
