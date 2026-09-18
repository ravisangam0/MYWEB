import { site } from "./site";

export type LegalDocument = {
  slug: "privacy-policy" | "refund-policy" | "replacement-policy" | "terms-and-conditions";
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

// EDITABLE COMPANY DETAILS — legal content
// Review this text with a legal advisor before publishing. Update "updated"
// whenever you change a document.
export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: `How ${site.name} collects, uses and protects information submitted through this website.`,
    updated: "2026",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "When you submit a contact request, callback request or service request, we collect the name, email address, phone number, business name and message you provide.",
          "For security and abuse prevention we store an irreversible hash of your network address together with basic browser information. We do not store your network address itself and do not use it for advertising or tracking.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "Submitted details are used only to respond to your enquiry, discuss your requirements and deliver services you request.",
          "We do not sell your information. We do not share it with third parties except where required to deliver a service you have asked for, or where required by law.",
        ],
      },
      {
        heading: "Storage and security",
        paragraphs: [
          "Requests are stored in a secured database that is not publicly readable. Access is restricted to authorised team members.",
          "All form submissions are validated on the server and rate limited to protect against abuse.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "This website sets one essential cookie to maintain your browsing session and apply security limits. It contains no personal information and expires automatically.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          `You may ask us to correct or delete the details you submitted by writing to ${site.email}. We will respond within a reasonable period.`,
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: "When refunds apply to project work and how to request one.",
    updated: "2026",
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          "This policy applies to services purchased directly from us. Specific terms agreed in a written project proposal or invoice take precedence over this page.",
        ],
      },
      {
        heading: "Before work begins",
        paragraphs: [
          "If you cancel a project before any design or development work has started, any advance paid is refundable after deduction of third-party costs already incurred on your behalf, such as domains, hosting or licences.",
        ],
      },
      {
        heading: "After work begins",
        paragraphs: [
          "Once work has started, amounts covering completed and delivered work are non-refundable. Any remaining unused balance may be refunded or credited against future work, as agreed in writing.",
        ],
      },
      {
        heading: "Third-party charges",
        paragraphs: [
          "Payments made to third parties — domain registrars, hosting providers, payment gateways, app stores, stock assets and licences — follow the refund rules of those providers and are outside our control.",
        ],
      },
      {
        heading: "How to request a refund",
        paragraphs: [
          `Email ${site.email} with your project reference and the reason for the request. We will respond within 7 working days.`,
        ],
      },
    ],
  },
  {
    slug: "replacement-policy",
    title: "Replacement Policy",
    summary: "How we handle corrections, rework and replacement of delivered work.",
    updated: "2026",
    sections: [
      {
        heading: "Defect corrections",
        paragraphs: [
          "If delivered work does not function as described in the agreed scope, we will correct it at no additional cost. Report the issue in writing with the details needed to reproduce it.",
        ],
      },
      {
        heading: "Correction period",
        paragraphs: [
          "Unless a different period is agreed in writing, defect corrections are covered for 30 days after delivery or launch, whichever is later.",
        ],
      },
      {
        heading: "What is not covered",
        paragraphs: [
          "New features, changes to agreed scope, content changes, and problems caused by third-party platform changes, edits made by others, or expired third-party services are treated as new work and quoted separately.",
        ],
      },
      {
        heading: "How to request a replacement",
        paragraphs: [
          `Write to ${site.email} or ${site.supportEmail} describing the issue. We will confirm whether it falls under corrections or new work before starting.`,
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary: `The terms that apply when you use this website or engage ${site.name}.`,
    updated: "2026",
    sections: [
      {
        heading: "Use of this website",
        paragraphs: [
          "This website is provided for information and enquiry purposes. You agree not to submit false information, attempt to disrupt the website, or use it for unlawful purposes.",
        ],
      },
      {
        heading: "Enquiries and quotations",
        paragraphs: [
          "Information on this website does not constitute a binding offer. Scope, pricing and timelines become binding only when confirmed in a written proposal or invoice accepted by both parties.",
        ],
      },
      {
        heading: "Client responsibilities",
        paragraphs: [
          "You are responsible for providing accurate content, timely feedback, necessary approvals and any access credentials required to complete the work. Delays in these may affect agreed timelines.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Unless agreed otherwise in writing, ownership of delivered work transfers to you once payment is complete. Third-party components remain under their own licences. We may reference completed work in our portfolio unless you ask us not to.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, our liability in connection with any engagement is limited to the amount paid for the affected service. We are not liable for indirect or consequential losses.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, and disputes fall under the jurisdiction of courts in West Champaran, Bihar.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms can be sent to ${site.email}.`],
      },
    ],
  },
];

export function getLegalDocument(slug: LegalDocument["slug"]) {
  return legalDocuments.find((document) => document.slug === slug)!;
}
