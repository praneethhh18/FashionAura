'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';

interface ProductGridProps {
  products: Product[];
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
