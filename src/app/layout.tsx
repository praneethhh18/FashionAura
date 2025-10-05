
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { Toaster } from '@/components/ui/toaster';
import { Anton, Roboto } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Fashion Aura',
  description: 'A modern e-commerce experience.',
  icons: {
    icon: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='655.359' height='655.359' style='shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd' viewBox='0 0 6.827 6.827'%3e%3cdefs%3e%3cstyle%3e.fil1{fill:%23fffffe;fill-rule:nonzero}%3c/style%3e%3c/defs%3e%3cg id='Layer_x0020_1'%3e%3crect width='6.827' height='6.827' rx='.853' ry='.853' style='fill:%237e57c2'/%3e%3cg id='_477832608'%3e%3cpath id='_477832848' class='fil1' d='M2.479 2.069v-.914A.255.255 0 0 1 2.735.9h1.22a.255.255 0 0 1 .255.256v.914H2.48z'/%3e%3cpath id='_477832800' class='fil1' d='M.967 1.411a.114.114 0 0 0 0 .228h.694l.18.292.526 3.017c.01.055.059.095.114.094h3.052a.114.114 0 0 0 0-.228H2.575l-.07-.402h3a.297.297 0 0 0 .212-.089.347.347 0 0 0 .097-.211l.158-1.623a.284.284 0 0 0-.086-.23.324.324 0 0 0-.224-.091H2.114l-.05-.29a.113.113 0 0 0-.017-.047l-.222-.357a.114.114 0 0 0-.102-.063H.967z'/%3e%3cpath id='_477833232' class='fil1' d='M2.991 5.148a.389.389 0 0 1 .276.665.389.389 0 0 1-.666-.276.389.389 0 0 1 .39-.39z'/%3e%3cpath id='_477832680' class='fil1' d='M4.694 5.148a.389.389 0 0 1 .275.665.389.389 0 0 1-.665-.276.389.389 0 0 1 .39-.39z'/%3e%3cpath id='_477832320' class='fil1' d='M4.324 2.069v-.691a.193.193 0 0 1 .194-.194h.923a.193.193 0 0 1 .194.194v.69h-1.31z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased bg-background', anton.variable, roboto.variable)} suppressHydrationWarning>
          <WishlistProvider>
            <CartProvider>
                {children}
                <Toaster />
            </CartProvider>
          </WishlistProvider>
      </body>
    </html>
  );
}
