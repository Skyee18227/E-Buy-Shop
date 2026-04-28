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
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mb-4 text-6xl"></div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-slate-100">Order Placed!</h1>
        <p className="mb-8 text-gray-500 dark:text-slate-400">
          Thank you for shopping with E-Buy. Your order is being processed and will be
          delivered in 3-5 business days.
        </p>
        <Link
          to="/products"
          className="inline-block rounded-full bg-primary-600 px-8 py-3 font-bold text-white transition-colors hover:bg-primary-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mb-4 text-6xl"></div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-slate-100">Your cart is empty</h1>
        <p className="mb-8 text-gray-500 dark:text-slate-400">Add some products to get started.</p>
        <Link
          to="/products"
          className="inline-block rounded-full bg-primary-600 px-8 py-3 font-bold text-white transition-colors hover:bg-primary-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg bg-gray-50 p-2 object-contain dark:bg-slate-950"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/products/${item.id}`}>
                  <p className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors hover:text-primary-600 dark:text-slate-100 dark:hover:text-primary-400">
                    {item.title}
                  </p>
                </Link>
                <p className="mt-0.5 text-xs capitalize text-gray-400 dark:text-slate-500">{item.category}</p>
                <p className="mt-1 font-bold text-primary-700">${item.price.toFixed(2)}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2">
                <div className="flex items-center overflow-hidden rounded-full border border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 text-gray-600 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-400 transition-colors hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-slate-100">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-slate-300">
                <span>Shipping</span>
                <span className="text-green-600">{totalPrice >= 50 ? "Free" : "$4.99"}</span>
              </div>
              {totalPrice < 50 && (
                <p className="text-xs text-amber-600">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900 dark:border-slate-800 dark:text-slate-100">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-full bg-primary-600 py-3 font-bold text-white transition-all hover:bg-primary-700 active:scale-95"
            >
              Checkout
            </button>
            <Link
              to="/products"
              className="mt-3 block text-center text-sm text-primary-600 hover:underline"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
