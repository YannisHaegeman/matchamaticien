# Matchamaticien

Une carte conceptuelle des mathématiques de l'agrégation, pensée comme un espace de révision ludique — esthétique « pièce de collection » (cartes à jouer, médailles, dégradés saturés, typographie Nunito), rendu LaTeX soigné.

> **Nom du site :** Matchamaticien
> **Slogan :** « Les mathématiques, infusées avec un peu de matcha. »

Le site a quatre pages : l'accueil, **la Carte des maths** (le cœur du projet), **les Flash cards** (révision express par paquets de cartes) et la page à propos. L'ancien système de blog (articles MDX, pages `/articles` et `/themes`) a été retiré lors d'une refonte ; voir « Historique » en bas de ce fichier si besoin.

## Stack technique

- **Next.js 16** (App Router, TypeScript, React Server Components) — génération statique de toutes les pages, SEO natif (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`), routage par fichiers.
- **Tailwind CSS v4** — design system en tokens CSS (`src/app/globals.css`), thème clair/sombre.
- **next-mdx-remote + remark-math + rehype-katex (KaTeX)** — rendu Markdown/LaTeX des énoncés et démonstrations, partagé entre la Carte des maths et les Flash cards.
- **lucide-react** — icônes.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production (génère toutes les pages statiquement)
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Architecture du projet

```
src/
  app/
    page.tsx                     accueil
    a-propos/                    page à propos
    carte-des-maths/
      page.tsx                    vue d'ensemble (bulles de thèmes)
      graphe/page.tsx              graphe de dépendances entre résultats
      [theme]/page.tsx              sous-thèmes d'un thème
      [theme]/[subtopic]/page.tsx    résultats d'un sous-thème
      [theme]/[subtopic]/[result]/page.tsx   fiche d'un résultat (énoncé, preuve, relations)
    flashcards/
      page.tsx                    galerie des paquets de flash cards
      [deck]/page.tsx              lecteur d'un paquet (une carte à la fois, recto/verso)
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    layout/        Header, Footer, recherche, menu mobile, thème
    home/           sections de la page d'accueil (Hero, aperçu de la carte, manifeste, CTA)
    mathmap/        composants d'affichage de la Carte des maths (bulles, breadcrumb,
                    badges de type de résultat, preuve, relations, graphe...)
    flashcards/     FlashCard (carte recto/verso en 3D), DeckPlayer (navigation, progression)
    ui/             Button, Badge, Logo, illustrations SVG (Logo, IcedMatchaLatte)
  lib/
    mathmap/
      themes.ts      référentiel des grands thèmes (le seul fichier à toucher pour
                     en ajouter un)
      data/<id>.ts    sous-thèmes et résultats d'un thème donné
      index.ts        couche de requête (recherche, fil d'Ariane, graphe, relations)
    flashcards/
      ambiances.ts    les 4 palettes de couleur disponibles pour un paquet (voir plus bas)
      decks.ts        référentiel des paquets (le seul fichier à toucher pour en ajouter un)
      data/<id>.ts    cartes d'un paquet donné
      index.ts        couche de requête (liste des paquets, cartes d'un paquet)
    mathLabel.ts    utilitaires de mise en forme des titres mathématiques
    mdx.ts          plugin rehype partagé (ids de titres) + conversion \[ \] → $$ $$
    utils.ts
  types/
    mathmap.ts      tous les types de données de la Carte des maths
    flashcards.ts   tous les types de données des Flash cards
```

## Ajouter du contenu à la Carte des maths

Toute la donnée mathématique (thèmes, sous-thèmes, résultats, relations) vit dans des objets typés sous `src/lib/mathmap/` — jamais codée en dur dans un composant.

### Ajouter un résultat (définition, exemple, théorème...) à un thème existant

Ouvrez `src/lib/mathmap/data/<theme>.ts` et ajoutez un objet au tableau `results` du sous-thème concerné :

```ts
{
  id: "theoreme-mon-resultat",     // unique sur TOUTE la carte, pas que le sous-thème
  type: "theoreme",                 // "definition" | "proposition" | "lemme" | "theoreme"
                                     // | "corollaire" | "exemple" | "contre-exemple"
  title: "Mon théorème",
  difficulty: "standard",           // "fondamental" | "standard" | "avance"
  statement: "Énoncé en Markdown, avec des maths : $x \\in G$ et $$x^2 = e$$.",
  proof: "Démonstration, mêmes conventions (optionnel).",
  relations: [
    { targetId: "definition-groupe", type: "depend-de" },
  ],
}
```

Le sens inverse d'une relation (« Utilisé dans la démonstration de... ») est calculé automatiquement : ne le dupliquez jamais à la main, déclarez la relation uniquement du côté du résultat qui l'utilise.

Types de relation disponibles : `depend-de`, `generalise`, `cas-particulier-de`, `equivalent-a`, `lie-a` (voir `RELATION_META` dans `src/lib/mathmap/index.ts` pour leurs libellés).

### Ajouter un sous-thème

Ajoutez un objet au tableau exporté par `src/lib/mathmap/data/<theme>.ts` :

```ts
{
  id: "mon-sous-theme",
  title: "Mon sous-thème",
  description: "Une phrase de résumé.",
  results: [],
}
```

### Ajouter un thème

1. Ajoutez une entrée à `mathThemes` dans `src/lib/mathmap/themes.ts` (id, titre, description, icône `lucide-react`, couleur d'accent `matcha | espresso | gold`, connexions vers d'autres thèmes, position optionnelle sur la carte).
2. Créez `src/lib/mathmap/data/<id>.ts`, exportant un tableau `<id>Subtopics: MathSubtopic[]` (vide au départ : le thème apparaît sur la carte avec un état « à venir »).
3. Enregistrez ce fichier dans le registre `themeData` de `src/lib/mathmap/index.ts`.

Rien d'autre à modifier : la carte, la navigation, la recherche, le graphe de dépendances, le fil d'Ariane et le sitemap se mettent à jour automatiquement.

### Écrire des maths

- Inline : `$x^2$` — Bloc : `$$ ... $$`.
- La syntaxe LaTeX classique `\[ ... \]` et `\( ... \)` est aussi acceptée et convertie automatiquement.
- **Règle importante pour ne rien casser :** en dehors des zones de maths ou de code, n'écrivez jamais directement les caractères `{`, `}`, `<` ou `>` dans le texte (syntaxe MDX). Pour une inégalité, écrivez-la en maths (`$n < 10$`).

## Ajouter du contenu aux Flash cards

Comme pour la Carte des maths, tout le contenu des flash cards vit dans des objets typés sous `src/lib/flashcards/` — jamais codé en dur dans un composant. Chaque carte peut avoir un contexte (énoncé de l'exercice d'où elle vient), une question, un indice optionnel, une réponse et une remarque optionnelle ; tout accepte le Markdown/LaTeX comme sur la Carte des maths.

### Ajouter une carte à un paquet existant

Ouvrez `src/lib/flashcards/data/<deck>.ts` et ajoutez un objet au tableau exporté :

```ts
{
  id: "proba-6",                    // unique dans le paquet
  context: "On lance un dé équilibré à 6 faces.",   // optionnel
  question: "Quelle est la probabilité d'obtenir un nombre pair ?",
  hint: "Compter les issues favorables sur les issues possibles.",  // optionnel
  answer: "$\\dfrac{1}{2}$ : trois issues favorables ($2, 4, 6$) sur six équiprobables.",
  remark: "Même raisonnement que pour un dé à $n$ faces : $n/2$ pair si $n$ est pair.", // optionnel
  source: "TD2, Ex. 1.2",           // optionnel
}
```

### Ajouter un nouveau paquet

1. Créez `src/lib/flashcards/data/<id>.ts`, exportant un tableau `<id>Cards: Flashcard[]`.
2. Ajoutez une entrée à `flashDecks` dans `src/lib/flashcards/decks.ts` (id, titre, description, `ambiance` — une des 4 palettes ci-dessous —, icône `lucide-react`).
3. Enregistrez `<id>Cards` dans le registre `deckCards` de `src/lib/flashcards/index.ts`.

Rien d'autre à modifier : la galerie `/flashcards`, le lecteur de cartes et le sitemap se mettent à jour automatiquement.

### Les 4 ambiances de couleur

Chaque paquet choisit une ambiance parmi `prairie` (vert), `coquelicot` (rouge), `safran` (orange) et `indigo`, définies dans `src/lib/flashcards/ambiances.ts`. Pour en ajouter une nouvelle, dupliquez une entrée de `FLASHCARD_AMBIANCES` et ajustez ses teintes (fond, carte, accent, texte).

## Modifier le design

- **Couleurs** : `src/app/globals.css`, section `:root` (palette claire) et `:root[data-theme="dark"]` (palette sombre). Palettes des flash cards : `src/lib/flashcards/ambiances.ts`.
- **Typographie** : Nunito (titres et texte), importée dans `src/app/layout.tsx` via `@fontsource`.
- **Habillage « pièce de collection »** : la texture de grain (`.texture-grain`) et les boutons en relief (`.btn-3d`), tous deux définis dans `src/app/globals.css`, sont la base du style visuel du site (inspiré d'une maquette de flash cards réalisée en amont) ; ils s'appliquent au niveau des tokens, pas composant par composant.
- **Composants visuels** : `src/components/ui/` (boutons, badges, logo, illustrations), `src/components/mathmap/` (bulles, graphe, badges de type de résultat) et `src/components/flashcards/` (carte recto/verso, lecteur de paquet).

## Déploiement

Le projet est un site Next.js standard, déployable sur Vercel, Netlify ou tout hébergeur Node. Pensez à mettre à jour `siteUrl` dans `src/app/layout.tsx` et `src/app/sitemap.ts`/`robots.ts` avec le nom de domaine définitif.

## Historique

Le site a d'abord été un blog (articles MDX dans `/content/articles`, pages `/articles` et `/themes`), avant une refonte qui a retiré ces pages pour se concentrer sur la Carte des maths, l'accueil et la page à propos. Le contenu éditorial (articles) a été supprimé dans cette refonte. Une seconde refonte a ensuite introduit l'esthétique actuelle (typographie Nunito, palettes saturées, boutons en relief, texture de grain) ainsi que l'espace Flash cards.
