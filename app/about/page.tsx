"use client";

import Sidebar from '../../components/Sidebar';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext'; 

interface Translations {
  [key: string]: {
    title: string;
    intro: string;
    birthday: string;
    email: string;
    age: string;
    phone: string;
    educationTitle: string;
    expTitle: string;
    education: { date: string; title: string; desc: string }[];
    experience: { date: string; title: string; desc: string }[];
  };
}

export default function About() {
  const { themeColorValue } = useTheme();
  const { language } = useLanguage();

  const translations: Translations = {
    mn: {
      title: 'Миний тухай',
      intro:
        'Би 2005 онд Хэнтий аймгийн Норовлин суманд төрсөн. Аав, ээж, дүү нарын хамт амьдардаг айлын том хүү. Аав, ээж маань малчин тул багаасаа хөдөө өссөн. 2011 оноос сургуульд суралцаж эхэлсэн. Одоогоор full-stack програмист болохоор хичээж байгаа.',
      birthday: 'Төрсөн өдөр',
      email: 'И-мэйл',
      age: 'Нас',
      phone: 'Утас',
      educationTitle: 'БОЛОВСРОЛ',
      expTitle: 'АЖЛЫН ТУРШЛАГА',
      education: [
        {
          date: '2011 - 2023',
          title: 'Компьютерын ухааны бакалавр',
          desc:
            'Би 2011 онд Хэнтий аймгийн Тэмүжин цогцолбор сургуульд 1–3-р анги хүртэл суралцаж байгаад Хэрлэн 4-р сургууль руу шилжин тэндээ бүрэн дунд боловсрол эзэмшиж, 2023 онд төгссөн.',
        },
        {
          date: '2023 - 2025',
          title: 'Компьютерын ухааны бакалавр',
          desc:
            'Би 2023 онд оюутан болж Соёл-Эрдэм дээд сургуульд япон хэлээр суралцаж эхэлсэн бөгөөд 2024 онд Indra Cyber Institute-д full-stack програмистаар суралцаж, 2025 онд төгссөн.',
        },
      ],
      experience: [
        {
          date: '2024 - 2025',
          title: 'Программист',
          desc:
            'Одоогоор ажлын байранд ажиллаж үзээгүй ч олон проектийг бие даан хийсэн. Ерөнхий сайт болон хэлнүүд хэрхэн, яаж ажилладгийг сайн мэддэг болсон.',
        },
        {
          date: '2024 - 2025',
          title: 'Программист',
          desc:
            'Гэхдээ одоо бол сайн туршлага хуримтлуулж, илүү үр бүтээл гаргахыг хүсэж байна. Мөн өөрийгөө ч гэсэн сайн хөгжүүлж, аливаа ажлын байранд гологдохооргүй болохыг зорьж байна.',
        },
      ],
    },
    en: {
      title: 'About Me',
      intro:
        "I was born in 2005 in Norovlin soum, Khentii province. I'm the eldest son in a herder's family living with my parents and siblings. Because of that, I grew up in the countryside. I started school in 2011 and am currently striving to become a full-stack programmer.",
      birthday: 'Birthday',
      email: 'Email',
      age: 'Age',
      phone: 'Phone',
      educationTitle: 'EDUCATION',
      expTitle: 'EXPERIENCE',
      education: [
        {
          date: '2011 - 2023',
          title: 'Bachelor in Computer Science',
          desc:
            'From 2011 to 3rd grade, I studied at Temuujin Complex School in Khentii, then transferred to Kherlen 4th school where I completed my secondary education and graduated in 2023.',
        },
        {
          date: '2023 - 2025',
          title: 'Bachelor in Computer Science',
          desc:
            'In 2023, I enrolled at Soyol-Erdem University studying Japanese, and in 2024, I joined Indra Cyber Institute to study full-stack development, graduating in 2025.',
        },
      ],
      experience: [
        {
          date: '2024 - 2025',
          title: 'Programmer',
          desc:
            'Although I haven’t worked officially, I’ve completed many projects independently and have a good understanding of how websites and languages work.',
        },
        {
          date: '2024 - 2025',
          title: 'Programmer',
          desc:
            'Now I’m looking to gain solid experience, improve productivity, and develop myself to a level where I’ll be confident and competitive in any job environment.',
        },
      ],
    },
  };

  const t = translations[language];

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[250px] p-12 min-h-screen w-full text-white flex flex-col">
        <h1 className="text-5xl mb-2 relative">{t.title}</h1>
        <div>
          <div className="h-1 w-24 mb-1" style={{ backgroundColor: themeColorValue }}></div>
          <div className="h-1 w-12" style={{ backgroundColor: themeColorValue }}></div>
        </div>
        <p className="text-gray-400 text-base mt-2 mb-12">{t.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold">{t.birthday}: <span className="text-gray-400">2005-04-23</span></h3>
            <h3 className="text-lg font-semibold mt-4">{t.email}: <span className="text-gray-400">buyndelgertuguldur@gmail.com</span></h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t.age}: <span className="text-gray-400">20</span></h3>
            <h3 className="text-lg font-semibold mt-4">{t.phone}: <span className="text-gray-400">95833143</span></h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section */}
          <div>
            <h2 style={{ color: themeColorValue }} className="text-3xl mb-8">{t.educationTitle}</h2>
            <div className="relative">
              <div style={{ backgroundColor: themeColorValue }} className="absolute left-4 top-0 h-full w-0.5"></div>
              <div className="space-y-8">
                {t.education.map((edu, index) => (
                  <div className="relative" key={index}>
                    <div style={{ backgroundColor: themeColorValue }} className="absolute left-2 w-4 h-4 rounded-full"></div>
                    <div className="ml-10">
                      <p className="text-gray-400">{edu.date}</p>
                      <h3 className="text-lg font-semibold">{edu.title}</h3>
                      <p className="text-gray-400">{edu.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 style={{ color: themeColorValue }} className="text-3xl mb-8">{t.expTitle}</h2>
            <div className="relative">
              <div style={{ backgroundColor: themeColorValue }} className="absolute left-4 top-0 h-full w-0.5"></div>
              <div className="space-y-8">
                {t.experience.map((exp, index) => (
                  <div className="relative" key={index}>
                    <div style={{ backgroundColor: themeColorValue }} className="absolute left-2 w-4 h-4 rounded-full"></div>
                    <div className="ml-10">
                      <p className="text-gray-400">{exp.date}</p>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="text-gray-400">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
