/**
 * Types de la « Carte des maths ».
 *
 * Principe : les mathématiques ne sont jamais codées en dur dans un
 * composant d'interface. Toute la donnée (thèmes, sous-thèmes, résultats,
 * relations) vit dans des objets typés sous src/lib/mathmap/, et les
 * composants de src/components/mathmap/ ne font que l'afficher.
 *
 * Voir src/lib/mathmap/index.ts pour la couche de requête (recherche par
 * id, fil d'Ariane, index inverse des relations, données du graphe).
 */

export type MathAccent = "matcha" | "espresso" | "gold";

/** Nature d'un résultat mathématique. */
export type ResultType =
  | "definition"
  | "proposition"
  | "lemme"
  | "theoreme"
  | "corollaire"
  | "exemple"
  | "contre-exemple";

/** Niveau indicatif, utilisé pour le filtre « par difficulté » du graphe. */
export type MathDifficulty = "fondamental" | "standard" | "avance";

/**
 * Type sémantique d'une relation entre deux résultats (point 11 du brief).
 * Chaque type porte un libellé et un libellé inverse (affiché sur la
 * fiche du résultat ciblé) — voir RELATION_META dans lib/mathmap/index.ts.
 */
export type RelationType =
  | "depend-de"
  | "generalise"
  | "cas-particulier-de"
  | "equivalent-a"
  | "lie-a";

export interface ResultRelation {
  /** Id global (unique sur tout le site) du résultat ciblé. */
  targetId: string;
  type: RelationType;
  /** Précision optionnelle affichée à côté du lien. */
  note?: string;
}

export interface MathResult {
  /** Id global, unique sur l'ensemble de la carte (pas seulement du sous-thème). */
  id: string;
  type: ResultType;
  title: string;
  /**
   * Énoncé, au format Markdown/MDX — mêmes conventions que les articles :
   * `$...$` / `$$...$$` pour les maths, liens Markdown classiques
   * `[texte](/carte-des-maths/...)` pour renvoyer vers un autre résultat.
   */
  statement: string;
  /** Démonstration, optionnelle (une définition ou un exemple n'en a pas toujours). */
  proof?: string;
  difficulty?: MathDifficulty;
  /**
   * Ce dont CE résultat dépend (ou est lié à) — déclaré ici, du côté de la
   * démonstration qui « sait » ce qu'elle utilise. Le sens inverse
   * (« Utilisé dans ») est calculé automatiquement, jamais dupliqué à la main.
   */
  relations?: ResultRelation[];
  tags?: string[];
}

export interface MathSubtopic {
  /** Id unique au sein du thème. */
  id: string;
  title: string;
  description?: string;
  results: MathResult[];
}

export interface MathThemeMeta {
  /** Id unique sur toute la carte, utilisé dans les URLs. */
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  /** Nom d'icône lucide-react. */
  icon: string;
  accent: MathAccent;
  /** Ids d'autres thèmes conceptuellement liés — arêtes de la carte générale. */
  connections?: string[];
  /** Position en pourcentage sur la carte desktop ; calculée automatiquement si absente. */
  position?: { x: number; y: number };
}

export interface MathTheme extends MathThemeMeta {
  subtopics: MathSubtopic[];
}

/* ------------------------------------------------------------------ */
/* Types calculés par la couche de requête (src/lib/mathmap/index.ts)  */
/* ------------------------------------------------------------------ */

export interface ResolvedResultLocation {
  id: string;
  title: string;
  type: ResultType;
  themeId: string;
  themeTitle: string;
  subtopicId: string;
  subtopicTitle: string;
  difficulty?: MathDifficulty;
}

export interface ResolvedRelation {
  relation: ResultRelation;
  target: ResolvedResultLocation | null;
}

export interface MathBreadcrumbItem {
  label: string;
  href?: string;
}

export interface GraphNode {
  id: string;
  title: string;
  type: ResultType;
  themeId: string;
  themeTitle: string;
  subtopicId: string;
  subtopicTitle: string;
  accent: MathAccent;
  difficulty?: MathDifficulty;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: RelationType;
}

export interface MathGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface MathSearchItem {
  id: string;
  kind: "theme" | "subtopic" | "result";
  title: string;
  description: string;
  href: string;
  themeTitle: string;
}
