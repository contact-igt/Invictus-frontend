import React from 'react';

const InputField = ({ label, type, placeholder, required = false, id }) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-input' : undefined);
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={inputId} className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                required={required}
                aria-required={required}
                type={type}
                className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] focus-visible:ring-1 focus-visible:ring-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] placeholder-[#333]"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
