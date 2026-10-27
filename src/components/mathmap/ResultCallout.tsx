import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Callout, type CalloutVariant } from "./Callout";
import { MathContent } from "./MathContent";
import { RESULT_TYPE_META } from "@/lib/mathmap";
import type { MathResult } from "@/types/mathmap";

const VARIANT_BY_TYPE: Record<MathResult["type"], CalloutVariant> = {
  definition: "definition",
  proposition: "theorem",
  lemme: "theorem",
  theoreme: "theorem",
  corollaire: "theorem",
  exemple: "example",
  "contre-exemple": "warning",
};

/** Énoncé d'un résultat, rendu avec le même habillage que les articles. */
export function ResultCallout({ result }: { result: MathResult }) {
  const meta = RESULT_TYPE_META[result.type];
  const Icon = (Icons[meta.icon as keyof typeof Icons] ??
    Icons.Sparkles) as LucideIcon;

  return (
    <Callout
      variant={VARIANT_BY_TYPE[result.type]}
      title={`${meta.label} — ${result.title}`}
      icon={Icon}
    >
      <MathContent source={result.statement} />
    </Callout>
  );
}
