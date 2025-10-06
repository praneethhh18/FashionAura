"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/types';

let cachedProducts: Product[] | null = null;

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(cachedProducts);
  const [loading, setLoading] = useState<boolean>(cachedProducts === null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    if (cachedProducts !== null) {
      setProducts(cachedProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        if (mounted) {
          cachedProducts = data;
          setProducts(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err);
          setProducts([]);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => { mounted = false; };
  }, []);

  return { products: products ?? [], loading, error };
}
