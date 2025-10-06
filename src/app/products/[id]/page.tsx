
import { 
    products as allProducts,
    casualWearMen,
    casualWearWomen,
    workFormalMen,
    workFormalWomen,
    partyEveningMen,
    partyEveningWomen,
    ethnicWearMen,
    ethnicWearWomen,
    sportsActivewearMen,
    sportsActivewearWomen,
    accessoriesMen,
    accessoriesWomen,
    jewelry,
    urbanEdgeSneakers,
    ivoryMen,
    femmeEdge
} from '@/lib/products';
import type { Product } from '@/types';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { ProductDetailsClient } from './_components/product-details-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const allProductCollections = [
        ...allProducts, ...casualWearMen, ...casualWearWomen, ...workFormalMen, ...workFormalWomen,
        ...partyEveningMen, ...partyEveningWomen, ...ethnicWearMen, ...ethnicWearWomen,
        ...sportsActivewearMen, ...sportsActivewearWomen, ...accessoriesMen, ...accessoriesWomen,
        ...jewelry, ...urbanEdgeSneakers, ...ivoryMen, ...femmeEdge
    ];

    // Create a unique set of products by ID
    const uniqueProducts = Array.from(new Map(allProductCollections.map(p => [p.id, p])).values());

    return uniqueProducts.map((product) => ({
        id: product.id,
    }));
}

function getProduct(id: string): Product | undefined {
    const allProductCollections = [
        ...allProducts, ...casualWearMen, ...casualWearWomen, ...workFormalMen, ...workFormalWomen,
        ...partyEveningMen, ...partyEveningWomen, ...ethnicWearMen, ...ethnicWearWomen,
        ...sportsActivewearMen, ...sportsActivewearWomen, ...accessoriesMen, ...accessoriesWomen,
        ...jewelry, ...urbanEdgeSneakers, ...ivoryMen, ...femmeEdge
    ];
    // Find the first product that matches the ID, ensuring we get one even with duplicates across arrays
    return allProductCollections.find((p) => p.id === id);
}

function getRelatedProducts(product: Product): Product[] {
    const allProductCollections = [
        ...allProducts, ...casualWearMen, ...casualWearWomen, ...workFormalMen, ...workFormalWomen,
        ...partyEveningMen, ...partyEveningWomen, ...ethnicWearMen, ...ethnicWearWomen,
        ...sportsActivewearMen, ...sportsActivewearWomen, ...accessoriesMen, ...accessoriesWomen,
        ...jewelry, ...urbanEdgeSneakers, ...ivoryMen, ...femmeEdge
    ];
    // Create a map to get unique products by ID
    const uniqueProducts = new Map(allProductCollections.map(p => [p.id, p]));
    
    // Filter for related products, excluding the current one
    const related: Product[] = [];
    uniqueProducts.forEach(p => {
        if (p.category === product.category && p.id !== product.id) {
            related.push(p);
        }
    });

    return related.slice(0, 5);
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Next.js (v15+) may provide `params` as an async object. Await it before using properties.
  const { id } = await params as { id: string };
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <main className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductDetailsClient product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-24">
            <Separator />
            <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center my-12">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} variant="detailed"/>)}
            </div>
        </div>
      )}

    </main>
  );
}

