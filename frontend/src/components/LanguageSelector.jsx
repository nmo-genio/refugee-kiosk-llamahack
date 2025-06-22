import React, { useState, useEffect, useRef } from "react";

const languages = [
  // 1st row
  { code: "en", flag: "🇺🇸", text: "English" },
  { code: "es", flag: "🇪🇸", text: "Español" },
  { code: "hi", flag: "🇮🇳", text: "हिन्दी" },
  { code: "pt", flag: "🇵🇹", text: "Português" },
  // 2nd row
  { code: "zh", flag: "🇨🇳", text: "中文" },
  { code: "ru", flag: "🇷🇺", text: "Русский" },
  { code: "ro", flag: "🇷🇴", text: "Română" },
  { code: "af", flag: "🇿🇦", text: "Afrikaans" },
  // 3rd row
  { code: "ar", flag: "🇸🇦", text: "العربية", dir: "rtl" },
  { code: "el", flag: "🇬🇷", text: "Ελληνικά" },
  { code: "uk", flag: "🇺🇦", text: "Українська" },
  { code: "fr", flag: "🇫🇷", text: "Français" }
];

// Welcome messages (for demo; you can add translations if you want)
const welcomeMessages = {
  en: 'Welcome! Click to get started in English',
  es: '¡Bienvenido! Haga clic para comenzar en Español',
  hi: 'स्वागत है! हिंदी में शुरू करने के लिए क्लिक करें',
  pt: 'Bem-vindo! Clique para começar em Português',
  zh: '欢迎！点击开始使用中文',
  ru: 'Добро пожаловать! Нажмите, чтобы начать на русском',
  ro: 'Bun venit! Faceți clic pentru a începe în Română',
  af: 'Welkom! Klik om in Afrikaans te begin',
  ar: 'مرحباً! انقر للبدء باللغة العربية',
  el: 'Καλώς ήρθατε! Κάντε κλικ για να ξεκινήσετε στα Ελληνικά',
  uk: 'Ласкаво просимо! Натисніть, щоб розпочати українською',
  fr: 'Bienvenue! Cliquez pour commencer en Français'
};

export default function LanguageSelector({ onSelect }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rotationInterval = useRef(null);

  // Helper: split array into rows of N
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  useEffect(() => {
    if (!isHovering) {
      rotationInterval.current = setInterval(() => {
        setActiveIdx(prevIdx => (prevIdx + 1) % languages.length);
      }, 3000);
    }
    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [isHovering]);

  const handleHover = idx => {
    setIsHovering(true);
    setActiveIdx(idx);
  };
  const handleLeave = () => setIsHovering(false);

  const current = languages[activeIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="text-3xl font-bold mb-10 text-blue-800 text-center">Refugee Kiosk</div>
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-5xl mx-auto">
        <div className="w-full max-w-4xl mx-auto">
          {/* Render as 3 rows, 4 columns */}
          {chunk(languages, 4).map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-4">
              {row.map((lang, i) => {
                const idx = rIdx * 4 + i;
                return (
                  <button
                    key={lang.code}
                    onMouseEnter={() => handleHover(idx)}
                    onFocus={() => handleHover(idx)}
                    onMouseLeave={handleLeave}
                    className={`flex flex-col items-center justify-center bg-white shadow-lg p-4 rounded-lg border-2 transition-all duration-300 min-h-[120px] w-full ${
                      activeIdx === idx
                        ? "ring-4 ring-blue-400 border-blue-300 scale-[1.02]"
                        : "border-blue-100 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                    onClick={() => onSelect && onSelect(lang)}
                  >
                    <span className="text-4xl mb-2">{lang.flag}</span>
                    <span className="font-semibold text-center text-sm sm:text-base">{lang.text}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Language Info Panel */}
        <div className="ml-0 lg:ml-8 w-full lg:w-[350px] min-h-[120px] flex items-center justify-center lg:justify-start relative overflow-hidden mt-8 lg:mt-0">
          <div
            key={current.code}
            className={`w-full transition-opacity duration-500 ease-in-out ${
              isHovering ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <div className="bg-white shadow-lg rounded-xl px-6 py-6 text-lg text-gray-800 font-semibold border-2 border-blue-100 transform transition-transform duration-300 hover:scale-[1.01]">
              <p className="text-gray-700 text-lg text-center" dir={current.dir || 'ltr'}>
                {welcomeMessages[current.code] || welcomeMessages.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
