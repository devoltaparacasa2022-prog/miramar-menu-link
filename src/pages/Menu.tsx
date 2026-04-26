import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Heart, Search, UtensilsCrossed, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { categories, dishes, formatPrice, type CategoryId, type Dish } from "@/data/menu";
import MiramarLogo from "@/components/MiramarLogo";

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
    <main className="menu-light min-h-screen bg-background pb-20">
      {/* Hero header navy com logo e onda inferior */}
      <header className="relative">
        <div className="bg-[hsl(207_100%_17%)] px-5 pb-10 pt-5 text-white">
          <div className="mx-auto flex w-full max-w-md items-center justify-between">
            <Link
              to="/"
              aria-label="Voltar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-smooth hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </Link>
            <MiramarLogo className="h-12 w-auto text-white" />
            <button
              aria-label="Buscar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition-smooth hover:bg-white/10"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        {/* Onda decorativa */}
        <svg
          className="absolute -bottom-px left-0 h-8 w-full text-background"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30 V60 H0 Z"
            fill="currentColor"
          />
        </svg>
      </header>

      {/* Título da seção */}
      <section className="mx-auto w-full max-w-md px-4 pt-6">
        <div className="flex items-center gap-3">
          <UtensilsCrossed
            className="h-7 w-7 text-accent"
            strokeWidth={1.5}
          />
          <h1 className="font-serif text-[34px] leading-none tracking-tight text-foreground">
            CARDÁPIO
          </h1>
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Selecione uma categoria e explore nossos pratos.
        </p>
      </section>

      {/* Categorias */}
      <div className="mx-auto mt-5 w-full max-w-md overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

      {/* Lista */}
      <section className="mx-auto w-full max-w-md px-4 pt-4">
        <ul className="flex flex-col gap-3.5">
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
        <DialogContent className="max-w-md gap-0 overflow-hidden rounded-3xl border-border bg-surface p-0 [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-white/90 [&>button]:p-2 [&>button]:text-foreground [&>button]:shadow-md">
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
    className={`shrink-0 rounded-full border px-4 text-[12px] font-semibold tracking-wide transition-smooth h-8 ${
      active
        ? "border-[hsl(207_100%_17%)] bg-[hsl(207_100%_17%)] text-white shadow-sm"
        : "border-border bg-surface text-foreground hover:border-foreground/30"
    }`}
  >
    {label}
  </button>
);

const DishImagePlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-secondary">
    <UtensilsCrossed className="h-7 w-7 text-foreground/30" strokeWidth={1.5} />
    <span className="sr-only">{name}</span>
  </div>
);

const TAG_STYLES: Record<string, string> = {
  default: "bg-[hsl(197_67%_95%)] text-[hsl(207_100%_17%)]",
  picante: "bg-[hsl(22_100%_55%/0.10)] text-accent",
  vegetariano: "bg-[hsl(140_50%_94%)] text-[hsl(150_55%_28%)]",
  gluten: "bg-[hsl(35_88%_66%/0.18)] text-[hsl(30_70%_35%)]",
};

const tagClass = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes("picante")) return TAG_STYLES.picante;
  if (t.includes("veget") || t.includes("vegan")) return TAG_STYLES.vegetariano;
  if (t.includes("glúten") || t.includes("gluten")) return TAG_STYLES.gluten;
  return TAG_STYLES.default;
};

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
    className="group relative flex items-stretch gap-3 rounded-[20px] border border-border bg-surface p-3 transition-smooth hover:-translate-y-0.5"
    style={{ boxShadow: "0 4px 16px hsl(207 100% 17% / 0.07)" }}
  >
    <button
      onClick={onClick}
      aria-label={`Ver detalhes de ${dish.name}`}
      className="flex flex-1 items-stretch gap-3 text-left"
    >
      <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-[14px] bg-secondary">
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
      <div className="flex min-w-0 flex-1 flex-col pr-1">
        <h3 className="font-serif text-[19px] leading-tight text-foreground">
          {dish.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
          {dish.description}
        </p>
        {dish.tags && dish.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {dish.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagClass(t)}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <span className="mt-auto pt-1.5 text-[15px] font-bold text-accent">
          {formatPrice(dish.price)}
        </span>
      </div>
    </button>

    <div className="flex flex-col items-end justify-between pl-1">
      <button
        onClick={onToggleFav}
        aria-label={favorite ? "Remover dos favoritos" : "Favoritar"}
        className="flex h-8 w-8 items-center justify-center rounded-full transition-smooth"
      >
        <Heart
          className={`h-[18px] w-[18px] transition-smooth ${
            favorite
              ? "fill-accent text-accent"
              : "text-foreground/35 hover:text-foreground/70"
          }`}
          strokeWidth={1.75}
        />
      </button>
      <ChevronRight
        className="h-4 w-4 text-muted-foreground/50"
        strokeWidth={1.75}
      />
    </div>
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
    <div className="relative h-64 w-full overflow-hidden bg-secondary">
      {dish.image ? (
        <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
      ) : (
        <DishImagePlaceholder name={dish.name} />
      )}
    </div>

    <div className="px-6 pb-6 pt-5">
      <DialogHeader className="text-left">
        <DialogTitle className="font-serif text-[26px] leading-tight text-foreground">
          {dish.name}
        </DialogTitle>
        <DialogDescription className="text-[13.5px] leading-relaxed text-muted-foreground">
          {dish.longDescription ?? dish.description}
        </DialogDescription>
      </DialogHeader>

      {dish.tags && dish.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {dish.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1 text-[11px] font-medium ${tagClass(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Valor
        </span>
        <span className="font-serif text-[28px] text-accent">
          {formatPrice(dish.price)}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        <Button className="h-12 flex-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
          Chamar garçom
        </Button>
        <Button
          onClick={onToggleFav}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-border bg-surface text-foreground hover:text-accent"
          aria-label="Favoritar"
        >
          <Heart
            className={`h-5 w-5 ${favorite ? "fill-accent text-accent" : ""}`}
            strokeWidth={1.75}
          />
        </Button>
      </div>
    </div>
  </div>
);

export default Menu;
