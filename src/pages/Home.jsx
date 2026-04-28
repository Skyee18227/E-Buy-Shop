import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useFakeStore";

const CATEGORIES = [
  {
    label: "PowerBank",
    value: "PowerBank",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 5.25h7A1.75 1.75 0 0 1 16.75 7v10A1.75 1.75 0 0 1 15 18.75H8A1.75 1.75 0 0 1 6.25 17V7A1.75 1.75 0 0 1 8 5.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 3.25h3M10 9.5h2.5m-2.5 3h4" />
      </svg>
    ),
  },
  {
    label: "Earbuds",
    value: "Earbuds",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.5 7.5a2.25 2.25 0 1 1 4.5 0v5.25a2.25 2.25 0 1 1-4.5 0V7.5Zm7 0a2.25 2.25 0 1 1 4.5 0v5.25a2.25 2.25 0 1 1-4.5 0V7.5Z" />
      </svg>
    ),
  },
  {
    label: "Adapter & Charger",
    value: "Adapter & Charger",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 6.25h6A1.75 1.75 0 0 1 16.75 8v8A1.75 1.75 0 0 1 15 17.75H9A1.75 1.75 0 0 1 7.25 16V8A1.75 1.75 0 0 1 9 6.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 3.25v3m4-3.25v3" />
      </svg>
    ),
  },
];

function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

function FeaturedProducts() {
  const { products, loading } = useProducts();
  if (loading) return <Spinner />;
  const featured = products.filter((p) => p.rating?.rate >= 4.5).slice(0, 4);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* Category tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-slate-100">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ label, value, icon }) => (
            <Link
              key={value}
              to={`/products?category=${encodeURIComponent(value)}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white py-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 transition-transform group-hover:scale-110 dark:bg-slate-800 dark:text-primary-400">
                {icon}
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Top Rated Products</h2>
          <Link to="/products" className="text-sm text-primary-600 hover:underline font-medium">
            View all →
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      {/* Trust banner */}
      <section className="bg-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "", title: "30-Day Returns", desc: "Hassle-free returns" },
            { icon: "", title: "Secure Payments", desc: "SSL-encrypted checkout" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <span className="text-4xl">{icon}</span>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-primary-200 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
