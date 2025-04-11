"use client";

import Sidebar from "../../components/Sidebar";
import { useTheme } from "../ThemeContext";
import { useLanguage } from "../LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image"; // Импорт нэмнэ

interface Project {
  id: string;
  title: string;
  description: string;
  vercelLink: string;
  image: string;
}

interface Translations {
  [key: string]: {
    title: string;
    noProjects: string;
    vercelLink: string;
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { themeColorValue } = useTheme();
  const { language } = useLanguage();

  const translations: Translations = {
    mn: {
      title: "Төслүүд",
      noProjects: "Одоогоор төсөл байхгүй байна.",
      vercelLink: "Vercel линк",
    },
    en: {
      title: "Projects",
      noProjects: "No projects available yet.",
      vercelLink: "Vercel Link",
    },
  };

  const t = translations[language];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Төслүүдийг татахад алдаа гарлаа");
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ямар нэг алдаа гарлаа");
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#1a1a1a] text-white">
        <Sidebar />
        <main className="ml-[250px] p-12 w-full flex justify-center items-center">
          <p className="text-gray-400">Ачааллаж байна...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#1a1a1a] text-white">
        <Sidebar />
        <main className="ml-[250px] p-12 w-full flex justify-center items-center">
          <p className="text-red-400">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <main className="ml-[250px] p-12 w-full flex flex-col gap-12">
        <div>
          <h1 className="text-5xl font-bold tracking-tight relative inline-block">
            {t.title}
          </h1>
          <div
            className="h-1 w-24 mt-2 rounded-full"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <div
            className="h-1 w-12 mt-2 rounded-full opacity-50"
            style={{ backgroundColor: themeColorValue }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">{t.noProjects}</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-700 rounded-xl p-6 bg-[#252525] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <a
                  href={project.vercelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: themeColorValue }}
                >
                  {t.vercelLink}
                </a>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}