import React, { useState } from "react";

export default function ChatWithAI({ image, onClose }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I see you've uploaded a photo. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Replace this with your real API call
  async function fakeAIReply(userMsg) {
    return new Promise((resolve) =>
      setTimeout(() => resolve("I'm RKioskAI. Thanks for your message! (Connect to your backend here.)"), 1200)
    );
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Replace with your real OpenAI or backend call:
    const aiText = await fakeAIReply(input);

    setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-lg w-full flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Chat with AI</h3>
        {image && <img src={image} alt="Captured" className="w-full max-w-xs rounded mb-6" />}
        <div className="w-full max-h-56 overflow-y-auto mb-4 bg-gray-50 rounded p-3 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
              <span
                className={`inline-block px-3 py-2 rounded ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <span className="inline-block px-3 py-2 rounded bg-gray-200 text-gray-500">
                AI is typing…
              </span>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="w-full flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none"
            placeholder="Type your message…"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
          >
            Send
          </button>
        </form>
        <button
          className="mt-6 px-6 py-2 bg-gray-200 rounded-lg font-semibold"
          onClick={onClose}
        >
          Close Chat
        </button>
      </div>
    </div>
  );
}
