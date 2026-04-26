import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchOverlay from "./components/SearchOverlay";
import AIAssistant from "./components/AIAssistant";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar onSearchOpen={() => setSearchOpen(true)} onAiOpen={() => setAiOpen(true)} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <Footer />

          {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
          {aiOpen && <AIAssistant onClose={() => setAiOpen(false)} />}
        </div>
      </Router>
    </CartProvider>
  );
}
