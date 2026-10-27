import type { MathSubtopic } from "@/types/mathmap";

/**
 * Thème « Groupes » — données de démonstration de la Carte des maths.
 *
 * C'est le thème le plus fourni : il sert de vitrine pour montrer le
 * système de relations entre résultats (voir en particulier
 * `theoreme-critere-sous-groupe`, utilisé dans quatre démonstrations
 * réparties sur trois sous-thèmes différents).
 */
export const groupesSubtopics: MathSubtopic[] = [
  {
    id: "axiomes",
    title: "Axiomes de la structure de groupe",
    description:
      "La définition d'un groupe, et les premiers réflexes pour la manipuler.",
    results: [
      {
        id: "definition-groupe",
        type: "definition",
        title: "Groupe",
        difficulty: "fondamental",
        statement: `Soit $G$ un ensemble muni d'une loi de composition interne $\\ast$. On dit que $(G, \\ast)$ est un **groupe** si :

1. la loi $\\ast$ est **associative** : $\\forall x, y, z \\in G,\\ (x \\ast y) \\ast z = x \\ast (y \\ast z)$ ;
2. il existe un **élément neutre** $e \\in G$ tel que $\\forall x \\in G,\\ x \\ast e = e \\ast x = x$ ;
3. tout élément est **symétrisable** : $\\forall x \\in G,\\ \\exists x' \\in G,\\ x \\ast x' = x' \\ast x = e$.

Si de plus $\\ast$ est commutative, on dit que $(G, \\ast)$ est un groupe **abélien** (ou commutatif).`,
        relations: [
          {
            targetId: "definition-loi-composition-interne",
            type: "depend-de",
            note: "une LCI, avant d'être un groupe",
          },
        ],
      },
      {
        id: "exemple-groupe-z",
        type: "exemple",
        title: "$(\\mathbb{Z}, +)$ est un groupe abélien",
        difficulty: "fondamental",
        statement: `L'addition sur $\\mathbb{Z}$ est associative et commutative, $0$ est élément neutre, et tout entier $n$ admet $-n$ comme symétrique. $(\\mathbb{Z}, +)$ est donc un groupe abélien — l'exemple le plus simple, celui à garder en tête en premier.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "contre-exemple-n-non-groupe",
        type: "contre-exemple",
        title: "$(\\mathbb{N}, +)$ n'est pas un groupe",
        difficulty: "fondamental",
        statement: `$(\\mathbb{N}, +)$ est associatif, commutatif, et possède bien un élément neutre ($0$). Mais aucun entier $n \\geqslant 1$ n'a de symétrique dans $\\mathbb{N}$ : il faudrait $-n$, qui n'est pas un entier naturel. Le troisième axiome échoue, donc $(\\mathbb{N}, +)$ n'est **pas** un groupe — seulement ce qu'on appelle un monoïde.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "proposition-unicite-neutre-symetrique",
        type: "proposition",
        title: "Unicité de l'élément neutre et du symétrique",
        difficulty: "standard",
        statement: `Dans un groupe $(G, \\ast)$, l'élément neutre est unique, et le symétrique de chaque élément $x \\in G$ est unique. On le note désormais $x^{-1}$ (ou $-x$ en notation additive).`,
        proof: `Supposons $e$ et $e'$ deux éléments neutres de $G$. Alors $e \\ast e' = e$ (car $e'$ est neutre) et $e \\ast e' = e'$ (car $e$ est neutre), donc $e = e'$ : l'élément neutre est unique.

Soit maintenant $x \\in G$, et supposons que $x'$ et $x''$ soient deux symétriques de $x$. Alors :

$$
x' = x' \\ast e = x' \\ast (x \\ast x'') = (x' \\ast x) \\ast x'' = e \\ast x'' = x''
$$

en utilisant l'associativité de $\\ast$. Le symétrique de $x$ est donc unique.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
    ],
  },
  {
    id: "centre",
    title: "Centre d'un groupe",
    description: "Les éléments qui commutent avec tout le monde.",
    results: [
      {
        id: "definition-centre",
        type: "definition",
        title: "Centre d'un groupe",
        difficulty: "standard",
        statement: `Soit $(G, \\ast)$ un groupe. On appelle **centre** de $G$, noté $Z(G)$, l'ensemble des éléments de $G$ qui commutent avec tous les autres :

$$
Z(G) = \\{ x \\in G \\ \\mid\\ \\forall g \\in G,\\ x \\ast g = g \\ast x \\}
$$

Un groupe $G$ est abélien si et seulement si $Z(G) = G$.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "proposition-centre-sous-groupe",
        type: "proposition",
        title: "Le centre est un sous-groupe abélien de $G$",
        difficulty: "standard",
        statement: `Pour tout groupe $(G, \\ast)$, le centre $Z(G)$ est un sous-groupe abélien de $G$.`,
        proof: `On applique le [théorème du critère de sous-groupe](/carte-des-maths/groupes/sous-groupes/theoreme-critere-sous-groupe). $Z(G)$ contient $e$ (l'élément neutre commute trivialement avec tout élément), donc $Z(G)$ est non vide.

Soient $x, y \\in Z(G)$. Montrons que $x \\ast y^{-1} \\in Z(G)$, c'est-à-dire que $x \\ast y^{-1}$ commute avec tout $g \\in G$. Comme $y \\in Z(G)$, on a $y \\ast g = g \\ast y$ pour tout $g$, ce qui donne aussi $y^{-1} \\ast g = g \\ast y^{-1}$ (en composant des deux côtés par $y^{-1}$). Alors :

$$
(x \\ast y^{-1}) \\ast g = x \\ast (y^{-1} \\ast g) = x \\ast (g \\ast y^{-1}) = (x \\ast g) \\ast y^{-1} = (g \\ast x) \\ast y^{-1} = g \\ast (x \\ast y^{-1})
$$

Donc $x \\ast y^{-1} \\in Z(G)$. Par le critère de sous-groupe, $Z(G)$ est un sous-groupe de $G$ ; il est abélien puisque ses éléments commutent avec tout $G$, en particulier entre eux.`,
        relations: [
          { targetId: "definition-centre", type: "depend-de" },
          {
            targetId: "theoreme-critere-sous-groupe",
            type: "depend-de",
            note: "pour vérifier que Z(G) est un sous-groupe",
          },
        ],
      },
    ],
  },
  {
    id: "sous-groupes",
    title: "Sous-groupes",
    description:
      "Repérer les groupes cachés à l'intérieur d'un groupe plus grand.",
    results: [
      {
        id: "definition-sous-groupe",
        type: "definition",
        title: "Sous-groupe",
        difficulty: "fondamental",
        statement: `Soit $(G, \\ast)$ un groupe. Une partie $H \\subset G$ est un **sous-groupe** de $G$ si $H$, muni de la loi induite par $\\ast$, est lui-même un groupe. En particulier $e \\in H$, et $H$ est stable par $\\ast$ et par passage au symétrique.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "theoreme-critere-sous-groupe",
        type: "theoreme",
        title: "Critère de sous-groupe",
        difficulty: "standard",
        statement: `Soit $(G, \\ast)$ un groupe et $H$ une partie **non vide** de $G$. Alors $H$ est un sous-groupe de $G$ si et seulement si :

$$
\\forall x, y \\in H,\\quad x \\ast y^{-1} \\in H
$$`,
        proof: `**Sens direct.** Si $H$ est un sous-groupe, il est stable par $\\ast$ et par passage au symétrique, donc pour $x, y \\in H$ on a $y^{-1} \\in H$ puis $x \\ast y^{-1} \\in H$.

**Réciproque.** Supposons $H$ non vide et stable par $(x, y) \\mapsto x \\ast y^{-1}$.

Comme $H \\neq \\varnothing$, soit $x_0 \\in H$. En appliquant l'hypothèse au couple $(x_0, x_0)$, on obtient $x_0 \\ast x_0^{-1} = e \\in H$ : $H$ contient l'élément neutre.

Soit ensuite $y \\in H$. En appliquant l'hypothèse au couple $(e, y)$, on obtient $e \\ast y^{-1} = y^{-1} \\in H$ : $H$ est stable par passage au symétrique.

Enfin, soient $x, y \\in H$. On vient de voir que $y^{-1} \\in H$ ; en appliquant l'hypothèse au couple $(x, y^{-1})$, on obtient $x \\ast (y^{-1})^{-1} = x \\ast y \\in H$ : $H$ est stable par $\\ast$.

$H$ contient $e$, est stable par $\\ast$ et par passage au symétrique, et l'associativité est héritée de $G$ : $H$ est donc un sous-groupe de $G$.`,
        relations: [
          { targetId: "definition-sous-groupe", type: "depend-de" },
        ],
      },
      {
        id: "proposition-sous-groupe-engendre",
        type: "proposition",
        title: "Sous-groupe engendré par une partie",
        difficulty: "standard",
        statement: `Soit $(G, \\ast)$ un groupe et $A \\subset G$ une partie quelconque. L'intersection de tous les sous-groupes de $G$ contenant $A$ est elle-même un sous-groupe de $G$ : c'est le **sous-groupe engendré par $A$**, noté $\\langle A \\rangle$. C'est le plus petit sous-groupe de $G$ (au sens de l'inclusion) contenant $A$.`,
        proof: `Notons $(H_i)_{i \\in I}$ la famille de tous les sous-groupes de $G$ contenant $A$ (famille non vide, car $G$ lui-même en fait partie), et $H = \\bigcap_{i \\in I} H_i$.

$H$ est non vide car $e \\in H_i$ pour tout $i$ (chaque $H_i$ est un sous-groupe), donc $e \\in H$.

Soient $x, y \\in H$. Pour tout $i \\in I$, $x, y \\in H_i$, et par le [critère de sous-groupe](/carte-des-maths/groupes/sous-groupes/theoreme-critere-sous-groupe) appliqué à $H_i$, $x \\ast y^{-1} \\in H_i$. Ceci étant vrai pour tout $i$, $x \\ast y^{-1} \\in H$.

Par le critère de sous-groupe (appliqué cette fois à $H$), $H$ est un sous-groupe de $G$. Il contient $A$ par construction, et il est inclus dans chaque $H_i$, donc dans tout sous-groupe de $G$ contenant $A$ : c'est bien le plus petit.`,
        relations: [
          { targetId: "theoreme-critere-sous-groupe", type: "depend-de" },
        ],
      },
      {
        id: "theoreme-lagrange",
        type: "theoreme",
        title: "Théorème de Lagrange",
        difficulty: "avance",
        statement: `Soit $G$ un groupe **fini** et $H$ un sous-groupe de $G$. Alors le cardinal de $H$ divise le cardinal de $G$ :

$$
|H| \\ \\text{divise}\\ |G|
$$`,
        proof: `Considérons la relation $x \\sim y \\iff x^{-1} \\ast y \\in H$ sur $G$. C'est une relation d'équivalence (elle hérite des axiomes de groupe de $H$), dont les classes sont les **classes à gauche** $gH = \\{ g \\ast h \\mid h \\in H \\}$.

Pour tout $g \\in G$, l'application $h \\mapsto g \\ast h$ est une bijection de $H$ vers $gH$ (de réciproque $x \\mapsto g^{-1} \\ast x$), donc $|gH| = |H|$ : toutes les classes ont le même cardinal, $|H|$.

Les classes à gauche forment une partition de $G$ (ce sont les classes d'une relation d'équivalence). En notant $k$ le nombre de classes distinctes, on obtient :

$$
|G| = \\sum_{\\text{classes}} |gH| = k \\cdot |H|
$$

donc $|H|$ divise $|G|$, avec $k = |G| / |H|$ appelé **indice** de $H$ dans $G$.`,
        relations: [{ targetId: "definition-sous-groupe", type: "depend-de" }],
      },
    ],
  },
  {
    id: "ordre",
    title: "Ordre des éléments d'un groupe",
    description:
      "Combien de fois faut-il composer un élément avec lui-même pour retomber sur l'élément neutre.",
    results: [
      {
        id: "definition-ordre-element",
        type: "definition",
        title: "Ordre d'un élément",
        difficulty: "standard",
        statement: `Soit $(G, \\ast)$ un groupe et $x \\in G$. On appelle **ordre** de $x$, noté $\\text{ord}(x)$, le plus petit entier $n \\geqslant 1$ tel que $x^n = e$ (où $x^n$ désigne $x$ composé $n$ fois avec lui-même), s'il existe — sinon on dit que $x$ est d'ordre infini.

Si $G$ est fini, tout élément est d'ordre fini : $\\text{ord}(x)$ est alors exactement le cardinal du sous-groupe $\\langle x \\rangle$ engendré par $x$.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "corollaire-ordre-divise-cardinal",
        type: "corollaire",
        title: "L'ordre d'un élément divise l'ordre du groupe",
        difficulty: "standard",
        statement: `Soit $G$ un groupe **fini** et $x \\in G$. Alors $\\text{ord}(x)$ divise $|G|$. En particulier, $x^{|G|} = e$ pour tout $x \\in G$.`,
        proof: `Le sous-groupe engendré par $x$, $\\langle x \\rangle = \\{ e, x, x^2, \\dots, x^{\\text{ord}(x) - 1} \\}$, est de cardinal exactement $\\text{ord}(x)$.

En appliquant le [théorème de Lagrange](/carte-des-maths/groupes/sous-groupes/theoreme-lagrange) au sous-groupe $\\langle x \\rangle$ de $G$, on obtient que $|\\langle x \\rangle| = \\text{ord}(x)$ divise $|G|$.

En écrivant $|G| = \\text{ord}(x) \\cdot k$, on a $x^{|G|} = (x^{\\text{ord}(x)})^k = e^k = e$.`,
        relations: [
          { targetId: "definition-ordre-element", type: "depend-de" },
          { targetId: "theoreme-lagrange", type: "depend-de" },
        ],
      },
    ],
  },
  {
    id: "morphismes",
    title: "Morphismes et isomorphismes de groupes",
    description:
      "Les applications qui respectent la structure de groupe, et ce qu'elles révèlent.",
    results: [
      {
        id: "definition-morphisme-groupes",
        type: "definition",
        title: "Morphisme de groupes",
        difficulty: "fondamental",
        statement: `Soient $(G, \\ast)$ et $(G', \\star)$ deux groupes. Une application $f : G \\to G'$ est un **morphisme de groupes** si :

$$
\\forall x, y \\in G,\\quad f(x \\ast y) = f(x) \\star f(y)
$$

On note $\\ker f = \\{ x \\in G \\mid f(x) = e' \\}$ le **noyau** de $f$, et $\\text{Im}\\, f = f(G)$ son **image**.`,
        relations: [{ targetId: "definition-groupe", type: "depend-de" }],
      },
      {
        id: "definition-sous-groupe-distingue",
        type: "definition",
        title: "Sous-groupe distingué",
        difficulty: "standard",
        statement: `Un sous-groupe $H$ d'un groupe $G$ est **distingué** (ou normal), noté $H \\trianglelefteq G$, si $H$ est stable par conjugaison :

$$
\\forall g \\in G,\\ \\forall h \\in H,\\quad g \\ast h \\ast g^{-1} \\in H
$$

Dans un groupe abélien, tout sous-groupe est distingué.`,
        relations: [{ targetId: "definition-sous-groupe", type: "depend-de" }],
      },
      {
        id: "proposition-noyau-sous-groupe",
        type: "proposition",
        title: "Le noyau d'un morphisme est un sous-groupe distingué",
        difficulty: "standard",
        statement: `Soit $f : G \\to G'$ un morphisme de groupes. Alors $\\ker f$ est un sous-groupe **distingué** de $G$.`,
        proof: `On applique le [théorème du critère de sous-groupe](/carte-des-maths/groupes/sous-groupes/theoreme-critere-sous-groupe). D'abord, $f(e) = e'$ (propriété classique des morphismes), donc $e \\in \\ker f$ : $\\ker f$ est non vide.

Soient $x, y \\in \\ker f$. Alors $f(x \\ast y^{-1}) = f(x) \\star f(y)^{-1} = e' \\star e'^{-1} = e'$, donc $x \\ast y^{-1} \\in \\ker f$. Par le critère de sous-groupe, $\\ker f$ est un sous-groupe de $G$.

Montrons qu'il est distingué. Soient $g \\in G$ et $h \\in \\ker f$ :

$$
f(g \\ast h \\ast g^{-1}) = f(g) \\star f(h) \\star f(g)^{-1} = f(g) \\star e' \\star f(g)^{-1} = f(g) \\star f(g)^{-1} = e'
$$

donc $g \\ast h \\ast g^{-1} \\in \\ker f$ : $\\ker f$ est stable par conjugaison, donc distingué.`,
        relations: [
          {
            targetId: "theoreme-critere-sous-groupe",
            type: "depend-de",
            note: "pour montrer que ker f est un sous-groupe",
          },
          { targetId: "definition-morphisme-groupes", type: "depend-de" },
          { targetId: "definition-sous-groupe-distingue", type: "depend-de" },
        ],
      },
      {
        id: "proposition-image-sous-groupe",
        type: "proposition",
        title: "L'image d'un sous-groupe par un morphisme est un sous-groupe",
        difficulty: "standard",
        statement: `Soit $f : G \\to G'$ un morphisme de groupes et $H$ un sous-groupe de $G$. Alors $f(H)$ est un sous-groupe de $G'$. En particulier, $\\text{Im}\\, f = f(G)$ est un sous-groupe de $G'$.`,
        proof: `On applique de nouveau le [théorème du critère de sous-groupe](/carte-des-maths/groupes/sous-groupes/theoreme-critere-sous-groupe), cette fois dans $G'$. Comme $e \\in H$, on a $f(e) = e' \\in f(H)$ : $f(H)$ est non vide.

Soient $x', y' \\in f(H)$, avec $x' = f(x)$ et $y' = f(y)$ pour $x, y \\in H$. Alors :

$$
x' \\star y'^{-1} = f(x) \\star f(y)^{-1} = f(x \\ast y^{-1})
$$

Comme $H$ est un sous-groupe de $G$, $x \\ast y^{-1} \\in H$, donc $x' \\star y'^{-1} = f(x \\ast y^{-1}) \\in f(H)$. Par le critère de sous-groupe, $f(H)$ est un sous-groupe de $G'$.`,
        relations: [
          { targetId: "theoreme-critere-sous-groupe", type: "depend-de" },
          { targetId: "definition-morphisme-groupes", type: "depend-de" },
        ],
      },
      {
        id: "theoreme-injectif-noyau-trivial",
        type: "theoreme",
        title: "Un morphisme est injectif si et seulement si son noyau est trivial",
        difficulty: "standard",
        statement: `Soit $f : G \\to G'$ un morphisme de groupes. Alors $f$ est injectif si et seulement si $\\ker f = \\{e\\}$.`,
        proof: `**Sens direct.** Si $f$ est injectif, et $x \\in \\ker f$, alors $f(x) = e' = f(e)$, donc $x = e$ par injectivité : $\\ker f = \\{e\\}$.

**Réciproque.** Supposons $\\ker f = \\{e\\}$, et soient $x, y \\in G$ tels que $f(x) = f(y)$. Alors $f(x \\ast y^{-1}) = f(x) \\star f(y)^{-1} = e'$, donc $x \\ast y^{-1} \\in \\ker f = \\{e\\}$, d'où $x \\ast y^{-1} = e$, c'est-à-dire $x = y$. $f$ est donc injectif.`,
        relations: [
          { targetId: "proposition-noyau-sous-groupe", type: "depend-de" },
          { targetId: "definition-morphisme-groupes", type: "depend-de" },
        ],
      },
      {
        id: "definition-isomorphisme",
        type: "definition",
        title: "Isomorphisme de groupes",
        difficulty: "fondamental",
        statement: `Un morphisme de groupes $f : G \\to G'$ est un **isomorphisme** s'il est bijectif. On dit alors que $G$ et $G'$ sont **isomorphes**, noté $G \\simeq G'$ : ils ont, au nom des éléments près, exactement la même structure.`,
        relations: [
          { targetId: "definition-morphisme-groupes", type: "depend-de" },
        ],
      },
    ],
  },
  {
    id: "simples-resolubles",
    title: "Groupes simples et groupes résolubles",
    description:
      "Deux façons opposées de mesurer la complexité d'un groupe à travers ses sous-groupes distingués.",
    results: [
      {
        id: "definition-groupe-simple",
        type: "definition",
        title: "Groupe simple",
        difficulty: "avance",
        statement: `Un groupe $G$ est dit **simple** si $G \\neq \\{e\\}$ et si ses seuls sous-groupes distingués sont $\\{e\\}$ et $G$ lui-même. Les groupes simples jouent, pour les groupes finis, un rôle analogue à celui des nombres premiers pour les entiers.`,
        relations: [
          { targetId: "definition-sous-groupe-distingue", type: "depend-de" },
        ],
      },
      {
        id: "definition-groupe-resoluble",
        type: "definition",
        title: "Groupe résoluble",
        difficulty: "avance",
        statement: `Un groupe $G$ est dit **résoluble** s'il existe une suite finie de sous-groupes

$$
\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq \\cdots \\trianglelefteq G_n = G
$$

où chaque $G_i$ est distingué dans $G_{i+1}$ et chaque quotient $G_{i+1} / G_i$ est abélien. C'est cette notion qui, via la théorie de Galois, explique pourquoi certaines équations polynomiales ne sont pas résolubles par radicaux.`,
        relations: [
          { targetId: "definition-sous-groupe-distingue", type: "depend-de" },
        ],
      },
      {
        id: "exemple-a5-simple",
        type: "exemple",
        title: "Le groupe alterné $A_5$ est simple",
        difficulty: "avance",
        statement: `Le groupe alterné $A_5$ (les permutations paires de $\\{1, \\dots, 5\\}$, de cardinal $60$) est un groupe simple : il n'a aucun sous-groupe distingué non trivial. C'est le plus petit groupe simple non abélien, et un ingrédient clé de la preuve que l'équation générale de degré $5$ n'est pas résoluble par radicaux — $A_5$ étant simple et non abélien, il ne peut apparaître dans une suite de résolubilité.`,
        relations: [
          { targetId: "definition-groupe-simple", type: "depend-de" },
        ],
      },
    ],
  },
];
