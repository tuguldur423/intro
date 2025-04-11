"use client";

import { useTheme } from "../app/ThemeContext";
import { CSSProperties } from "react";

// ThemeColor төрлийг ThemeContext-ээс импортлох эсвэл энд тодорхойлох
type ThemeColor = 'theme-orange' | 'theme-blue' | 'theme-purple' | 'theme-green' | 'theme-red';

interface Color {
  name: ThemeColor; // ThemeColor төрлийг ашиглана
  value: string;
}

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();

  const colors: Color[] = [
    { name: "theme-orange", value: "#f97316" },
    { name: "theme-blue", value: "#0000ff" },
    { name: "theme-purple", value: "#ff00ff" },
    { name: "theme-green", value: "#00ff00" },
    { name: "theme-red", value: "#ff0000" },
  ];

  return (
    <div className="flex space-x-2">
      {colors.map((color) => (
        <button
          key={color.name}
          style={{ backgroundColor: color.value } as CSSProperties}
          className={`w-6 h-6 rounded-full border-2 ${
            themeColor === color.name ? "border-white" : "border-transparent"
          }`}
          onClick={() => setThemeColor(color.name)} // Одоо төрлийн алдаа гарахгүй
        />
      ))}
    </div>
  );
}