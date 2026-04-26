import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const id = setTimeout(() => {
      fetch("https://fakestoreapi.com/products")
        .then((r) => r.json())
        .then((data) => {
          const q = query.toLowerCase();
          setResults(
            data.filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            ).slice(0, 6)
          );
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-4 text-sm outline-none text-gray-800 placeholder-gray-400"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xs font-medium">
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-6 text-center text-sm text-gray-400">Searching…</div>
          )}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-400">No products found for "{query}"</div>
          )}
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <img src={p.image} alt={p.title} className="w-10 h-10 object-contain rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                <p className="text-xs text-gray-400 capitalize">{p.category}</p>
              </div>
              <span className="text-sm font-bold text-primary-700">${p.price.toFixed(2)}</span>
            </Link>
          ))}
        </div>

        {!query && (
          <div className="px-4 py-5 text-center text-sm text-gray-400">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </div>
  );
}
