import { createFileRoute } from "@tanstack/react-router";

import { activeServices } from "@/data/services";
import { site } from "@/data/site";
import { activeTeam } from "@/data/team";

const staticPaths = [
  "/",
  "/services",
  "/team",
  "/about",
  "/contact",
  "/privacy-policy",
  "/refund-policy",
  "/replacement-policy",
  "/terms-and-conditions",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...staticPaths,
          ...activeServices.map((service) => `/services/${service.slug}`),
          ...activeTeam.map((member) => `/team/${member.slug}`),
        ];

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) =>
      `  <url><loc>${site.url}${path === "/" ? "/" : path}</loc><changefreq>monthly</changefreq><priority>${
        path === "/" ? "1.0" : "0.7"
      }</priority></url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
