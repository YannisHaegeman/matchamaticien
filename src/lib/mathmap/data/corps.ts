import type { MathSubtopic } from "@/types/mathmap";

export const corpsSubtopics: MathSubtopic[] = [
  {
    id: "definitions",
    title: "Définitions",
    description: "Un anneau où l'on peut aussi diviser.",
    results: [
      {
        id: "definition-corps",
        type: "definition",
        title: "Corps",
        difficulty: "standard",
        statement: `Un **corps** est un anneau $(K, +, \\times)$ commutatif, non réduit à $\\{0\\}$, dans lequel tout élément non nul est inversible pour $\\times$ :

$$
\\forall x \\in K \\setminus \\{0\\},\\ \\exists x^{-1} \\in K,\\quad x \\times x^{-1} = 1
$$

$\\mathbb{Q}$, $\\mathbb{R}$, $\\mathbb{C}$ sont des corps ; $\\mathbb{Z}$ n'en est pas un.`,
        relations: [{ targetId: "definition-anneau", type: "depend-de" }],
      },
      {
        id: "proposition-corps-groupe-multiplicatif",
        type: "proposition",
        title: "$(K \\setminus \\{0\\}, \\times)$ est un groupe abélien",
        difficulty: "standard",
        statement: `Soit $(K, +, \\times)$ un corps. Alors $(K \\setminus \\{0\\}, \\times)$, muni de la multiplication du corps, est un groupe abélien — souvent noté $K^\\ast$.`,
        proof: `La loi $\\times$ restreinte à $K \\setminus \\{0\\}$ est bien à valeurs dans $K \\setminus \\{0\\}$ (un corps n'a pas de diviseur de zéro : si $x, y \\neq 0$ alors $xy \\neq 0$). Elle est associative et commutative par définition d'un corps (hérité de l'anneau sous-jacent). L'élément $1$ en est le neutre, et $1 \\neq 0$ puisque $K$ n'est pas réduit à $\\{0\\}$, donc $1 \\in K \\setminus \\{0\\}$.

Enfin, par définition d'un corps, tout $x \\in K \\setminus \\{0\\}$ admet un inverse $x^{-1} \\in K \\setminus \\{0\\}$ pour $\\times$ : c'est exactement le symétrique demandé par la [définition d'un groupe](/carte-des-maths/groupes/axiomes/definition-groupe). $(K \\setminus \\{0\\}, \\times)$ est donc un groupe, abélien par commutativité de $\\times$.`,
        relations: [
          { targetId: "definition-corps", type: "depend-de" },
          {
            targetId: "definition-groupe",
            type: "depend-de",
            note: "on retrouve exactement les axiomes de groupe",
          },
        ],
      },
    ],
  },
];
