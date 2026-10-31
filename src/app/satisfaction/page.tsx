import type { Metadata } from "next";
import { getAllSatisfactionReels, getSatisfactionSeries } from "@/lib/satisfaction";
import { ReelsGallery } from "@/components/satisfaction/ReelsGallery";

export const metadata: Metadata = {
  title: "Espace satisfaction",
  description:
    "Une galerie de reels de révision — algèbre linéaire, en version courte et animée, pour le plaisir de voir les notions s'assembler.",
};

export default function SatisfactionPage() {
  const series = getSatisfactionSeries();
  const reels = getAllSatisfactionReels();

  return (
    <div className="relative overflow-hidden bg-[#121317]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,105,210,0.22) 0%, rgba(124,105,210,0) 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(242,171,36,0.14) 0%, rgba(242,171,36,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#a79ae8]">
          Pour le plaisir
        </p>
        <h1 className="mt-3 font-serif text-[2.1rem] font-extrabold text-white sm:text-[2.6rem]">
          Espace satisfaction
        </h1>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-white/65">
          Quatorze reels d&rsquo;algèbre linéaire, courts et animés — une notion à la fois,
          pour le plaisir de regarder les idées s&rsquo;enchaîner. Clique sur une vignette pour lancer la lecture.
        </p>

        <div className="mt-10">
          <ReelsGallery series={series} reels={reels} />
        </div>
      </div>
    </div>
  );
}
