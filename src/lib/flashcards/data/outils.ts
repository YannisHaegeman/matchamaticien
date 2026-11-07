import type { Flashcard } from "@/types/flashcards";

export const outilsCards: Flashcard[] = [
  {
    id: "ensemble-majore-minore",
    question: "Définir : un sous-ensemble $A \\subset \\mathbb{R}$ majoré (resp. minoré).",
    answer:
      "$A$ est *majoré* s'il existe $M \\in \\mathbb{R}$ tel que $\\forall x \\in A,\\ x \\le M$. $A$ est *minoré* s'il existe $m \\in \\mathbb{R}$ tel que $\\forall x \\in A,\\ m \\le x$.",
    source: "Déf 0.1",
  },
  {
    id: "borne-superieure-definition",
    question: "Définir la borne supérieure d'un ensemble $A \\subset \\mathbb{R}$.",
    answer:
      "$\\sup A \\in \\mathbb{R}$ est le nombre (s'il existe) qui vérifie : (1) $\\sup A$ est un majorant de $A$ ; (2) il existe une suite de $A$ qui tend vers $\\sup A$. S'il n'existe pas un tel nombre, on pose $\\sup A = +\\infty$.",
    remark:
      "Rien n'impose que $\\sup A \\in A$ : par exemple $\\sup [0,1[ = 1 \\notin [0,1[$.",
    source: "Déf 0.2",
  },
  {
    id: "existence-borne-superieure",
    question: "Énoncer le théorème d'existence de la borne supérieure.",
    answer: "Toute partie non vide majorée de $\\mathbb{R}$ admet une borne supérieure dans $\\mathbb{R}$.",
    remark:
      "Propriété spécifique à $\\mathbb{R}$ : elle est fausse pour $\\mathbb{Q}$, bien que $\\mathbb{Q}$ soit aussi muni d'une relation d'ordre.",
    source: "Théorème 0.5",
  },
  {
    id: "max-min-definition",
    question: "Soit $A \\subset \\mathbb{R}$ majoré. Définir $\\max A$ (et, pour $A$ minoré, $\\min A$).",
    answer:
      "Si $\\sup A \\in A$, on dit que $\\sup A$ est le *maximum* de $A$, noté $\\max A$. De même, si $A$ est minoré et $\\inf A \\in A$, on dit que $\\inf A$ est le *minimum* de $A$, noté $\\min A$.",
    source: "Déf 0.6",
  },
  {
    id: "point-accumulation",
    question: "Définir : $x$ est un point d'accumulation de $A \\subset \\mathbb{R}$.",
    answer: "$x$ est un point d'accumulation de $A$ si $\\forall \\epsilon > 0,\\ ]x-\\epsilon, x+\\epsilon[ \\cap A \\ne \\emptyset$.",
    remark: "Autrement dit, tout intervalle ouvert centré en $x$, aussi petit soit-il, contient un point de $A$.",
    source: "Déf 0.11",
  },
  {
    id: "voisinage-definition",
    question:
      "Soit $A \\subset \\mathbb{R}$ et $a \\in A$. Définir un voisinage de $a$ dans $A$, puis un voisinage de $A$.",
    answer:
      "Un *voisinage d'un point* $a$ dans $A$ est un ensemble de la forme $]a-\\eta, a+\\eta[ \\cap A$ où $\\eta > 0$. On dit que $V$ est un *voisinage de $A$* si, pour tout $a \\in A$, il existe un intervalle de la forme $]a-\\eta, a+\\eta[$ tel que $]a-\\eta, a+\\eta[ \\cap A \\subset V$.",
    source: "Déf 0.14",
  },
  {
    id: "voisinage-infini",
    question: "Définir un voisinage de $+\\infty$ (resp. de $-\\infty$) dans $\\mathbb{R}$.",
    answer:
      "Un voisinage de $+\\infty$ est tout ensemble de la forme $]a, +\\infty[$ avec $a \\in \\mathbb{R}$. Un voisinage de $-\\infty$ est tout ensemble de la forme $]-\\infty, a[$ avec $a \\in \\mathbb{R}$.",
    source: "p. 8",
  },
  {
    id: "inegalite-triangulaire",
    question:
      "Énoncer l'inégalité triangulaire (et sa variante, la deuxième inégalité triangulaire) pour des nombres complexes.",
    answer:
      "Pour tout $z, z' \\in \\mathbb{C}$ : $|z+z'| \\le |z| + |z'|$. On en déduit la deuxième inégalité triangulaire : $\\big||z|-|z'|\\big| \\le |z+z'|$.",
    source: "Prop 0.18, Cor 0.19",
  },
  {
    id: "inegalite-triangulaire-generalisee",
    question: "Énoncer l'inégalité triangulaire généralisée à $n$ nombres complexes.",
    answer: "Soient $z_i, i = 1 \\ldots n$ des nombres complexes. Alors $\\Big|\\sum_{i=1}^{n} z_i\\Big| \\le \\sum_{i=1}^{n} |z_i|$.",
    source: "Cor 0.20",
  },
  {
    id: "inegalites-puissances",
    question:
      "Énoncer les inégalités classiques comparant $x$, $x^{1/n}$ et $x^n$ sur $[0,1]$ et sur $[1,+\\infty[$.",
    answer:
      "Soit $n \\ge 1$ un nombre réel. $\\forall x \\in [0,1],\\ 0 \\le x \\le x^{1/n}$ et $\\forall x \\ge 1,\\ x^{1/n} \\le x$. De même, $\\forall x \\in [0,1],\\ 0 \\le x^n \\le x$ et $\\forall x \\ge 1,\\ x \\le x^n$.",
    source: "Prop 0.22, Cor 0.23",
  },
  {
    id: "inegalites-classiques-usuelles",
    question: "Énoncer cinq inégalités classiques sur $\\cos$, $\\sin$, $\\exp$ et $\\log$.",
    answer:
      "1\\. $\\forall x \\in \\mathbb{R},\\ |\\cos x| \\le 1$ et $|\\sin x| \\le 1$. 2. $\\forall z \\in \\mathbb{C},\\ |\\mathrm{e}^z| = \\mathrm{e}^{\\mathrm{Re}\\, z} \\le \\mathrm{e}^{|z|}$ ; de même $|\\mathrm{e}^{\\mathrm{i}z}| = \\mathrm{e}^{-\\mathrm{Im}\\, z} \\le \\mathrm{e}^{|z|}$. 3. $\\forall x \\ge 0,\\ \\sin x \\le x$. 4. $\\forall x > 0,\\ \\log x \\le x - 1\\ (\\le x)$. 5. $\\forall x \\ge 0,\\ \\mathrm{e}^x \\ge x+1\\ (\\ge x)$.",
    source: "Prop 0.24",
  },
  {
    id: "croissances-comparees",
    question: "Énoncer le théorème des croissances comparées.",
    answer:
      "Pour tout $\\alpha > 0$ : $\\displaystyle\\lim_{x \\to +\\infty} \\frac{\\log x}{x^\\alpha} = 0$ et $\\displaystyle\\lim_{x \\to +\\infty} \\frac{\\mathrm{e}^x}{x^\\alpha} = +\\infty$. De plus, $\\forall \\alpha > 0,\\ \\displaystyle\\lim_{x \\to 0^+} x^\\alpha \\log x = 0$.",
    source: "Théorème 0.25",
  },
  {
    id: "convergence-suite-definition",
    question: "Définir la convergence d'une suite $(u_n)$ de $\\mathbb{K}$ ($\\mathbb{K}=\\mathbb{R}$ ou $\\mathbb{C}$).",
    answer:
      "$(u_n)$ converge s'il existe $\\ell \\in \\mathbb{K}$ tel que $\\forall \\epsilon > 0,\\ \\exists N \\ge 0$ tel que $n \\ge N \\Rightarrow |u_n - \\ell| < \\epsilon$. On dit que $\\ell$ est la limite de la suite.",
    source: "Déf 0.26",
  },
  {
    id: "valeur-adherence-suite-extraite",
    question: "Définir une valeur d'adhérence d'une suite, et une suite extraite.",
    answer:
      "$a \\in \\mathbb{K}$ est une *valeur d'adhérence* de $(u_n)$ s'il existe une suite extraite $(u_{n_k})$ qui converge vers $a$. Une *suite extraite* (ou sous-suite) est une suite de la forme $v_n = u_{\\varphi(n)}$ avec $\\varphi : \\mathbb{N} \\to \\mathbb{N}$ strictement croissante.",
    source: "Déf 0.27",
  },
  {
    id: "theoremes-suites-bornees",
    question:
      "Énoncer cinq résultats classiques sur les suites réelles bornées, monotones, adjacentes, et le théorème des gendarmes.",
    answer:
      "1\\. Toute suite convergente est bornée. 2. Toute suite croissante majorée converge. 3. Toute suite croissante minorée converge. 4. (Gendarmes) Si $w_n \\le u_n \\le v_n$ pour tout $n$ et que $w_n, v_n$ convergent vers $\\ell$, alors $u_n$ converge vers $\\ell$. 5. (Suites adjacentes) Si $w_n \\le v_n$ pour tout $n$, que $w_n$ croît, $v_n$ décroît, et $|v_n - w_n| \\to 0$, alors $w_n$ et $v_n$ convergent vers une même limite.",
    source: "Théorème 0.31",
  },
  {
    id: "grand-o-definition",
    question: "Définir : $u_n$ est un grand O de $v_n$ (ou $u_n$ est dominée par $v_n$).",
    answer: "$u_n = \\mathcal{O}(v_n)$ s'il existe $C \\ge 0$ et $N_0 \\in \\mathbb{N}$ tels que $\\forall n \\ge N_0,\\ |u_n| \\le C|v_n|$.",
    source: "Déf 0.33",
  },
  {
    id: "domination-via-suite-bornee",
    question:
      "Soit $w_n$ une suite positive bornée et $u_n, v_n$ vérifiant, pour $n$ assez grand, $0 \\le |u_n| \\le w_n |v_n|$. Que peut-on conclure ?",
    answer: "Alors $u_n = \\mathcal{O}(v_n)$.",
    source: "Prop 0.35",
  },
  {
    id: "petit-o-definition",
    question: "Définir : $u_n$ est négligeable devant $v_n$ (petit o).",
    answer:
      "$u_n = o(v_n)$ s'il existe une suite $\\epsilon_n$ de limite nulle lorsque $n \\to +\\infty$, et $N_0 \\in \\mathbb{N}$, tels que $\\forall n \\ge N_0,\\ u_n = v_n \\epsilon_n$.",
    source: "Déf 0.36",
  },
  {
    id: "petit-o-via-quotient",
    question:
      "Si $v_n \\ne 0$ à partir d'un certain rang et que $\\dfrac{u_n}{v_n} \\to 0$ quand $n \\to +\\infty$, que peut-on en déduire ?",
    answer: "Alors $u_n = o(v_n)$.",
    source: "Prop 0.38",
  },
  {
    id: "equivalents-suites-definition",
    question: "Définir : $u_n \\sim v_n$ (suites équivalentes).",
    answer:
      "$u_n \\sim v_n$ s'il existe une suite $\\epsilon_n \\to 0$ et un entier $N_0 \\in \\mathbb{N}$ tels que $\\forall n \\ge N_0,\\ u_n = v_n(1+\\epsilon_n)$.",
    source: "Déf 0.39",
  },
  {
    id: "equivalents-via-quotient",
    question: "Si $v_n \\ne 0$ et $\\dfrac{u_n}{v_n} \\xrightarrow{n \\to +\\infty} 1$, que peut-on en déduire ?",
    answer: "Alors $u_n \\sim v_n$.",
    source: "Prop 0.42",
  },
  {
    id: "bolzano-weierstrass",
    question: "Énoncer le théorème de Bolzano-Weierstrass.",
    answer:
      "Toute suite réelle bornée admet une valeur d'adhérence. Autrement dit, de toute suite bornée on peut extraire une sous-suite convergente.",
    hint: "C'est un théorème d'existence : il ne dit rien sur l'unicité ni sur la valeur de la limite.",
    source: "Théorème 0.43",
  },
  {
    id: "valeurs-adherence-sin-n",
    question: "Que vaut l'ensemble des valeurs d'adhérence de la suite $(\\sin n)_{n \\in \\mathbb{N}}$ ?",
    answer: "L'ensemble des valeurs d'adhérence de $(\\sin n)_{n \\in \\mathbb{N}}$ est égal à $[-1,1]$.",
    remark:
      "Résultat admis dans le cours : pour tout $x \\in [-1,1]$, il existe une suite d'entiers $n_k$ telle que $\\sin n_k \\to x$.",
    source: "Prop 0.45 (admis)",
  },
  {
    id: "comparaison-fonctions-definition",
    question:
      "Soient $f, g$ deux fonctions définies au voisinage de $a \\in \\mathbb{R} \\cup \\{\\pm\\infty\\}$. Définir $f = \\mathcal{O}(g)$, $f = o(g)$ et $f \\sim g$ au voisinage de $a$.",
    answer:
      "$f = \\mathcal{O}(g)$ au voisinage de $a$ s'il existe $C \\ge 0$ tel que $|f| \\le C|g|$ au voisinage de $a$. $f = o(g)$ s'il existe une fonction $\\epsilon$ définie au voisinage de $a$, de limite nulle en $a$, telle que $f = \\epsilon g$ au voisinage de $a$. $f \\sim g$ s'il existe une telle fonction $\\epsilon$ avec $f = g(1+\\epsilon)$ au voisinage de $a$.",
    source: "Déf 0.46",
  },
  {
    id: "proprietes-o-o-equivalent",
    question: "Énoncer cinq propriétés reliant $\\sim_a$, $\\mathcal{O}_a$ et $o_a$.",
    answer:
      "1\\. $f \\sim_a g$ équivaut à $g \\sim_a f$. 2. Si $f = o_a(g)$ alors $f = \\mathcal{O}_a(g)$. 3. Si $f \\sim_a g$ alors $f = \\mathcal{O}_a(g)$ et $g = \\mathcal{O}_a(f)$. 4. Si $g \\ne 0$ au voisinage de $a$, alors $\\dfrac{f}{g} \\xrightarrow{x \\to a} 0$ implique $f = o_a(g)$. 5. Si $g \\ne 0$ au voisinage de $a$, alors $\\dfrac{f}{g} \\xrightarrow{x \\to a} 1$ implique $f \\sim_a g$.",
    source: "Corollaire 0.48",
  },
  {
    id: "continuite-definition",
    question: "Définir : une fonction $f : I \\to \\mathbb{R}$ est continue en $a \\in I$.",
    answer:
      "$f$ est continue en $a$ ssi $\\lim_a f = f(a)$, c'est-à-dire $\\forall \\epsilon > 0,\\ \\exists \\eta > 0$ tel que $|x-a| \\le \\eta \\Rightarrow |f(x)-f(a)| \\le \\epsilon$.",
    source: "Déf 0.51",
  },
  {
    id: "theoreme-valeurs-intermediaires",
    question: "Énoncer le théorème des valeurs intermédiaires.",
    answer:
      "Soit $f : [a,b] \\to \\mathbb{R}$ continue. Si $f(a) \\le f(b)$, soit $y$ vérifiant $f(a) \\le y \\le f(b)$ (ou, si $f(a) \\ge f(b)$, $f(b) \\le y \\le f(a)$). Alors il existe un point $x \\in\\, ]a,b[$ tel que $f(x) = y$.",
    source: "Théorème 0.52",
  },
  {
    id: "continuite-sur-segment",
    question: "Énoncer le théorème de continuité sur un segment.",
    answer:
      "Soient $a < b \\in \\mathbb{R}$ finis et $f : [a,b] \\to \\mathbb{R}$ continue. Alors il existe des nombres $c \\le d$ tels que $\\forall x \\in [a,b],\\ c \\le f(x) \\le d$, et de plus il existe $x_c, x_d \\in [a,b]$ tels que $f(x_c) = c$, $f(x_d) = d$.",
    remark: "Autrement dit : une fonction continue sur un intervalle fermé borné est bornée et atteint ses bornes.",
    source: "Théorème 0.53",
  },
  {
    id: "inegalite-accroissements-finis",
    question: "Énoncer l'inégalité des accroissements finis.",
    answer:
      "Soit $f : [a,b] \\to \\mathbb{R}$ continue, dérivable sur $]a,b[$. On suppose qu'il existe $M \\ge 0$ tel que $\\sup_{t \\in ]a,b[} |f'(t)| \\le M$. Alors $\\forall x \\in\\, ]a,b[,\\ \\dfrac{f(x)-f(a)}{x-a} \\le M|x-a|$.",
    source: "Théorème 0.54",
  },
  {
    id: "theoreme-accroissements-finis",
    question: "Énoncer le théorème des accroissements finis.",
    answer:
      "Soit $f : [a,b] \\to \\mathbb{R}$ continue, dérivable sur $]a,b[$. Alors il existe $c \\in\\, ]a,b[$ tel que $f'(c) = \\dfrac{f(b)-f(a)}{b-a}$.",
    source: "Théorème 0.55",
  },
  {
    id: "taylor-lagrange",
    question: "Énoncer le théorème de Taylor-Lagrange.",
    answer:
      "Soient $a \\le b$ deux nombres finis, $f$ de classe $C^n$ sur $[a,b]$ et $f^{(n+1)}$ définie sur $]a,b[$. Soit $x_0 \\in [a,b]$. Alors pour tout $x \\in [a,b]$ il existe $c = c_{x,x_0}$ strictement compris entre $x_0$ et $x$ tel que $f(x) = f(x_0) + f'(x_0)(x-x_0) + \\dfrac{f''(x_0)}{2!}(x-x_0)^2 + \\cdots + \\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^n + \\dfrac{f^{(n+1)}(c)}{(n+1)!}(x-x_0)^{n+1}$.",
    hint:
      "C'est une généralisation du théorème des accroissements finis (cas $n=0$) : elle donne l'existence d'un développement limité pour toute fonction suffisamment dérivable.",
    source: "Théorème 0.56",
  },
  {
    id: "inegalite-convexite",
    question: "Énoncer l'inégalité de convexité.",
    answer:
      "Soit $f : I \\to \\mathbb{R}$ une fonction convexe et $x \\le y$ deux nombres dans $I$. Alors $\\forall t \\in [0,1],\\ f(tx+(1-t)y) \\le tf(x) + (1-t)f(y)$.",
    source: "Théorème 0.60",
  },
  {
    id: "croissance-integrale",
    question: "Soit $I$ un intervalle borné, $f \\le g$ sur $I$ avec $f,g$ intégrables sur $I$. Que peut-on dire de $\\int_I f$ et $\\int_I g$ ?",
    answer: "$\\displaystyle\\int_I f \\le \\int_I g$.",
    source: "Prop 0.61",
  },
  {
    id: "inegalite-triangulaire-integrale",
    question: "Soit $f : I \\to \\mathbb{R}$ intégrable, $I$ borné. Énoncer l'inégalité triangulaire pour l'intégrale.",
    answer: "$\\displaystyle\\Big|\\int_I f\\Big| \\le \\int_I |f|$.",
    source: "Prop 0.62",
  },
];
