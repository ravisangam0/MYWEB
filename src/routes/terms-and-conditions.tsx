import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { canonicalLink, pageMeta } from "@/config/seo";
import { getLegalDocument } from "@/data/legal";
import { site } from "@/data/site";

const document = getLegalDocument("terms-and-conditions");

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: pageMeta({
      title: `Terms & Conditions | ${site.name}`,
      description: document.summary,
      path: "/terms-and-conditions",
    }),
    links: canonicalLink("/terms-and-conditions"),
  }),
  component: () => <LegalPage document={document} />,
});
