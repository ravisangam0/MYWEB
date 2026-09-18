import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
  type LucideIcon,
} from "lucide-react";

import { site } from "./site";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

// EDITABLE SOCIAL LINKS
// Replace the "#" placeholders with real profile URLs. Remove any row you do not use.
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "WhatsApp", href: `https://wa.me/${site.whatsappNumber}`, icon: MessageCircle },
];
