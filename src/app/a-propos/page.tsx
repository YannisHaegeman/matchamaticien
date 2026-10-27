import type { Metadata } from "next";
import { Leaf, BookOpenText, FlaskConical, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'Alchimie des Nombres est une carte conceptuelle des mathématiques de l'agrégation, pensée comme un laboratoire pour l'esprit : rigueur académique et émerveillement.",
};

const values = [
  {
    icon: Leaf,
    title: "La lenteur comme méthode",
    text: "Comprendre prend du temps. Chaque résultat est amené pas à pas, pas juste énoncé en diagonale.",
  },
  {
    icon: BookOpenText,
    title: "La rigueur, sans jargon inutile",
    text: "Les démonstrations sont réelles et complètes, mais toujours accompagnées d'une intuition avant la formalisation.",
  },
  {
    icon: FlaskConical,
    title: "Une identité assumée",
    text: "L'alchimie n'est pas un gadget : c'est une manière de penser l'apprentissage comme une transformation plutôt qu'une corvée.",
  },
  {
    icon: Sparkles,
    title: "Une carte qui vit",
    text: "La carte est pensée pour grandir régulièrement : nouveaux thèmes, nouveaux résultats, connexions enrichies au fil du temps.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-cream-deep py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
            À propos
          </p>
          <h1 className="mt-3 font-serif text-[2.2rem] font-semibold leading-tight text-ink sm:text-[2.8rem]">
            Un laboratoire pour les mathématiques
          </h1>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-muted">
            L&rsquo;Alchimie des Nombres est née d&rsquo;une conviction
            simple : les mathématiques méritent d&rsquo;être racontées avec
            autant de soin qu&rsquo;une transmutation est menée. Pas
            d&rsquo;impatience, pas de raccourci — juste le temps qu&rsquo;il
            faut pour que les idées prennent forme.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-soft">
          <p>
            Tout est parti d&rsquo;un constat : la plupart des ressources de
            mathématiques en ligne sont soit trop scolaires — des cours secs
            qui empilent les définitions — soit trop superficielles, qui
            survolent une idée sans jamais la démontrer vraiment.
            L&rsquo;Alchimie des Nombres essaie de tenir les deux bouts : la
            rigueur d&rsquo;un vrai cours, la clarté d&rsquo;une carte
            qu&rsquo;on peut explorer dans l&rsquo;ordre qu&rsquo;on veut.
          </p>
          <p>
            Le nom du site vient de cette image : l&rsquo;alchimiste qui
            transforme la matière brute en quelque chose de précieux, avec
            patience et méthode. Les mathématiques fonctionnent pareil — on
            part d&rsquo;un énoncé opaque, et à force de rigueur et de
            petites transformations, on arrive à une compréhension qui, elle,
            ne s&rsquo;oublie pas.
          </p>
          <p>
            La Carte des maths relie les thèmes aux sous-thèmes, puis aux
            théorèmes et à leurs démonstrations, avec un graphe de
            dépendances pour voir comment chaque résultat s&rsquo;appuie sur
            les autres. Les formules sont rendues proprement grâce à KaTeX,
            pour que lire des mathématiques sur un écran reste un plaisir
            plutôt qu&rsquo;une corvée visuelle.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-bg-card p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-serif text-[1.05rem] font-semibold text-ink">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center rounded-3xl border border-matcha-200 bg-matcha-50 px-6 py-12 text-center">
          <h2 className="font-serif text-[1.6rem] font-semibold text-matcha-900">
            Une idée de thème ou de résultat ?
          </h2>
          <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-matcha-800">
            La carte est conçue pour grandir en continu. Un théorème, une
            démonstration, une connexion que vous aimeriez y voir ? Elle
            rejoindra bientôt une nouvelle bulle.
          </p>
          <div className="mt-6">
            <Button href="/carte-des-maths" variant="primary">
              Explorer la carte des maths
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
