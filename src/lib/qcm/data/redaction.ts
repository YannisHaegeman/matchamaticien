import type { QcmQuestion } from "@/types/qcm";

/**
 * Questions tirées, exemple par exemple, des encadrés violets du
 * « Manuel de rédaction mathématique » (C. Bardard, MPSI 3, lycée
 * Chateaubriand) : chaque encadré du document devient une question
 * à choix multiple(s), les bonnes réponses étant celles marquées
 * ✓✓✓ dans le document, les fautives celles marquées ✗✗✗.
 */
export const redactionQcmQuestions: QcmQuestion[] = [
  {
    "id": "r1-g1",
    "section": "Règle n° 1 · Ancrez les maths dans le français",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r1-g1-1",
        "text": "$2 + 2 = 4$.",
        "correct": false
      },
      {
        "id": "r1-g1-2",
        "text": "On a $2 + 2 = 4$.",
        "correct": true
      }
    ],
    "explanation": "Un énoncé mathématique doit toujours être inclus dans une phrase en français ; en pratique, commencer par « On a » suffit presque toujours."
  },
  {
    "id": "r1-g2",
    "section": "Règle n° 1 · Ancrez les maths dans le français",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r1-g2-1",
        "text": "$x = 2$.",
        "correct": false
      },
      {
        "id": "r1-g2-2",
        "text": "Donc, on a $x = 2$.",
        "correct": true
      }
    ],
    "explanation": "Même une formule très simple ne peut pas flotter seule : il lui faut un verbe et une phrase française autour."
  },
  {
    "id": "r1-g3",
    "section": "Règle n° 1 · Ancrez les maths dans le français",
    "prompt": "Un calcul s'étale sur plusieurs lignes. Laquelle de ces deux présentations est correcte ?",
    "options": [
      {
        "id": "r1-g3-1",
        "text": "« On a $\\dfrac{xy}{x+y} = \\dfrac14$\n\n$\\dfrac{x+y}{y} = 4x$\n\n$\\dfrac{x}{y} = 4x-1$\n\n$\\dfrac1y = \\dfrac{4x-1}{x}$. »",
        "correct": false
      },
      {
        "id": "r1-g3-2",
        "text": "« On a $\\dfrac{xy}{x+y} = \\dfrac14$\n\ndonc $\\dfrac{x+y}{y} = 4x$\n\ndonc $\\dfrac{x}{y} = 4x-1$\n\ndonc $\\dfrac1y = \\dfrac{4x-1}{x}$. »",
        "correct": true
      }
    ],
    "explanation": "Quand des assertions s'enchaînent, ne les superpose jamais en les alignant sans rien entre elles : relie-les par des connecteurs (« donc », « d'où »…), au besoin répétés devant chaque ligne."
  },
  {
    "id": "r2-g1",
    "section": "Règle n° 2 · Introduisez vos variables",
    "prompt": "On veut démontrer que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x - 1$. Parmi ces rédactions, laquelle (ou lesquelles) est/sont correcte(s) ?",
    "options": [
      {
        "id": "r2-g1-1",
        "text": "On a $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$. En effet, on a $x^2-(2x-1) = (x-1)^2 \\ge 0$.",
        "correct": false
      },
      {
        "id": "r2-g1-2",
        "text": "On a $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$. En effet, pour $x \\in \\mathbb{R}$, on a $x^2-(2x-1) = (x-1)^2 \\ge 0$.",
        "correct": true
      },
      {
        "id": "r2-g1-3",
        "text": "Montrons que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$. Soit $x \\in \\mathbb{R}$. On a $x^2-(2x-1) = (x-1)^2 \\ge 0$.",
        "correct": true
      }
    ],
    "explanation": "« $\\forall x \\in \\mathbb{R}$ » ne définit $x$ que le temps de la phrase mathématique qu'il introduit : une fois cette phrase terminée, $x$ cesse d'être défini. Il faut donc soit refixer $x$ (« pour $x \\in \\mathbb{R}$ »), soit annoncer puis fixer $x$ avec « Soit »."
  },
  {
    "id": "r2-g2",
    "section": "Règle n° 2 · Introduisez vos variables",
    "prompt": "Parmi ces trois façons de définir une suite, laquelle est correcte ?",
    "options": [
      {
        "id": "r2-g2-1",
        "text": "On pose $u_n = 4n^2 - 2$.",
        "correct": false
      },
      {
        "id": "r2-g2-2",
        "text": "On pose $u_n := 4n^2 - 2$.",
        "correct": false
      },
      {
        "id": "r2-g2-3",
        "text": "On pose, pour $n \\in \\mathbb{N}$, $u_n := 4n^2 - 2$.",
        "correct": true
      }
    ],
    "explanation": "Il manque, dans les deux premières versions, soit le symbole $:=$ (qui marque une définition plutôt qu'une égalité déjà vraie), soit la mention de l'ensemble sur lequel $n$ varie."
  },
  {
    "id": "r3-g1",
    "section": "Règle n° 3 · Fixez les objets provenant d'$\\exists$-assertions",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r3-g1-1",
        "text": "On sait que $\\exists \\alpha \\in \\mathbb{R}_+ : \\alpha^2 = 2$. On a alors $\\alpha^4 = 4$.",
        "correct": false
      },
      {
        "id": "r3-g1-2",
        "text": "On sait que $\\exists \\alpha \\in \\mathbb{R}_+ : \\alpha^2 = 2$. Fixons un tel $\\alpha \\in \\mathbb{R}_+$. On a alors $\\alpha^4 = 4$.",
        "correct": true
      }
    ],
    "explanation": "Une lettre apparaissant dans une assertion « $\\exists \\alpha \\in E : \\dots$ » cesse d'être définie une fois l'assertion terminée. Si on veut réutiliser $\\alpha$, il faut le fixer."
  },
  {
    "id": "r3-g2",
    "section": "Règle n° 3 · Fixez les objets provenant d'$\\exists$-assertions",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r3-g2-1",
        "text": "Comme $n$ est pair, on a $n = 2p$, où $p \\in \\mathbb{Z}$.",
        "correct": false
      },
      {
        "id": "r3-g2-2",
        "text": "Comme $n$ est pair, fixons $p \\in \\mathbb{Z}$ tel que $n = 2p$.",
        "correct": true
      }
    ],
    "explanation": "« On a $n=2p$, où $p \\in \\mathbb{Z}$ » n'introduit pas vraiment $p$ : c'est « Fixons » qui joue ce rôle, pour un objet dont l'existence est assurée par le fait que $n$ est pair."
  },
  {
    "id": "r3-g3",
    "section": "Règle n° 3 · Fixez les objets provenant d'$\\exists$-assertions",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r3-g3-1",
        "text": "Grâce au théorème des valeurs intermédiaires, on sait qu'il existe $\\alpha \\in \\mathbb{R}_+$ tel que $\\alpha^5 = \\alpha^2+1$. Montrons que $\\alpha \\le 2$.",
        "correct": false
      },
      {
        "id": "r3-g3-2",
        "text": "Grâce au théorème des valeurs intermédiaires, on sait qu'il existe $\\alpha \\in \\mathbb{R}_+$ tel que $\\alpha^5 = \\alpha^2+1$. Fixons un tel $\\alpha \\ge 0$. Montrons que $\\alpha \\le 2$.",
        "correct": true
      }
    ],
    "explanation": "Sans « Fixons », $\\alpha$ n'est plus défini dans la phrase « Montrons que $\\alpha \\le 2$ » : il faut fixer un représentant de l'assertion d'existence avant de continuer à travailler avec."
  },
  {
    "id": "r4-g1",
    "section": "Règle n° 4 · Le symbole $\\forall$ est réservé aux maths",
    "prompt": "Parmi ces rédactions, laquelle (ou lesquelles) est/sont correcte(s) ?",
    "options": [
      {
        "id": "r4-g1-1",
        "text": "On sait que $\\forall x \\in \\mathbb{R}$, le nombre $x^2$ est positif ou nul.",
        "correct": false
      },
      {
        "id": "r4-g1-2",
        "text": "On sait que pour tout $x \\in \\mathbb{R}$, le nombre $x^2$ est positif ou nul.",
        "correct": true
      },
      {
        "id": "r4-g1-3",
        "text": "On sait que : $\\forall x \\in \\mathbb{R}, x^2 \\ge 0$.",
        "correct": true
      }
    ],
    "explanation": "Le symbole $\\forall$ ne doit jamais servir d'abréviation à l'intérieur d'une phrase en français ; il reste acceptable seulement dans une formule isolée, entièrement mathématique."
  },
  {
    "id": "r4-g2",
    "section": "Règle n° 4 · Le symbole $\\forall$ est réservé aux maths",
    "prompt": "Parmi ces trois rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r4-g2-1",
        "text": "$\\forall n \\in \\mathbb{N}$, on pose $u_n := n^2+1$.",
        "correct": false
      },
      {
        "id": "r4-g2-2",
        "text": "On pose $\\forall n \\in \\mathbb{N}, u_n := n^2+1$.",
        "correct": false
      },
      {
        "id": "r4-g2-3",
        "text": "Pour $n \\in \\mathbb{N}$, on pose $u_n := n^2+1$.",
        "correct": true
      }
    ],
    "explanation": "Dans les deux premières, $\\forall$ sert à abréger « pour » dans une phrase française : c'est exactement l'usage interdit par cette règle."
  },
  {
    "id": "r4-g3",
    "section": "Règle n° 4 · Le symbole $\\forall$ est réservé aux maths",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r4-g3-1",
        "text": "Montrons que $\\exists \\alpha \\in \\mathbb{R}$ tel que $\\alpha^2 = 2$.",
        "correct": false
      },
      {
        "id": "r4-g3-2",
        "text": "Montrons que $\\exists \\alpha \\in \\mathbb{R} : \\alpha^2 = 2$.",
        "correct": true
      }
    ],
    "explanation": "Même remarque pour $\\exists$ : « tel que » mélangé au symbole dans une phrase française est fautif ; soit on reste en français, soit on écrit une formule isolée avec « : »."
  },
  {
    "id": "r5-g1",
    "section": "Règle n° 5 · Attention à l'usage de $\\iff$",
    "prompt": "On vient de montrer que $3\\alpha + 2 = -\\alpha - 1$. Parmi ces rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r5-g1-1",
        "text": "On vient de montrer que $3\\alpha+2 = -\\alpha-1$. Donc, $3\\alpha+2 = -\\alpha-1 \\iff 4\\alpha = -3 \\iff \\alpha = -\\frac34$.",
        "correct": false
      },
      {
        "id": "r5-g1-2",
        "text": "On vient de montrer que $3\\alpha+2 = -\\alpha-1$. Donc, $4\\alpha = -3$ et donc $\\alpha = -\\frac34$.",
        "correct": true
      }
    ],
    "explanation": "Le symbole $\\iff$ n'est pas réservé à l'enchaînement d'un calcul en cours : ici, il est utilisé à la place de « donc ». Dans le feu d'un calcul, on enchaîne avec « donc », pas avec $\\iff$."
  },
  {
    "id": "r5-g2",
    "section": "Règle n° 5 · Attention à l'usage de $\\iff$",
    "prompt": "On sait que $a$ vérifie $2\\alpha \\ge 3\\alpha - 1$. Parmi ces rédactions, laquelle (ou lesquelles) est/sont correcte(s) ?",
    "options": [
      {
        "id": "r5-g2-1",
        "text": "On a $2\\alpha \\ge 3\\alpha - 1 \\iff \\alpha \\le 1$.",
        "correct": false
      },
      {
        "id": "r5-g2-2",
        "text": "On a $2\\alpha \\ge 3\\alpha - 1$, ie on a $\\alpha \\le 1$.",
        "correct": true
      },
      {
        "id": "r5-g2-3",
        "text": "On a $2\\alpha \\ge 3\\alpha - 1$, c'est-à-dire $\\alpha \\le 1$.",
        "correct": true
      }
    ],
    "explanation": "Reformuler une inégalité déjà acquise sous une autre forme équivalente n'est pas « dire des maths » (annoncer/conclure/invoquer) : $\\iff$ est à tort utilisé ici à la place de « c'est-à-dire »/« ie »."
  },
  {
    "id": "r5-usage",
    "section": "Règle n° 5 · Attention à l'usage de $\\iff$",
    "prompt": "Le symbole $\\iff$ est réservé aux moments où l'on « dit des maths » (annoncer, conclure, invoquer un résultat), jamais pour enchaîner les étapes d'une démonstration en cours. Lesquelles de ces phrases en sont des usages conformes ?",
    "options": [
      {
        "id": "r5-usage-1",
        "text": "Soit $t > 0$. Montrons que $\\exp(t) \\ge 1 \\iff t \\ge 0$.",
        "correct": true
      },
      {
        "id": "r5-usage-2",
        "text": "On a montré que $\\forall n \\in \\mathbb{Z}, n^2 \\equiv 1\\,[2] \\iff n \\equiv 1\\,[2]$.",
        "correct": true
      },
      {
        "id": "r5-usage-3",
        "text": "Soit $z \\in \\mathbb{C}^*$. D'après le cours, on sait que $|z| = 1 \\iff z^{-1} = \\overline{z}$.",
        "correct": true
      },
      {
        "id": "r5-usage-4",
        "text": "On a $x \\ge 3$. On a $x - 3 \\ge 0 \\iff x \\ge 3$, donc $x \\ge 0$.",
        "correct": false
      }
    ],
    "explanation": "Les trois premières phrases annoncent ce qu'on va montrer, concluent, ou invoquent un résultat du cours : c'est exactement l'usage réservé à $\\iff$. La dernière l'utilise pour enchaîner un calcul — il faudrait « donc »."
  },
  {
    "id": "r5-exception",
    "section": "Règle n° 5 · Attention à l'usage de $\\iff$",
    "prompt": "Exception à la règle : une démonstration entièrement « balisée », très directe, sans calcul annexe (typiquement un système linéaire), peut utiliser $\\iff$, précédée de « On a les équivalences suivantes ». Cette rédaction est-elle correcte ?\n\n« Soient $x,y \\in \\mathbb{R}$. On a les équivalences suivantes :\n\n$$\\begin{cases} -x-y=-1 \\\\ 2x+3y=2 \\end{cases} \\iff \\begin{cases} -x-y=-1 \\\\ y=0 \\end{cases} \\iff \\begin{cases} x=1 \\\\ y=0. \\end{cases}$$\n\nAinsi, l'ensemble des solutions du système considéré est $\\{(1,0)\\}$. »",
    "options": [
      {
        "id": "r5-exception-1",
        "text": "Oui, cette rédaction est correcte.",
        "correct": true
      },
      {
        "id": "r5-exception-2",
        "text": "Non, cette rédaction n'est pas correcte.",
        "correct": false
      }
    ],
    "explanation": "C'est exactement le cas prévu par l'exception : une résolution de système linéaire, entièrement balisée, annoncée par « On a les équivalences suivantes »."
  },
  {
    "id": "r6-usage",
    "section": "Règle n° 6 · Attention à l'usage de $\\implies$",
    "prompt": "Même règle pour $\\implies$ : réservé à « dire des maths » (annoncer/conclure/invoquer). Lesquelles de ces phrases en sont des usages conformes ?",
    "options": [
      {
        "id": "r6-usage-1",
        "text": "Montrons que $\\forall x,y \\in\\, ]1,+\\infty[, \\; x>y \\implies \\frac{x}{x-1} < \\frac{y}{y-1}$.",
        "correct": true
      },
      {
        "id": "r6-usage-2",
        "text": "On a montré que $\\forall n \\in \\mathbb{Z}, n^2 \\equiv 1\\,[2] \\implies n \\equiv 1\\,[2]$.",
        "correct": true
      },
      {
        "id": "r6-usage-3",
        "text": "Soit $z \\in \\mathbb{C}$. D'après le cours, on sait que $|z|=1 \\implies \\exists \\theta \\in [0,2\\pi[\\, : z = e^{i\\theta}$.",
        "correct": true
      }
    ],
    "explanation": "Ces trois phrases annoncent, concluent, ou invoquent un résultat du cours : c'est l'usage réservé à $\\implies$, qui n'est en revanche jamais utilisé pour enchaîner un raisonnement en cours (on utilise alors « donc »)."
  },
  {
    "id": "r6-g1",
    "section": "Règle n° 6 · Attention à l'usage de $\\implies$",
    "prompt": "On veut démontrer que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$. Parmi ces trois rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r6-g1-1",
        "text": "Soit $x \\in \\mathbb{R}$. On a : $(x-1)^2 \\ge 0 \\implies x^2-2x+1 \\ge 0 \\implies x^2 \\ge 2x-1$. Ainsi, on a montré que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$.",
        "correct": false
      },
      {
        "id": "r6-g1-2",
        "text": "On a : $\\forall x \\in \\mathbb{R}, (x-1)^2 \\ge 0 \\implies x^2-2x+1 \\ge 0 \\implies x^2 \\ge 2x-1$. Ainsi, on a montré que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$.",
        "correct": false
      },
      {
        "id": "r6-g1-3",
        "text": "Soit $x \\in \\mathbb{R}$. On a $(x-1)^2 \\ge 0$, donc $x^2-2x+1 \\ge 0$ et donc $x^2 \\ge 2x-1$. Ainsi, on a $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$.",
        "correct": true
      }
    ],
    "explanation": "On ne fait pas de démonstration en alignant des $\\implies$ : à la place, on part de quelque chose de vrai et on enchaîne avec « donc ». De plus, $\\implies$ n'est pas interchangeable avec « donc » : « P $\\implies$ Q » signifie « si P alors Q », alors que « P donc Q » signifie que P est vraie ET que P $\\implies$ Q est vraie."
  },
  {
    "id": "r7-usage",
    "section": "Règle n° 7 · Attention à l'usage de $\\forall$ et $\\exists$",
    "prompt": "Même règle pour $\\forall$ et $\\exists$ : réservés à « dire des maths ». Lesquelles de ces phrases en sont des usages conformes ?",
    "options": [
      {
        "id": "r7-usage-1",
        "text": "Montrons que $\\forall x \\in \\mathbb{R}, x^2 \\ge 1-2x$.",
        "correct": true
      },
      {
        "id": "r7-usage-2",
        "text": "Soit $a > 0$. Montrons que $\\exists x \\in \\mathbb{R}_+ : x^5 = x^2+a$.",
        "correct": true
      },
      {
        "id": "r7-usage-3",
        "text": "Ainsi, on a montré que $\\forall x \\in \\mathbb{R}, x^2 \\ge 1-2x$.",
        "correct": true
      },
      {
        "id": "r7-usage-4",
        "text": "On a montré que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^2=a$.",
        "correct": true
      },
      {
        "id": "r7-usage-5",
        "text": "Or, on sait que $\\forall x > -1, \\ln(1+x) \\le x$.",
        "correct": true
      },
      {
        "id": "r7-usage-6",
        "text": "Grâce au théorème des valeurs intermédiaires, on sait que $\\exists \\alpha \\in \\mathbb{R}_+ : \\alpha^5=\\alpha^2+1$.",
        "correct": true
      }
    ],
    "explanation": "Toutes ces phrases annoncent ce qu'on va montrer, concluent une démonstration, ou invoquent un résultat déjà connu : c'est exactement l'usage réservé à $\\forall$ et $\\exists$ hors d'une formule isolée."
  },
  {
    "id": "r7-g1",
    "section": "Règle n° 7 · Attention à l'usage de $\\forall$ et $\\exists$",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r7-g1-1",
        "text": "On a :\n\n▷ $\\forall x \\in \\mathbb{R}, (x-1)^2 \\ge 0$ ;\n\n▷ donc $\\forall x \\in \\mathbb{R}, x^2-2x+1 \\ge 0$ ;\n\n▷ et donc $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$, ce qu'on voulait démontrer.",
        "correct": false
      },
      {
        "id": "r7-g1-2",
        "text": "Soit $x \\in \\mathbb{R}$. Comme $(x-1)^2 \\ge 0$, après calcul, on trouve $x^2 \\ge 2x-1$. Ainsi, on a $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$.",
        "correct": true
      }
    ],
    "explanation": "On ne fait pas de démonstration en empilant des assertions « $\\forall$... » : à la place, on fixe un élément quelconque (« Soit ») et on travaille avec cet élément."
  },
  {
    "id": "r7-g2",
    "section": "Règle n° 7 · Attention à l'usage de $\\forall$ et $\\exists$",
    "prompt": "Soit $a \\in \\mathbb{C}$. On veut montrer que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^4+z^2 = a^2+a$. Parmi ces quatre rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r7-g2-1",
        "text": "D'après le cours, on sait que $\\exists z \\in \\mathbb{C} : z^2=a$. Donc, $\\exists z \\in \\mathbb{C} : z^4=a^2$ et donc $\\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$. On a montré que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$.",
        "correct": false
      },
      {
        "id": "r7-g2-2",
        "text": "D'après le cours, on sait que $\\exists z \\in \\mathbb{C} : z^2=a \\implies z^4=a^2 \\implies z^4+z^2=a^2+a$. On a montré que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$.",
        "correct": false
      },
      {
        "id": "r7-g2-3",
        "text": "D'après le cours, on a $\\exists z \\in \\mathbb{C} : z^2=a \\implies \\exists z \\in \\mathbb{C} : z^4=a^2 \\implies \\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$. On a montré que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$.",
        "correct": false
      },
      {
        "id": "r7-g2-4",
        "text": "D'après le cours, on sait que $\\exists z \\in \\mathbb{C} : z^2=a$. Fixons un tel $z \\in \\mathbb{C}$. On a $z^4=a^2$ et donc on a $z^4+z^2=a^2+a$. On a montré que $\\forall a \\in \\mathbb{C}, \\exists z \\in \\mathbb{C} : z^4+z^2=a^2+a$.",
        "correct": true
      }
    ],
    "explanation": "De même qu'on n'empile pas les $\\forall$, on n'enchaîne pas des assertions $\\exists$ les unes après les autres : il faut fixer un représentant de la première assertion d'existence avant de continuer à travailler avec."
  },
  {
    "id": "r8-g1",
    "section": "Règle n° 8 · N'introduisez pas deux fois le même objet",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r8-g1-1",
        "text": "Soient $x, y \\in \\mathbb{R}$. Posons $x := 0$ et $y := 5$.",
        "correct": false
      },
      {
        "id": "r8-g1-2",
        "text": "Posons $x := 0$ et $y := 5$.",
        "correct": true
      }
    ],
    "explanation": "$x$ et $y$ sont introduits une première fois par « Soient », puis redéfinis par « Posons » : c'est une double introduction du même objet. Si on veut juste poser des valeurs, « Posons » seul suffit."
  },
  {
    "id": "r8-g2",
    "section": "Règle n° 8 · N'introduisez pas deux fois le même objet",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "r8-g2-1",
        "text": "Soient $x, y \\in \\mathbb{R}$ tels que $x \\le y$. Posons $x := -y$.",
        "correct": false
      },
      {
        "id": "r8-g2-2",
        "text": "Soit $x \\in \\mathbb{R}_+$. Posons $y := -x$.",
        "correct": true
      }
    ],
    "explanation": "Une fois $x$ introduit par « Soient … », on ne peut plus le redéfinir avec « Posons $x := \\dots$ » : il faut construire le second objet ($y$) à partir du premier, pas réécrire le premier."
  },
  {
    "id": "bp1",
    "section": "Bonne pratique n° 1 · Ne commencez pas une phrase par un symbole",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "bp1-1",
        "text": "On a $y \\ge 2$. $x$ est dans l'ensemble $A$.",
        "correct": false
      },
      {
        "id": "bp1-2",
        "text": "On a $y \\ge 2$. Le nombre $x$ est dans l'ensemble $A$.",
        "correct": true
      }
    ],
    "explanation": "Commencer une phrase par un symbole mathématique crée une ambiguïté avec le point final de la phrase précédente (« $y \\ge 2$. $x$ » peut se lire comme une seule formule). Mieux vaut commencer par un mot."
  },
  {
    "id": "bp2",
    "section": "Bonne pratique n° 2 · N'utilisez pas « Soit » pour une conséquence",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "bp2-1",
        "text": "On a $x \\le y$. Soit $x^2 \\le xy$ car $y \\ge 0$.",
        "correct": false
      },
      {
        "id": "bp2-2",
        "text": "On a $x \\le y$. Donc, on a $x^2 \\le xy$ car $y \\ge 0$.",
        "correct": true
      }
    ],
    "explanation": "« Soit » est réservé à l'introduction d'objets quelconques, jamais à l'expression d'une conséquence — c'est « donc » qu'il faut utiliser ici."
  },
  {
    "id": "bp3",
    "section": "Bonne pratique n° 3 · « ou bien … ou bien … »",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "bp3-1",
        "text": "Posons $A := \\pi^2 - 10$. Soit $A \\ge 0$, soit $A < 0$.",
        "correct": false
      },
      {
        "id": "bp3-2",
        "text": "Posons $A := \\pi^2 - 10$. Ou bien $A \\ge 0$, ou bien $A < 0$.",
        "correct": true
      }
    ],
    "explanation": "« Soit … soit … » pour exposer deux cas possibles entre en collision avec le « Soit » d'introduction d'un objet : on préfère « ou bien … ou bien … »."
  },
  {
    "id": "bp4",
    "section": "Bonne pratique n° 4 · Introduisez et concluez",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "bp4-1",
        "text": "Soit $x \\in \\mathbb{R}$. On a $(x-1)^2 \\ge 0$ donc $x^2 \\ge 2x-1$.",
        "correct": false
      },
      {
        "id": "bp4-2",
        "text": "Montrons que $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$. Soit $x \\in \\mathbb{R}$. On a $(x-1)^2 \\ge 0$ donc $x^2 \\ge 2x-1$. Ainsi, on a montré $\\forall x \\in \\mathbb{R}, x^2 \\ge 2x-1$.",
        "correct": true
      }
    ],
    "explanation": "Avant de démontrer une assertion, on annonce ce qu'on va faire (« Montrons que… ») ; une fois la preuve terminée, on conclut en redisant ce qu'on vient de démontrer (« Ainsi, on a montré… »)."
  },
  {
    "id": "bp5",
    "section": "Bonne pratique n° 5 · Variables déjà utilisées",
    "prompt": "Parmi ces deux rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "bp5-1",
        "text": "Soient $x, y \\in \\mathbb{R}$ tels que $x \\le y$. Montrons que $\\forall x,y \\in \\mathbb{R}, f(x) \\le f(y)$.",
        "correct": false
      },
      {
        "id": "bp5-2",
        "text": "Montrons que $\\forall x,y \\in \\mathbb{R}, \\; x \\le y \\implies f(x) \\le f(y)$. Soient $x,y \\in \\mathbb{R}$ tels que $x \\le y$. Montrons que $f(x) \\le f(y)$.",
        "correct": true
      }
    ],
    "explanation": "Dans la première version, $x$ et $y$ sont introduits une première fois dans la phrase « Soient… », puis réutilisés avec un rôle différent (quantifiés universellement) dans l'énoncé qu'on annonce juste après : c'est une réutilisation fautive de variables déjà prises."
  },
  {
    "id": "loc1",
    "section": "Locution n° 1 · « On a »",
    "prompt": "La locution « On a » sert à signifier qu'une assertion mathématique est vraie. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc1-1",
        "text": "On a $2+2=4$.",
        "correct": true
      },
      {
        "id": "loc1-2",
        "text": "On a $\\forall x \\in \\mathbb{R}, x^2 \\ge 0$.",
        "correct": true
      },
      {
        "id": "loc1-3",
        "text": "On a que la fonction $f$ est paire.",
        "correct": false
      },
      {
        "id": "loc1-4",
        "text": "La fonction $f$ est paire.",
        "correct": true
      }
    ],
    "explanation": "« On a que … » est à éviter : « On a » s'emploie directement devant une assertion mathématique ou un fait, sans le « que » de plus."
  },
  {
    "id": "loc2",
    "section": "Locution n° 2 · « Soit »",
    "prompt": "La locution « Soit » sert à introduire une variable quelconque (ou un objet quelconque vérifiant une condition) — jamais à affecter une valeur ou à exprimer une conséquence. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc2-1",
        "text": "Soit $x \\in \\mathbb{R}$.",
        "correct": true
      },
      {
        "id": "loc2-2",
        "text": "Soit $f : \\mathbb{R} \\longrightarrow \\mathbb{R}$ une fonction continue.",
        "correct": true
      },
      {
        "id": "loc2-3",
        "text": "Soit $A \\in M_n(\\mathbb{R})$ une matrice carrée.",
        "correct": true
      },
      {
        "id": "loc2-4",
        "text": "Soit $x \\in \\mathbb{R}$ tel que $x^5 = 2x-1$.",
        "correct": true
      },
      {
        "id": "loc2-5",
        "text": "Soit $A := \\pi^2 - 10$.",
        "correct": false
      },
      {
        "id": "loc2-6",
        "text": "Soit $x \\in \\mathbb{R}$ tel que $x = 2$.",
        "correct": false
      }
    ],
    "explanation": "Les quatre premières introduisent un objet quelconque (éventuellement sous condition), c'est l'usage correct de « Soit ». Les deux dernières l'emploient à tort pour définir une valeur précise : il fallait « Notons »/« Posons »."
  },
  {
    "id": "loc2-considerons",
    "section": "Locution n° 2 · « Soit »",
    "prompt": "Pour introduire une application définie par une formule, on utilise plutôt « Considérons » (ou « Notons ») que « Soit ». Parmi ces trois rédactions, laquelle (ou lesquelles) est/sont correcte(s) ?",
    "options": [
      {
        "id": "loc2-considerons-1",
        "text": "Soit $f : \\begin{cases} \\mathbb{R} \\longrightarrow \\mathbb{R} \\\\ x \\longmapsto x^2+x+1 \\end{cases}$.",
        "correct": false
      },
      {
        "id": "loc2-considerons-2",
        "text": "Considérons la fonction $f : \\begin{cases} \\mathbb{R} \\longrightarrow \\mathbb{R} \\\\ x \\longmapsto x^2+x+1 \\end{cases}$.",
        "correct": true
      },
      {
        "id": "loc2-considerons-3",
        "text": "Notons $f : \\begin{cases} \\mathbb{R} \\longrightarrow \\mathbb{R} \\\\ x \\longmapsto x^2+x+1 \\end{cases}$.",
        "correct": true
      }
    ],
    "explanation": "« Soit » introduit un objet quelconque, pas une notation nouvelle définie par une formule explicite : pour cela, on préfère « Considérons » ou « Notons »."
  },
  {
    "id": "loc3-g1",
    "section": "Locution n° 3 · « Notons / Posons »",
    "prompt": "Les locutions « Notons »/« Posons » servent à définir une nouvelle notation, toujours suivies de $:=$. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc3-g1-1",
        "text": "Posons $A := \\pi^2 - 10$.",
        "correct": true
      },
      {
        "id": "loc3-g1-2",
        "text": "Notons $A := \\pi^2 - 10$.",
        "correct": true
      },
      {
        "id": "loc3-g1-3",
        "text": "On pose $A := \\pi^2 - 10$.",
        "correct": true
      },
      {
        "id": "loc3-g1-4",
        "text": "On note $A := \\pi^2 - 10$.",
        "correct": true
      }
    ],
    "explanation": "Les quatre formulations sont équivalentes et correctes : « Notons »/« Posons » (et leurs variantes « on pose »/« on note ») sont systématiquement suivies de $:=$."
  },
  {
    "id": "loc3-g2",
    "section": "Locution n° 3 · « Notons / Posons »",
    "prompt": "On veut définir la suite $(u_n)$ par $u_n = 2^n$. Parmi ces quatre rédactions, laquelle (ou lesquelles) est/sont correcte(s) ?",
    "options": [
      {
        "id": "loc3-g2-1",
        "text": "Posons $\\forall n \\in \\mathbb{N}, u_n = 2^n$.",
        "correct": false
      },
      {
        "id": "loc3-g2-2",
        "text": "Posons $\\forall n \\in \\mathbb{N}, u_n := 2^n$.",
        "correct": false
      },
      {
        "id": "loc3-g2-3",
        "text": "Posons, pour $n \\in \\mathbb{N}$, $u_n := 2^n$.",
        "correct": true
      },
      {
        "id": "loc3-g2-4",
        "text": "On considère la suite $(u_n)_n$ définie par $\\forall n \\in \\mathbb{N}, u_n = 2^n$.",
        "correct": true
      }
    ],
    "explanation": "$\\forall$ ne doit pas servir d'abréviation de « pour » juste après « Posons » : il faut soit écrire « pour $n \\in \\mathbb{N}$ » en toutes lettres, soit isoler $\\forall n \\in \\mathbb{N}, u_n=2^n$ comme une formule à part entière introduite par une phrase complète."
  },
  {
    "id": "loc3-g3",
    "section": "Locution n° 3 · « Notons / Posons »",
    "prompt": "On veut poser $A := x^2-y^2$ puis calculer. Parmi ces trois rédactions, laquelle est correcte ?",
    "options": [
      {
        "id": "loc3-g3-1",
        "text": "Posons $A := x^2-y^2 = (x-y)(x+y)$.",
        "correct": false
      },
      {
        "id": "loc3-g3-2",
        "text": "Posons $$A := x^2-y^2 = (x-y)(x+y).$$",
        "correct": false
      },
      {
        "id": "loc3-g3-3",
        "text": "Notons $A := x^2-y^2$. On a $A = (x-y)(x+y)$.",
        "correct": true
      }
    ],
    "explanation": "Il ne faut pas mélanger la locution « Posons » (qui définit une notation) avec un calcul qui s'ensuit : on définit $A$ dans une phrase, puis on calcule dans une autre."
  },
  {
    "id": "loc4-g1",
    "section": "Locution n° 4 · « Fixons »",
    "prompt": "La locution « Fixons » sert à déclarer un représentant d'un objet dont l'existence est assurée par une assertion $\\exists$ qui précède. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc4-g1-1",
        "text": "Grâce au théorème des valeurs intermédiaires, on sait qu'il existe $\\alpha \\in \\mathbb{R}_+$ tel que $\\alpha^5=\\alpha^2+1$. Fixons un tel $\\alpha \\in \\mathbb{R}_+$.",
        "correct": true
      },
      {
        "id": "loc4-g1-2",
        "text": "Comme $n$ est impair, fixons $p \\in \\mathbb{Z}$ tel que $n = 2p+1$.",
        "correct": true
      },
      {
        "id": "loc4-g1-3",
        "text": "Comme la suite $(u_n)_n$ converge, fixons $\\ell \\in \\mathbb{R}$ tel que $u_n \\longrightarrow \\ell$.",
        "correct": true
      },
      {
        "id": "loc4-g1-4",
        "text": "Comme $P$ est un polynôme de degré au plus 2, fixons $a,b,c \\in \\mathbb{R}$ tels que $P = aX^2+bX+c$.",
        "correct": true
      },
      {
        "id": "loc4-g1-5",
        "text": "Fixons $x \\in \\mathbb{R}$ tel que $x = 2$.",
        "correct": false
      },
      {
        "id": "loc4-g1-6",
        "text": "Soit $x \\in \\mathbb{R}$ tel que $x = 2$.",
        "correct": false
      }
    ],
    "explanation": "Les quatre premières fixent un représentant assuré par une existence (parité, convergence, degré…) : c'est l'usage correct de « Fixons ». Les deux dernières confondent « Fixons »/« Soit » avec une simple affectation de valeur, qui relève de « Notons »/« Posons »."
  },
  {
    "id": "loc4-g2",
    "section": "Locution n° 4 · « Fixons »",
    "prompt": "La locution « Fixons donc » s'emploie quand la justification de l'existence de l'objet vient d'être donnée dans la phrase précédente. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc4-g2-1",
        "text": "Le nombre entier $N$ est pair. Fixons donc $p \\in \\mathbb{Z}$ tel que $N = 2p$.",
        "correct": true
      },
      {
        "id": "loc4-g2-2",
        "text": "On a $\\omega \\in \\mathbb{U}_n$. Fixons donc $k \\in \\{0,1,\\dots,n-1\\}$ tel que $\\omega = e^{ik\\frac{2\\pi}{n}}$.",
        "correct": true
      }
    ],
    "explanation": "Dans les deux cas, la phrase précédente justifie déjà l'existence de l'objet (parité de $N$, appartenance de $\\omega$ aux racines $n$-ièmes de l'unité) : « Fixons donc » l'enchaîne naturellement."
  },
  {
    "id": "loc5-g1",
    "section": "Locution n° 5 · « Écrivons … avec »",
    "prompt": "La locution « Écrivons … avec » joue le même rôle que « Fixons », en nommant en plus les composantes de l'objet. Lesquelles de ces phrases sont-elles des rédactions correctes ?",
    "options": [
      {
        "id": "loc5-g1-1",
        "text": "Comme $n$ est impair, fixons $p \\in \\mathbb{Z}$ tel que $n = 2p+1$.",
        "correct": true
      },
      {
        "id": "loc5-g1-2",
        "text": "Comme $n$ est impair, écrivons-le $n = 2p+1$, avec $p \\in \\mathbb{Z}$.",
        "correct": true
      },
      {
        "id": "loc5-g1-3",
        "text": "Comme $z \\in \\mathbb{C}$, fixons $a,b \\in \\mathbb{R}$ tels que $z = a+ib$.",
        "correct": true
      },
      {
        "id": "loc5-g1-4",
        "text": "Comme $z \\in \\mathbb{C}$, écrivons-le $z = a+ib$, avec $a,b \\in \\mathbb{R}$.",
        "correct": true
      },
      {
        "id": "loc5-g1-5",
        "text": "Comme $P \\in \\mathbb{R}[X]$, fixons $n \\in \\mathbb{N}$ et $(a_0,\\dots,a_n) \\in \\mathbb{R}^{n+1}$ tels que $P = \\sum_{k=0}^n a_k X^k$.",
        "correct": true
      },
      {
        "id": "loc5-g1-6",
        "text": "Comme $P \\in \\mathbb{R}[X]$, écrivons-le $P = \\sum_{k=0}^n a_k X^k$ avec $n \\in \\mathbb{N}$ et $(a_0,\\dots,a_n) \\in \\mathbb{R}^{n+1}$.",
        "correct": true
      },
      {
        "id": "loc5-g1-7",
        "text": "Comme $y \\in \\mathrm{Im}(f)$, fixons $x \\in E$ tel que $y = f(x)$.",
        "correct": true
      },
      {
        "id": "loc5-g1-8",
        "text": "Comme $y \\in \\mathrm{Im}(f)$, écrivons $y = f(x)$, avec $x \\in E$.",
        "correct": true
      }
    ],
    "explanation": "Chaque paire montre que « Fixons » et « Écrivons … avec » sont deux façons également correctes de fixer un objet dont l'existence est acquise, la seconde nommant aussi ses composantes."
  },
  {
    "id": "loc5-g2",
    "section": "Locution n° 5 · « Écrivons … avec »",
    "prompt": "Parmi ces trois rédactions pour introduire $z = a+ib$, laquelle est correcte ?",
    "options": [
      {
        "id": "loc5-g2-1",
        "text": "Soit $z \\in \\mathbb{C}$. Écrivons-le $z := a+ib$, avec $a,b \\in \\mathbb{R}$.",
        "correct": false
      },
      {
        "id": "loc5-g2-2",
        "text": "Soient $a,b \\in \\mathbb{R}$. Posons $z := a+ib$.",
        "correct": true
      },
      {
        "id": "loc5-g2-3",
        "text": "Soit $z \\in \\mathbb{C}$. Écrivons-le $z = a+ib$, avec $a,b \\in \\mathbb{R}$.",
        "correct": true
      }
    ],
    "explanation": "La première introduit $z$ deux fois (par « Soit », puis en le redéfinissant avec $:=$) : une fois $z$ introduit, on ne peut plus écrire $z := \\dots$, seulement $z = \\dots$ (une égalité, pas une nouvelle définition). Les deux autres évitent ce problème, soit en ne posant $z$ qu'une fois, soit en utilisant $=$ plutôt que $:=$."
  },
  {
    "id": "loc5-ou",
    "section": "Locution n° 5 · « Écrivons … avec »",
    "prompt": "La locution « Écrivons » peut aussi introduire une notation en même temps que l'objet, avec le connecteur « où ». Cette rédaction est-elle correcte ?\n\n« Comme $P \\in \\mathbb{R}[X]$ est non nul, écrivons-le\n\n$$P = \\sum_{k=0}^n a_k X^k,$$\n\noù $n := \\deg(P)$ et avec $a_0,\\dots,a_n \\in \\mathbb{R}$. »",
    "options": [
      {
        "id": "loc5-ou-1",
        "text": "Oui, cette rédaction est correcte.",
        "correct": true
      },
      {
        "id": "loc5-ou-2",
        "text": "Non, cette rédaction n'est pas correcte.",
        "correct": false
      }
    ],
    "explanation": "C'est un usage correct : « où » introduit ici la notation $n := \\deg(P)$, pendant que « avec » introduit les coefficients $a_0,\\dots,a_n$ dont l'existence est assurée."
  },
  {
    "id": "loc6",
    "section": "Locution n° 6 · « Pour »",
    "prompt": "La locution « Pour » (ou « Si ») introduit un objet dont la définition se limite à la phrase courante. Lesquelles de ces phrases l'emploient correctement ?",
    "options": [
      {
        "id": "loc6-1",
        "text": "Pour $x \\in \\mathbb{R}$, on a $x^2 \\ge 0$.",
        "correct": true
      },
      {
        "id": "loc6-2",
        "text": "Pour $n \\in \\mathbb{Z}$, on note $u_n := 2^n$.",
        "correct": true
      },
      {
        "id": "loc6-3",
        "text": "On sait que, pour $t > 0$, on a $\\ln(1+t) \\le t$.",
        "correct": true
      },
      {
        "id": "loc6-4",
        "text": "Si $x \\in \\mathbb{R}$, on a $x^2 \\ge 0$.",
        "correct": true
      }
    ],
    "explanation": "Dans les quatre cas, l'objet introduit (« $x$ », « $n$ », « $t$ ») n'est défini que pour la durée de la phrase courante : c'est exactement l'usage de « Pour » (ou de « Si » à sa place)."
  }
];
