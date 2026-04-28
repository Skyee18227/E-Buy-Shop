import React, { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "Which power bank is best for travel?",
  "Show me your earbuds",
  "What are your best-rated products?",
  "Which charger works best for fast charging?",
];

function getBotReply(message) {
  const m = message.toLowerCase();

  if (m.includes("powerbank") || m.includes("power bank") || m.includes("battery")) {
    return "Our PowerBank category is a great place to start if you need reliable backup charging for travel, work, or daily use.";
  }
  if (m.includes("earbud") || m.includes("audio") || m.includes("music") || m.includes("wireless")) {
    return "Take a look at our Earbuds collection for everyday listening, calls, workouts, and noise-cancelling options.";
  }
  if (m.includes("charger") || m.includes("adapter") || m.includes("usb-c") || m.includes("charging")) {
    return "Our Adapter & Charger category includes wall chargers, car chargers, and fast-charging options for different devices.";
  }
  if (m.includes("gift")) {
    return "For gifts, our Earbuds and compact chargers are popular picks. You can also sort by rating on the Products page to find favorites.";
  }
  if (m.includes("best") || m.includes("top") || m.includes("rated") || m.includes("popular")) {
    return "Our highest-rated items span PowerBank, Earbuds, and Adapter & Charger. Browse the Products page and sort by rating to find favorites.";
  }
  if (m.includes("cheap") || m.includes("budget") || m.includes("affordable") || m.includes("sale")) {
    return "If you're shopping on a budget, check the Products page and sort by price to find lower-cost power banks, earbuds, and chargers.";
  }
  if (m.includes("cart") || m.includes("buy") || m.includes("purchase") || m.includes("order")) {
    return "To buy an item, browse Products, open the one you want, tap Add to Cart, then head to your Cart to review and checkout.";
  }
  if (m.includes("return") || m.includes("refund") || m.includes("policy")) {
    return "We offer a 30-day hassle-free return policy on all items. Contact support@ebuyshop.com if you need help.";
  }
  if (m.includes("shipping") || m.includes("delivery")) {
    return "We offer free shipping on orders over $50. Standard delivery takes 3 to 5 business days, with faster options available at checkout.";
  }
  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) {
    return "Hi there! I'm your E-Buy shopping assistant. I can help you find products, answer shipping questions, and point you to the right category.";
  }
  if (m.includes("thank")) {
    return "You're welcome! Let me know if you want help comparing products.";
  }

  return "I'm here to help you find the right product. Try asking about PowerBank, Earbuds, Adapter & Charger, price range, or shipping info.";
}

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your E-Buy AI Shopping Assistant. Ask me anything about our products, shipping, or returns.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function sendMessage(text) {
    const msg = text.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(msg) }]);
    }, 600);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:justify-end sm:pr-6 sm:pb-6"
      onClick={onClose}
    >
      <div
        className="flex w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl dark:bg-slate-900 sm:w-96 sm:rounded-2xl"
        style={{ maxHeight: "75vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-primary-700 px-4 py-3 text-white">
          <div>
            <p className="text-sm font-semibold">AI Shopping Assistant</p>
            <p className="text-xs text-primary-200">Always online</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="transition-colors hover:text-primary-200">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary-600 text-white"
                    : "rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs text-primary-700 transition-colors hover:bg-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-primary-300"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-100 p-3 dark:border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 rounded-full border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-primary-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-full bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700 disabled:opacity-40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
