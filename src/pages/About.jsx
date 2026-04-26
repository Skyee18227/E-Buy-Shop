import React from "react";
import { Link } from "react-router-dom";

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO", emoji: "👨‍💼" },
  { name: "Maya Chen",   role: "Head of Products", emoji: "👩‍💻" },
  { name: "Jordan Lee",  role: "Customer Success", emoji: "🤝" },
];

const STATS = [
  { label: "Products",       value: "500+" },
  { label: "Happy Customers", value: "12 K+" },
  { label: "Countries",      value: "30+" },
  { label: "Years Online",   value: "5" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About E-Buy Shop</h1>
        <p className="max-w-xl mx-auto text-primary-200 text-lg leading-relaxed">
          We started with a simple idea: everyone deserves access to quality products at
          fair prices, delivered fast and backed by outstanding support.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8">
              <p className="text-4xl font-extrabold text-primary-700">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          E-Buy Shop is dedicated to making online shopping simple, trustworthy, and
          enjoyable. We partner with top suppliers to bring you authentic products across
          electronics, fashion, jewelry, and more — all with transparent pricing, fast
          shipping, and a 30-day return guarantee.
        </p>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, emoji }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm py-10 flex flex-col items-center gap-3">
                <span className="text-5xl">{emoji}</span>
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to shop?</h2>
        <Link
          to="/products"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold px-10 py-3 rounded-full transition-colors"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
}
