"use client";

import Sidebar from "../../components/Sidebar";
import { FormEvent, useState, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { useTheme } from "../ThemeContext";
import { useLanguage } from "../LanguageContext";

type Language = "mn" | "en";

interface Translations {
  [key: string]: {
    title: string;
    subtitle: string;
    call: string;
    email: string;
    location: string;
    website: string;
    formTitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    button: string;
    successMessage: string;
    errorMessage: string;
  };
}

export default function Contact() {
  const { themeColorValue } = useTheme();
  const { language } = useLanguage();

  // Зурвас илгээх статусыг хадгалах state
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Form-ыг тодорхойлох ref
  const formRef = useRef<HTMLFormElement>(null);

  const translations: Translations = {
    mn: {
      title: "Надтай холбоо барих",
      subtitle:
        "Хэрэв та надтай холбогдохыг хүсвэл, доорх мэдээллийг ашиглана уу. Та эдгээрээр надтай холбогдох боломжтой.",
      call: "Утас",
      email: "Имэйл",
      location: "Байршил",
      website: "Вэбсайт",
      formTitle: "НАД РУУ ИМЭЙЛ ИЛГЭЭХ",
      namePlaceholder: "НЭР",
      emailPlaceholder: "ИМЭЙЛ",
      subjectPlaceholder: "ГАРЧИГ",
      messagePlaceholder: "ЗУРВАС",
      button: "Зурвас илгээх",
      successMessage: "Зурвас амжилттай илгээгдлээ!",
      errorMessage: "Зурвас илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
    },
    en: {
      title: "Contact me",
      subtitle:
        "If you want to get in touch with me, here’s my info. You can reach me through these.",
      call: "Call",
      email: "Email",
      location: "Location",
      website: "Website",
      formTitle: "SEND ME AN EMAIL",
      namePlaceholder: "NAME",
      emailPlaceholder: "EMAIL",
      subjectPlaceholder: "SUBJECT",
      messagePlaceholder: "MESSAGE",
      button: "Send message",
      successMessage: "Message sent successfully!",
      errorMessage: "Failed to send message. Please try again.",
    },
  };

  const t = translations[language];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form-оос утгуудыг авах
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setStatus("success");
        // Form-ыг цэвэрлэх
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[250px] p-12 min-h-screen w-full text-white flex flex-col">
        <div className="mb-12">
          <h1 className="text-5xl mb-2 relative inline-block">{t.title}</h1>
          <div
            className="h-1 w-24 mb-1"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <div
            className="h-1 w-12"
            style={{ backgroundColor: themeColorValue }}
          ></div>
          <p className="text-gray-400 text-[20px] mt-2">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-center">
            <FaPhone
              style={{ color: themeColorValue }}
              className="text-3xl mb-2"
            />
            <h3 className="text-lg">{t.call}</h3>
            <p className="text-gray-400">+976 9853143</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope
              style={{ color: themeColorValue }}
              className="text-3xl mb-2"
            />
            <h3 className="text-lg">{t.email}</h3>
            <p className="text-gray-400">buyndelgertuguldur@gmail.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt
              style={{ color: themeColorValue }}
              className="text-3xl mb-2"
            />
            <h3 className="text-lg">{t.location}</h3>
            <p className="text-gray-400">shuii 38-23</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGlobe
              style={{ color: themeColorValue }}
              className="text-3xl mb-2"
            />
            <h3 className="text-lg">{t.website}</h3>
            <p className="text-gray-400">asdf.com</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <h2
            style={{ color: themeColorValue }}
            className="text-3xl mb-8 text-center"
          >
            {t.formTitle}
          </h2>
          {status === "success" && (
            <p className="text-green-500 mb-4 text-center">
              {t.successMessage}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 mb-4 text-center">{t.errorMessage}</p>
          )}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-4xl space-y-4"
          >
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                id="name"
                name="name"
                className="flex-1 p-3 bg-[#333] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-gray-400"
                style={{ "--tw-ring-color": themeColorValue } as any}
                placeholder={t.namePlaceholder}
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                className="flex-1 p-3 bg-[#333] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-gray-400"
                style={{ "--tw-ring-color": themeColorValue } as any}
                placeholder={t.emailPlaceholder}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-3 bg-[#333] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-gray-400"
                style={{ "--tw-ring-color": themeColorValue } as any}
                placeholder={t.subjectPlaceholder}
                required
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 bg-[#333] text-white rounded-lg border border-gray-600 focus:outline-none placeholder-gray-400"
                style={{ "--tw-ring-color": themeColorValue } as any}
                rows={5}
                placeholder={t.messagePlaceholder}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                style={{ backgroundColor: themeColorValue }}
                className="px-8 py-3 text-white rounded-full hover:bg-opacity-80 transition-colors"
              >
                {t.button}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}