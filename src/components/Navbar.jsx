import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CartBadge from "./CartBadge";
import logo from "../assets/image.png";

export default function Navbar({
  darkMode,
  onSearchOpen,
  onAiOpen,
  onToggleDarkMode,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLink =
    "text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400";
  const activeNavLink = "text-primary-600 font-semibold dark:text-primary-400";

  return (
    <header
      className={`sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur transition-all dark:bg-slate-950/95 ${
        scrolled
          ? "shadow-md dark:border-slate-800 dark:shadow-black/20"
          : "shadow-sm dark:border-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="E-Buy logo"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-xl font-extrabold text-primary-700 tracking-tight">
              E-Buy
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeNavLink : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeNavLink : ""}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeNavLink : ""}`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25M12 18.75V21m9-9h-2.25M5.25 12H3m15.114 6.364-1.59-1.59M7.476 7.476l-1.59-1.59m12.228 0-1.59 1.59M7.476 16.524l-1.59 1.59M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1 1 11.21 3c0 .29-.02.58-.02.87A7 7 0 0 0 20.13 12c.29 0 .58-.01.87-.03z" />
                </svg>
              )}
            </button>

            {/* Search */}
            <button
              onClick={onSearchOpen}
              aria-label="Search"
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <svg className="h-5 w-5 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* AI Assistant */}
            <button
              onClick={onAiOpen}
              aria-label="AI Shopping Assistant"
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
              title="AI Shopping Assistant"
            >
              <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m1.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <svg className="h-5 w-5 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <CartBadge />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="space-y-2 border-t border-gray-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-slate-800 dark:text-primary-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
