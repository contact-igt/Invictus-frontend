import React from 'react';

const SelectField = ({ label, defaultValue, options }) => (
    <div className="space-y-2 relative">
        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">{label}</label>
        <select defaultValue={defaultValue} className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] appearance-none rounded-none cursor-pointer">
            {options.map(option => (
                <option key={option} value={option} className="bg-[var(--bg-card)] text-[var(--text-primary)]">{option}</option>
            ))}
        </select>
        <div className="absolute right-0 bottom-4 pointer-events-none text-[var(--text-muted)]">▼</div>
    </div>
);

export default SelectField;
