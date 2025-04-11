"use client";

import { useTheme } from "../app/ThemeContext";
import { CSSProperties } from "react"; // Импорт нэмнэ

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();

  const colors = [
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
          onClick={() => setThemeColor(color.name as any)} // Энд 'as any' хэрэггүй, төрөл зөв
        />
      ))}
    </div>
  );
}