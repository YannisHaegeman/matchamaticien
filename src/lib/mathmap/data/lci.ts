import type { MathSubtopic } from "@/types/mathmap";

export const lciSubtopics: MathSubtopic[] = [
  {
    id: "definitions",
    title: "Définitions",
    description: "Combiner deux éléments pour en obtenir un troisième.",
    results: [
      {
        id: "definition-loi-composition-interne",
        type: "definition",
        title: "Loi de composition interne",
        difficulty: "fondamental",
        statement: `Soit $E$ un ensemble. Une **loi de composition interne** (LCI) sur $E$ est une application

$$
\\ast : E \\times E \\to E, \\quad (x, y) \\mapsto x \\ast y
$$

Autrement dit : une façon de combiner deux éléments de $E$ pour obtenir un troisième élément de $E$ — l'ensemble reste stable par la loi. C'est la brique de départ de toutes les structures algébriques (groupes, anneaux, corps...).`,
        relations: [
          { targetId: "definition-ensemble", type: "depend-de" },
          { targetId: "definition-produit-cartesien", type: "depend-de" },
        ],
      },
      {
        id: "proposition-proprietes-lci",
        type: "proposition",
        title: "Les propriétés qu'on demande usuellement à une LCI",
        difficulty: "fondamental",
        statement: `Une loi de composition interne $\\ast$ sur $E$ peut posséder, indépendamment les unes des autres, les propriétés suivantes :

- **associativité** : $\\forall x, y, z \\in E,\\ (x \\ast y) \\ast z = x \\ast (y \\ast z)$ ;
- **commutativité** : $\\forall x, y \\in E,\\ x \\ast y = y \\ast x$ ;
- **existence d'un élément neutre** : $\\exists e \\in E,\\ \\forall x \\in E,\\ x \\ast e = e \\ast x = x$.

C'est en exigeant certaines de ces propriétés, puis l'existence de symétriques, qu'on obtient la définition d'un groupe.`,
        relations: [
          { targetId: "definition-loi-composition-interne", type: "depend-de" },
        ],
      },
    ],
  },
];
