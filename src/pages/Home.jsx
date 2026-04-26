import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useFakeStore";

const CATEGORIES = [
  { label: "Electronics", value: "electronics", emoji: "📱" },
  { label: "Jewelry",     value: "jewelery",    emoji: "💎" },
  { label: "Men's",       value: "men's clothing", emoji: "👔" },
  { label: "Women's",     value: "women's clothing", emoji: "👗" },
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(({ label, value, emoji }) => (
            <Link
              key={value}
              to={`/products?category=${encodeURIComponent(value)}`}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center py-8 gap-3 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Rated Products</h2>
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
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "↩️", title: "30-Day Returns", desc: "Hassle-free returns" },
            { icon: "🔒", title: "Secure Payments", desc: "SSL-encrypted checkout" },
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
