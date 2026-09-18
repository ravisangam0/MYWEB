import type { LegalDocument } from "@/data/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{document.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{document.summary}</p>
        <p className="mt-3 text-sm text-subtle">Last updated: {document.updated}</p>
      </header>

      <div className="mt-14 max-w-3xl space-y-12">
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
