import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { canonicalLink, pageMeta } from "@/config/seo";
import { getLegalDocument } from "@/data/legal";
import { site } from "@/data/site";

const document = getLegalDocument("refund-policy");

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: pageMeta({
      title: `Refund Policy | ${site.name}`,
      description: document.summary,
      path: "/refund-policy",
    }),
    links: canonicalLink("/refund-policy"),
  }),
  component: () => <LegalPage document={document} />,
});
