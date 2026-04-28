import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useFakeStore";

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
];

function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setCategory(cat);
  }, [searchParams]);

  const { products, loading, error } = useProducts(category);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const displayed = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return list;
  }, [products, sort, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-slate-100">All Products</h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 rounded-full border border-gray-200 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none transition-colors focus:border-primary-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {!loading && (
        <p className="mb-5 text-sm text-gray-500 dark:text-slate-400">
          {displayed.length} {displayed.length === 1 ? "product" : "products"} found
        </p>
      )}

      {loading && <Spinner />}
      {error && (
        <div className="py-16 text-center text-red-500">
          Failed to load products. Please try again.
        </div>
      )}
      {!loading && !error && displayed.length === 0 && (
        <div className="py-16 text-center text-gray-400 dark:text-slate-500">
          No products match your search.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
