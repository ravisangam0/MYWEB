// EDITABLE IMAGE — REPLACE THIS IMAGE: add real photos to src/assets/team/ and
// import them below instead of the shared placeholder.
import placeholderImage from "@/assets/team/placeholder.jpg";

export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  role: string;
  shortBio: string;
  fullBio: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
  image: string;
  socialLinks: { label: string; href: string }[];
  isActive: boolean;
  /** Ids from data/services.ts */
  relatedServiceIds: string[];
};

// EDITABLE TEAM MEMBERS
// These entries are placeholders with no invented achievements. Replace the
// names, roles, bios, experience and photos with real details, or set
// isActive: false to hide a member from the website.
export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Founder & Director",
    slug: "founder",
    role: "Founder & Director",
    shortBio: "Leads client conversations, project scoping and delivery at SD Digital Hub.",
    fullBio:
      "Responsible for how projects are scoped, priced and delivered. Works directly with every client from the first conversation through launch, and stays the point of contact for support afterwards. Replace this text with a real biography.",
    experience: "Add experience details here",
    skills: ["Client consulting", "Project scoping", "Digital strategy", "Delivery management"],
    responsibilities: [
      "First point of contact for new enquiries",
      "Defining project scope and timelines",
      "Quality review before launch",
      "Long-term client relationships",
    ],
    image: placeholderImage,
    socialLinks: [{ label: "LinkedIn", href: "#" }],
    isActive: true,
    relatedServiceIds: ["web-development", "ecommerce"],
  },
  {
    id: "developer",
    name: "Lead Developer",
    slug: "lead-developer",
    role: "Web & App Development",
    shortBio: "Builds the websites, stores and mobile applications we deliver.",
    fullBio:
      "Handles development across web and mobile — front-end interfaces, backend data, integrations and deployment. Focused on performance, security and code that the next developer can read. Replace this text with a real biography.",
    experience: "Add experience details here",
    skills: ["React", "Next.js", "TypeScript", "React Native", "PostgreSQL", "Tailwind CSS"],
    responsibilities: [
      "Front-end and backend development",
      "Database and integration work",
      "Performance and security checks",
      "Deployment and post-launch fixes",
    ],
    image: placeholderImage,
    socialLinks: [{ label: "LinkedIn", href: "#" }],
    isActive: true,
    relatedServiceIds: ["web-development", "ecommerce", "mobile-apps"],
  },
  {
    id: "designer",
    name: "Designer",
    slug: "designer",
    role: "Brand & Interface Design",
    shortBio: "Responsible for identity work, interface design and campaign assets.",
    fullBio:
      "Works on visual identity, interface design and the everyday assets clients need across print and social. Replace this text with a real biography.",
    experience: "Add experience details here",
    skills: ["Figma", "Brand identity", "UI design", "Illustration", "Print design"],
    responsibilities: [
      "Logo and identity systems",
      "Website and app interface design",
      "Social and print assets",
      "Design handover files",
    ],
    image: placeholderImage,
    socialLinks: [{ label: "Instagram", href: "#" }],
    isActive: true,
    relatedServiceIds: ["branding", "web-development"],
  },
  {
    id: "marketer",
    name: "Digital Marketing Lead",
    slug: "digital-marketing-lead",
    role: "SEO & Digital Marketing",
    shortBio: "Handles search visibility, local listings and campaign management.",
    fullBio:
      "Looks after technical SEO, local search presence, content planning and paid campaigns, along with the reporting that shows what each change produced. Replace this text with a real biography.",
    experience: "Add experience details here",
    skills: ["Technical SEO", "Local search", "Content planning", "Google Ads", "Analytics"],
    responsibilities: [
      "SEO audits and fixes",
      "Local business listings",
      "Campaign setup and optimisation",
      "Performance reporting",
    ],
    image: placeholderImage,
    socialLinks: [{ label: "LinkedIn", href: "#" }],
    isActive: true,
    relatedServiceIds: ["seo-marketing"],
  },
];

export const activeTeam = team.filter((member) => member.isActive);

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return activeTeam.find((member) => member.slug === slug);
}

export function getTeamMembersByIds(ids: readonly string[]): TeamMember[] {
  return activeTeam.filter((member) => ids.includes(member.id));
}
