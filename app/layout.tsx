// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import CursorFollower from '@/components/CursorFollower';

export const metadata = {
  title: 'Tuguldur Portfolio',
  description: 'Portfolio website of Tuguldur',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#1a1a1a]">
        <LanguageProvider>
          <ThemeProvider>
            <CursorFollower />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
