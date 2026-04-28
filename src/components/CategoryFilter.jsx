import React from "react";
import { useCategories } from "../hooks/useFakeStore";

export default function CategoryFilter({ selected, onChange }) {
  const categories = useCategories();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          selected === ""
            ? "bg-primary-600 text-white border-primary-600"
            : "bg-white text-gray-600 border-gray-200 hover:border-primary-400 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
            selected === cat
              ? "bg-primary-600 text-white border-primary-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-primary-400 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
