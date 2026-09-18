import brandingImage from "@/assets/services/branding.jpg";
import ecommerceImage from "@/assets/services/ecommerce.jpg";
import mobileAppsImage from "@/assets/services/mobile-apps.jpg";
import seoImage from "@/assets/services/seo-marketing.jpg";
import webDevelopmentImage from "@/assets/services/web-development.jpg";

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  whatItIs: string;
  whoItIsFor: string;
  /** Lucide icon name, rendered by src/components/Icon.tsx */
  icon: "Globe" | "ShoppingCart" | "Search" | "PenTool" | "Smartphone";
  image: string;
  benefits: string[];
  technologies: string[];
  featured: boolean;
  isActive: boolean;
  /** Ids from data/team.ts */
  teamMemberIds: string[];
};

// EDITABLE SERVICES
// Add, edit, reorder or remove services here. Set isActive: false to hide one
// without deleting it. featured: true gives the service a larger card.
// EDITABLE IMAGE — REPLACE THIS IMAGE: swap the files in src/assets/services/
export const services: Service[] = [
  {
    id: "web-development",
    title: "Website Design & Development",
    slug: "web-development",
    shortDescription:
      "Fast, responsive business websites built to be found, trusted and easy to update.",
    description:
      "We design and build websites that load quickly, read clearly on every screen size and are structured so search engines and customers can both make sense of them. Every build includes responsive layouts, accessible markup, SEO fundamentals, contact and enquiry forms, and a clear handover so your content can be updated without calling a developer for every change.",
    whatItIs:
      "A complete website project — planning, design, development, content structure, testing and launch — delivered as a maintainable codebase or managed platform, depending on what suits your team.",
    whoItIsFor:
      "Businesses with no website, an outdated one, or a site that looks fine but does not bring enquiries. Useful for service businesses, institutions, professionals and local brands.",
    icon: "Globe",
    image: webDevelopmentImage,
    benefits: [
      "Responsive on mobile, tablet and desktop",
      "Built for speed and Core Web Vitals",
      "Search-engine friendly structure and metadata",
      "Enquiry forms that reach you reliably",
      "Accessible, keyboard-friendly interfaces",
      "Documented handover and optional maintenance",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress", "PostgreSQL"],
    featured: true,
    isActive: true,
    teamMemberIds: ["founder", "developer"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Stores",
    slug: "ecommerce",
    shortDescription:
      "Online stores with clean product pages, secure checkout and simple order handling.",
    description:
      "We set up online stores that are straightforward for customers to buy from and straightforward for you to run. That includes product and category structure, cart and checkout, payment and delivery setup, order notifications, and the admin training needed so your team can manage stock and orders confidently from day one.",
    whatItIs:
      "A working online store — catalogue, cart, checkout, payments, shipping options and order management — configured and tested end to end.",
    whoItIsFor:
      "Retailers moving online, existing sellers outgrowing social-media ordering, and brands who want to sell directly instead of only through marketplaces.",
    icon: "ShoppingCart",
    image: ecommerceImage,
    benefits: [
      "Clear product and category structure",
      "Secure, tested checkout flow",
      "Payment gateway and delivery setup",
      "Order and stock management you can operate",
      "Mobile-first buying experience",
      "Ready for search and product listings",
    ],
    technologies: ["Shopify", "WooCommerce", "Next.js", "Razorpay", "Stripe"],
    featured: true,
    isActive: true,
    teamMemberIds: ["developer", "founder"],
  },
  {
    id: "seo-marketing",
    title: "SEO & Digital Marketing",
    slug: "seo-marketing",
    shortDescription:
      "Technical SEO, local search and campaigns that bring the right people to you.",
    description:
      "Visibility work in two parts. First the technical foundation: site structure, page speed, metadata, structured data, indexing and local business listings. Then ongoing promotion: keyword and content planning, local search presence, and paid campaigns on search and social where they make commercial sense. We report on what changed and what it produced.",
    whatItIs:
      "An audit, a fix list and an ongoing plan for being found — organically in search and, when useful, through paid campaigns.",
    whoItIsFor:
      "Businesses that have a website but little traffic, businesses invisible in local searches, and anyone spending on ads without knowing what is working.",
    icon: "Search",
    image: seoImage,
    benefits: [
      "Technical SEO audit and fixes",
      "Local search and business profile setup",
      "Keyword and content planning",
      "Structured data for rich results",
      "Campaign setup and tracking",
      "Plain-language reporting",
    ],
    technologies: [
      "Google Search Console",
      "Google Analytics",
      "Google Business Profile",
      "Meta Ads",
      "Google Ads",
    ],
    featured: false,
    isActive: true,
    teamMemberIds: ["marketer"],
  },
  {
    id: "branding",
    title: "Branding & Graphic Design",
    slug: "branding",
    shortDescription: "Logos, identity systems and everyday design assets that stay consistent.",
    description:
      "A brand is more than a logo — it is the set of decisions that make your business recognisable everywhere it appears. We develop logo and identity systems, define typography and colour, and produce the practical assets you need day to day: social templates, posters, packaging, signage and print-ready files, delivered with usage guidance.",
    whatItIs:
      "A visual identity and the working files that come with it, from the core mark to the templates your team reuses every week.",
    whoItIsFor:
      "New businesses defining their look for the first time, and established businesses whose materials have drifted into inconsistency.",
    icon: "PenTool",
    image: brandingImage,
    benefits: [
      "Logo and identity system",
      "Typography and colour guidelines",
      "Social media and campaign templates",
      "Print-ready files for signage and packaging",
      "Consistent look across every channel",
      "Editable source files handed over",
    ],
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva"],
    featured: false,
    isActive: true,
    teamMemberIds: ["designer"],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    slug: "mobile-apps",
    shortDescription: "Android and iOS apps from a single, maintainable codebase.",
    description:
      "For businesses that need more than a website, we build cross-platform mobile apps — one codebase producing both Android and iOS builds. Work covers interface design, offline-tolerant data handling, authentication, notifications, store submission and post-launch updates, with the same emphasis on performance and maintainability as our web work.",
    whatItIs:
      "A published mobile application with the backend, accounts and notification pieces it needs to work in the real world.",
    whoItIsFor:
      "Businesses with repeat customers, internal teams needing a field or operations tool, and products where a website alone is not enough.",
    icon: "Smartphone",
    image: mobileAppsImage,
    benefits: [
      "One codebase for Android and iOS",
      "Interface designed for real usage, not demos",
      "Secure accounts and data handling",
      "Push notifications where they help",
      "Store submission handled for you",
      "Post-launch updates and monitoring",
    ],
    technologies: ["React Native", "Flutter", "TypeScript", "Supabase", "Firebase"],
    featured: false,
    isActive: true,
    teamMemberIds: ["developer"],
  },
];

export const activeServices = services.filter((service) => service.isActive);

export function getServiceBySlug(slug: string): Service | undefined {
  return activeServices.find((service) => service.slug === slug);
}
