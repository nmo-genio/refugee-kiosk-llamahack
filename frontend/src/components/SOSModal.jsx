import React, { useState } from "react";

export default function SOSModal({ onClose, onSend, translations }) {
  const [selected, setSelected] = useState(null);
  const [sent, setSent] = useState(false);

  const iconMap = {
    medical: '🚑',
    security: '👮',
    family: '👨‍👩‍👧‍👦',
    other: '❓'
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 4000);
    if (onSend) onSend(selected);
  };

  // --- OVERLAY and CENTERED MODAL ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Modal box */}
      <div className="relative bg-white rounded-xl p-8 w-full max-w-md mx-auto shadow-lg flex flex-col items-center">
        {/* SENT STATE */}
        {sent ? (
          <div className="text-center">
            <div className="text-4xl mb-3">✅</div>
            <div className="text-xl font-semibold mb-2">
              {translations.confirmation.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        ) : !selected ? (
          <>
            <div className="text-xl font-bold mb-6">{translations?.iWant || "I want…"}</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(translations.options).map(([key, label]) => (
                <button
                  key={key}
                  className="flex flex-col items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-200 text-lg font-semibold shadow transition"
                  onClick={() => setSelected({ key, label })}
                >
                  <span className="text-4xl mb-2">{iconMap[key]}</span>
                  {label}
                </button>
              ))}
            </div>
            <button onClick={onClose} className="mt-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold">
              {translations.cancel}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-2xl mb-6">
              {translations.prompt} <b>{selected.label}</b>?
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold"
              >
                {translations.sendAlert}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-6 py-2 bg-gray-200 rounded-lg font-semibold"
              >
                {translations.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
