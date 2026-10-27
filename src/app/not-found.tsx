import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
        <FlaskConical className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <h1 className="mt-6 font-serif text-[2rem] font-semibold text-ink sm:text-[2.4rem]">
        Cette fiole est vide
      </h1>
      <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
        La page que vous cherchez n&rsquo;existe pas, ou a changé d&rsquo;adresse.
        Retournez explorer la carte des maths, le temps que la formule opère.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/carte-des-maths">Voir la carte des maths</Button>
        <Button href="/" variant="secondary">
          Retour à l&rsquo;accueil
        </Button>
      </div>
    </div>
  );
}
