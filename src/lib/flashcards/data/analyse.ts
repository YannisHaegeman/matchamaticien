import type { Flashcard } from "@/types/flashcards";

export const analyseCards: Flashcard[] = [
  {
    id: "riemann-integrabilite-fonctions-bornees",
    question:
      "Sur quel type de fonctions repose la théorie de l'intégrale de Riemann ? *(une seule réponse)*\n\n1\\. Les fonctions bornées sur un intervalle borné\n\n2\\. Les fonctions continues sur $\\mathbb{R}$\n\n3\\. Les fonctions positives sur un intervalle quelconque\n\n4\\. Les fonctions dérivables sur un intervalle ouvert",
    hint:
      "Les sommes de Darboux utilisent le sup et l'inf de $f$ sur chaque morceau d'une subdivision finie : ils doivent être finis.",
    answer: "Les fonctions **bornées sur un intervalle borné**.",
    remark:
      "L'intervalle peut être ouvert, fermé ou semi-ouvert ($[a, b]$, $]a, b[$, $]a, b]$…) : seule son adhérence (le segment $[a, b]$) compte, car changer la valeur de $f$ en un nombre fini de points ne change ni son intégrabilité ni son intégrale (cf. QCM 3). Dès que l'intervalle est non borné, ou que $f$ n'est pas bornée au voisinage d'une de ses bornes, on sort du cadre de Riemann : c'est une intégrale impropre (ou généralisée).",
    source: "QCM 1 · Intégrale de Riemann",
  },
  {
    id: "riemann-integrabilite-fonctions-continues-monotones",
    question:
      "Parmi ces fonctions, lesquelles sont Riemann-intégrables ? *(plusieurs réponses possibles)*\n\n1\\. Les fonctions continues sur $[a, b]$\n\n2\\. Les fonctions monotones sur $[a, b]$\n\n3\\. Les fonctions continues par morceaux sur $[a, b]$\n\n4\\. Les fonctions continues sur $[a, +\\infty[$\n\n5\\. Toutes les fonctions bornées sur $[a, b]$",
    hint:
      "Une fonction bornée peut quand même piéger : pense à l'indicatrice de $\\mathbb{Q}$ sur $[0, 1]$.",
    answer:
      "Les propositions **1, 2 et 3** : les fonctions continues, monotones, et continues par morceaux sur $[a, b]$ sont toutes Riemann-intégrables.",
    remark:
      "$\\mathbb{1}_{\\mathbb{Q}}$ est bornée sur $[0, 1]$ mais pas intégrable : ses sommes inférieures valent $0$, ses sommes supérieures $1$. Une fonction monotone sur $[a, b]$ est automatiquement bornée.",
    source: "QCM 2 · Intégrale de Riemann",
  },
  {
    id: "riemann-integrabilite-intervalle-borne",
    question:
      "Sur un intervalle borné $I$, lesquelles sont Riemann-intégrables (sur l'adhérence de $I$) ? *(plusieurs réponses possibles)*\n\n1\\. Les fonctions uniformément continues sur $I$\n\n2\\. Les fonctions continues et bornées sur $I$\n\n3\\. Les fonctions monotones et bornées sur $I$\n\n4\\. Les fonctions continues sur $]0, 1]$\n\n5\\. Les fonctions monotones sur $]0, 1]$",
    hint:
      "Sur un intervalle borné, le piège est toujours le même : la fonction est-elle bornée ? Pense à $x \\mapsto 1/x$.",
    answer:
      "Les propositions **1, 2 et 3** : uniformément continue, continue-et-bornée, ou monotone-et-bornée sur $I$ suffisent à être Riemann-intégrable (sur l'adhérence de $I$).",
    remark:
      "$x \\mapsto 1/x$ est continue et monotone sur $]0, 1]$ mais non bornée : pas d'intégrale de Riemann. Une fonction uniformément continue sur un intervalle borné est, elle, forcément bornée.",
    source: "QCM 3 · Intégrale de Riemann",
  },
];
