import React from "react";
import { Link } from "react-router-dom";

const TEAM = [
  { name: "Alex Rivera", role: "Founder & CEO", emoji: "" },
  { name: "Maya Chen", role: "Head of Products", emoji: "" },
  { name: "Jordan Lee", role: "Customer Success", emoji: "" },
];

const STATS = [
  { label: "Products", value: "500+" },
  { label: "Happy Customers", value: "12 K+" },
  { label: "Countries", value: "30+" },
  { label: "Years Online", value: "5" },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-24 text-center text-white">
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">About E-Buy Shop</h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-primary-200">
          We started with a simple idea: everyone deserves access to quality products at
          fair prices, delivered fast and backed by outstanding support.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-4xl font-extrabold text-primary-700">{value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-slate-100">Our Mission</h2>
        <p className="leading-relaxed text-gray-600 dark:text-slate-300">
          E-Buy Shop is dedicated to making online shopping simple, trustworthy, and
          enjoyable. We partner with top suppliers to bring you authentic products across
          power banks, earbuds, chargers, and more - all with transparent pricing, fast
          shipping, and a 30-day return guarantee.
        </p>
      </section>

      <section className="bg-gray-50 px-4 py-14 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-10 text-2xl font-bold text-gray-900 dark:text-slate-100">Meet the Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map(({ name, role, emoji }) => (
              <div key={name} className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-10 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="text-5xl">{emoji}</span>
                <p className="font-bold text-gray-900 dark:text-slate-100">{name}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-slate-100">Ready to shop?</h2>
        <Link
          to="/products"
          className="inline-block rounded-full bg-primary-600 px-10 py-3 font-bold text-white transition-colors hover:bg-primary-700"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
}
