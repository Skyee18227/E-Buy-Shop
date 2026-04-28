import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStoreJson } from "../hooks/useFakeStore";

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
      fetchStoreJson("/products")
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-100 px-4 dark:border-slate-800">
          <svg className="h-5 w-5 shrink-0 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-3 py-4 text-sm text-gray-800 outline-none placeholder-gray-400 dark:text-slate-100 dark:placeholder-slate-500"
          />
          <button onClick={onClose} className="text-xs font-medium text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300">
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-slate-500">Searching...</div>
          )}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-slate-500">No products found for "{query}"</div>
          )}
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <img src={p.image} alt={p.title} className="h-10 w-10 rounded object-contain" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-slate-100">{p.title}</p>
                <p className="text-xs capitalize text-gray-400 dark:text-slate-500">{p.category}</p>
              </div>
              <span className="text-sm font-bold text-primary-700">${p.price.toFixed(2)}</span>
            </Link>
          ))}
        </div>

        {!query && (
          <div className="px-4 py-5 text-center text-sm text-gray-400 dark:text-slate-500">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </div>
  );
}
