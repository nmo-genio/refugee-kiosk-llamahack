"use client";
import { useState, useEffect } from "react";

export const languages = [
  { code: "en", flag: "🇬🇧", name: "English", instruction: "Click the flag to get started" },
  { code: "es", flag: "🇪🇸", name: "Español", instruction: "Haz clic en la bandera para comenzar" },
  { code: "hi", flag: "🇮🇳", name: "हिंदी", instruction: "शुरू करने के लिए झंडे पर क्लिक करें" },
  { code: "pt", flag: "🇧🇷", name: "Português", instruction: "Clique na bandeira para começar" },
  { code: "zh", flag: "🇨🇳", name: "中文", instruction: "点击旗帜开始" },
  { code: "ru", flag: "🇷🇺", name: "Русский", instruction: "Нажмите на флаг, чтобы начать" },
  { code: "ro", flag: "🇷🇴", name: "Română", instruction: "Faceți clic pe steag pentru a începe" },
  { code: "af", flag: "🇿🇦", name: "Afrikaans", instruction: "Klik op die vlag om te begin" },
  { code: "ar", flag: "🇸🇦", name: "العربية", instruction: "انقر على العلم للبدء" },
];

export default function LanguageCarousel({ onSelect }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % languages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const lang = languages[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <button
        className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:-translate-y-1"
        aria-label={`Select ${lang.name}`}
        onClick={() => onSelect?.(lang.code) || alert(`Selected: ${lang.name}`)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <span className="text-8xl sm:text-9xl mb-6 transform hover:scale-110 transition-transform duration-300">
          {lang.flag}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {lang.name}
        </h1>
        <p className="text-lg sm:text-xl text-blue-600 font-medium mt-2">
          {lang.instruction}
        </p>
      </button>
    </div>
  );
}
