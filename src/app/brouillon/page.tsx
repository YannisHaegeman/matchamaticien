import type { Metadata } from "next";
import Link from "next/link";
import { MonitorSmartphone } from "lucide-react";
import { Notebook } from "@/components/brouillon/Notebook";

export const metadata: Metadata = {
  title: "Cahier de brouillon",
  description:
    "Un brouillon en double page, plein écran, avec rendu LaTeX en direct — exactement comme le mode copie d'examen, mais sans exercice : juste de la place pour chercher.",
};

export default function BrouillonPage() {
  return (
    <>
      <div className="hidden lg:block">
        <Notebook />
      </div>

      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center lg:hidden">
        <MonitorSmartphone className="h-10 w-10 text-ink-soft" strokeWidth={1.6} />
        <h1 className="font-serif text-[1.4rem] font-bold text-ink">Cahier de brouillon</h1>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Cette fonctionnalité est pensée pour un grand écran (double page, plein écran) — ouvre cette page depuis un
          ordinateur pour l&rsquo;utiliser.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-brand-soft px-5 py-2.5 text-[14px] font-semibold text-brand-strong hover:opacity-80"
        >
          Retour à l&rsquo;accueil
        </Link>
      </div>
    </>
  );
}
