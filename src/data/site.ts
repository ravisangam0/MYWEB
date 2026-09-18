// EDITABLE COMPANY DETAILS
// Everything a developer normally needs to change about the business lives here.

export const site = {
  name: "SD Digital Hub",
  tagline: "Your Digital Partner",
  founded: "2026",
  description:
    "SD Digital Hub is a digital agency based in Narkatiaganj, West Champaran, Bihar. We design, build and maintain websites, online stores, mobile apps and digital presence for businesses that want to be taken seriously online.",
  shortDescription:
    "A digital agency building websites, stores, apps and digital presence for growing businesses.",
  url: "https://sddigitalhub.in",
  blogUrl: "https://blog.sddigitalhub.in",
  demoUrl: "https://demo.sddigitalhub.in",
  email: "info@sddigitalhub.in",
  supportEmail: "support@sddigitalhub.in",
  phone: "+91 99733 62849",
  // Digits only, with country code. Used to open WhatsApp.
  whatsappNumber: "919973362849",
  address: {
    line1: "Narkatiaganj",
    line2: "West Champaran, Bihar 845455",
    country: "India",
    full: "Narkatiaganj, West Champaran, Bihar 845455, India",
    // Update these if you want the map to point at an exact location.
    mapQuery: "Narkatiaganj, West Champaran, Bihar 845455, India",
  },
  businessHours: [
    { days: "Monday – Saturday", hours: "10:00 – 19:00 IST" },
    { days: "Sunday", hours: "Closed" },
  ],
  // Optional Google Analytics measurement ID. Leave empty to disable analytics.
  googleAnalyticsId: "",
} as const;

// EDITABLE COMPANY DETAILS — story, mission, vision, approach
export const about = {
  story: [
    `${site.name} was founded in ${site.founded} in Narkatiaganj, West Champaran, with a simple observation: small and growing businesses in our region deserve the same quality of digital work that large companies pay for in metro cities.`,
    "We work as a small, hands-on team. Every project is handled directly by the people building it — no layers, no handovers, no guesswork. We prefer fewer projects done properly over many projects done quickly.",
  ],
  mission:
    "To give businesses a digital presence that is fast, secure, easy to maintain and genuinely useful — built with care and explained in plain language.",
  vision:
    "To become the digital partner that businesses across Bihar trust for long-term work, not one-time delivery.",
  approach: [
    {
      title: "Plain language first",
      body: "We explain what we are building, why it matters and what it costs before any work starts. No jargon, no surprises.",
    },
    {
      title: "Built to be maintained",
      body: "Clean, documented work that can be edited, extended and handed over. Your website should not depend on one person forever.",
    },
    {
      title: "Performance and security by default",
      body: "Fast loading, secure forms, protected data and accessible interfaces are part of the build, not paid add-ons.",
    },
    {
      title: "Long-term support",
      body: "We stay available after launch for changes, fixes and improvements as your business grows.",
    },
  ],
  capabilities: [
    "Website design & development",
    "E-commerce stores",
    "Mobile applications",
    "Search & digital marketing",
    "Branding & graphic design",
    "Hosting, domains & maintenance",
  ],
} as const;
