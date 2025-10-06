
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItem } from '@/types';

interface OrderSummary {
    items: CartItem[];
    total: number;
}

export default function ConfirmationPage() {
    const [orderId, setOrderId] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);
    const [shipping, setShipping] = useState<any | null>(null);

    useEffect(() => {
        // Simulate generating order details on client mount
        const generatedOrderId = `FA-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(generatedOrderId);

        const today = new Date();
        const delivery = new Date(today.setDate(today.getDate() + 5));
        setDeliveryDate(delivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
        
        // Retrieve the last order from local storage
        if (typeof window !== 'undefined') {
            const savedOrder = localStorage.getItem('last-order');
            if (savedOrder) {
                setLastOrder(JSON.parse(savedOrder));
                localStorage.removeItem('last-order'); // Clean up after use
            }
            const savedShipping = localStorage.getItem('shippingAddress');
            if (savedShipping) {
                try {
                    setShipping(JSON.parse(savedShipping));
                } catch (e) {
                    // ignore parse errors
                }
            }
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="text-center p-8">
                <CardContent>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
                    <p className="text-muted-foreground mt-2">Your payment was successful and your order is confirmed.</p>
                    
                    <div className="text-sm mt-6 p-4 bg-gray-100 rounded-md inline-block">
                        <span className="font-semibold">Order ID:</span>
                        <span className="ml-2 font-mono">{orderId}</span>
                    </div>

                    <div className="mt-6 text-left border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                         {lastOrder && lastOrder.items.length > 0 ? (
                            <>
                                <div className="space-y-4">
                                {lastOrder.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-end font-bold text-lg">
                                    <span>Total: {formatPrice(lastOrder.total)}</span>
                                </div>
                            </>
                         ) : (
                             <p className="text-muted-foreground">Could not load order details.</p>
                         )}
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Package className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Estimated Delivery</p>
                                    <p className="text-sm text-muted-foreground">{deliveryDate}</p>
                                </div>
                            </div>
                             <div>
                                <p className="text-muted-foreground text-sm">Shipping to:</p>
                                {shipping ? (
                                    <p className="font-semibold">
                                        {shipping.fullName}, {shipping.street}{shipping.locality ? `, ${shipping.locality}` : ''}{shipping.landmark ? `, ${shipping.landmark}` : ''}, {shipping.city}{shipping.state ? `, ${shipping.state}` : ''}{shipping.pincode ? ` - ${shipping.pincode}` : ''}
                                    </p>
                                ) : (
                                    <p className="font-semibold text-muted-foreground">No shipping address available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/shipping-returns">Track Order</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
