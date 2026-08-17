import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({ children, className = "", variant = "primary", fullWidth = false, ...props }: ButtonProps) {
  return (
    <button
      className={`button button--${variant} ${fullWidth ? "button--full" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
