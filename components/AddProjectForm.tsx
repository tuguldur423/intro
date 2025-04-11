// components/AddProjectForm.tsx
"use client";

import { useState, FormEvent } from "react";

interface Props {
  language: string;
  themeColorValue: string;
}

const translations = {
  mn: {
    projectGithubLink: "GitHub Линк",
    addProjectButton: "Төсөл Нэмэх",
  },
  en: {
    projectGithubLink: "GitHub Link",
    addProjectButton: "Add Project",
  },
};

export default function AddProjectForm({ language, themeColorValue }: Props) {
  const t = translations[language as "mn" | "en"];
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const githubLink = formData.get("githubLink") as string;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubLink }),
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Project add error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="mb-16">
      <h2
        style={{ color: themeColorValue }}
        className="text-3xl mb-8 text-center"
      >
        {t.addProjectButton}
      </h2>

      {status === "success" && (
        <p className="text-green-500 mb-4 text-center">
          Төсөл амжилттай нэмэгдлээ!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 mb-4 text-center">
          Төсөл нэмэхэд алдаа гарлаа.
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-4 mx-auto">
        <input
          type="text"
          name="githubLink"
          className="w-full p-3 bg-[#333] text-white rounded-lg border border-gray-600"
          placeholder={t.projectGithubLink}
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            style={{ backgroundColor: themeColorValue }}
            className="px-8 py-3 text-white rounded-full hover:bg-opacity-80"
          >
            {t.addProjectButton}
          </button>
        </div>
      </form>
    </div>
  );
}
