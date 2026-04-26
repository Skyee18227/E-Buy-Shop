import React, { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "What's a good laptop under $500?",
  "Show me women's jewelry",
  "What are your best-rated products?",
  "I need a gift for someone who loves fashion",
];

function getBotReply(message) {
  const m = message.toLowerCase();

  if (m.includes("laptop") || m.includes("electronic") || m.includes("computer")) {
    return "Great choice! Check out our Electronics category — we have top-rated products ranging from budget-friendly to premium. Head to Products → Electronics to browse. 💻";
  }
  if (m.includes("jewelry") || m.includes("jewellery") || m.includes("ring") || m.includes("necklace")) {
    return "We have a beautiful Jewelry collection! Browse timeless pieces perfect for any occasion. Visit Products → Jewelery to explore all items. 💎";
  }
  if (m.includes("women") || m.includes("fashion") || m.includes("dress") || m.includes("clothing")) {
    return "Our Women's Clothing section has stylish options for every taste and budget. Check it out under Products → Women's Clothing! 👗";
  }
  if (m.includes("men") || m.includes("shirt") || m.includes("trouser")) {
    return "We carry a great range of Men's Clothing — casual to smart. Browse Products → Men's Clothing to find your style. 👔";
  }
  if (m.includes("gift")) {
    return "Looking for a gift? Our Jewelry and Electronics sections are popular choices! You can also filter by rating to find our best-reviewed products. 🎁";
  }
  if (m.includes("best") || m.includes("top") || m.includes("rated") || m.includes("popular")) {
    return "Our highest-rated items span all categories. Browse the All Products page and sort by rating to find customer favorites! ⭐";
  }
  if (m.includes("cheap") || m.includes("budget") || m.includes("affordable") || m.includes("sale")) {
    return "Great news — our prices are already competitive! All our products come from verified suppliers. Check the Products page and look for lower price ranges. 💰";
  }
  if (m.includes("cart") || m.includes("buy") || m.includes("purchase") || m.includes("order")) {
    return "To buy an item: browse Products, click on any product, then hit 'Add to Cart'. When ready, go to your Cart to review and checkout. 🛒";
  }
  if (m.includes("return") || m.includes("refund") || m.includes("policy")) {
    return "We offer a 30-day hassle-free return policy on all items. Contact our support team at support@ebuyshop.com for assistance. ↩️";
  }
  if (m.includes("shipping") || m.includes("delivery")) {
    return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days. Express options are available at checkout. 📦";
  }
  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) {
    return "Hi there! 👋 I'm your E-Buy shopping assistant. I can help you find products, answer questions about shipping, returns, and more. What are you looking for?";
  }
  if (m.includes("thank")) {
    return "You're welcome! Happy shopping at E-Buy! 😊 Let me know if you need anything else.";
  }

  return "I'm here to help you find the perfect product! Try asking about a specific category (electronics, jewelry, clothing), price range, or shipping info. 🤔";
}

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm your E-Buy AI Shopping Assistant. Ask me anything about our products, shipping, or returns!",
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
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-96 flex flex-col overflow-hidden"
        style={{ maxHeight: "75vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary-700 text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <div>
              <p className="font-semibold text-sm">AI Shopping Assistant</p>
              <p className="text-xs text-primary-200">Always online</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="hover:text-primary-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-3 py-1 hover:bg-primary-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-gray-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything…"
            className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-full outline-none focus:border-primary-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
