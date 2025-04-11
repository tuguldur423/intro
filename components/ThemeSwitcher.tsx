// components/ThemeSwitcher.tsx
"use client";

import { useState } from 'react';
import { useTheme } from '../app/ThemeContext';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const { setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'theme-red', value: '#ff0000' },
    { name: 'theme-orange', value: '#f97316' },
    { name: 'theme-green', value: '#00ff00' },
    { name: 'theme-blue', value: '#0000ff' },
    { name: 'theme-purple', value: '#ff00ff' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
      >
        <FaPalette size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-white text-sm mb-2">Theme Colors</h3>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setThemeColor(color.name as any);
                  setIsOpen(false);
                }}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;