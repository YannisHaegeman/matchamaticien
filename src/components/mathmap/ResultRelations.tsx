import Link from "next/link";
import { RELATION_META, resultHref } from "@/lib/mathmap";
import { ResultTypeBadge } from "./ResultTypeBadge";
import { InlineMath } from "./InlineMath";
import type { ResolvedRelation, RelationType } from "@/types/mathmap";

function groupByType(relations: ResolvedRelation[]) {
  const map = new Map<RelationType, ResolvedRelation[]>();
  for (const entry of relations) {
    if (!entry.target) continue; // cible introuvable (id retiré) : on ignore proprement
    const list = map.get(entry.relation.type) ?? [];
    list.push(entry);
    map.set(entry.relation.type, list);
  }
  return map;
}

function RelationList({ items }: { items: ResolvedRelation[] }) {
  return (
    <ul className="space-y-2">
      {items.map(({ relation, target }) =>
        target ? (
          <li key={`${relation.type}-${target.id}`}>
            <Link
              href={resultHref(target)}
              className="card-relief group flex items-start gap-3 rounded-xl border border-border bg-bg-card px-4 py-3 transition hover:-translate-y-0.5 hover:border-matcha-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_-16px_rgba(26,19,68,0.35)]"
            >
              <ResultTypeBadge type={target.type} className="mt-0.5 shrink-0" />
              <span className="min-w-0">
                <span className="block font-serif text-[0.98rem] font-medium leading-snug text-ink group-hover:text-brand-strong">
                  <InlineMath text={target.title} />
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {target.themeTitle} · {target.subtopicTitle}
                  {relation.note ? (
                    <span className="italic"> — {relation.note}</span>
                  ) : null}
                </span>
              </span>
            </Link>
          </li>
        ) : null
      )}
    </ul>
  );
}

/**
 * Affiche, sous un résultat, deux ensembles de blocs :
 *  - les relations SORTANTES (déclarées par ce résultat : « Dépend de »,
 *    « Généralise »...) ;
 *  - les relations ENTRANTES, calculées automatiquement (« Utilisé dans
 *    la démonstration de »...) : c'est la navigation inverse.
 */
export function ResultRelations({
  outgoing,
  incoming,
}: {
  outgoing: ResolvedRelation[];
  incoming: ResolvedRelation[];
}) {
  const outGroups = groupByType(outgoing);
  const inGroups = groupByType(incoming);

  if (outGroups.size === 0 && inGroups.size === 0) return null;

  return (
    <div className="mt-10 space-y-8 border-t border-border pt-8">
      {Array.from(outGroups.entries()).map(([type, items]) => (
        <div key={`out-${type}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {RELATION_META[type].label}
          </p>
          <div className="mt-3">
            <RelationList items={items} />
          </div>
        </div>
      ))}

      {Array.from(inGroups.entries()).map(([type, items]) => (
        <div key={`in-${type}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-strong">
            {RELATION_META[type].inverseLabel}
          </p>
          <div className="mt-3">
            <RelationList items={items} />
          </div>
        </div>
      ))}
    </div>
  );
}
