import { Globe, PenTool, Search, ShoppingCart, Smartphone } from "lucide-react";

import type { Service } from "@/data/services";

const icons = { Globe, ShoppingCart, Search, PenTool, Smartphone };

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Component = icons[name] ?? Globe;
  return <Component className={className} aria-hidden="true" />;
}
