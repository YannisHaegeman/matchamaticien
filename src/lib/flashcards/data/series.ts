import type { Flashcard } from "@/types/flashcards";

export const seriesCards: Flashcard[] = [
  {
    id: "suite-cauchy-definition",
    question: "Définir : une suite $(u_n)$ de $\\mathbb{K}$ est une suite de Cauchy.",
    answer: "$(u_n)$ est de Cauchy si $\\forall \\epsilon > 0,\\ \\exists N \\in \\mathbb{N}$ tel que si $n,m \\ge N$ alors $|u_n - u_m| \\le \\epsilon$.",
    remark: "Ici, les termes « s'agglutinent », mais la définition ne fait pas intervenir de limite.",
    source: "Déf 2.1",
  },
  {
    id: "cauchy-equivaut-convergente",
    question: "Soit $(u_n)$ une suite de $\\mathbb{K} = \\mathbb{R}$ ou $\\mathbb{C}$. Énoncer le lien entre « suite de Cauchy » et « suite convergente ».",
    answer: "$(u_n)$ est une suite de Cauchy $\\Leftrightarrow (u_n)$ est une suite convergente.",
    source: "Théorème 2.2",
  },
  {
    id: "serie-sommes-partielles-convergence",
    question:
      "Soit $(a_n)_{n \\in \\mathbb{N}}$ une suite. Définir la suite des sommes partielles associée, la série $\\sum a_k$, et ce que signifie sa convergence.",
    answer:
      "La suite des sommes partielles est $S_n \\overset{\\text{def}}{=} \\sum_{k=0}^{n} a_k = a_0 + a_1 + \\cdots + a_n$. On appelle *série* la somme (formelle) $\\sum_{k \\ge 0} a_k$. On dit que la série $\\sum a_k$ *converge* si la suite $(S_n)_{n \\ge 0}$ converge dans $\\mathbb{K}$ ; dans ce cas, on note $\\sum_{n=0}^{+\\infty} a_n = \\lim_{N \\to \\infty} S_N$ (la *somme* de la série).",
    source: "Déf 2.3",
  },
  {
    id: "combinaison-lineaire-series-convergentes",
    question: "Soient $\\sum a_n$ convergente vers $a$ et $\\sum b_n$ convergente vers $b$. Que peut-on dire de $\\sum \\alpha a_n + \\beta b_n$ pour $\\alpha, \\beta \\in \\mathbb{K}$ ?",
    answer: "$\\sum \\alpha a_n + \\beta b_n$ converge vers $\\alpha a + \\beta b$.",
    source: "Prop 2.8",
  },
  {
    id: "somme-divergente-convergente",
    question: "Que dire de la somme d'une série divergente et d'une série convergente ?",
    answer: "Elle est divergente.",
    remark: "Attention : la somme de deux séries divergentes n'est pas nécessairement divergente (ex. $a_n = \\frac{1}{n+1}$, $b_n = -\\frac{1}{n+1}$).",
    source: "Prop 2.9",
  },
  {
    id: "critere-cauchy-series",
    question: "Énoncer le critère de Cauchy pour les séries.",
    answer:
      "Une série $\\sum a_n$ converge si et seulement si pour tout $\\epsilon > 0$ il existe $N \\in \\mathbb{N}$ tel que pour tout $m,n \\ge N$ avec $m \\ge n$, on a $\\Big|\\sum_{k=n}^{m} a_k\\Big| \\le \\epsilon$.",
    source: "Théorème 2.11",
  },
  {
    id: "terme-general-tend-vers-zero",
    question: "Si une série $\\sum a_n$ converge, que peut-on en déduire sur la suite $(a_n)$ ?",
    answer: "La suite $(a_n)$ tend vers $0$ lorsque $n \\to \\infty$.",
    hint: "La réciproque est fausse (série harmonique).",
    source: "Corollaire 2.12",
  },
  {
    id: "divergence-grossiere-definition",
    question: "Définir : une série divergente $\\sum a_n$ diverge grossièrement.",
    answer: "$\\sum a_n$ diverge grossièrement si $a_n$ ne tend pas vers $0$ lorsque $n \\to +\\infty$.",
    source: "Déf 2.14",
  },
  {
    id: "convergence-serie-independante-premiers-termes",
    question: "Soit $(a_n)_{n \\ge 0}$ une suite et $N_0 \\in \\mathbb{N}$. Comparer la convergence de $\\sum_{n \\ge 0} a_n$ et de $\\sum_{n \\ge N_0} a_n$.",
    answer: "La série $\\sum_{n \\ge 0} a_n$ converge si et seulement si la série $\\sum_{n \\ge N_0} a_n$ converge.",
    remark: "La convergence d'une série ne dépend donc que du comportement de la suite à partir d'un certain rang, pas de ses premiers termes.",
    source: "Prop 2.15",
  },
  {
    id: "serie-positive-sommes-partielles-bornees",
    question: "Soit $a_n \\ge 0$ une suite positive. Énoncer le critère de convergence de $\\sum a_n$ via les sommes partielles.",
    answer: "La série $\\sum a_n$ converge si et seulement si la suite des sommes partielles $S_n$ est bornée.",
    source: "Prop 2.17",
  },
  {
    id: "convergence-absolue-serie-definition",
    question: "Définir : une série $\\sum a_n$ converge absolument.",
    answer: "$\\sum a_n$ converge absolument si la série positive $\\sum |a_n|$ converge.",
    source: "Déf 2.18",
  },
  {
    id: "serie-geometrique",
    question: "Énoncer le critère de convergence de la série géométrique $\\sum_{n \\ge 0} z^n$, $z \\in \\mathbb{C}$.",
    answer: "$\\sum_{n \\ge 0} z^n$ converge si et seulement si $|z| < 1$. Dans ce cas, la convergence est absolue et $\\displaystyle\\sum_{n=0}^{+\\infty} z^n = \\frac{1}{1-z}$.",
    source: "Prop 2.19",
  },
  {
    id: "theoreme-comparaison-series",
    question: "Énoncer quatre résultats de comparaison pour les séries, avec $(a_n)$ réelle ou complexe et $(b_n)$ réelle positive.",
    answer:
      "1\\. S'il existe $N_0$ tel que $|a_n| \\le b_n$ pour $n \\ge N_0$ et $\\sum b_n$ converge, alors $\\sum a_n$ converge et $\\Big|\\sum_{n=N_0}^{\\infty} a_n\\Big| \\le \\sum_{n=N_0}^{\\infty} |a_n| \\le \\sum_{n=N_0}^{\\infty} b_n < \\infty$. 2. Si $a_n = \\mathcal{O}(b_n)$ et $\\sum b_n$ converge ($b_n \\ge 0$), alors $\\sum a_n$ converge. 3. Si $\\sum |a_n|$ converge, alors $\\sum a_n$ converge (la convergence absolue implique la convergence). 4. Si $a_n$ est réelle, avec $a_n \\ge b_n$ à partir d'un certain rang et $\\sum b_n$ divergente, alors $\\sum a_n$ diverge.",
    source: "Théorème 2.22",
  },
  {
    id: "regle-equivalents-series",
    question: "Énoncer la règle des équivalents pour les séries.",
    answer:
      "Soit $(a_n)$ une suite réelle, $(b_n)$ une suite réelle **de signe constant**. 1. Si $a_n = \\mathcal{O}_{+\\infty}(|b_n|)$ et $\\sum b_n$ converge, alors $\\sum a_n$ converge, et la convergence est absolue. 2. Si $a_n \\sim b_n$ lorsque $n \\to +\\infty$, alors les séries $\\sum a_n$ et $\\sum b_n$ sont de même nature.",
    remark: "Si les suites sont équivalentes mais pas de signe constant à partir d'un certain rang, on ne peut rien conclure.",
    source: "Prop 2.25",
  },
  {
    id: "comparaison-series-integrales",
    question: "Soit $f$ continue par morceaux sur $[n_0, +\\infty[$ avec $n_0 \\in \\mathbb{N}$, $f$ **positive** et **décroissante**. Énoncer le théorème de comparaison séries-intégrales.",
    answer: "La série $\\sum_{n \\ge n_0} f(n)$ converge si et seulement si la fonction $f$ est intégrable sur $[n_0, +\\infty[$.",
    remark: "De manière équivalente : $\\sum_{n \\ge n_0} f(n)$ diverge ssi $f$ n'est pas intégrable sur $[n_0,+\\infty[$.",
    source: "Théorème 2.27",
  },
  {
    id: "series-riemann",
    question: "Énoncer le critère de Riemann pour les séries $\\sum_{n \\ge 1} \\frac{1}{n^\\alpha}$, $\\alpha \\in \\mathbb{R}$.",
    answer: "$\\sum_{n \\ge 1} \\frac{1}{n^\\alpha}$ converge si et seulement si $\\alpha > 1$.",
    source: "Corollaire 2.29",
  },
];
