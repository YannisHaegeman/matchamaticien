import { mathThemes } from "./themes";
import { logiqueSubtopics } from "./data/logique";
import { ensemblesSubtopics } from "./data/ensembles";
import { arithmetiqueSubtopics } from "./data/arithmetique";
import { lciSubtopics } from "./data/lci";
import { groupesSubtopics } from "./data/groupes";
import { anneauxSubtopics } from "./data/anneaux";
import { corpsSubtopics } from "./data/corps";
import { espacesVectorielsSubtopics } from "./data/espaces-vectoriels";
import type {
  MathTheme,
  MathThemeMeta,
  MathSubtopic,
  MathResult,
  ResultType,
  RelationType,
  MathDifficulty,
  ResolvedResultLocation,
  ResolvedRelation,
  MathBreadcrumbItem,
  GraphNode,
  GraphEdge,
  MathGraphData,
  MathSearchItem,
} from "@/types/mathmap";

/**
 * Registre central : associe chaque id de thème (déclaré dans themes.ts) à
 * son fichier de données. C'est le SEUL endroit, en dehors de themes.ts,
 * qu'il faut toucher pour enregistrer un nouveau thème.
 */
const themeData: Record<string, MathSubtopic[]> = {
  logique: logiqueSubtopics,
  ensembles: ensemblesSubtopics,
  arithmetique: arithmetiqueSubtopics,
  lci: lciSubtopics,
  groupes: groupesSubtopics,
  anneaux: anneauxSubtopics,
  corps: corpsSubtopics,
  "espaces-vectoriels": espacesVectorielsSubtopics,
};

/* ------------------------------------------------------------------ */
/* Métadonnées d'affichage pour les types de résultat / relation       */
/* ------------------------------------------------------------------ */

export const RESULT_TYPE_META: Record<
  ResultType,
  { label: string; plural: string; icon: string }
> = {
  definition: { label: "Définition", plural: "Définitions", icon: "BookMarked" },
  proposition: { label: "Proposition", plural: "Propositions", icon: "Award" },
  lemme: { label: "Lemme", plural: "Lemmes", icon: "Puzzle" },
  theoreme: { label: "Théorème", plural: "Théorèmes", icon: "Leaf" },
  corollaire: { label: "Corollaire", plural: "Corollaires", icon: "GitBranch" },
  exemple: { label: "Exemple", plural: "Exemples", icon: "Coffee" },
  "contre-exemple": {
    label: "Contre-exemple",
    plural: "Contre-exemples",
    icon: "Ban",
  },
};

export const DIFFICULTY_META: Record<MathDifficulty, { label: string }> = {
  fondamental: { label: "Fondamental" },
  standard: { label: "Standard" },
  avance: { label: "Avancé" },
};

export const RELATION_META: Record<
  RelationType,
  { label: string; inverseLabel: string }
> = {
  "depend-de": {
    label: "Dépend de",
    inverseLabel: "Utilisé dans la démonstration de",
  },
  generalise: {
    label: "Généralise",
    inverseLabel: "Est un cas particulier de",
  },
  "cas-particulier-de": {
    label: "Est un cas particulier de",
    inverseLabel: "Généralise",
  },
  "equivalent-a": { label: "Équivalent à", inverseLabel: "Équivalent à" },
  "lie-a": { label: "Lié à", inverseLabel: "Lié à" },
};

/* ------------------------------------------------------------------ */
/* Thèmes                                                              */
/* ------------------------------------------------------------------ */

let themesCache: MathTheme[] | null = null;

export function getAllMathThemes(): MathTheme[] {
  if (themesCache) return themesCache;
  themesCache = mathThemes.map((meta) => ({
    ...meta,
    subtopics: themeData[meta.id] ?? [],
  }));
  return themesCache;
}

export function getMathThemeMeta(id: string): MathThemeMeta | undefined {
  return mathThemes.find((t) => t.id === id);
}

export function getMathThemeFull(id: string): MathTheme | undefined {
  return getAllMathThemes().find((t) => t.id === id);
}

export function getMathSubtopic(
  themeId: string,
  subtopicId: string
): MathSubtopic | undefined {
  return getMathThemeFull(themeId)?.subtopics.find((s) => s.id === subtopicId);
}

