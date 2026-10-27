import type { MathThemeMeta } from "@/types/mathmap";

/**
 * Référentiel unique des grands thèmes de la Carte des maths.
 *
 * Pour ajouter un thème :
 *   1. ajoute une entrée ici (id, titre, description, icône, couleur,
 *      connexions vers d'autres thèmes, position optionnelle sur la carte) ;
 *   2. crée son fichier de données dans src/lib/mathmap/data/<id>.ts,
 *      exportant `subtopics: MathSubtopic[]` (un tableau vide au départ,
 *      c'est très bien : le thème apparaît sur la carte avec un état
 *      « à venir ») ;
 *   3. enregistre ce fichier dans le registre `themeData` de
 *      src/lib/mathmap/index.ts.
 *
 * Rien d'autre à modifier : la carte, la navigation, la recherche, le
 * graphe de dépendances et le sitemap se mettent à jour automatiquement.
 */
export const mathThemes: MathThemeMeta[] = [
  {
    id: "logique",
    title: "Logique",
    description:
      "Le langage et les règles du raisonnement mathématique : propositions, quantificateurs, méthodes de preuve.",
    icon: "Brain",
    accent: "gold",
    connections: ["ensembles"],
    position: { x: 12, y: 14 },
  },
  {
    id: "ensembles",
    title: "Ensembles",
    description:
      "Le socle : appartenance, inclusion, opérations, produit cartésien, relations et applications.",
    icon: "Braces",
    accent: "gold",
    connections: ["logique", "lci"],
    position: { x: 10, y: 50 },
  },
  {
    id: "arithmetique",
    title: "Arithmétique",
    description:
      "Nombres entiers, divisibilité, nombres premiers, congruences — le monde discret.",
    icon: "Hash",
    accent: "espresso",
    connections: ["groupes"],
    position: { x: 42, y: 86 },
  },
  {
    id: "lci",
    title: "Lois de composition interne",
    shortTitle: "LCI",
    description:
      "Combiner deux éléments d'un ensemble pour en obtenir un troisième : le point de départ de toute structure algébrique.",
    icon: "Workflow",
    accent: "espresso",
    connections: ["ensembles", "groupes"],
    position: { x: 26, y: 33 },
  },
  {
    id: "groupes",
    title: "Groupes",
    description:
      "La première grande structure algébrique : un ensemble, une loi, et trois axiomes qui ouvrent tout un monde.",
    icon: "Boxes",
    accent: "matcha",
    connections: ["lci", "anneaux", "espaces-vectoriels", "arithmetique"],
    position: { x: 42, y: 50 },
  },
  {
    id: "anneaux",
    title: "Anneaux",
    description:
      "Deux lois de composition qui cohabitent : addition et multiplication, et la distributivité qui les relie.",
    icon: "Disc",
    accent: "espresso",
    connections: ["groupes", "corps"],
    position: { x: 60, y: 33 },
  },
  {
    id: "corps",
    title: "Corps",
    description:
      "Un anneau où l'on peut aussi diviser : le cadre naturel de l'algèbre linéaire et d'une bonne partie de l'analyse.",
    icon: "Diamond",
    accent: "gold",
    connections: ["anneaux", "espaces-vectoriels", "groupes"],
    position: { x: 76, y: 50 },
  },
  {
    id: "espaces-vectoriels",
    title: "Espaces vectoriels",
    description:
      "Des vecteurs qu'on additionne et qu'on multiplie par un scalaire — la géométrie mise en axiomes.",
    icon: "Move3d",
    accent: "matcha",
    connections: ["corps", "groupes"],
    position: { x: 60, y: 74 },
  },
];

export function getMathTheme(id: string): MathThemeMeta | undefined {
  return mathThemes.find((t) => t.id === id);
}
