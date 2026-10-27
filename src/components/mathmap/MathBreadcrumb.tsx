import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { InlineMath } from "./InlineMath";
import type { MathBreadcrumbItem } from "@/types/mathmap";

export function MathBreadcrumb({ items }: { items: MathBreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="flex flex-wrap items-center gap-1.5 text-sm text-muted"
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          {i > 0 ? (
            <ChevronRight className="h-3.5 w-3.5 text-border" aria-hidden="true" />
          ) : null}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-brand-strong">
              <InlineMath text={item.label} />
            </Link>
          ) : (
            <span className="font-medium text-ink">
              <InlineMath text={item.label} />
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
