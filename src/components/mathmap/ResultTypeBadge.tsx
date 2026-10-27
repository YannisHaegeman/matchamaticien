import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { RESULT_TYPE_META } from "@/lib/mathmap";
import type { ResultType, MathAccent } from "@/types/mathmap";

const PROVABLE: ResultType[] = ["theoreme", "proposition", "lemme", "corollaire"];

/**
 * Petit badge type + icône pour un résultat (théorème, définition...).
 * Les résultats de la famille « théorème » reprennent la couleur du
 * thème (accent) pour bien les distinguer visuellement ; les autres
 * types restent neutres.
 */
export function ResultTypeBadge({
  type,
  accent,
  className,
}: {
  type: ResultType;
  accent?: MathAccent;
  className?: string;
}) {
  const meta = RESULT_TYPE_META[type];
  const Icon = (Icons[meta.icon as keyof typeof Icons] ??
    Icons.Sparkles) as LucideIcon;
  const variant = accent && PROVABLE.includes(type) ? accent : "outline";

  return (
    <Badge variant={variant} className={className}>
      <Icon className="h-3 w-3" strokeWidth={2.25} />
      {meta.label}
    </Badge>
  );
}
