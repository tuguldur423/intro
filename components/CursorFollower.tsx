'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../app/ThemeContext'; 

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { themeColorValue } = useTheme(); 

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-8 h-8 rounded-full border-2 border-gray-700
                 flex items-center justify-center transition-transform duration-75 ease-linear"
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
      }}
    >
      <div
        className="w-2 h-2 rounded-full opacity-90 shadow-md"
        style={{ backgroundColor: themeColorValue }}
      />
    </div>
  );
};

export default CursorFollower;
