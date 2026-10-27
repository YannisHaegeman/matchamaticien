import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "matcha" | "espresso" | "gold" | "outline";
  className?: string;
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  matcha:
    "bg-matcha-600 text-on-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.15)]",
  espresso:
    "bg-espresso-600 text-on-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.15)]",
  gold: "bg-gold-500 text-on-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.12)]",
  outline: "border border-border text-ink-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
};

export function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