export function countThemeResults(theme: MathTheme): number {
  return theme.subtopics.reduce((acc, s) => acc + s.results.length, 0);
}

/* ------------------------------------------------------------------ */
/* Index global des résultats (calculé une fois, mis en cache)         */
/* ------------------------------------------------------------------ */

interface IndexedResult {
  result: MathResult;
  location: ResolvedResultLocation;
}

let resultIndexCache: Map<string, IndexedResult> | null = null;

function buildResultIndex(): Map<string, IndexedResult> {
  if (resultIndexCache) return resultIndexCache;
  const index = new Map<string, IndexedResult>();

  for (const theme of getAllMathThemes()) {
    for (const subtopic of theme.subtopics) {
      for (const result of subtopic.results) {
        if (index.has(result.id)) {
          throw new Error(
            `Id de résultat en double dans la carte des maths : "${result.id}" (thème "${theme.id}", sous-thème "${subtopic.id}"). Chaque id doit être unique sur l'ensemble de la carte.`
          );
        }
        index.set(result.id, {
          result,
          location: {
            id: result.id,
            title: result.title,
            type: result.type,
            themeId: theme.id,
            themeTitle: theme.title,
            subtopicId: subtopic.id,
            subtopicTitle: subtopic.title,
            difficulty: result.difficulty,
          },
        });
      }
    }
  }

  resultIndexCache = index;
  return index;
}

export function getResultWithLocation(
  id: string
): { result: MathResult; location: ResolvedResultLocation } | undefined {
  return buildResultIndex().get(id);
}

export function getResultLocation(
  id: string
): ResolvedResultLocation | undefined {
  return buildResultIndex().get(id)?.location;
}

export function getAllResultLocations(): ResolvedResultLocation[] {
  return Array.from(buildResultIndex().values()).map((r) => r.location);
}

export function resultHref(location: {
  themeId: string;
  subtopicId: string;
  id: string;
}): string {
  return `/carte-des-maths/${location.themeId}/${location.subtopicId}/${location.id}`;
}

/* ------------------------------------------------------------------ */
/* Relations — index direct (déclaré) + index inverse (calculé)        */
/* ------------------------------------------------------------------ */

let incomingIndexCache: Map<
  string,
  { fromId: string; type: RelationType; note?: string }[]
> | null = null;

/**
 * Construit, une seule fois, l'index inverse des relations : pour chaque
 * résultat cible, la liste de tous les résultats qui déclarent une
 * relation vers lui. C'est ce qui alimente la section « Utilisé dans »
 * sans jamais dupliquer l'information à la main.
 */
function buildIncomingIndex() {
  if (incomingIndexCache) return incomingIndexCache;
  const incoming = new Map<
    string,
    { fromId: string; type: RelationType; note?: string }[]
  >();

  for (const { result } of buildResultIndex().values()) {
    for (const relation of result.relations ?? []) {
      const list = incoming.get(relation.targetId) ?? [];
      list.push({ fromId: result.id, type: relation.type, note: relation.note });
      incoming.set(relation.targetId, list);
    }
  }

  incomingIndexCache = incoming;
  return incoming;
}

export function getRelationsFor(id: string): {
  outgoing: ResolvedRelation[];
  incoming: ResolvedRelation[];
} {
  const entry = getResultWithLocation(id);
  const outgoing: ResolvedRelation[] = (entry?.result.relations ?? []).map(
    (relation) => ({
      relation,
      target: getResultLocation(relation.targetId) ?? null,
    })
  );

  const incomingRaw = buildIncomingIndex().get(id) ?? [];
  const incoming: ResolvedRelation[] = incomingRaw.map((rel) => ({
    relation: { targetId: rel.fromId, type: rel.type, note: rel.note },
    target: getResultLocation(rel.fromId) ?? null,
  }));

  return { outgoing, incoming };
}

/* ------------------------------------------------------------------ */
/* Fil d'Ariane                                                        */
/* ------------------------------------------------------------------ */

