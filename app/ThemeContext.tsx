"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeColor = 'theme-orange' | 'theme-blue' | 'theme-purple' | 'theme-green' | 'theme-red';

interface ThemeContextType {
  themeColor: ThemeColor;
  themeColorValue: string; 
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('theme-orange');

  const themeColorValue = {
    'theme-orange': '#f97316',
    'theme-blue': '#0000ff',
    'theme-purple': '#ff00ff',
    'theme-green': '#00ff00',
    'theme-red': '#ff0000',
  }[themeColor];

  return (
    <ThemeContext.Provider value={{ themeColor, themeColorValue, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};