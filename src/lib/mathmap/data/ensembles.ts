import type { MathSubtopic } from "@/types/mathmap";

export const ensemblesSubtopics: MathSubtopic[] = [
  {
    id: "generalites",
    title: "Généralités sur les ensembles",
    description: "Le vocabulaire de base, avant toute structure algébrique.",
    results: [
      {
        id: "definition-ensemble",
        type: "definition",
        title: "Ensemble",
        difficulty: "fondamental",
        statement: `Un **ensemble** est une collection d'objets, appelés ses **éléments**. On écrit $x \\in E$ pour dire que $x$ est élément de $E$. Un ensemble $F$ est **inclus** dans $E$, noté $F \\subset E$, si tout élément de $F$ est élément de $E$.`,
      },
      {
        id: "definition-produit-cartesien",
        type: "definition",
        title: "Produit cartésien",
        difficulty: "fondamental",
        statement: `Soient $E$ et $F$ deux ensembles. Le **produit cartésien** $E \\times F$ est l'ensemble des couples $(x, y)$ avec $x \\in E$ et $y \\in F$ :

$$
E \\times F = \\{ (x, y) \\mid x \\in E,\\ y \\in F \\}
$$

C'est cet objet qui permet de définir proprement une loi de composition interne, comme une application de $E \\times E$ vers $E$.`,
        relations: [{ targetId: "definition-ensemble", type: "depend-de" }],
      },
    ],
  },
];
