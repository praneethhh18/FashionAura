
'use client';

import { Header } from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';

export default function StreetStylePage() {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
            <Image
                src="/pages/street/streetstyle.png"
                alt="A person in stylish streetwear in a city."
                fill
                className="object-cover"
                data-ai-hint="streetwear fashion"
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
                    Street Style
                 </h1>
                 <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    Own the streets with looks that are bold, fresh, and unapologetically you.
                 </p>
            </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Link href="/street-style/men" className="group relative block overflow-hidden rounded-lg">
                    <Image 
                        src="/pages/street/est1.png"
                        alt="A man in urban streetwear."
                        width={600}
                        height={400}
                        className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="man street style"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-display font-black uppercase tracking-tight">Men's Street</h2>
                        <div className="mt-4 flex items-center gap-2 font-semibold">
                            <span>Shop Now</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
                 <Link href="/street-style/women" className="group relative block overflow-hidden rounded-lg">
                    <Image 
                        src="/pages/street/st2.png"
                        alt="A woman in chic street fashion."
                        width={600}
                        height={400}
                        className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="woman street style"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                     <div className="absolute bottom-8 left-8 text-white">
                        <h2 className="text-4xl font-display font-black uppercase tracking-tight">Women's Street</h2>
                        <div className="mt-4 flex items-center gap-2 font-semibold">
                            <span>Shop Now</span>
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            </div>
        </section>
      </main>
      <footer className="bg-foreground text-background py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/about#contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/about#faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link href="/shipping-returns" className="hover:text-white">Shipping</Link></li>
                  <li><Link href="/shipping-returns" className="hover:text-white">Returns</Link></li>
              </ul>
           </div>
           <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
           </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="https://www.instagram.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</Link></li>
                  <li><Link href="https://www.facebook.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</Link></li>
                  <li><Link href="https://x.com/signup" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</Link></li>
              </ul>
           </div>
           <div>
              <NewsletterForm />
           </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cartify. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
