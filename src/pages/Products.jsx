import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../hooks/useFakeStore";

const SORT_OPTIONS = [
  { label: "Default",        value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Best Rated",    value: "rating" },
];

function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">All Products</h1>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-full text-sm outline-none focus:border-primary-400 transition-colors w-40"
            />
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-full text-sm px-3 py-1.5 outline-none focus:border-primary-400 transition-colors bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-5">
          {displayed.length} {displayed.length === 1 ? "product" : "products"} found
        </p>
      )}

      {loading && <Spinner />}
      {error && (
        <div className="text-center py-16 text-red-500">
          Failed to load products. Please try again.
        </div>
      )}
      {!loading && !error && displayed.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No products match your search.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
