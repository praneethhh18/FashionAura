
'use client';

import React from 'react';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ShieldCheck, ShoppingCart, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const steps = [
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Address', href: '/checkout/address', icon: MapPin },
    { name: 'Payment', href: '/checkout/payment', icon: CreditCard },
    { name: 'Confirmation', href: '/checkout/confirmation', icon: CheckCircle },
];

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const currentStepIndex = steps.findIndex(step => pathname.startsWith(step.href));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>100% Secure Checkout</span>
                    </div>
                </div>
                 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                    <div className="flex items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.name}>
                        <div className="flex items-center">
                            <div className={cn(
                                "flex items-center justify-center h-8 w-8 rounded-full border-2",
                                index <= currentStepIndex ? "bg-primary border-primary text-primary-foreground" : "bg-gray-200 border-gray-300 text-gray-500"
                            )}>
                               <step.icon className="h-4 w-4" />
                            </div>
                            <span className={cn(
                                "ml-3 text-sm font-medium",
                                index <= currentStepIndex ? "text-primary" : "text-gray-500"
                            )}>{step.name}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "flex-auto border-t-2 mx-4 transition-colors",
                                index < currentStepIndex ? "border-primary" : "border-gray-300"
                            )}></div>
                        )}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    )
}
