"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../LanguageContext";
import Image from "next/image"; 

interface Project {
  id: string;
  title: string;
  description: string;
  vercelLink: string;
  image: string;
  createdAt: Date;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

interface Translations {
  [key: string]: {
    title: string;
    projectsTitle: string;
    noProjects: string;
    projectTitle: string;
    projectDescription: string;
    projectVercelLink: string;
    projectImage: string;
    addProjectButton: string;
    editProjectButton: string;
    saveChangesButton: string;
    messagesTitle: string;
    noMessages: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    reply: string;
    sendReply: string;
  };
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const { language } = useLanguage();

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects", { method: "GET" });
      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact", { method: "GET" });
      if (response.ok) {
        const contactsData = await response.json();
        setContacts(contactsData);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      const session = await response.json();
      if (!session?.user) {
        router.push("/admin/login");
      }
    };
    checkSession();
    fetchProjects();
    fetchContacts();
  }, [router]);

  const themeColorValue = "#1E3A8A"; // Гүн хөх туяатай бараан өнгө

  const translations: Translations = {
    mn: {
      title: "Админ Панел",
      projectsTitle: "Төслүүд",
      noProjects: "Одоогоор төсөл байхгүй байна.",
      projectTitle: "Төслийн Гарчиг",
      projectDescription: "Тодорхойлолт",
      projectVercelLink: "Vercel Линк",
      projectImage: "Зураг (URL)",
      addProjectButton: "Төсөл Нэмэх",
      editProjectButton: "Засах",
      saveChangesButton: "Хадгалах",
      messagesTitle: "Ирсэн Зурвасууд",
      noMessages: "Одоогоор зурвас байхгүй байна.",
      name: "Нэр",
      email: "Имэйл",
      subject: "Гарчиг",
      message: "Зурвас",
      reply: "Хариу бичих",
      sendReply: "Хариу илгээх",
    },
    en: {
      title: "Admin Panel",
      projectsTitle: "Projects",
      noProjects: "No projects available yet.",
      projectTitle: "Project Title",
      projectDescription: "Description",
      projectVercelLink: "Vercel Link",
      projectImage: "Image (URL)",
      addProjectButton: "Add Project",
      editProjectButton: "Edit",
      saveChangesButton: "Save Changes",
      messagesTitle: "Received Messages",
      noMessages: "No messages available yet.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      reply: "Write a reply",
      sendReply: "Send Reply",
    },
  };

  const t = translations[language];

  const handleProjectSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      vercelLink: formData.get("vercelLink") as string,
      image: formData.get("image") as string,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        formRef.current?.reset();
        fetchProjects();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      setStatus("error");
    }
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingProject) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      id: editingProject.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      vercelLink: formData.get("vercelLink") as string,
      image: formData.get("image") as string,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        setEditingProject(null);
        fetchProjects();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error editing project:", error);
      setStatus("error");
    }
  };

  const handleReplySubmit = async (e: FormEvent<HTMLFormElement>, contact: Contact) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const replySubject = formData.get("replySubject") as string;
    const replyMessage = formData.get("replyMessage") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Admin",
          email: process.env.EMAIL_USER || "admin@example.com",
          subject: replySubject,
          message: replyMessage,
          replyTo: contact.email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white animate-fade-in">
      <main className="p-12 w-full flex flex-col gap-12 max-w-5xl mx-auto">
        {/* Гарчиг */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight animate-slide-in">
            {t.title}
          </h1>
          <div
            className="h-1 w-24 mt-2 rounded-full mx-auto animate-slide-in"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <div
            className="h-1 w-12 mt-2 rounded-full mx-auto opacity-50 animate-slide-in-delayed"
            style={{ backgroundColor: themeColorValue }}
          ></div>
        </div>

        {/* Төсөл нэмэх хэсэг */}
        <section className="bg-[#2c2c2c] p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(30,58,138,0.3)] animate-fade-in">
          <h2
            style={{ color: themeColorValue }}
            className="text-3xl font-semibold mb-6 text-center"
          >
            {t.projectsTitle}
          </h2>
          {status === "success" && (
            <p className="text-green-400 mb-4 text-center font-medium animate-pulse">
              {t.addProjectButton} амжилттай!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 mb-4 text-center font-medium animate-pulse">
              Алдаа гарлаа. Дахин оролдоно уу.
            </p>
          )}
          <form
            ref={formRef}
            onSubmit={handleProjectSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                name="title"
                className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                placeholder={t.projectTitle}
                required
              />
            </div>
            <div>
              <textarea
                name="description"
                className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                placeholder={t.projectDescription}
                rows={3}
              />
            </div>
            <div>
              <input
                type="text"
                name="vercelLink"
                className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                placeholder={t.projectVercelLink}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="image"
                className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                placeholder={t.projectImage}
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: themeColorValue }}
              className="w-full py-3 rounded-xl font-bold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              {t.addProjectButton}
            </button>
          </form>
        </section>

        {/* Төсөл засварлах хэсэг */}
        {editingProject && (
          <section className="bg-[#2c2c2c] p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(30,58,138,0.3)] animate-fade-in">
            <h3
              style={{ color: themeColorValue }}
              className="text-2xl font-semibold mb-6 text-center"
            >
              Төсөл Засах
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingProject.title}
                  className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                  placeholder={t.projectTitle}
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  defaultValue={editingProject.description}
                  className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                  placeholder={t.projectDescription}
                  rows={3}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="vercelLink"
                  defaultValue={editingProject.vercelLink}
                  className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                  placeholder={t.projectVercelLink}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  defaultValue={editingProject.image}
                  className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                  placeholder={t.projectImage}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  style={{ backgroundColor: themeColorValue }}
                  className="w-full py-3 rounded-xl font-bold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                  {t.saveChangesButton}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="w-full py-3 bg-gray-600 rounded-xl font-bold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                  Цуцлах
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Төслүүдийн жагсаалт */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">{t.noProjects}</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#2c2c2c] p-6 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(30,58,138,0.3)] hover:scale-[1.02]"
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                )}
                <h3
                  style={{ color: themeColorValue }}
                  className="text-xl font-bold mb-2"
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-2">{project.description}</p>
                <a
                  href={project.vercelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: themeColorValue }}
                  className="hover:underline mb-4 block"
                >
                  {project.vercelLink}
                </a>
                <button
                  onClick={() => setEditingProject(project)}
                  className="w-full py-2 bg-gray-600 rounded-xl font-bold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                >
                  {t.editProjectButton}
                </button>
              </div>
            ))
          )}
        </section>

        <section className="bg-[#2c2c2c] p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(30,58,138,0.3)] animate-fade-in">
          <h2
            style={{ color: themeColorValue }}
            className="text-3xl font-semibold mb-6 text-center"
          >
            {t.messagesTitle}
          </h2>
          {contacts.length === 0 ? (
            <p className="text-gray-400 text-center">{t.noMessages}</p>
          ) : (
            <div className="space-y-6">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                >
                  <p>
                    <strong style={{ color: themeColorValue }}>{t.name}:</strong>{" "}
                    {contact.name}
                  </p>
                  <p>
                    <strong style={{ color: themeColorValue }}>{t.email}:</strong>{" "}
                    {contact.email}
                  </p>
                  <p>
                    <strong style={{ color: themeColorValue }}>{t.subject}:</strong>{" "}
                    {contact.subject}
                  </p>
                  <p>
                    <strong style={{ color: themeColorValue }}>{t.message}:</strong>{" "}
                    {contact.message}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                  <form
                    onSubmit={(e) => handleReplySubmit(e, contact)}
                    className="mt-4 space-y-4"
                  >
                    <input
                      type="hidden"
                      name="to"
                      value={contact.email}
                    />
                    <input
                      type="text"
                      name="replySubject"
                      className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                      placeholder={t.reply}
                      defaultValue={`Re: ${contact.subject}`}
                      required
                    />
                    <textarea
                      name="replyMessage"
                      className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ "--tw-ring-color": themeColorValue } as React.CSSProperties}
                      rows={3}
                      placeholder={t.reply}
                      required
                    />
                    <button
                      type="submit"
                      style={{ backgroundColor: themeColorValue }}
                      className="w-full py-2 rounded-xl font-bold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                      {t.sendReply}
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// CSS хөдөлгөөнүүд
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slide-in {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 6rem;
      opacity: 1;
    }
  }
  @keyframes slide-in-delayed {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 3rem;
      opacity: 0.5;
    }
  }
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  .animate-slide-in {
    animation: slide-in 0.5s ease-out;
  }
  .animate-slide-in-delayed {
    animation: slide-in-delayed 0.5s ease-out 0.2s;
  }
  .animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
`;

// Tailwind-д CSS нэмэх
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}