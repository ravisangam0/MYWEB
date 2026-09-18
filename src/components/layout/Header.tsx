import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const internalNav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Team", to: "/team" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
] as const;

const externalNav = [
  { label: "Blog", href: site.blogUrl },
  { label: "Demo", href: site.demoUrl },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-background",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-md bg-primary font-bold text-primary-foreground"
          >
            SD
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">{site.name}</span>
            <span className="block text-[11px] text-muted-foreground">{site.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {internalNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {externalNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallbackDialog>
            <Button size={scrolled ? "sm" : "default"} className="hidden sm:inline-flex">
              Request a Callback
            </Button>
          </CallbackDialog>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,22rem)] border-border bg-background">
              <SheetTitle className="px-4 pt-4 text-sm text-muted-foreground">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-2 flex flex-col px-2">
                {internalNav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{ className: "text-primary" }}
                      className="rounded-md px-4 py-3 text-lg font-medium transition-colors hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                {externalNav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md px-4 py-3 text-lg font-medium transition-colors hover:bg-surface"
                  >
                    {item.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </nav>
              <div className="mt-4 px-4">
                <CallbackDialog>
                  <Button className="w-full" onClick={() => setMenuOpen(false)}>
                    Request a Callback
                  </Button>
                </CallbackDialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
