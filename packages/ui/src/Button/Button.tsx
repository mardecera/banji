import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-transparent bg-accent text-accent-foreground hover:opacity-90",
  secondary: "border border-border bg-transparent text-foreground hover:bg-border/20",
  ghost: "border border-transparent bg-transparent text-foreground hover:bg-border/20",
};

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
