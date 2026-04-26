import React from "react";
import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
}
