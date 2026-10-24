import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function FloatingInput({
    label,
    id,
    name,
    type = 'text',
    className,
    containerClassName,
    error,
    touched,
    required = false,
    value,
    defaultValue,
    onFocus,
    onBlur,
    onChange,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    // Determine if input has value from controlled value or internal value
    const isControlled = value !== undefined && value !== null;
    const currentVal = isControlled ? value : internalValue;
    const hasValue = Boolean(currentVal !== '' && currentVal !== undefined && currentVal !== null);

    const inputId = id || (name ? `${name}-input` : label ? `${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}-input` : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const hasError = Boolean(touched && error);

    const handleFocus = (e) => {
        setFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        setFocused(false);
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        if (onBlur) onBlur(e);
    };

    const handleChange = (e) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        if (onChange) onChange(e);
    };

    const isFloating = focused || hasValue;

    return (
        <div className={cn("space-y-1.5", containerClassName)}>
            <div className="relative">
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={isControlled ? value : undefined}
                    defaultValue={!isControlled ? defaultValue : undefined}
                    placeholder=" "
                    required={required}
                    aria-required={required}
                    aria-invalid={hasError}
                    aria-describedby={hasError && errorId ? errorId : undefined}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={cn(
                        "peer w-full px-4 py-3.5 rounded-lg bg-transparent font-body text-base text-[var(--text-primary)] outline-none transition-all duration-200",
                        "border border-[var(--border-subtle)] focus:border-[#2AB182] focus:ring-1 focus:ring-[#2AB182]",
                        hasError && "border-red-500/80 focus:border-red-500 focus:ring-red-500/50",
                        className
                    )}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        "absolute left-4 top-3.5 text-[var(--text-muted)] font-body text-base transition-all duration-200 pointer-events-none select-none",
                        "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1.5 peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-[#2AB182] peer-focus:bg-[var(--bg-primary)]",
                        isFloating && "-top-2.5 left-3 text-xs px-1.5 font-semibold tracking-wider uppercase bg-[var(--bg-primary)]",
                        isFloating && !focused && "text-[var(--text-muted)]",
                        focused && "text-[#2AB182]",
                        hasError && !focused && isFloating && "text-red-400"
                    )}
                >
                    {label}
                </label>
            </div>
            {hasError && (
                <small id={errorId} role="alert" className="block font-body text-[13px] text-red-500 mt-1 pl-1">
                    {error}
                </small>
            )}
        </div>
    );
}

export default FloatingInput;
