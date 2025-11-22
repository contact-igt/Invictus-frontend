import React from 'react';

const SelectField = ({ label, defaultValue, options }) => (
    <div className="space-y-2 relative">
        <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">{label}</label>
        <select defaultValue={defaultValue} className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white appearance-none rounded-none cursor-pointer">
            {options.map(option => (
                <option key={option} value={option} className="bg-[#1A1A1A] text-white">{option}</option>
            ))}
        </select>
        <div className="absolute right-0 bottom-4 pointer-events-none text-[#888]">▼</div>
    </div>
);

export default SelectField;