export function getMathBreadcrumb(options: {
  theme?: MathThemeMeta;
  subtopic?: MathSubtopic;
  resultTitle?: string;
}): MathBreadcrumbItem[] {
  const items: MathBreadcrumbItem[] = [
    { label: "Carte des maths", href: "/carte-des-maths" },
  ];
  if (options.theme) {
    items.push({
      label: options.theme.title,
      href: options.subtopic || options.resultTitle
        ? `/carte-des-maths/${options.theme.id}`
        : undefined,
    });
  }
  if (options.subtopic && options.theme) {
    items.push({
      label: options.subtopic.title,
      href: options.resultTitle
        ? `/carte-des-maths/${options.theme.id}/${options.subtopic.id}`
        : undefined,
    });
  }
  if (options.resultTitle) {
    items.push({ label: options.resultTitle });
  }
  return items;
}

/* ------------------------------------------------------------------ */
/* Données du graphe de dépendances                                    */
/* ------------------------------------------------------------------ */

let graphCache: MathGraphData | null = null;

export function getMathGraphData(): MathGraphData {
  if (graphCache) return graphCache;

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  for (const theme of getAllMathThemes()) {
    for (const subtopic of theme.subtopics) {
      for (const result of subtopic.results) {
        nodes.push({
          id: result.id,
          title: result.title,
          type: result.type,
          themeId: theme.id,
          themeTitle: theme.title,
          subtopicId: subtopic.id,
          subtopicTitle: subtopic.title,
          accent: theme.accent,
          difficulty: result.difficulty,
        });
        for (const relation of result.relations ?? []) {
          // On ne garde que les arêtes dont la cible existe bien (robustesse
          // si un id est modifié/retiré : pas de crash, l'arête disparaît).
          if (buildResultIndex().has(relation.targetId)) {
            edges.push({
              source: result.id,
              target: relation.targetId,
              type: relation.type,
            });
          }
        }
      }
    }
  }

  graphCache = { nodes, edges };
  return graphCache;
}

/* ------------------------------------------------------------------ */
/* Recherche                                                            */
/* ------------------------------------------------------------------ */

let searchIndexCache: MathSearchItem[] | null = null;

export function getMathSearchIndex(): MathSearchItem[] {
  if (searchIndexCache) return searchIndexCache;
  const items: MathSearchItem[] = [];

  for (const theme of getAllMathThemes()) {
    items.push({
      id: `theme-${theme.id}`,
      kind: "theme",
      title: theme.title,
      description: theme.description,
      href: `/carte-des-maths/${theme.id}`,
      themeTitle: theme.title,
    });
    for (const subtopic of theme.subtopics) {
      items.push({
        id: `subtopic-${theme.id}-${subtopic.id}`,
        kind: "subtopic",
        title: subtopic.title,
        description: subtopic.description ?? theme.title,
        href: `/carte-des-maths/${theme.id}/${subtopic.id}`,
        themeTitle: theme.title,
      });
      for (const result of subtopic.results) {
        items.push({
          id: `result-${result.id}`,
          kind: "result",
          title: result.title,
          description: `${RESULT_TYPE_META[result.type].label} · ${subtopic.title}`,
          href: resultHref({
            themeId: theme.id,
            subtopicId: subtopic.id,
            id: result.id,
          }),
          themeTitle: theme.title,
        });
      }
    }
  }

  searchIndexCache = items;
  return items;
}

/**
 * Recherche texte simple (sous-chaîne, insensible à la casse) sur le
 * titre, la description et — pour les résultats — l'énoncé et la
 * démonstration. Suffisant pour l'échelle actuelle du site ; à
 * remplacer par un index plus riche si la carte grandit beaucoup.
 */
export function searchMathMap(query: string, limit = 8): MathSearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const resultTextById = new Map<string, string>();
  for (const { result } of buildResultIndex().values()) {
    resultTextById.set(
      result.id,
      [result.statement, result.proof ?? ""].join(" ").toLowerCase()
    );
  }

  return getMathSearchIndex()
    .filter((item) => {
      const haystack = `${item.title} ${item.description}`.toLowerCase();
      if (haystack.includes(q)) return true;
      if (item.kind === "result") {
        const rawId = item.id.replace(/^result-/, "");
        return resultTextById.get(rawId)?.includes(q) ?? false;
      }
      return false;
    })
    .slice(0, limit);
}
