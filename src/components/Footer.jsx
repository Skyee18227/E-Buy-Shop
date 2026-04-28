import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <img
                src={logo}
                alt="E-Buy logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-xl font-extrabold text-white">E-Buy</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 dark:text-slate-400">
              Your one-stop online store. Quality products at unbeatable prices,
              delivered fast to your door.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "All Products" },
                { to: "/cart", label: "Cart" },
                { to: "/about", label: "About Us" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-slate-400">
              <li>support@ebuyshop.com</li>
              <li>+1 (800) 123-4567</li>
              <li>Mon - Fri, 9 am - 6 pm EST</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500 dark:border-slate-800 dark:text-slate-500">
          Copyright {new Date().getFullYear()} E-Buy Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
