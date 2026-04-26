import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Heart, Share2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, dishes, formatPrice, type CategoryId, type Dish } from "@/data/menu";

const Menu = () => {
  const [active, setActive] = useState<CategoryId | "todos">("todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const matchesCat = active === "todos" || d.category === active;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [active, query]);

  return (
    <main className="min-h-screen bg-gradient-deep pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-5 py-4">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface/60 text-foreground transition-smooth hover:border-accent/50 hover:text-accent"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1 text-center">
            <p className="text-[10px] tracking-[0.4em] text-accent/80">MIRAMAR</p>
            <h1 className="font-serif text-2xl leading-none">Cardápio</h1>
          </div>
          <div className="h-10 w-10" />
        </div>

        {/* Search */}
        <div className="mx-auto w-full max-w-md px-5 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por prato ou ingrediente"
              className="h-11 rounded-full border-border/60 bg-surface/60 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-accent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-md overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2">
            <CategoryChip
              label="Todos"
              active={active === "todos"}
              onClick={() => setActive("todos")}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                label={c.label}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Dishes */}
      <section className="mx-auto w-full max-w-md px-5 py-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-surface/40 p-10 text-center text-sm text-muted-foreground">
            Nenhum prato encontrado para sua busca.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {filtered.map((dish, idx) => (
              <li
                key={dish.id}
                className="animate-fade-up"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <DishCard dish={dish} onClick={() => setSelected(dish)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md gap-0 overflow-hidden border-border/60 bg-surface p-0 [&>button]:text-foreground [&>button]:bg-background/60 [&>button]:rounded-full [&>button]:p-2 [&>button]:right-3 [&>button]:top-3">
          {selected && <DishModalContent dish={selected} />}
        </DialogContent>
      </Dialog>
    </main>
  );
};

const CategoryChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-smooth ${
      active
        ? "border-transparent bg-gradient-sunset text-primary-foreground shadow-glow"
        : "border-border/60 bg-surface/60 text-muted-foreground hover:text-foreground hover:border-accent/40"
    }`}
  >
    {label}
  </button>
);

const DishImagePlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-sunset/20">
    <Sparkles className="h-6 w-6 text-accent/70" />
    <span className="sr-only">{name}</span>
  </div>
);

const DishCard = ({ dish, onClick }: { dish: Dish; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center gap-4 rounded-2xl border border-border/60 bg-surface/70 p-3 text-left shadow-soft transition-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-elevated"
  >
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-background/60">
      {dish.image ? (
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
      ) : (
        <DishImagePlaceholder name={dish.name} />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-serif text-lg leading-tight text-foreground">{dish.name}</h3>
      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
        {dish.description}
      </p>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="font-medium text-accent">{formatPrice(dish.price)}</span>
        <span className="text-xs text-muted-foreground/70">Toque para detalhes ›</span>
      </div>
    </div>
  </button>
);

const DishModalContent = ({ dish }: { dish: Dish }) => (
  <div className="animate-scale-in">
    <div className="relative h-60 w-full overflow-hidden bg-background">
      {dish.image ? (
        <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
      ) : (
        <DishImagePlaceholder name={dish.name} />
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </div>

    <div className="px-6 pb-6 pt-4">
      <DialogHeader className="text-left">
        <DialogTitle className="font-serif text-2xl text-foreground">
          {dish.name}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {dish.longDescription ?? dish.description}
        </DialogDescription>
      </DialogHeader>

      {dish.tags && dish.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.tags.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-accent/40 bg-accent/10 font-normal text-accent"
            >
              {t}
            </Badge>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Valor
        </span>
        <span className="font-serif text-3xl text-accent">
          {formatPrice(dish.price)}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        <Button className="flex-1 bg-gradient-sunset text-primary-foreground shadow-glow hover:opacity-95">
          Chamar garçom
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-border/60 bg-surface-elevated text-foreground hover:text-accent"
          aria-label="Favoritar"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-border/60 bg-surface-elevated text-foreground hover:text-accent"
          aria-label="Compartilhar"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default Menu;
