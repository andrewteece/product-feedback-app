'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const isDark = saved === 'dark' || (!saved && systemPrefersDark);

    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode === null) return;
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  if (darkMode === null) return null; // avoids flicker

  return (
    <button
      onClick={toggleTheme}
      className='text-2xl p-2 hover:scale-105 transition'
      aria-label='Toggle theme'
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
