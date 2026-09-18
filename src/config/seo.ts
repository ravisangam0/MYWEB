import { site } from "@/data/site";

// EDITABLE SEO DETAILS
export const seo = {
  siteName: site.name,
  defaultTitle: `${site.name} — ${site.tagline}`,
  titleTemplate: (title: string) => `${title} | ${site.name}`,
  description: site.description,
  author: site.name,
  organization: site.name,
  canonical: site.url,
  ogImage: `${site.url}/og/sd-digital-hub.jpg`,
  twitterHandle: "",
  verification: {
    google: "",
    bing: "",
  },
} as const;

type MetaTag = Record<string, string>;

/** Builds the standard meta set for a page. */
export function pageMeta(options: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article" | "profile";
}): MetaTag[] {
  const title = options.title;
  const meta: MetaTag[] = [
    { title },
    { name: "description", content: options.description },
    { name: "author", content: seo.author },
    { property: "og:site_name", content: seo.siteName },
    { property: "og:title", content: title },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.type ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: options.description },
  ];
  if (options.path) {
    meta.push({ property: "og:url", content: `${seo.canonical}${options.path}` });
  }
  return meta;
}

export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: `${seo.canonical}${path}` }];
}

export function jsonLd(data: unknown) {
  return [{ type: "application/ld+json", children: JSON.stringify(data) }];
}
