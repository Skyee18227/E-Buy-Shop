import { useState, useEffect } from "react";

const BASE = process.env.REACT_APP_API_BASE_URL || "/api";

export async function fetchStoreJson(path) {
  const response = await fetch(`${BASE}${path}`);

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return await response.json();
}

export function useProducts(category = "") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = category
      ? `/products/category/${encodeURIComponent(category)}`
      : "/products";

    fetchStoreJson(url)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      });
  }, [category]);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchStoreJson(`/products/${id}`)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Product not found");
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchStoreJson("/products/categories")
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return categories;
}
