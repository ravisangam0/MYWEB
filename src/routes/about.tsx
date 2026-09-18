import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import aboutImage from "@/assets/about.jpg";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { Button } from "@/components/ui/button";
import { canonicalLink, pageMeta } from "@/config/seo";
import { about, site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: `About Us — Digital Agency in Narkatiaganj | ${site.name}`,
      description:
        "SD Digital Hub was founded in 2026 in Narkatiaganj, West Champaran. Our story, mission, vision, capabilities and how we work with clients.",
      path: "/about",
    }),
    links: canonicalLink("/about"),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pb-4">
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow">About us</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A digital partner built in Narkatiaganj, for businesses everywhere
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-secondary-foreground">
              {about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <img
              src={aboutImage}
              alt="Abstract layered geometric planes representing a digital studio workflow"
              width={1200}
              height={912}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/40">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">Mission</p>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              {about.mission}
            </p>
          </div>
          <div>
            <p className="eyebrow">Vision</p>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              {about.vision}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What we cover
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Founded {site.founded} · {site.address.full}
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {about.capabilities.map((capability) => (
              <li key={capability} className="border-b border-border py-4 text-base">
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <p className="eyebrow">Our approach</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          How we work with clients
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {about.approach.map((item) => (
            <div key={item.title} className="bg-background p-6">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 md:pb-24">
        <p className="eyebrow">Process</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          From first call to launch
        </h2>
        <div className="mt-10">
          <WorkflowTimeline />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/contact">
              Talk to us
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/services">See services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
