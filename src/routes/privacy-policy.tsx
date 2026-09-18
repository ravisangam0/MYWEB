import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { canonicalLink, pageMeta } from "@/config/seo";
import { getLegalDocument } from "@/data/legal";
import { site } from "@/data/site";

const document = getLegalDocument("privacy-policy");

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: pageMeta({
      title: `Privacy Policy | ${site.name}`,
      description: document.summary,
      path: "/privacy-policy",
    }),
    links: canonicalLink("/privacy-policy"),
  }),
  component: () => <LegalPage document={document} />,
});
