"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaFolder, FaTools, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../app/ThemeContext";
import { useLanguage } from "../app/LanguageContext";

// Хэлний төрөл
type Language = "mn" | "en";

// Орчуулгын объект
interface Translations {
  [key: string]: {
    home: string;
    about: string;
    project: string;
    skills: string;
    contact: string;
  };
}

const Sidebar = () => {
  const { themeColorValue } = useTheme();
  const { language } = useLanguage();
  const pathname = usePathname();

  const translations: Translations = {
    mn: {
      home: "Нүүр",
      about: "Миний тухай",
      project: "Төслүүд",
      skills: "Ур чадвар",
      contact: "Холтбоо барих",
    },
    en: {
      home: "Home",
      about: "About",
      project: "Project",
      skills: "Skills",
      contact: "Contact",
    },
  };

  const t = translations[language];

  const navLinks = [
    { href: "/", label: t.home, icon: <FaHome /> },
    { href: "/about", label: t.about, icon: <FaUser /> },
    { href: "/project", label: t.project, icon: <FaFolder /> },
    { href: "/skills", label: t.skills, icon: <FaTools /> },
    { href: "/contact", label: t.contact, icon: <FaEnvelope /> },
  ];

  return (
    <div className="w-[250px] h-screen bg-[#222] text-white fixed top-0 left-0 p-5 flex flex-col animate-slide-in">
      {/* Logo with glowing border */}
      <div className="text-center relative">
        <h1
          className="text-2xl p-2 relative font-bold"
          style={{
            boxShadow: `0 0 12px ${themeColorValue}`,
            transition: "box-shadow 0.3s ease",
          }}
        >
          Tuguldur
          <span
            style={{ borderColor: themeColorValue }}
            className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
          ></span>
          <span
            style={{ borderColor: themeColorValue }}
            className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2"
          ></span>
          <span
            style={{ borderColor: themeColorValue }}
            className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2"
          ></span>
          <span
            style={{ borderColor: themeColorValue }}
            className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
          ></span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="mt-[120px] relative">
        <ul className="space-y-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg flex items-center gap-5 relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--themeColorValue)] bg-opacity-20"
                      : "hover:bg-white/10"
                  }`}
                >
                  {/* Icon + Label */}
                  <div
                    className="flex items-center gap-5 transition-transform duration-200 group-hover:animate-pulse"
                    style={{
                      color: isActive ? themeColorValue : "#fff",
                    }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </div>

                  {/* Underline animation */}
                  <span
                    style={{ backgroundColor: themeColorValue }}
                    className={`absolute bottom-[-4px] left-0 w-full h-[2px] origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    } transition-transform duration-300`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bubble animation */}
        <div className="fixed bottom-0 left-0 w-[250px] h-screen pointer-events-none overflow-hidden">
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "5%",
              animation: "rise 3s infinite ease-in",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "20%",
              animation: "rise 4s infinite ease-in 0.2s",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "35%",
              animation: "rise 3.5s infinite ease-in 0.4s",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "50%",
              animation: "rise 4.2s infinite ease-in 0.6s",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "65%",
              animation: "rise 3.8s infinite ease-in 0.8s",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "80%",
              animation: "rise 4.5s infinite ease-in 1s",
            }}
          ></span>
          <span
            className="bubble"
            style={{
              backgroundColor: themeColorValue,
              left: "95%",
              animation: "rise 3.6s infinite ease-in 1.2s",
            }}
          ></span>
        </div>
      </nav>

      {/* Inline CSS for bubble animation */}
      <style jsx>{`
        .bubble {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.7;
        }
        @keyframes rise {
          0% {
            transform: translateY(100vh); /* Дэлгэцийн доод хэсгээс эхэлнэ */
            opacity: 0.7;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(50vh); /* Дэлгэцийн дунд хэсэгт очоод алга болно */
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;