import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl"></span>
              <span className="text-xl font-extrabold text-white">E-Buy</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your one-stop online store. Quality products at unbeatable prices,
              delivered fast to your door.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "All Products" },
                { to: "/cart", label: "Cart" },
                { to: "/about", label: "About Us" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@ebuyshop.com</li>
              <li>+1 (800) 123-4567</li>
              <li>Mon – Fri, 9 am – 6 pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} E-Buy Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
