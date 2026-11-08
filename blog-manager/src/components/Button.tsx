import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark hover:text-white",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white " +
    "dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900",
  danger: "bg-danger text-white hover:bg-red-700 hover:text-white",
  success: "bg-success text-white hover:bg-green-700 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  to?: string; // si fourni, rend un <Link> au lieu d'un <button>
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  to,
  className = "",
  children,
  disabled,
  type = "button",
  ...rest
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}