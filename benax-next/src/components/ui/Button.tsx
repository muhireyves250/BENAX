"use client";

import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<
    HTMLMotionProps<"button">,
    "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver"
  > {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-headline font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary hover:bg-primary/95 text-on-primary dark:bg-inverse-primary dark:hover:bg-inverse-primary/90 dark:text-primary focus:ring-primary shadow-sm",
    secondary:
      "bg-secondary hover:bg-secondary/90 text-on-secondary focus:ring-secondary",
    tertiary:
      "bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container focus:ring-secondary-container",
    outline:
      "border border-outline hover:bg-surface-container-low dark:border-slate-700 text-primary dark:text-primary-fixed-dim focus:ring-outline",
    text: "text-primary hover:bg-surface-container-low dark:text-primary-fixed-dim focus:ring-transparent",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-[length:var(--text-label-sm)]",
    md: "px-5 py-2.5 text-[length:var(--text-label-md)]",
    lg: "px-7 py-3 text-[length:var(--text-label-md)] md:text-[length:var(--text-body-lg)]",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-1.5 flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-1.5 flex items-center">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;
