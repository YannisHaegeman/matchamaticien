import type { Flashcard } from "@/types/flashcards";

export const integralesCards: Flashcard[] = [
  {
    id: "continue-par-morceaux",
    question:
      "Définir : une fonction $f : I \\to \\mathbb{R}$, où $I$ est un intervalle **borné**, est continue par morceaux.",
    answer:
      "$f$ est continue par morceaux s'il existe une subdivision finie $x_0 < x_1 < \\cdots < x_n$ de $\\overline{I}$ (l'adhérence de $I$, un segment) telle que, pour tout $i \\in \\{1, \\dots, n\\}$, $f$ est continue sur $]x_{i-1}, x_i[\\, \\cap\\, I$ et s'y prolonge par continuité à $[x_{i-1}, x_i]$. Pour $f$ définie sur un intervalle $J$ quelconque (borné ou non), on dit que $f$ est continue par morceaux sur $J$ si elle l'est sur tout segment inclus dans $J$.",
    remark:
      "C'est l'usage français courant (prépa, licence) : une définition un peu plus restrictive que celle de Tao (*Analysis I*), qui autorise des morceaux réduits à un point et n'impose aucune limite finie aux bornes — voir « Explication ».",
    explanationImages: [
      "/flashcards/continuite-par-morceaux/explication-1.png",
      "/flashcards/continuite-par-morceaux/explication-2.png",
    ],
    source: "Déf 1.1",
  },
  {
    id: "convergence-integrale-infini",
    question: "Soit $f \\in C_m([a,+\\infty[, \\mathbb{R})$. Définir la convergence de l'intégrale $\\int_a^{+\\infty} f$.",
    answer:
      "On dit que $\\int_a^{+\\infty} f$ converge si $\\displaystyle\\lim_{x \\to +\\infty} \\int_a^x f$ existe dans $\\mathbb{R}$. On note alors $\\int_a^{+\\infty} f$ cette limite ; sinon, on dit que l'intégrale diverge.",
    source: "Déf 1.2",
  },
  {
    id: "chasles-nature-integrale",
    question: "Soit $f \\in C_m([a,+\\infty[)$ et $b > a$. Que dire de la nature des intégrales $\\int_a^{+\\infty} f$ et $\\int_b^{+\\infty} f$ ?",
    answer:
      "Elles sont de même nature (toutes les deux convergentes, ou toutes les deux divergentes). De plus, en cas de convergence, $\\displaystyle\\int_a^{+\\infty} f = \\int_a^b f + \\int_b^{+\\infty} f$.",
    remark: "La convergence d'une intégrale sur un voisinage de $+\\infty$ ne dépend donc que du comportement de $f$ au voisinage de $+\\infty$.",
    source: "Prop 1.7",
  },
  {
    id: "convergence-integrale-complexe",
    question: "Soit $f \\in C_m([a,+\\infty[, \\mathbb{C})$. Définir la convergence de $\\int_a^{+\\infty} f$ dans le cas complexe.",
    answer:
      "$\\int_a^{+\\infty} f$ converge ssi $\\int_a^{+\\infty} \\mathrm{Re}\\, f$ et $\\int_a^{+\\infty} \\mathrm{Im}\\, f$ convergent, et l'on a alors $\\displaystyle\\int_a^{+\\infty} f = \\int_a^{+\\infty} \\mathrm{Re}\\, f + \\mathrm{i}\\int_a^{+\\infty} \\mathrm{Im}\\, f$.",
    source: "Déf 1.9",
  },
  {
    id: "positivite-integrale-generalisee",
    question:
      "Soit $f \\in C_m([a,+\\infty[, \\mathbb{R})$ positive telle que $\\int_{[a,+\\infty[} f$ converge. Que dire du signe de cette intégrale, et du cas d'égalité ?",
    answer: "$\\int_{[a,+\\infty[} f \\ge 0$. Si de plus $f$ est continue, $\\int_{[a,+\\infty[} f = 0$ si et seulement si $f = 0$.",
    source: "Prop 1.10",
  },
  {
    id: "semi-integrable-definition",
    question: "Définir : $f$ est semi-intégrable au voisinage de $+\\infty$.",
    answer:
      "$f$ (continue par morceaux) est *semi-intégrable* au voisinage de $+\\infty$ s'il existe un intervalle $[a,+\\infty[$ sur lequel $f$ est définie et $\\int_a^{+\\infty} f$ existe.",
    source: "Déf 1.11",
  },
  {
    id: "derivee-primitive-infini",
    question: "Soit $f \\in C_m([a,+\\infty[, \\mathbb{R})$ telle que $\\int_a^{+\\infty} f$ converge. Que dire de la fonction $x \\mapsto \\int_x^{+\\infty} f$ ?",
    answer: "Elle est de classe $C^1$ sur $[a,+\\infty[$, de dérivée égale à $-f$.",
    source: "Prop 1.12",
  },
  {
    id: "nature-integrale-fonction-positive",
    question:
      "Soit $f \\in C_m([a,+\\infty[, \\mathbb{R}_+)$ une fonction positive, $F(x) = \\int_a^x f$. Énoncer le critère de convergence/divergence de $\\int_a^{+\\infty} f$.",
    answer:
      "$\\int_a^{+\\infty} f$ converge si et seulement si $F$ est majorée sur $[a,+\\infty[$, et alors $\\int_a^{+\\infty} f = \\sup_{x \\ge a} \\int_a^x f$. L'intégrale diverge si et seulement si $\\displaystyle\\lim_{x \\to \\infty} \\int_a^x f = +\\infty$.",
    source: "Prop 1.13",
  },
  {
    id: "theoreme-comparaison-positif",
    question: "Énoncer le théorème de comparaison pour deux fonctions $f, g$ continues par morceaux et positives sur $[a,+\\infty[$.",
    answer:
      "On suppose l'existence de $b \\ge a$ tel que $\\forall t \\ge b,\\ f(t) \\le g(t)$. Alors : 1. $\\int_a^{+\\infty} g$ converge $\\Rightarrow \\int_a^{+\\infty} f$ converge, et $\\int_a^{+\\infty} f$ diverge $\\Rightarrow \\int_a^{+\\infty} g$ diverge. 2. Si $f = \\mathcal{O}(g)$ au voisinage de $+\\infty$ et $\\int_a^{+\\infty} g$ converge, alors $\\int_a^{+\\infty} f$ converge. 3. Si $f \\sim g$ au voisinage de $+\\infty$, alors $\\int_a^{+\\infty} g$ et $\\int_a^{+\\infty} f$ sont de même nature.",
    source: "Théorème 1.14",
  },
  {
    id: "lemme-methodes-comparaison",
    question: "Énoncer cinq méthodes de comparaison classiques pour deux fonctions réelles $f$ et $g$ (au voisinage de $a$).",
    answer:
      "1\\. Si $f \\xrightarrow{x \\to a} \\ell$ avec $\\ell$ fini, alors $f$ est bornée au voisinage de $a$. 2. Si $x^\\alpha f(x) \\xrightarrow{x \\to +\\infty} 0$, alors $f(x) = \\mathcal{O}_{+\\infty}(x^{-\\alpha})$. 3. Si $\\mathrm{e}^{\\alpha t} f(t) \\xrightarrow{t \\to +\\infty} 0$, alors $f(t) = \\mathcal{O}_{+\\infty}(\\mathrm{e}^{-\\alpha t})$. 4. Si $g(t) \\xrightarrow{t \\to +\\infty} \\ell < \\infty$, alors $f(t)g(t) = \\mathcal{O}_{+\\infty}(f(t))$. 5. Si $x^\\alpha f(x) \\xrightarrow{x \\to +\\infty} \\ell > 0$ alors il existe $b, C > 0$ tels que $f(x) \\ge Cx^{-\\alpha}$ pour $x \\ge b$.",
    source: "Lemme 1.18",
  },
  {
    id: "integrale-exponentielle",
    question: "Soit $\\alpha \\in \\mathbb{R}$. À quelle condition l'intégrale $\\int_0^{+\\infty} \\mathrm{e}^{-\\alpha t}\\, dt$ converge-t-elle ?",
    answer: "Elle converge si et seulement si $\\alpha < 0$.",
    source: "Prop 1.15",
  },
  {
    id: "integrales-riemann-infini",
    question: "Énoncer le critère de Riemann pour $\\int_1^{+\\infty} \\frac{1}{t^\\alpha}\\, dt$.",
    answer: "Soit $\\alpha \\in \\mathbb{R}$. L'intégrale $\\int_1^{+\\infty} \\frac{1}{t^\\alpha}\\, dt$ converge si et seulement si $\\alpha > 1$.",
    source: "Prop 1.16",
  },
  {
    id: "integrabilite-definition",
    question: "Définir : $f$ est intégrable sur $[a,+\\infty[$ (ou : $\\int_a^{+\\infty} f$ converge absolument).",
    answer: "$f \\in C_m([a,+\\infty[, \\mathbb{K})$ est intégrable sur $[a,+\\infty[$ si l'intégrale $\\int_a^{+\\infty} |f|$ converge.",
    source: "Déf 1.20",
  },
  {
    id: "integrabilite-implique-convergence",
    question: "Si $f \\in C_m([a,+\\infty[, \\mathbb{K})$ est intégrable sur $[a,+\\infty[$, que peut-on en déduire ?",
    answer:
      "Alors l'intégrale $\\int_a^{+\\infty} f$ converge. De plus, $\\Big|\\int_a^{+\\infty} f\\Big| \\le \\int_a^{+\\infty} |f|$.",
    remark: "$f$ peut être à valeurs complexes.",
    source: "Théorème 1.21",
  },
  {
    id: "comparaison-integrabilite",
    question:
      "Soit $f \\in C_m([a,+\\infty[, \\mathbb{K})$ et $g \\in C_m([a,+\\infty[, \\mathbb{R})$ positive et intégrable sur $[a,+\\infty[$, avec $\\exists b \\ge a, \\forall t \\ge b, |f(t)| \\le g(t)$. Que peut-on conclure, et quel cas particulier important s'en déduit ?",
    answer:
      "$f$ est intégrable sur $[a,+\\infty[$. En particulier : $f = \\mathcal{O}_{+\\infty}(g) \\Rightarrow f$ intégrable sur $[a,+\\infty[$, et de même $f = o_{+\\infty}(g) \\Rightarrow f$ intégrable sur $[a,+\\infty[$.",
    source: "Théorème 1.22",
  },
  {
    id: "signe-constant-definition",
    question: "Définir : $f$ est de signe constant au voisinage de $a \\in \\mathbb{R} \\cup \\{\\pm\\infty\\}$.",
    answer:
      "$f$ est de signe constant au voisinage de $a$ s'il existe un voisinage $V$ de $a$ tel que $f$ ne change pas de signe sur $V \\cap I$, c'est-à-dire $\\forall x \\in V \\cap I,\\ f(x) \\ge 0$, ou bien $\\forall x \\in V \\cap I,\\ f(x) \\le 0$.",
    source: "Déf 1.24",
  },
  {
    id: "regle-equivalents-reel-infini",
    question: "Énoncer la règle des équivalents (cas réel) pour $\\int_a^{+\\infty} f$.",
    answer:
      "Soit $f \\in C_m([a,+\\infty[, \\mathbb{R})$ et $g \\in C_m([a,+\\infty[, \\mathbb{R})$. On suppose que $f \\sim_{+\\infty} g$ et que $g$ est de **signe constant** au voisinage de $+\\infty$. Alors les intégrales $\\int_a^{+\\infty} f$ et $\\int_a^{+\\infty} g$ sont de même nature.",
    remark: "Si $g$ n'est pas de signe constant, on ne peut rien conclure en général.",
    source: "Théorème 1.25",
  },
  {
    id: "regle-equivalents-complexe-infini",
    question: "Énoncer la règle des équivalents (cas complexe) pour $\\int_a^{+\\infty} f$.",
    answer:
      "Soit $f \\in C_m([a,+\\infty[, \\mathbb{C})$ et $g \\in C_m([a,+\\infty[, \\mathbb{C})$. On suppose $f \\sim_{+\\infty} g$. Si $g$ est intégrable, c'est-à-dire si $\\int_a^{+\\infty} |g|$ converge, alors $\\int_a^{+\\infty} f$ converge.",
    source: "Corollaire 1.26",
  },
  {
    id: "convergence-integrale-moins-infini",
    question: "Soit $f \\in C_m(]-\\infty, a], \\mathbb{K})$. Définir la convergence de $\\int_{-\\infty}^a f$.",
    answer: "$\\int_{-\\infty}^a f$ converge si et seulement si $\\displaystyle\\lim_{x \\to -\\infty} \\int_x^a f$ existe dans $\\mathbb{K}$.",
    source: "Déf 1.29",
  },
  {
    id: "integrales-riemann-moins-infini",
    question: "Énoncer le critère de Riemann pour $\\int_{-\\infty}^a \\frac{1}{|t|^\\alpha}\\, dt$.",
    answer: "Soit $\\alpha \\in \\mathbb{R}$. L'intégrale $\\int_{-\\infty}^a \\frac{1}{|t|^\\alpha}\\, dt$ converge si et seulement si $\\alpha > 1$.",
    source: "Prop 1.30",
  },
  {
    id: "convergence-integrale-borne-semi-ouvert",
    question: "Soit $a<b$ réels, $f \\in C_m([a,b[, \\mathbb{K})$. Définir la convergence de $\\int_a^b f$.",
    answer:
      "$\\int_a^b f$ converge si la limite $\\displaystyle\\lim_{x \\to b} \\int_a^x f$ existe dans $\\mathbb{K}$. On la note alors $\\int_a^b f$ ; sinon, l'intégrale diverge.",
    source: "Déf 1.31",
  },
  {
    id: "integrales-riemann-bornees",
    question:
      "Soit $(a,b) \\in \\mathbb{R}^2$ avec $a<b$ et $\\alpha \\in \\mathbb{R}$. Énoncer le critère de Riemann pour $\\int_a^b \\frac{1}{(b-t)^\\alpha}\\, dt$ et $\\int_a^b \\frac{1}{(t-a)^\\alpha}\\, dt$.",
    answer:
      "$\\int_a^b \\frac{1}{(b-t)^\\alpha}\\, dt$ converge si et seulement si $\\alpha < 1$. De même, $\\int_a^b \\frac{1}{(t-a)^\\alpha}\\, dt$ converge si et seulement si $\\alpha < 1$.",
    hint: "Attention au sens de l'inégalité, inversé par rapport au critère de Riemann en $+\\infty$ ($\\alpha > 1$).",
    source: "Théorème 1.32",
  },
  {
    id: "integrabilite-intervalle-semi-ouvert",
    question: "Soit $f \\in C_m([a,b[, \\mathbb{K})$. Définir : $f$ est intégrable sur $[a,b[$.",
    answer: "$f$ est intégrable sur $[a,b[$, ou on dit que l'intégrale $\\int_a^b f$ converge absolument, si l'intégrale $\\int_a^b |f|$ converge.",
    source: "Déf 1.33",
  },
  {
    id: "limite-finie-implique-convergence",
    question: "Soit $f : [a,b[ \\to \\mathbb{K}$ continue. Si $f$ admet une limite finie en $b$, que peut-on en déduire ?",
    answer: "L'intégrale $\\int_a^b f$ converge.",
    remark: "En particulier, toute fonction continue bornée au voisinage de $b$ est intégrable sur $[a,b[$ par comparaison.",
    source: "Prop 1.34",
  },
  {
    id: "theoreme-comparaison-semi-ouvert",
    question:
      "Soit $f \\in C_m([a,b[, \\mathbb{K})$ et $g \\in C_m([a,b[, \\mathbb{R}_+)$ positive. Énoncer le théorème de comparaison (adaptation en $b$ fini).",
    answer:
      "(i) S'il existe $b' \\ge a$ tel que $\\forall t \\in [b',b[,\\ |f(t)| \\le g(t)$, alors $\\int_a^b g$ converge $\\Rightarrow f$ intégrable sur $[a,b[$. (ii) Si $f = \\mathcal{O}(g)$ au voisinage de $b$ et $g$ est intégrable au voisinage de $b$, alors $f$ est intégrable sur $[a,b[$. (ii') Si $f = o(g)$ au voisinage de $b$ et $g$ est intégrable au voisinage de $b$, alors $f$ est intégrable sur $[a,b[$.",
    source: "Théorème 1.37",
  },
  {
    id: "regle-equivalents-semi-ouvert",
    question: "Énoncer la règle des équivalents pour $\\int_a^b f$ (cas réel, $b$ fini).",
    answer:
      "Soit $f, g \\in C_m([a,b[, \\mathbb{R})$ avec $f \\sim g$ au voisinage de $b$. Si $g$ est **de signe constant** au voisinage de $b$, alors les intégrales $\\int_a^b f$ et $\\int_a^b g$ sont de même nature.",
    source: "Théorème 1.38",
  },
  {
    id: "independance-point-coupure",
    question: "Soit $f \\in C(]a,b[)$ et $c \\in\\, ]a,b[$ tel que $\\int_a^c f$ et $\\int_c^b f$ convergent. Que peut-on dire pour un autre $c' \\in\\, ]a,b[$ ?",
    answer:
      "Pour tout $c' \\in\\, ]a,b[$, les deux intégrales $\\int_a^{c'} f$ et $\\int_{c'}^b f$ convergent également, et $\\displaystyle\\int_a^{c'} f + \\int_{c'}^b f = \\int_a^c f + \\int_c^b f$.",
    source: "Prop 1.40",
  },
  {
    id: "convergence-integrale-intervalle-ouvert",
    question: "Définir la convergence de $\\int_a^b f$ pour $f \\in C_m(]a,b[, \\mathbb{K})$ (intervalle ouvert).",
    answer:
      "$\\int_a^b f$ converge s'il existe $c \\in\\, ]a,b[$ tel que les deux intégrales $\\int_a^c f$ et $\\int_c^b f$ convergent. On pose alors $\\int_a^b f \\overset{\\text{def}}{=} \\int_a^c f + \\int_c^b f$ (valeur indépendante de $c$) ; sinon, l'intégrale diverge.",
    source: "Déf 1.41",
  },
  {
    id: "convergence-via-limites-primitive",
    question:
      "Soit $f \\in C_m(]a,b[, \\mathbb{K})$ et $c \\in\\, ]a,b[$ fixé, $F : x \\mapsto \\int_c^x f$. À quelle condition $\\int_a^b f$ converge-t-elle, et comment calculer sa valeur ?",
    answer:
      "$\\int_a^b f$ converge si et seulement si $F$ admet des limites dans $\\mathbb{K}$ en $a$ et en $b$. Dans ce cas, $\\displaystyle\\int_a^b f = \\lim_b F - \\lim_a F$.",
    source: "Prop 1.42",
  },
  {
    id: "integration-par-parties-generalisee",
    question: "Énoncer l'intégration par parties pour les intégrales généralisées.",
    answer:
      "Soient $f,g$ de classe $C^1$ sur $I$ d'extrémités $a$ et $b$ ($-\\infty \\le a < b \\le +\\infty$). L'existence de deux termes parmi $\\int_a^b f'g$, $[fg]_a^b$, $\\int_a^b fg'$ entraîne l'existence du troisième, et alors $\\displaystyle\\int_a^b f'g = [fg]_a^b - \\int_a^b fg'$.",
    source: "Prop 1.45",
  },
  {
    id: "changement-variable-generalise",
    question: "Énoncer le théorème de changement de variable pour les intégrales généralisées.",
    answer:
      "Soit $f \\in C(]a,b[)$ et $\\varphi : ]\\alpha,\\beta[ \\to\\, ]a,b[$ avec $-\\infty \\le a<b \\le +\\infty$, $-\\infty \\le \\alpha<\\beta \\le +\\infty$. On suppose $\\varphi$ strictement croissante (resp. strictement décroissante) et dérivable. Alors les intégrales $\\int_a^b f(t)\\,dt$ et $\\int_\\alpha^\\beta f(\\varphi(u))\\varphi'(u)\\,du$ sont de même nature, et égales en cas de convergence (resp. $\\int_a^b f(t)\\,dt$ et $-\\int_\\alpha^\\beta f(\\varphi(u))\\varphi'(u)\\,du$).",
    source: "Prop 1.47",
  },
  {
    id: "regle-abel",
    question: "Énoncer la règle d'Abel pour les intégrales généralisées.",
    answer:
      "Soit $I=[a,b[$, $b \\in \\mathbb{R} \\cup \\{+\\infty\\}$, $x_0 \\in I$. On considère $f$ continue, réelle, de classe $C^1$ et décroissante sur $[x_0,b[$, avec $\\lim_{x \\to b} f = 0$. On suppose que $g$ est continue, à valeurs éventuellement complexes, telle qu'il existe $M \\ge 0$ avec $\\forall x,y \\in [x_0,b[,\\ \\Big|\\int_x^y g(t)\\,dt\\Big| \\le M$. Alors $\\int_{x_0}^{+\\infty} fg$ converge.",
    hint: "Hypothèses à retenir : $f$ décroissante vers $0$, primitives de $g$ uniformément bornées.",
    source: "Théorème 1.54",
  },
];
