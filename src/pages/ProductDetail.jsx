import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct, useProducts } from "../hooks/useFakeStore";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function StarRating({ rate, count }) {
  const full = Math.round(rate);
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < full ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-500">{rate} ({count} reviews)</span>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const { products: related } = useProducts(product?.category);
  const relatedFiltered = related.filter((p) => p.id !== product?.id).slice(0, 4);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const inCart = cart.find((i) => i.id === product?.id);

  if (loading) return <Spinner />;
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/products" className="mt-4 inline-block text-primary-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary-600">Products</Link>
        <span>/</span>
        <span className="capitalize text-gray-600">{product.category}</span>
      </nav>

      {/* Product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-10 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-widest text-primary-600 font-semibold">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {product.title}
          </h1>
          <StarRating rate={product.rating?.rate || 0} count={product.rating?.count || 0} />
          <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-none px-8 py-3 rounded-full font-bold text-sm transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-primary-600 hover:bg-primary-700 active:scale-95 text-white"
              }`}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            {inCart && (
              <Link
                to="/cart"
                className="text-sm text-primary-600 hover:underline font-medium"
              >
                View Cart ({inCart.qty})
              </Link>
            )}
          </div>

          {/* Perks */}
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="flex items-center gap-2">
              <span>🚚</span> Free shipping on orders over $50
            </li>
            <li className="flex items-center gap-2">
              <span>↩️</span> 30-day hassle-free returns
            </li>
            <li className="flex items-center gap-2">
              <span>🔒</span> Secure, encrypted checkout
            </li>
          </ul>
        </div>
      </div>

      {/* Related products */}
      {relatedFiltered.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFiltered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
