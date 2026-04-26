import { Link } from "react-router-dom";
import { Instagram, MapPin, CalendarHeart, UtensilsCrossed, Phone } from "lucide-react";
import heroRooftop from "@/assets/hero-rooftop.jpg";
import MiramarLogo from "@/components/MiramarLogo";
import StatusBadge from "@/components/StatusBadge";

interface LinkItem {
  label: string;
  sub?: string;
  icon: typeof Instagram;
  href: string;
  to?: string;
  variant?: "primary" | "ghost";
  external?: boolean;
}

const links: LinkItem[] = [
  {
    label: "Ver cardápio",
    sub: "Petiscos, entradas e massas",
    icon: UtensilsCrossed,
    href: "/cardapio",
    to: "/cardapio",
    variant: "primary",
  },
  {
    label: "Fazer reserva",
    sub: "Garanta sua mesa ao pôr do sol",
    icon: CalendarHeart,
    href: "#",
  },
  {
    label: "@miramar.rooftop",
    sub: "Acompanhe nossas experiências",
    icon: Instagram,
    href: "#",
    external: true,
  },
  {
    label: "Como chegar",
    sub: "São Luís — MA",
    icon: MapPin,
    href: "#",
    external: true,
  },
  {
    label: "Falar com o restaurante",
    sub: "WhatsApp",
    icon: Phone,
    href: "#",
    external: true,
  },
];

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img
          src={heroRooftop}
          alt="Rooftop Miramar ao pôr do sol em São Luís"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-ocean" />
      </div>

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-md flex-col justify-end px-6 pb-8 pt-6">
        {/* Links */}
        <nav className="flex flex-col gap-2.5">
          {links.map((item, idx) => {
            const Icon = item.icon;
            const isPrimary = item.variant === "primary";
            const baseClasses =
              "group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-smooth animate-fade-up";
            const styleClasses = isPrimary
              ? "border-transparent bg-gradient-sunset text-primary-foreground shadow-glow hover:scale-[1.02]"
              : "border-border bg-surface/70 text-foreground backdrop-blur hover:bg-surface-elevated hover:border-accent/40";

            const content = (
              <>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isPrimary
                      ? "bg-primary-foreground/15"
                      : "bg-background/40 text-accent"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{item.label}</span>
                  {item.sub && (
                    <span
                      className={`block text-xs ${
                        isPrimary
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.sub}
                    </span>
                  )}
                </span>
                <span
                  className={`text-lg transition-transform group-hover:translate-x-1 ${
                    isPrimary ? "text-primary-foreground/80" : "text-accent/70"
                  }`}
                  aria-hidden
                >
                  ›
                </span>
              </>
            );

            const style = { animationDelay: `${200 + idx * 80}ms` };

            return item.to ? (
              <Link key={item.label} to={item.to} className={`${baseClasses} ${styleClasses}`} style={style}>
                {content}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={`${baseClasses} ${styleClasses}`}
                style={style}
              >
                {content}
              </a>
            );
          })}
        </nav>

        <footer className="mt-10 text-center animate-fade-up [animation-delay:700ms]">
          <div className="wave-divider mx-auto h-3 w-32" />
          <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground">
            MIRAMAR · SÃO LUÍS — MA
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Home;
