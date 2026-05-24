"use client";

import React, { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className = "", id, ...props }, ref) => {
    const auto = useId();
    const inputId = id || auto;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-faint)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--color-text-faint)]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`block w-full rounded-full border bg-[var(--color-bg-2)] text-sm text-[var(--color-text)] transition-colors duration-150 placeholder:text-[var(--color-text-faint)] ${
              leftIcon ? "pl-10" : "pl-4"
            } pr-4 py-2.5 ${
              error
                ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:outline-none"
                : "border-[var(--color-border-soft)] focus:border-[var(--color-accent)] focus:outline-none"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[var(--color-error)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-error)]" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[var(--color-text-faint)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
