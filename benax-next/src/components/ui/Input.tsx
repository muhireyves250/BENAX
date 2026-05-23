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
      <div className="w-full flex flex-col gap-1 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[length:var(--text-label-sm)] font-semibold uppercase tracking-wider text-secondary dark:text-slate-400"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-xl">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`block w-full rounded-xl border text-[length:var(--text-body-md)] transition-all duration-200 ${
              leftIcon ? "pl-10" : "pl-3.5"
            } pr-3.5 py-2.5 bg-white dark:bg-slate-900 ${
              error
                ? "border-error text-error placeholder-error/60 focus:outline-none focus:ring-1 focus:ring-error focus:border-error dark:text-rose-200"
                : "border-outline-variant dark:border-slate-800 text-on-surface dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-inverse-primary dark:focus:border-inverse-primary"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-error dark:text-rose-400 flex items-center gap-1 mt-0.5 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-error" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-secondary dark:text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
