import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition-all duration-150";

/**
 * Le variant "primary" reprend le bouton "3D" des flash cards : dégradé
 * rouge coquelicot, surbrillance interne, et une "tranche" (ombre
 * décalée) qui s'efface au clic pour simuler un bouton qu'on enfonce.
 * Voir .btn-3d dans globals.css pour les états hover/active.
 */
const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "btn-3d border-none bg-[linear-gradient(180deg,var(--color-accent-top)_0%,var(--color-accent)_100%)] text-on-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.12),0_5px_0_var(--color-accent-edge),0_16px_24px_-10px_rgba(0,0,0,0.4)] [text-shadow:0_1px_0_rgba(0,0,0,0.12)]",
  secondary:
    "border border-ink/15 bg-bg-card/70 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_16px_-10px_rgba(0,0,0,0.3)] hover:border-brand hover:text-brand-strong hover:bg-brand-soft/60",
  ghost: "text-brand-strong hover:bg-brand-soft",
};

const sizes: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.95rem]",
  lg: "min-h-12 px-7 py-3.5 text-[1.02rem]",
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
