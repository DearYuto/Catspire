import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "custom";
  size?: "sm" | "md" | "lg";
  unstyled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      disabled,
      unstyled = false,
      ...props
    },
    ref
  ) => {
    if (unstyled) {
      return (
        <button ref={ref} className={className} disabled={disabled} {...props}>
          {children}
        </button>
      );
    }

    if (variant === "custom") {
      return (
        <button
          ref={ref}
          className={clsx(
            "rounded-lg font-bold transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={clsx(
          "rounded-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
