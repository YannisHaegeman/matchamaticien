import type { MathSubtopic } from "@/types/mathmap";

export const anneauxSubtopics: MathSubtopic[] = [
  {
    id: "definitions",
    title: "Définitions",
    description: "Deux lois de composition qui cohabitent.",
    results: [
      {
        id: "definition-anneau",
        type: "definition",
        title: "Anneau",
        difficulty: "standard",
        statement: `Un **anneau** est un triplet $(A, +, \\times)$ tel que :

1. $(A, +)$ est un groupe abélien ;
2. $\\times$ est une loi de composition interne **associative**, possédant un élément neutre noté $1$ ;
3. $\\times$ est **distributive** par rapport à $+$ : $\\forall x, y, z \\in A$, $x \\times (y + z) = x \\times y + x \\times z$ et $(x + y) \\times z = x \\times z + y \\times z$.

Si de plus $\\times$ est commutative, on dit que l'anneau est **commutatif**.`,
        relations: [
          {
            targetId: "definition-groupe",
            type: "depend-de",
            note: "(A, +) doit être un groupe abélien",
          },
          { targetId: "definition-loi-composition-interne", type: "depend-de" },
        ],
      },
      {
        id: "exemple-anneau-z",
        type: "exemple",
        title: "$(\\mathbb{Z}, +, \\times)$ est un anneau commutatif",
        difficulty: "fondamental",
        statement: `$(\\mathbb{Z}, +)$ est un groupe abélien, la multiplication usuelle est associative, commutative, distributive par rapport à $+$, et admet $1$ comme élément neutre. $(\\mathbb{Z}, +, \\times)$ est donc un anneau commutatif — mais ce n'est **pas** un corps : seuls $1$ et $-1$ ont un inverse pour $\\times$.`,
        relations: [{ targetId: "definition-anneau", type: "depend-de" }],
      },
    ],
  },
];
