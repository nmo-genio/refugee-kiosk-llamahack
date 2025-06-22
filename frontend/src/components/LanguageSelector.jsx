import React, { useState, useEffect, useRef } from "react";

const languages = [
  { code: "en", flag: "🇬🇧", text: "English", message: "Click the flag to get started" },
  { code: "es", flag: "🇪🇸", text: "Español", message: "Haz clic en la bandera para comenzar" },
  { code: "el", flag: "🇬🇷", text: "Ελληνικά", message: "Κάντε κλικ στη σημαία για να ξεκινήσετε" },
  { code: "hi", flag: "🇮🇳", text: "हिन्दी", message: "शुरू करने के लिए झंडे पर क्लिक करें" },
  { code: "pt", flag: "🇧🇷", text: "Português", message: "Clique na bandeira para começar" },
  { code: "zh", flag: "🇨🇳", text: "中文", message: "点击旗帜开始" },
  { code: "ru", flag: "🇷🇺", text: "Русский", message: "Нажмите на флаг, чтобы начать" },
  { code: "ro", flag: "🇷🇴", text: "Română", message: "Faceți clic pe steag pentru a începe" },
];

export default function LanguageSelector({ onSelect }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rotationInterval = useRef(null);

  // Auto-rotate through languages every 3 seconds when not hovering
  useEffect(() => {
    if (!isHovering) {
      rotationInterval.current = setInterval(() => {
        setActiveIdx(prevIdx => (prevIdx + 1) % languages.length);
      }, 3000);
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [isHovering]);

  const handleHover = (idx) => {
    setIsHovering(true);
    setActiveIdx(idx);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const current = languages[activeIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="text-3xl font-bold mb-10 text-blue-800 text-center">Refugee Kiosk</div>
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-5xl mx-auto">
        {/* Flag Grid */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {languages.slice(0, 8).map((lang, i) => (
              <button
                key={lang.code}
                onMouseEnter={() => handleHover(i)}
                onFocus={() => handleHover(i)}
                onMouseLeave={handleLeave}
                className={`flex flex-col items-center justify-center bg-white shadow-lg p-4 rounded-lg border-2 transition-all duration-300 min-h-[120px] w-full ${
                  activeIdx === i 
                    ? "ring-4 ring-blue-400 border-blue-300 scale-[1.02]" 
                    : "border-blue-100 hover:border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => onSelect && onSelect(lang)}
              >
                <span className="text-4xl mb-2">{lang.flag}</span>
                <span className="font-semibold text-center text-sm sm:text-base">{lang.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Info Panel */}
        <div className="ml-0 lg:ml-8 w-full lg:w-[300px] min-h-[120px] flex items-center justify-center lg:justify-start relative overflow-hidden mt-8 lg:mt-0">
          <div
            key={current.code}
            className={`w-full transition-opacity duration-500 ease-in-out ${
              isHovering ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <div className="bg-white shadow-lg rounded-xl px-6 py-6 text-lg text-gray-800 font-semibold border-2 border-blue-100 transform transition-transform duration-300 hover:scale-[1.01]">
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-3">{current.flag}</span>
                <span className="text-xl">{current.text}</span>
              </div>
              <p className="text-base font-normal mt-2 text-gray-600">
                {current.message}
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes slidein {
            0% {
              opacity: 0;
              transform: translateX(60%);
            }
            100% {
              opacity: 1;
              transform: translateX(0%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
