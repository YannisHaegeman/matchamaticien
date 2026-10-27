import type { Flashcard } from "@/types/flashcards";

export const probabilitesCards: Flashcard[] = [
  {
    id: "mesure-uniforme-piece-equilibree",
    context:
      "On lance $n$ fois une pièce (Pile avec probabilité $p$). Sur $\\Omega = \\{P, F\\}^n$, $\\mathbb{P}(\\{\\omega\\}) = p^{N_P(\\omega)}(1 - p)^{N_F(\\omega)}$.",
    question: "Que dire de la mesure $\\mathbb{P}$ lorsque $p = 1/2$ ?",
    hint:
      "Remplace $p$ par $1/2$ et utilise $N_P(\\omega) + N_F(\\omega) = n$. La valeur obtenue dépend-elle encore de $\\omega$ ?",
    answer:
      "Pour tout $\\omega \\in \\Omega$ : $\\mathbb{P}(\\{\\omega\\}) = (1/2)^{N_P(\\omega)+N_F(\\omega)} = 1/2^n$. $\\mathbb{P}$ est la probabilité uniforme sur $\\Omega$ : $\\mathbb{P}(\\{\\omega\\}) = 1/|\\Omega|$.",
    remark:
      "On a bien $|\\Omega| = 2^n$ : avec une pièce équilibrée, toutes les suites de lancers sont équiprobables.",
    source: "TD 2 · Ex. 1.1",
  },
  {
    id: "denombrement-np-egal-k",
    context:
      "$\\Omega = \\{P, F\\}^n$ et $N_P(\\omega)$ compte le nombre de Pile dans $\\omega = (\\omega_i)_{1 \\le i \\le n}$.",
    question:
      "Montrer que, pour tout $k \\in \\llbracket 0, n \\rrbracket$, il y a $\\binom{n}{k}$ $n$-uplets $\\omega \\in \\Omega$ tels que $N_P(\\omega) = k$.",
    hint:
      "Un tel $\\omega$ est entièrement déterminé par l'ensemble des positions $i$ où apparaît Pile.",
    answer:
      "L'application $\\omega \\mapsto \\{i \\in \\llbracket 1, n \\rrbracket : \\omega_i = P\\}$ est une bijection entre $\\{N_P = k\\}$ et l'ensemble des parties à $k$ éléments de $\\llbracket 1, n \\rrbracket$. Il y en a donc exactement $\\binom{n}{k}$.",
    remark:
      "Réflexe de dénombrement : construire une bijection vers un ensemble dont on connaît déjà le cardinal.",
    source: "TD 2 · Ex. 1.2",
  },
  {
    id: "loi-binomiale-np-nf",
    context:
      "$\\mathbb{P}(\\{\\omega\\}) = p^{N_P(\\omega)}(1-p)^{N_F(\\omega)}$, et $N_P, N_F : \\Omega \\to \\llbracket 0, n \\rrbracket$ comptent les Pile et les Face.",
    question:
      "Montrer que $N_P \\sim \\mathrm{Bin}(n, p)$ et $N_F \\sim \\mathrm{Bin}(n, 1-p)$.",
    hint:
      "Écris $\\{N_P = k\\}$ comme réunion disjointe de singletons : ils ont tous la même probabilité, et la question précédente donne leur nombre.",
    answer:
      "Chaque $\\omega$ avec $N_P(\\omega) = k$ vérifie $N_F(\\omega) = n-k$, donc $\\mathbb{P}(\\{\\omega\\}) = p^k(1-p)^{n-k}$. On obtient alors $\\mathbb{P}(N_P = k) = \\binom{n}{k} p^k(1-p)^{n-k}$. Comme $N_F = n - N_P$, on a de même $N_F \\sim \\mathrm{Bin}(n, 1-p)$.",
    remark:
      "On peut aussi conclure par symétrie, en échangeant les rôles de Pile et Face (donc de $p$ et $1-p$).",
    source: "TD 2 · Ex. 1.3",
  },
  {
    id: "probabilites-totales",
    context:
      "Soit $(A_1, \\ldots, A_n)$ un système complet d'événements (SCE) de $\\Omega$ tel que $\\forall i \\in \\llbracket 1, n \\rrbracket, \\mathbb{P}(A_i) \\ne 0$, et $B$ un événement.",
    question: "Énoncer la formule des probabilités totales.",
    hint:
      "Découpe $B$ selon les $A_i$ : les $B \\cap A_i$ sont deux à deux disjoints et leur réunion vaut $B$.",
    answer:
      "$\\mathbb{P}(B) = \\sum_{i=1}^{n} \\mathbb{P}(B \\cap A_i) = \\sum_{i=1}^{n} \\mathbb{P}(A_i) \\times \\mathbb{P}_{A_i}(B)$.",
    remark:
      "Un SCE : les $A_i$ sont deux à deux disjoints et leur réunion est $\\Omega$. La seconde égalité vient de $\\mathbb{P}(B \\cap A_i) = \\mathbb{P}(A_i)\\,\\mathbb{P}_{A_i}(B)$.",
  },
  {
    id: "variance-nulle",
    context:
      "$X$ est une variable aléatoire réelle à support fini, définie sur un espace probabilisé $(\\Omega, \\mathbb{P})$.",
    question:
      "Montrer que $\\mathrm{Var}(X) = 0$ si, et seulement si, il existe $c \\in \\mathbb{R}$ tel que $X = c$ presque sûrement.",
    hint:
      "Écris $\\mathrm{Var}(X) = \\sum (x-\\mathbb{E}[X])^2 \\mathbb{P}(X=x)$ : c'est une somme de termes positifs.",
    answer:
      "($\\Rightarrow$) Avec $\\mu = \\mathbb{E}[X]$, $\\mathrm{Var}(X) = \\sum (x-\\mu)^2 \\mathbb{P}(X=x) = 0$. Chaque terme est positif, donc nul : $\\mathbb{P}(X=x)=0$ pour tout $x \\ne \\mu$. Donc $X = \\mathbb{E}[X]$ presque sûrement. ($\\Leftarrow$) Si $X=c$ p.s., alors $\\mathbb{E}[X]=c$ et $\\mathrm{Var}(X) = \\mathbb{E}[(X-c)^2] = 0$.",
    remark:
      "Le support étant fini, toutes les sommes sont finies : aucune question de convergence.",
    source: "TD 2 · Ex. 2",
  },
  {
    id: "loi-de-x-de-truque",
    context:
      "Un dé à 6 faces est truqué : la probabilité d'obtenir une face est proportionnelle à son numéro. $X$ est le résultat obtenu.",
    question: "Déterminer la loi de $X$.",
    hint:
      "Pose $\\mathbb{P}(X=k) = ck$ et utilise que la somme des probabilités vaut 1.",
    answer:
      "Le support est $X(\\Omega) = \\llbracket 1, 6 \\rrbracket$, et $\\sum_{k=1}^{6} ck = 21c = 1$, donc $c = 1/21$. $\\mathbb{P}(X=k) = \\dfrac{k}{21}$ pour $k \\in \\llbracket 1, 6 \\rrbracket$.",
    remark:
      "Déterminer une loi : donner le support, puis $\\mathbb{P}(X=x)$ pour chaque $x$ du support.",
    source: "TD 2 · Ex. 3.1",
  },
  {
    id: "esperance-de-truque",
    context: "Même dé truqué : $\\mathbb{P}(X=k) = k/21$ pour $k \\in \\llbracket 1, 6 \\rrbracket$.",
    question: "Calculer $\\mathbb{E}[X]$ et $\\mathbb{E}[1/X]$.",
    hint:
      "Pour $\\mathbb{E}[1/X]$, utilise le théorème de transfert : $\\mathbb{E}[f(X)] = \\sum f(k)\\,\\mathbb{P}(X=k)$.",
    answer:
      "$\\mathbb{E}[X] = \\sum k \\cdot k/21 = (1+4+9+16+25+36)/21 = 91/21$. $\\mathbb{E}[1/X] = \\sum (1/k)(k/21) = 6/21$. Donc $\\mathbb{E}[X] = 13/3$ et $\\mathbb{E}[1/X] = 2/7$.",
    remark: "Attention : $\\mathbb{E}[1/X] \\ne 1/\\mathbb{E}[X]$ (ici $2/7 \\ne 3/13$).",
    source: "TD 2 · Ex. 3.2–3.3",
  },
  {
    id: "loi-uniforme-k-inconnu",
    context:
      "$X$ suit la loi uniforme sur $\\{0, 1, \\ldots, k\\}$, avec $k \\in \\mathbb{N}$, et $\\mathbb{E}[X] = 6$.",
    question: "Déterminer $k$.",
    hint: "Calcule $\\mathbb{E}[X] = \\dfrac{1}{k+1}\\sum_{j=0}^{k} j$.",
    answer:
      "$\\mathbb{E}[X] = \\dfrac{1}{k+1}\\cdot\\dfrac{k(k+1)}{2} = \\dfrac{k}{2}$. Donc $k/2=6$, soit $k=12$.",
    remark:
      "L'espérance d'une loi uniforme sur des entiers consécutifs est le milieu : $(0+k)/2$.",
    source: "TD 2 · Ex. 4",
  },
  {
    id: "avions-moteurs-en-panne",
    context:
      "L'avion A a 4 moteurs, B en a 2. Chaque moteur tombe en panne avec probabilité $p$, indépendamment. Un avion arrive si moins de la moitié de ses moteurs tombe en panne.",
    question: "Quel avion choisir, selon la valeur de $p$ ?",
    hint:
      "$X \\sim \\mathrm{Bin}(4,p)$ et $Y \\sim \\mathrm{Bin}(2,p)$ comptent les pannes. A arrive si $X \\le 1$, B si $Y=0$.",
    answer:
      "$\\mathbb{P}(X\\le 1) = (1-p)^4 + 4p(1-p)^3 = (1-p)^3(1+3p)$ et $\\mathbb{P}(Y=0) = (1-p)^2$. Leur différence vaut $p(1-p)^2(2-3p)$. Choisir A si $p < 2/3$, B si $p > 2/3$.",
    remark: "Pour $p \\in \\{0, 2/3, 1\\}$, les deux avions se valent.",
    source: "TD 2 · Ex. 5",
  },
  {
    id: "carte-jeu-32-loi-esperance-variance",
    context:
      "On tire une carte au hasard dans un jeu de 32. $X=-1$ pour un 7, 8, 9 ou 10 ; $X=1$ pour un Valet, une Dame ou un Roi ; $X=2$ pour un As.",
    question: "Déterminer la loi de $X$, puis $\\mathbb{E}[X]$ et $\\mathrm{Var}(X)$.",
    hint: "Compte les cartes : 16 cartes de 7 à 10, 12 figures et 4 As.",
    answer:
      "$\\mathbb{P}(X=-1)=1/2$, $\\mathbb{P}(X=1)=3/8$, $\\mathbb{P}(X=2)=1/8$. $\\mathbb{E}[X] = -1/2+3/8+2/8$ et $\\mathbb{E}[X^2]=1/2+3/8+4/8=11/8$. Donc $\\mathbb{E}[X]=1/8$ et $\\mathrm{Var}(X)=11/8-1/64=87/64$.",
    remark: "Formule de König-Huygens : $\\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$.",
    source: "TD 2 · Ex. 6.1–6.2",
  },
  {
    id: "carte-jeu-32-conditionnement-affine",
    context:
      "Même $X$ : $\\mathbb{P}(X=-1)=1/2$, $\\mathbb{P}(X=1)=3/8$, $\\mathbb{P}(X=2)=1/8$, avec $\\mathbb{E}[X]=1/8$ et $\\mathrm{Var}(X)=87/64$.",
    question:
      "Calculer $\\mathbb{P}(X=2\\mid X\\ge 0)$, puis $\\mathbb{E}[Y]$ et $\\mathrm{Var}(Y)$ pour $Y=2X-1$.",
    hint:
      "$\\{X=2\\}\\subset\\{X\\ge0\\}$. Pour $Y$, utilise $\\mathbb{E}[aX+b]=a\\mathbb{E}[X]+b$ et $\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)$.",
    answer:
      "$\\mathbb{P}(X\\ge0)=3/8+1/8=1/2$, donc $\\mathbb{P}(X=2\\mid X\\ge0) = (1/8)/(1/2) = 1/4$. $\\mathbb{E}[Y]=2\\cdot1/8-1=-3/4$ et $\\mathrm{Var}(Y)=4\\cdot87/64=87/16$.",
    remark:
      "La constante $b$ décale la variable sans changer sa dispersion : elle disparaît de la variance.",
    source: "TD 2 · Ex. 6.3–6.4",
  },
  {
    id: "qcm-vrai-faux-binomiale",
    context:
      "Un questionnaire a 10 questions Vrai/Faux. L'étudiant répond au hasard (probabilité 1/2, indépendamment). $X$ est le nombre de bonnes réponses.",
    question:
      "Loi de $X$ ? Calculer la probabilité de 10 bonnes réponses, d'exactement 6, puis d'au moins 2.",
    hint:
      "$\\mathbb{P}(X=k) = \\binom{10}{k}/2^{10}$. Pour « au moins 2 », passe au complémentaire.",
    answer:
      "$X \\sim \\mathrm{Bin}(10, 1/2)$. $\\mathbb{P}(X=10) = 1/1024$ et $\\mathbb{P}(X=6) = \\binom{10}{6}/1024 = 210/1024 = 105/512$. $\\mathbb{P}(X\\ge2) = 1-\\mathbb{P}(X=0)-\\mathbb{P}(X=1) = 1-11/1024 = 1013/1024$.",
    remark: "$2^{10}=1024$ : toutes les suites de réponses sont équiprobables.",
    source: "TD 2 · Ex. 7.1–7.2",
  },
  {
    id: "qcm-note-transformation-affine",
    context:
      "$X \\sim \\mathrm{Bin}(10,1/2)$ compte les bonnes réponses. Une bonne réponse vaut 1 point, une mauvaise $-1/2$ point. $Y$ est la note obtenue.",
    question: "Exprimer $Y$ en fonction de $X$, puis calculer $\\mathbb{E}[Y]$ et $\\mathrm{Var}(Y)$.",
    hint:
      "Il y a $10-X$ mauvaises réponses. Rappel : $\\mathbb{E}[X]=np$ et $\\mathrm{Var}(X)=np(1-p)$.",
    answer:
      "$Y = X - (10-X)/2 = (3X-10)/2$, avec $\\mathbb{E}[X]=5$ et $\\mathrm{Var}(X)=5/2$. Donc $\\mathbb{E}[Y]=5/2$ et $\\mathrm{Var}(Y)=(9/4)(5/2)=45/8$.",
    remark: "En répondant au hasard, l'étudiant obtient 2,5 sur 10 en moyenne.",
    source: "TD 2 · Ex. 7.3",
  },
  {
    id: "parite-binomiale",
    context:
      "$X \\sim \\mathrm{Bin}(n,p)$. Les sommes $F(x,y)$ et $G(x,y)$ regroupent les termes d'indices pairs et impairs du développement de $(x+1-y)^n$.",
    question: "Calculer la probabilité que $X$ soit pair.",
    hint: "$F+G=(1-y+x)^n$ et $F-G=(1-y-x)^n$. Prends ensuite $x=y=p$.",
    answer:
      "$F(x,y) = \\dfrac{(1-y+x)^n+(1-y-x)^n}{2}$, et $\\mathbb{P}(X\\text{ pair}) = F(p,p) = \\dfrac{1+(1-2p)^n}{2}$.",
    remark: "Pour $p=1/2$, on trouve exactement $1/2$ dès que $n\\ge1$.",
    source: "TD 2 · Ex. 8",
  },
  {
    id: "loi-geometrique-queue-esperance-variance",
    context:
      "$X$ suit la loi géométrique de paramètre 2/3 : $\\mathbb{P}(X=k) = (1/3)^{k-1}(2/3)$ pour $k\\ge1$.",
    question: "Calculer $\\mathbb{P}(X>n)$, $\\mathbb{E}[X]$ et $\\mathrm{Var}(X)$.",
    hint:
      "$\\{X>n\\}$ : les $n$ premiers essais sont des échecs. Pour $\\mathbb{E}[X]$, dérive $\\sum x^k = 1/(1-x)$.",
    answer:
      "$\\mathbb{P}(X>n) = (1/3)^n$. $\\mathbb{E}[X] = (2/3)\\sum k(1/3)^{k-1} = (2/3)\\cdot 1/(1-1/3)^2 = 3/2$. Donc $\\mathbb{E}[X]=3/2$ et $\\mathrm{Var}(X) = (1-p)/p^2 = 3/4$.",
    remark: "Pour $\\mathrm{G}(p)$ : $\\mathbb{E}[X]=1/p$ et $\\mathrm{Var}(X)=(1-p)/p^2$.",
    source: "TD 2 · Ex. 10.1–10.3",
  },
  {
    id: "loi-geometrique-parite",
    context: "$X \\sim \\mathrm{G}(2/3)$ : $\\mathbb{P}(X=k) = (1/3)^{k-1}(2/3)$ pour $k\\ge1$.",
    question: "Calculer la probabilité que $X$ soit pair.",
    hint: "Somme sur $k=2j$ : c'est une série géométrique de raison $1/9$.",
    answer:
      "$\\mathbb{P}(X\\text{ pair}) = \\sum_{j\\ge1} (1/3)^{2j-1}(2/3) = (2/9)\\sum_{j\\ge1}(1/9)^{j-1} = (2/9)\\cdot9/8 = 1/4$.",
    remark: "Donc $\\mathbb{P}(X\\text{ impair}) = 3/4$ : obtenir Pile dès le premier lancer pèse lourd.",
    source: "TD 2 · Ex. 10.4",
  },
  {
    id: "loi-geometrique-sans-memoire",
    context: "$X \\sim \\mathrm{G}(p)$ avec $p\\in\\,]0,1[$, et $k,n\\in\\mathbb{N}$.",
    question:
      "Montrer que $\\mathbb{P}(X>k+n\\mid X>n) = \\mathbb{P}(X>k)$. Interpréter.",
    hint:
      "Calcule d'abord $\\mathbb{P}(X>m) = (1-p)^m$, et remarque que $\\{X>k+n\\}\\subset\\{X>n\\}$.",
    answer:
      "$\\mathbb{P}(X>k+n\\mid X>n) = \\mathbb{P}(X>k+n)/\\mathbb{P}(X>n) = (1-p)^{k+n}/(1-p)^n = (1-p)^k = \\mathbb{P}(X>k)$.",
    remark:
      "Avoir déjà attendu $n$ essais ne change rien à l'attente restante : la loi géométrique est « sans mémoire ».",
    source: "TD 2 · Ex. 11.1",
  },
  {
    id: "loi-poisson-constante-et-mode",
    context:
      "$X$ est à valeurs dans $\\mathbb{N}$ et $\\mathbb{P}(X=k) = a/(2^k k!)$ pour tout $k\\in\\mathbb{N}$.",
    question:
      "Déterminer $a$ et la loi de $X$, puis sa valeur la plus probable et $\\mathbb{E}[X]$.",
    hint:
      "$\\sum x^k/k! = e^x$. Pour la valeur la plus probable, étudie $\\mathbb{P}(X=k+1)/\\mathbb{P}(X=k)$.",
    answer:
      "$\\sum a(1/2)^k/k! = a e^{1/2} = 1$, donc $a = e^{-1/2}$ : $X \\sim \\mathrm{Pois}(1/2)$. $\\mathbb{P}(X=k+1)/\\mathbb{P}(X=k) = 1/(2(k+1)) < 1$ : les probabilités décroissent. Valeur la plus probable : 0, et $\\mathbb{E}[X]=1/2$.",
    remark: "Pour $\\mathrm{Pois}(\\lambda)$, $\\mathbb{E}[X]=\\lambda$.",
    source: "TD 2 · Ex. 12.1–12.3",
  },
  {
    id: "loi-poisson-variance-et-inverse",
    context: "$X \\sim \\mathrm{Pois}(\\lambda)$ avec $\\lambda=1/2$.",
    question: "Calculer $\\mathbb{E}[X(X-1)]$, $\\mathrm{Var}(X)$ et $\\mathbb{E}[1/(X+1)]$.",
    hint:
      "Dans $\\mathbb{E}[X(X-1)]$, les termes $k=0$ et $k=1$ sont nuls : réindexe avec $j=k-2$.",
    answer:
      "$\\mathbb{E}[X(X-1)] = \\lambda^2 = 1/4$, donc $\\mathrm{Var}(X) = 1/4+1/2-1/4 = 1/2$. $\\mathbb{E}[1/(X+1)] = \\sum e^{-\\lambda}\\lambda^k/(k+1)! = (1-e^{-\\lambda})/\\lambda = 2(1-e^{-1/2})$.",
    remark:
      "On retrouve $\\mathrm{Var}(X)=\\lambda$ : espérance et variance coïncident pour une loi de Poisson.",
    source: "TD 2 · Ex. 12.4–12.6",
  },
  {
    id: "deux-piles-consecutifs-recurrence",
    context:
      "Pile a probabilité 2/3, Face 1/3, lancers indépendants. $Y$ est le nombre de lancers pour obtenir deux Pile consécutifs, et $p_n = \\mathbb{P}(Y=n)$.",
    question:
      "Montrer que, pour $n\\ge3$, $p_n = (2/9)p_{n-2} + (1/3)p_{n-1}$.",
    hint:
      "Applique la formule des probabilités totales selon le début de la partie : F, PF ou PP.",
    answer:
      "Début F (proba 1/3) : tout recommence, d'où $(1/3)p_{n-1}$. Début PF (proba 2/9) : tout recommence après 2 lancers, d'où $(2/9)p_{n-2}$. Début PP : $Y=2$, impossible pour $n\\ge3$. D'où $p_n = (2/9)p_{n-2}+(1/3)p_{n-1}$.",
    remark:
      "Avec $p_1=0$ et $p_2=4/9$ ; la même méthode donne $\\mathbb{E}[Y]=15/4$.",
    source: "TD 2 · Ex. 13.3",
  },
  {
    id: "connexions-poisson-independance",
    context:
      "Le nombre de connexions en $T$ heures suit $\\mathrm{Pois}(\\lambda(T))$, avec $\\lambda(1)=12{,}2$. $X_1$ et $X_2$ comptent les connexions de 14h à 15h et de 15h à 16h.",
    question:
      "Calculer $\\mathbb{P}(X_1=0)$, $\\mathbb{P}(X_1\\ge2)$ et $\\lambda(2)$. Les événements $\\{X_1=0\\}$ et $\\{X_2=0\\}$ sont-ils indépendants ?",
    hint:
      "$X_1+X_2$ compte les connexions sur 2h, donc suit $\\mathrm{Pois}(\\lambda(2))$. Et $\\{X_1+X_2=0\\} = \\{X_1=0\\}\\cap\\{X_2=0\\}$.",
    answer:
      "$\\mathbb{P}(X_1=0) = e^{-12{,}2}$ et $\\mathbb{P}(X_1\\ge2) = 1-13{,}2\\,e^{-12{,}2}$. $\\mathbb{E}[X_1+X_2] = 24{,}4 = \\lambda(2)$. $\\mathbb{P}(X_1=X_2=0) = e^{-24{,}4} = \\mathbb{P}(X_1=0)\\,\\mathbb{P}(X_2=0)$ : oui, indépendants.",
    remark: "L'espérance est linéaire : $\\lambda(2)=2\\lambda(1)$, sans hypothèse d'indépendance.",
    source: "TD 2 · Ex. 14",
  },
  {
    id: "integrabilite-theoreme-de-transfert",
    context:
      "$X$ est une variable aléatoire discrète de support $X(\\Omega) = \\{x_k, k\\in I\\}$, avec $I$ fini ou dénombrable, et $f : X(\\Omega)\\to\\mathbb{R}$.",
    question:
      "L'espérance de $f(X)$ est-elle toujours définie ? Énoncer le théorème de transfert.",
    hint:
      "Si le support est infini, $\\mathbb{E}[f(X)]$ est une série : elle peut diverger. Pense à $\\mathbb{P}(X=k) = 1/(k(k+1))$.",
    answer:
      "Support fini : la somme est finie, $\\mathbb{E}[f(X)]$ existe toujours. Support dénombrable : il faut la convergence absolue de la série : $f(X)\\in L^1(\\Omega) \\iff \\sum_{k\\in I} |f(x_k)|\\,\\mathbb{P}(X=x_k) < +\\infty$, et dans ce cas $\\mathbb{E}[f(X)] = \\sum_{k\\in I} f(x_k)\\,\\mathbb{P}(X=x_k)$.",
    remark:
      "$\\mathbb{P}(X=k) = 1/(k(k+1))$, $k\\ge1$, définit une loi, mais $\\sum k\\,\\mathbb{P}(X=k) = \\sum 1/(k+1) = +\\infty$ : $X\\notin L^1(\\Omega)$. On parle d'intégrabilité par analogie avec l'intégrale, même s'il s'agit ici d'une sommation discrète.",
  },
  {
    id: "espaces-ln",
    context:
      "$X$ est une variable aléatoire réelle discrète de support $\\{x_k, k\\in I\\}$, et $n\\ge1$ est un entier.",
    question:
      "Définir $L^n(\\Omega)$ et donner une caractérisation pratique de $X\\in L^n(\\Omega)$.",
    hint: "Applique le théorème de transfert à $f(x) = |x|^n$.",
    answer:
      "$X\\in L^n(\\Omega) \\iff \\mathbb{E}[|X|^n] < +\\infty$. Par transfert : $X\\in L^n(\\Omega) \\iff \\sum_{k\\in I} |x_k|^n\\,\\mathbb{P}(X=x_k) < +\\infty$. On dit alors que $X$ admet un moment d'ordre $n$, $\\mathbb{E}[X^n]$.",
    remark:
      "Support fini : $X$ est dans tous les $L^n(\\Omega)$. $L^1$ donne l'espérance, $L^2$ la variance.",
  },
  {
    id: "inclusions-des-ln",
    context:
      "Sur un espace probabilisé $(\\Omega,\\mathbb{P})$, on compare $L^p(\\Omega)$ et $L^q(\\Omega)$ pour $1\\le p\\le q$.",
    question: "A-t-on $L^q(\\Omega)\\subset L^p(\\Omega)$ ? Et l'inclusion réciproque ?",
    hint:
      "Pour tout réel $x$, $|x|^p \\le 1+|x|^q$. Pour la réciproque, cherche une loi en $c/k^3$.",
    answer:
      "$|x|^p\\le1+|x|^q$ donne $\\mathbb{E}[|X|^p]\\le 1+\\mathbb{E}[|X|^q]$, car la masse totale vaut 1. Donc $L^q(\\Omega)\\subset L^p(\\Omega)$ pour $p\\le q$, mais pas l'inverse : avec $\\mathbb{P}(X=k)=c/k^3$, $\\mathbb{E}[|X|] = c\\sum 1/k^2 < +\\infty$ mais $\\mathbb{E}[X^2] = c\\sum 1/k = +\\infty$, donc $X\\in L^1\\setminus L^2$.",
    remark:
      "L'inclusion repose sur $\\mathbb{P}(\\Omega)=1$. Pour une mesure de masse infinie (Lebesgue sur $\\mathbb{R}$), il n'y a aucune inclusion entre les $L^p$.",
  },
  {
    id: "proprietes-esperance",
    context: "$X, Y\\in L^1(\\Omega)$ et $a,b\\in\\mathbb{R}$.",
    question: "Rappeler les propriétés de l'espérance.",
    hint:
      "Pense à la linéarité, à la positivité, à la croissance et à l'espérance d'une constante.",
    answer:
      "$\\mathbb{E}[aX+bY] = a\\mathbb{E}[X]+b\\mathbb{E}[Y]$ ; en particulier $\\mathbb{E}[aX+b]=a\\mathbb{E}[X]+b$ et $\\mathbb{E}[c]=c$. Positivité : $X\\ge0 \\Rightarrow \\mathbb{E}[X]\\ge0$. Croissance : $X\\le Y \\Rightarrow \\mathbb{E}[X]\\le\\mathbb{E}[Y]$. Enfin $|\\mathbb{E}[X]| \\le \\mathbb{E}[|X|]$.",
    remark:
      "La linéarité ne demande aucune indépendance. En revanche, $\\mathbb{E}[XY]=\\mathbb{E}[X]\\mathbb{E}[Y]$ n'est vrai en général que si $X$ et $Y$ sont indépendantes.",
  },
  {
    id: "variance-formule-et-affine",
    context:
      "$X\\in L^2(\\Omega)$, $a,b\\in\\mathbb{R}$ et $\\mathrm{Var}(X)=\\mathbb{E}[(X-\\mathbb{E}[X])^2]$.",
    question:
      "Montrer que $\\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$, puis que $\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)$.",
    hint:
      "Développe $(X-\\mu)^2$ avec $\\mu=\\mathbb{E}[X]$. Pour $aX+b$, l'écart à la moyenne vaut $a(X-\\mu)$.",
    answer:
      "$(X-\\mu)^2 = X^2-2\\mu X+\\mu^2$, donc $\\mathrm{Var}(X) = \\mathbb{E}[X^2]-2\\mu^2+\\mu^2 = \\mathbb{E}[X^2]-\\mathbb{E}[X]^2$. Et $aX+b-\\mathbb{E}[aX+b]=a(X-\\mu)$, donc $\\mathrm{Var}(aX+b)=\\mathbb{E}[a^2(X-\\mu)^2]=a^2\\mathrm{Var}(X)$.",
    remark:
      "Comme $\\mathrm{Var}(X)\\ge0$, on a $\\mathbb{E}[X^2]\\ge\\mathbb{E}[X]^2$. L'écart-type vérifie $\\sigma(aX+b)=|a|\\sigma(X)$.",
  },
  {
    id: "loi-geometrique-fiche",
    context:
      "$X$ est le rang du premier succès dans une suite d'épreuves de Bernoulli indépendantes de paramètre $p\\in\\,]0,1[$.",
    question:
      "Donner le support, la loi, l'espérance et la variance de $X \\sim \\mathrm{G}(p)$.",
    hint:
      "$\\{X=k\\}$ : $k-1$ échecs puis un succès. Pour $\\mathbb{E}[X]$, dérive $\\sum x^k = 1/(1-x)$.",
    answer:
      "Support : $\\mathbb{N}^* = \\{1,2,\\ldots\\}$, et $\\mathbb{P}(X=k)=(1-p)^{k-1}p$. Queue de la loi : $\\mathbb{P}(X>n)=(1-p)^n$. $\\mathbb{E}[X] = 1/p$ et $\\mathrm{Var}(X) = (1-p)/p^2$.",
    remark:
      "Variante sur $\\mathbb{N}$ (nombre d'échecs avant le premier succès) : $Y=X-1$, $\\mathbb{E}[Y]=(1-p)/p$. C'est la loi « sans mémoire ».",
    source: "Loi classique",
  },
  {
    id: "loi-de-poisson-fiche",
    context:
      "Loi des événements rares : nombre d'occurrences sur une période donnée, de paramètre $\\lambda>0$.",
    question:
      "Donner le support, la loi, l'espérance et la variance de $X\\sim\\mathrm{Pois}(\\lambda)$.",
    hint:
      "Utilise $\\sum\\lambda^k/k!=e^\\lambda$, et calcule $\\mathbb{E}[X(X-1)]$ pour la variance.",
    answer:
      "Support : $\\mathbb{N}$, et $\\mathbb{P}(X=k)=e^{-\\lambda}\\lambda^k/k!$. $\\mathbb{E}[X]=\\lambda$ et $\\mathrm{Var}(X)=\\lambda$. Si $X\\sim\\mathrm{Pois}(\\lambda)$ et $Y\\sim\\mathrm{Pois}(\\mu)$ sont indépendantes, $X+Y\\sim\\mathrm{Pois}(\\lambda+\\mu)$.",
    remark: "Approximation : $\\mathrm{Bin}(n,p)\\approx\\mathrm{Pois}(np)$ quand $n$ est grand et $p$ petit.",
    source: "Loi classique",
  },
  {
    id: "loi-binomiale-negative-fiche",
    context:
      "$X$ est le rang du $r$-ième succès dans une suite d'épreuves de Bernoulli indépendantes de paramètre $p\\in\\,]0,1[$, avec $r\\ge1$.",
    question:
      "Donner le support, la loi, l'espérance et la variance de $X$.",
    hint:
      "$\\{X=k\\}$ : $r-1$ succès parmi les $k-1$ premières épreuves, puis un succès à la $k$-ième.",
    answer:
      "Support : $\\{r, r+1, \\ldots\\}$, et $\\mathbb{P}(X=k) = \\binom{k-1}{r-1} p^r(1-p)^{k-r}$. $\\mathbb{E}[X] = r/p$ et $\\mathrm{Var}(X) = r(1-p)/p^2$. $X$ est la somme de $r$ variables indépendantes de loi $\\mathrm{G}(p)$.",
    remark: "Pour $r=1$, on retrouve la loi géométrique. On l'appelle aussi loi de Pascal.",
    source: "Loi classique",
  },
];
