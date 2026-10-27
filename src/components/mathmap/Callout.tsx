import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutVariant = "definition" | "theorem" | "example" | "warning";

interface VariantStyle {
  wrapper: string;
  iconWrap: string;
  label: string;
}

const VARIANT_STYLES: Record<CalloutVariant, VariantStyle> = {
  definition: {
    wrapper: "border-matcha-500/25 bg-matcha-500/10",
    iconWrap: "bg-matcha-600 text-on-brand",
    label: "text-matcha-700",
  },
  theorem: {
    wrapper: "border-gold-500/30 bg-gold-500/10",
    iconWrap: "bg-gold-500 text-on-brand",
    label: "text-gold-600",
  },
  example: {
    wrapper: "border-espresso-500/25 bg-espresso-500/10",
    iconWrap: "bg-espresso-600 text-on-brand",
    label: "text-espresso-700",
  },
  warning: {
    wrapper: "border-dashed border-ink/20 bg-cream-deep",
    iconWrap: "bg-espresso-700 text-on-brand",
    label: "text-espresso-700",
  },
};

/**
 * Encadré générique utilisé pour présenter l'énoncé d'un résultat de la
 * Carte des maths (voir ResultCallout) : une couleur/texture par famille
 * de résultat (définition, théorème, exemple, contre-exemple), sans
 * introduire de nouvelle couleur en dehors de la palette matcha /
 * espresso / gold déjà définie dans globals.css.
 */
export function Callout({
  variant,
  title,
  icon: Icon,
  children,
  className,
}: {
  variant: CalloutVariant;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={cn(
        "not-prose my-8 rounded-2xl border px-6 py-6",
        styles.wrapper,
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
              styles.iconWrap
            )}
          >
            <Icon className="h-[15px] w-[15px]" strokeWidth={2} />
          </span>
        ) : null}
        <p className={cn("font-serif text-[1.02rem] font-semibold", styles.label)}>
          {title}
        </p>
      </div>
      <div className="mt-3 space-y-4 text-[1.02rem] leading-[1.75] text-ink-soft [&_.katex-display]:my-4">
        {children}
      </div>
    </div>
  );
}
