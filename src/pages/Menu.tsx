import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Heart, Share2, UtensilsCrossed, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { categories, dishes, formatPrice, type CategoryId, type Dish } from "@/data/menu";

const Menu = () => {
  const [active, setActive] = useState<CategoryId | "todos">("todos");
  const [selected, setSelected] = useState<Dish | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => dishes.filter((d) => active === "todos" || d.category === active),
    [active]
  );

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <main className="menu-light min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-4 py-3">
          <Link
            to="/"
            aria-label="Voltar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-smooth hover:border-foreground/40"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Miramar Cardápio
            </h1>
          </div>
          <button
            aria-label="Compartilhar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-smooth hover:border-foreground/40"
          >
            <Share2 className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Categorias */}
        <div className="mx-auto w-full max-w-md overflow-x-auto px-4 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

      {/* Lista */}
      <section className="mx-auto w-full max-w-md px-4 pt-4">
        <ul className="flex flex-col gap-[14px]">
          {filtered.map((dish, idx) => (
            <li
              key={dish.id}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 35}ms` }}
            >
              <DishCard
                dish={dish}
                favorite={favorites.has(dish.id)}
                onToggleFav={() => toggleFav(dish.id)}
                onClick={() => setSelected(dish)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md gap-0 overflow-hidden rounded-3xl border-border bg-surface p-0 [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-background/80 [&>button]:p-2 [&>button]:text-foreground">
          {selected && (
            <DishModalContent
              dish={selected}
              favorite={favorites.has(selected.id)}
              onToggleFav={() => toggleFav(selected.id)}
            />
          )}
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
    className={`shrink-0 rounded-full border px-4 text-xs font-semibold tracking-wide transition-smooth h-8 ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-surface text-foreground hover:border-foreground/30"
    }`}
  >
    {label}
  </button>
);

const DishImagePlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-secondary">
    <UtensilsCrossed className="h-6 w-6 text-muted-foreground/60" strokeWidth={1.5} />
    <span className="sr-only">{name}</span>
  </div>
);

const DishCard = ({
  dish,
  favorite,
  onToggleFav,
  onClick,
}: {
  dish: Dish;
  favorite: boolean;
  onToggleFav: () => void;
  onClick: () => void;
}) => (
  <div
    className="group relative flex items-center gap-3 rounded-[20px] border border-border bg-surface p-3 transition-smooth hover:-translate-y-0.5 hover:scale-[1.01]"
    style={{ boxShadow: "0 4px 14px hsl(214 65% 18% / 0.08)" }}
  >
    <button
      onClick={onClick}
      aria-label={`Ver detalhes de ${dish.name}`}
      className="flex flex-1 items-center gap-3 text-left"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[14px] bg-secondary">
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
      <div className="min-w-0 flex-1 pr-1">
        <h3 className="font-serif text-[15px] font-semibold leading-snug text-foreground">
          {dish.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {dish.description}
        </p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[15px] font-bold text-accent">
            {formatPrice(dish.price)}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" strokeWidth={1.75} />
        </div>
      </div>
    </button>
    <button
      onClick={onToggleFav}
      aria-label={favorite ? "Remover dos favoritos" : "Favoritar"}
      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-smooth"
    >
      <Heart
        className={`h-[18px] w-[18px] transition-smooth ${
          favorite
            ? "fill-accent text-accent"
            : "text-foreground/40 hover:text-foreground/70"
        }`}
        strokeWidth={1.75}
      />
    </button>
  </div>
);

const DishModalContent = ({
  dish,
  favorite,
  onToggleFav,
}: {
  dish: Dish;
  favorite: boolean;
  onToggleFav: () => void;
}) => (
  <div className="animate-scale-in">
    <div className="relative h-60 w-full overflow-hidden bg-secondary">
      {dish.image ? (
        <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
      ) : (
        <DishImagePlaceholder name={dish.name} />
      )}
    </div>

    <div className="px-6 pb-6 pt-5">
      <DialogHeader className="text-left">
        <DialogTitle className="font-serif text-2xl font-semibold text-foreground">
          {dish.name}
        </DialogTitle>
        <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
          {dish.longDescription ?? dish.description}
        </DialogDescription>
      </DialogHeader>

      {dish.tags && dish.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Valor
        </span>
        <span className="text-2xl font-bold text-accent">{formatPrice(dish.price)}</span>
      </div>

      <div className="mt-5 flex gap-2">
        <Button className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          Chamar garçom
        </Button>
        <Button
          onClick={onToggleFav}
          variant="outline"
          size="icon"
          className="rounded-full border-border bg-surface text-foreground hover:text-accent"
          aria-label="Favoritar"
        >
          <Heart
            className={`h-4 w-4 ${favorite ? "fill-accent text-accent" : ""}`}
            strokeWidth={1.75}
          />
        </Button>
      </div>
    </div>
  </div>
);

export default Menu;
