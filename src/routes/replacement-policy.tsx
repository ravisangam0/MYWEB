import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { canonicalLink, pageMeta } from "@/config/seo";
import { getLegalDocument } from "@/data/legal";
import { site } from "@/data/site";

const document = getLegalDocument("replacement-policy");

export const Route = createFileRoute("/replacement-policy")({
  head: () => ({
    meta: pageMeta({
      title: `Replacement Policy | ${site.name}`,
      description: document.summary,
      path: "/replacement-policy",
    }),
    links: canonicalLink("/replacement-policy"),
  }),
  component: () => <LegalPage document={document} />,
});
