
import { Header } from '@/components/header';
import { NewsletterForm } from '@/components/newsletter-form';
import Link from 'next/link';

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col bg-background min-h-screen">
            <Header />
            {children}
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
    )
}
