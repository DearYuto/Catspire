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
    ref,
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
            "cursor-pointer rounded-lg font-bold transition-all duration-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
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
          "transform cursor-pointer rounded-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95",
          "disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50",
          {
            "px-3 text-sm": size === "sm",
            "px-6 text-base": size === "md",
            "px-8 text-lg": size === "lg",
          },
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
