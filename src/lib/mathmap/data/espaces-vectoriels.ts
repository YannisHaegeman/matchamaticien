import type { MathSubtopic } from "@/types/mathmap";

export const espacesVectorielsSubtopics: MathSubtopic[] = [
  {
    id: "definitions",
    title: "Définitions",
    description: "Des vecteurs qu'on additionne et qu'on multiplie par un scalaire.",
    results: [
      {
        id: "definition-espace-vectoriel",
        type: "definition",
        title: "Espace vectoriel",
        difficulty: "standard",
        statement: `Soit $K$ un corps. Un **espace vectoriel** sur $K$ (ou $K$-espace vectoriel) est un ensemble $E$ muni :

1. d'une loi de composition interne $+$ pour laquelle $(E, +)$ est un groupe abélien ;
2. d'une loi de composition **externe** $K \\times E \\to E$, $(\\lambda, x) \\mapsto \\lambda \\cdot x$, compatible avec les lois de $K$ et de $E$ (distributivité des deux côtés, associativité mixte $\\lambda \\cdot (\\mu \\cdot x) = (\\lambda \\mu) \\cdot x$, et $1 \\cdot x = x$).

C'est cette double structure — un groupe pour l'addition des vecteurs, un corps pour les scalaires — qui fait de l'algèbre linéaire le prolongement naturel de la théorie des groupes et des corps.`,
        relations: [
          {
            targetId: "definition-corps",
            type: "depend-de",
            note: "les scalaires vivent dans un corps",
          },
          {
            targetId: "definition-groupe",
            type: "depend-de",
            note: "(E, +) doit être un groupe abélien",
          },
        ],
      },
    ],
  },
];
