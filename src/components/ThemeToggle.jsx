import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

/**
 * ThemeToggle — a compact Sun/Moon button that switches the global theme.
 * Accepts an optional `className` for positional overrides.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) {
    return <div className={`fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl ${className}`.trim()} />;
  }

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        fixed bottom-30 md:bottom-25 right-6 z-[9999] flex items-center justify-center w-10 h-10 rounded-full
        border border-[var(--border-subtle)]
        bg-[var(--bg-card)]
        text-[var(--text-primary)]
        shadow-xl
        hover:border-[#2AB182]
        hover:text-[#2AB182]
        transition-all duration-300
        group
        ${className}
      `.trim()}
    >
      {/* Subtle glow ring on hover */}
      {/* <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_12px_rgba(42,177,130,0.35)]" /> */}

      {isDark
        ? <Sun size={16} strokeWidth={2} className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
        : <Moon size={16} strokeWidth={2} className="relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
      }
    </button>
  );
}
