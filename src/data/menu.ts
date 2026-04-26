import dishCamarao from "@/assets/dish-camarao.jpg";
import dishRigatoni from "@/assets/dish-rigatoni.jpg";
import dishPasteis from "@/assets/dish-pasteis.jpg";
import dishCaesar from "@/assets/dish-caesar.jpg";

export type CategoryId = "petiscos" | "entradas" | "massas";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Dish {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  image?: string;
  tags?: string[];
}

export const categories: Category[] = [
  { id: "petiscos", label: "Petiscos" },
  { id: "entradas", label: "Entradas" },
  { id: "massas", label: "Massas" },
];

export const dishes: Dish[] = [
  // PETISCOS
  {
    id: "pasteis-geleia",
    category: "petiscos",
    name: "Pastéis com Geleia de Pimenta",
    description: "Mini pastéis recheados com carne e queijo — 6 unidades.",
    longDescription:
      "Massa fina e crocante recheada com carne temperada e queijo cremoso, servidos quentes com geleia artesanal de pimenta dedo-de-moça.",
    price: 35,
    image: dishPasteis,
    tags: ["6 un.", "Levemente picante"],
  },
  {
    id: "casquinha-caranguejo",
    category: "petiscos",
    name: "Casquinha de Caranguejo",
    description: "Carne de caranguejo, acompanhada de farofa e vinagrete.",
    longDescription:
      "Casquinha de caranguejo gratinada com temperos da casa, servida com farofa crocante e vinagrete fresco — sabores do litoral maranhense.",
    price: 45,
    tags: ["Frutos do mar"],
  },
  {
    id: "croqueta-cupim",
    category: "petiscos",
    name: "Croqueta de Cupim",
    description: "Cupim empanado, crocante por fora e macio por dentro — 6 unidades.",
    price: 45,
    tags: ["6 un."],
  },
  {
    id: "bolinho-bacalhau",
    category: "petiscos",
    name: "Bolinho de Bacalhau",
    description:
      "Bacalhau desfiado, ovos, cebola, salsinha, cebolinha e tempero natural — 5 unidades.",
    price: 65,
    tags: ["5 un."],
  },
  {
    id: "iscas-peixe",
    category: "petiscos",
    name: "Iscas de Peixe",
    description: "Iscas de filé de pescada fritas, servidas com molho tártaro.",
    price: 55,
    tags: ["Frutos do mar"],
  },
  {
    id: "dadinho-tapioca",
    category: "petiscos",
    name: "Dadinho de Tapioca",
    description:
      "Dadinhos levemente fritos, servidos com couve crocante e geleia de pimenta — 8 unidades.",
    price: 42,
    tags: ["8 un.", "Vegetariano"],
  },
  {
    id: "camarao-alho-oleo",
    category: "petiscos",
    name: "Camarão Alho e Óleo",
    description: "Camarões grelhados ao alho e óleo.",
    longDescription:
      "Camarões frescos grelhados na manteiga com alho dourado, finalizados com azeite e ervas — clássico atemporal.",
    price: 75,
    image: dishCamarao,
    tags: ["Frutos do mar"],
  },

  // ENTRADAS
  {
    id: "salada-caesar",
    category: "entradas",
    name: "Salada Caesar",
    description:
      "Alface americana, lascas de frango, parmesão, croutons temperados, ervas finas e molho Caesar.",
    price: 55,
    image: dishCaesar,
  },
  {
    id: "caprese-miramar",
    category: "entradas",
    name: "Salada Caprese Miramar",
    description:
      "Tomates temperados, rúcula, muçarela de búfala, berinjela laqueada com balsâmico e farofa de pão italiano.",
    price: 58,
    tags: ["Vegetariano"],
  },
  {
    id: "salada-tropical",
    category: "entradas",
    name: "Salada Tropical",
    description: "Mix de folhas verdes, parmesão em lascas, finalizado com molho do chef.",
    price: 48,
    tags: ["Vegetariano"],
  },
  {
    id: "carpaccio-chef",
    category: "entradas",
    name: "Carpaccio do Chef",
    description:
      "Lâmina de carne, molho especial, alcaparras, lascas de parmesão, tomate cereja confitado, rúcula e azeite trufado.",
    price: 75,
  },
  {
    id: "ceviche-pescada",
    category: "entradas",
    name: "Ceviche de Pescada Amarela",
    description: "Pescada amarela marinada em limão, com cebola roxa, coentro e pimenta.",
    price: 60,
    tags: ["Frutos do mar", "Sem glúten"],
  },
  {
    id: "panelinha-file",
    category: "entradas",
    name: "Panelinha de Filé com Molho Gorgonzola",
    description:
      "Iscas de filé mignon ao molho gorgonzola, servidas com torradas artesanais.",
    price: 70,
  },

  // MASSAS
  {
    id: "rigatoni-miramar",
    category: "massas",
    name: "Rigatoni Miramar",
    description:
      "Massa ao molho matriciana, bacon, tomate confitado, queijo pecorino romano e toque de pimenta.",
    longDescription:
      "Rigatoni al dente envolto no clássico molho matriciana, com bacon defumado, tomates confitados lentamente e generosas lascas de pecorino romano.",
    price: 68,
    image: dishRigatoni,
    tags: ["Levemente picante"],
  },
  {
    id: "tagliatelle-burrata",
    category: "massas",
    name: "Tagliatelle al Burrata",
    description:
      "Massa ao molho pelati, azeite de oliva, burrata fresca, manjericão e pesto.",
    price: 85,
    tags: ["Vegetariano"],
  },
  {
    id: "fetuccine-camarao",
    category: "massas",
    name: "Fetuccine de Camarão ao Limão",
    description: "Massa com camarões ao molho cremoso de limão.",
    price: 85,
    tags: ["Frutos do mar"],
  },
  {
    id: "linguini-mexicana",
    category: "massas",
    name: "Linguini à Mexicana",
    description:
      "Massa com tomate pelati, azeitonas, cebola, pimentões, manjericão, salsa verde, alcaparras e pimenta.",
    price: 68,
    tags: ["Vegetariano", "Picante"],
  },
  {
    id: "carbonara",
    category: "massas",
    name: "Carbonara",
    description: "Massa cremosa com ovos, parmesão, pancetta e pimenta-do-reino.",
    price: 60,
  },
  {
    id: "lasanha",
    category: "massas",
    name: "Lasanha",
    description:
      "Camadas de massa fresca com molho bolonhesa artesanal e béchamel gratinados.",
    price: 75,
  },
];

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
