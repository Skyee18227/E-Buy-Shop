import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    headline: "Summer Sale",
    sub: "Up to 50% off on electronics & fashion",
    cta: "Shop Now",
    href: "/products?category=electronics",
    bg: "from-blue-700 to-indigo-900",
    emoji: "",
  },
  {
    id: 2,
    headline: "New Arrivals",
    sub: "Fresh styles added every week",
    cta: "Explore",
    href: "/products?category=women's clothing",
    bg: "from-pink-500 to-rose-700",
    emoji: "",
  },
  {
    id: 3,
    headline: "Jewellery Collection",
    sub: "Timeless pieces for every occasion",
    cta: "Discover",
    href: "/products?category=jewelery",
    bg: "from-amber-500 to-orange-700",
    emoji: "",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className={`relative bg-gradient-to-br ${slide.bg} text-white overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <span className="text-6xl mb-4 select-none">{slide.emoji}</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow">
          {slide.headline}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/80 max-w-xl">{slide.sub}</p>
        <Link
          to={slide.href}
          className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
        >
          {slide.cta}
        </Link>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
