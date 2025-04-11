"use client";

import Sidebar from '../components/Sidebar';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { useState, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

type Language = 'mn' | 'en';

interface Translations {
  [key: string]: {
    greeting: string;
    name: string;
    jobTitle1: string;
    jobTitle2: string;
    intro: string;
    button: string;
  };
}

export default function Home() {
  const { themeColorValue } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [jobTitle, setJobTitle] = useState<string>('Fullstack Programmer');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);

  const translations: Translations = {
    mn: {
      greeting: 'Сайн байна уу, миний нэр',
      name: 'Төгөлдөр',
      jobTitle1: 'Fullstack Программист',
      jobTitle2: 'Вэб Хөгжүүлэгч',
      intro: "Би вэб хөгжүүлэгч. Миний талаар илүү ихийг мэдмээр байна уу?",
      button: 'Миний талаар илүү ихийг',
    },
    en: {
      greeting: 'Hi my name is',
      name: 'Tuguldur',
      jobTitle1: 'Fullstack Programmer',
      jobTitle2: 'Web Developer',
      intro: "I'm a web developer. Want to know more about me?",
      button: 'More about me',
    },
  };

  const t = translations[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setJobTitle((prev) =>
          prev === t.jobTitle1 ? t.jobTitle2 : t.jobTitle1
        );
        setIsVisible(true);
        setKey((prev) => prev + 1);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, [language, t.jobTitle1, t.jobTitle2]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-black"></div>

      <Sidebar />

      <main className="ml-[250px] p-12 min-h-screen w-full flex justify-between items-center text-white relative z-10">
        <div className="max-w-lg">
          <h1 className="text-5xl mb-3">
            {t.greeting}{' '}
            <span style={{ color: themeColorValue }}>{t.name}</span>
          </h1>
          <h2 className="text-3xl mb-5 flex items-center">
            <span className="text-white font-semibold mr-2">
              {language === 'mn' ? 'Би' : "I'm a"}
            </span>
            <span
              key={key}
              className={`inline-block overflow-hidden whitespace-nowrap border-r-4 border-white animate-typing transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ minWidth: '250px' }}
            >
              {jobTitle}
            </span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">{t.intro}</p>
          <Link href="/about">
            <button
              style={{ backgroundColor: themeColorValue }}
              className="mt-8 px-8 py-3 text-white rounded-full text-base hover:bg-opacity-80 transition-colors"
            >
              {t.button}
            </button>
          </Link>
        </div>

        {/* Зураг + background гэрэл эффект */}
        <div className="flex justify-center mt-8 mr-12 relative">
          {/* Гэрэлтсэн дугуй background */}
          <div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[600px] rounded-none blur-2xl opacity-50 transition-colors duration-500 mr-[20px]"
  style={{ backgroundColor: themeColorValue }}
></div>

          {/* Зураг */}
          <Image
            src="/project/screenshot-1744269088837.png"
            alt="Static Image"
            width={370}
            height={400}
            className="object-cover rounded-lg z-10 relative shadow-lg mr-[20px]"
          />
        </div>
      </main>

      <div className="absolute top-15 right-4 z-20 flex flex-col items-end space-y-3">
        <div className="relative lang-dropdown">
          <button
            onClick={() => setShowLangDropdown((prev) => !prev)}
            className="text-white text-2xl p-2 hover:bg-gray-700 rounded-full"
          >
            <FiGlobe />
          </button>
          {showLangDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
              <button
                onClick={() => {
                  setLanguage('mn');
                  setShowLangDropdown(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  language === 'mn' ? 'font-bold bg-gray-200' : ''
                }`}
              >
                🇲🇳 Монгол
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setShowLangDropdown(false);
                }}
                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  language === 'en' ? 'font-bold bg-gray-200' : ''
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          )}
        </div>

        <div className="mt-1">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
