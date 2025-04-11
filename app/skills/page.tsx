"use client";

import Sidebar from '../../components/Sidebar';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { useState, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';

type Language = 'mn' | 'en';

interface Translations {
  [key: string]: {
    title: string;
    intro: string;
    skills: {
      htmlCss: string;
      nextJs: string;
      javascript: string;
      mongoDb: string;
      python: string;
      typescript: string;
      mysql: string;
      react: string;
    };
  };
}

export default function Skills() {
  const { themeColorValue } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);

  const translations: Translations = {
    mn: {
      title: 'Ур чадвар',
      intro:
        'Би анх 4 настайгаасаа шатар даамын дугуйланд явж, хичээллэж эхэлсэн. Аймаг, улсын чанартай тэмцээнүүдээс байр эзэлж байсан. 12 настайгаасаа сагсан бөмбөгөөр хичээллэж олон уралдаан тэмцээнд оролцож байсан. Мөн математик болон сэтгэх чадварын олимпиадад аймаг, улсаас шагналт байранд орсон. Одоогоор би fullstack программист болох гэж сурч байна, мөн энэ доор би өөрийн сурсан зүйлсээ өөрөө дүгнэж хувилж гаргасан байгаа.',
      skills: {
        htmlCss: 'HTML CSS',
        nextJs: 'Next.js',
        javascript: 'Javascript',
        mongoDb: 'MongoDB',
        python: 'Python',
        typescript: 'Typescript',
        mysql: 'MySql',
        react: 'React',
      },
    },
    en: {
      title: 'Skills',
      intro:
        'I started playing chess and checkers at the age of 4, participating in local and national competitions and winning prizes. From the age of 12, I began playing basketball and took part in various tournaments. I also won awards in mathematics and critical thinking Olympiads at both local and national levels. Currently, I am learning to become a fullstack programmer, and below, I have evaluated and listed the skills I have acquired.',
      skills: {
        htmlCss: 'HTML CSS',
        nextJs: 'Next.js',
        javascript: 'Javascript',
        mongoDb: 'MongoDB',
        python: 'Python',
        typescript: 'Typescript',
        mysql: 'MySql',
        react: 'React',
      },
    },
  };

  const t = translations[language];

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
    <div className="flex min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-black z-0"></div>

      <Sidebar />

      <main className="ml-[250px] p-12 min-h-screen w-full text-white flex flex-col relative z-10">
        <div className="mb-12">
          <h1 className="text-5xl mb-2 relative w-fit">
            {t.title}
          </h1>
          <div
            className="h-1 w-24 mb-1"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <div
            className="h-1 w-12"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <p className="text-gray-400 text-base mt-2">{t.intro}</p>
        </div>

        {/* Skill bars section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-30 w-full max-w-4xl ml-[100px]">
          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.htmlCss}</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '85%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.nextJs}</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '80%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.javascript}</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '80%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.mongoDb}</span>
              <span>83%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '83%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.python}</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '78%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.typescript}</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '80%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.mysql}</span>
              <span>90%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '90%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>{t.skills.react}</span>
              <span>90%</span>
            </div>
            <div className="w-full bg-gray-600 h-2 rounded">
              <div
                style={{ backgroundColor: themeColorValue, width: '90%' }}
                className="h-2 rounded"
              ></div>
            </div>
          </div>
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
      </div>
    </div>
  );
}