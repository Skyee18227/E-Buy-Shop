import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  function handleCheckout() {
    clearCart();
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for shopping with E-Buy. Your order is being processed and will be
          delivered in 3-5 business days.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white font-bold px-8 py-3 rounded-full hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some products to get started.</p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white font-bold px-8 py-3 rounded-full hover:bg-primary-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
            >
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`}>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors">
                    {item.title}
                  </p>
                </Link>
                <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category}</p>
                <p className="text-primary-700 font-bold mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {/* Qty controls */}
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 text-sm font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">
                  {totalPrice >= 50 ? "Free" : "$4.99"}
                </span>
              </div>
              {totalPrice < 50 && (
                <p className="text-xs text-amber-600">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold py-3 rounded-full transition-all"
            >
              Checkout
            </button>
            <Link
              to="/products"
              className="mt-3 block text-center text-sm text-primary-600 hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
