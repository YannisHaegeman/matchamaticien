import { Leaf, Timer, BookOpenText } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Distillé lentement",
    text: "Pas de raccourci ni de par-cœur : chaque idée est amenée pas à pas, jusqu'à ce qu'elle ait du sens.",
  },
  {
    icon: BookOpenText,
    title: "Écrit comme un magazine",
    text: "Une mise en page pensée pour la lecture, avec des encadrés, des exemples et de vraies démonstrations.",
  },
  {
    icon: Timer,
    title: "Fait pour durer 20 minutes",
    text: "Le temps d'une transmutation : assez pour vraiment comprendre, pas juste survoler.",
  },
];

export function Manifesto() {
  return (
    <section className="border-y border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
            Le concept
          </p>
          <h2 className="mt-3 font-serif text-[1.9rem] font-semibold leading-tight text-ink sm:text-[2.3rem]">
            Un laboratoire pour l&rsquo;esprit
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
            Dans le laboratoire d&rsquo;un alchimiste, on prend le temps :
            peser, observer, recommencer jusqu&rsquo;à ce que la matière se
            transforme. L&rsquo;Alchimie des Nombres applique la même
            philosophie aux mathématiques. On ne cherche pas la formule la
            plus rapide, on cherche la compréhension qui reste.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-bg-card p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <Icon className="h-[16px] w-[16px]" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-serif text-[1.05rem] font-semibold text-ink">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
