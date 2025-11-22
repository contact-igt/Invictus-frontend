import React from 'react';

const InputField = ({ label, type, placeholder, required = false }) => (
    <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-[#888] font-bold font-body">{label}</label>
        <input required={required} type={type} className="w-full bg-transparent border-b border-[#333] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-white placeholder-[#333]" placeholder={placeholder} />
    </div>
);

export default InputField;
