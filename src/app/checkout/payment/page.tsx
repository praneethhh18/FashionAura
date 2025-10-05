
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Landmark, Wallet, Truck, ShieldCheck } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const cardPaymentSchema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "Invalid CVV"),
});

const upiPaymentSchema = z.object({
  upiId: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID"),
});

const netbankingPaymentSchema = z.object({
  bank: z.string().min(1, "Please select a bank"),
});

const walletPaymentSchema = z.object({
    wallet: z.string().min(1, "Please select a wallet"),
});

type CardFormData = z.infer<typeof cardPaymentSchema>;
type UpiFormData = z.infer<typeof upiPaymentSchema>;
type NetbankingFormData = z.infer<typeof netbankingPaymentSchema>;
type WalletFormData = z.infer<typeof walletPaymentSchema>;


export default function PaymentPage() {
    const { cart, totalPrice, discountAmount, finalTotal, appliedCoupon, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState("card");

    const cardForm = useForm<CardFormData>({
        resolver: zodResolver(cardPaymentSchema),
        defaultValues: { cardNumber: "", expiry: "", cvv: "" }
    });
    const upiForm = useForm<UpiFormData>({
        resolver: zodResolver(upiPaymentSchema),
        defaultValues: { upiId: "" }
    });
    const netbankingForm = useForm<NetbankingFormData>({
        resolver: zodResolver(netbankingPaymentSchema),
        defaultValues: { bank: "" }
    });
    const walletForm = useForm<WalletFormData>({
        resolver: zodResolver(walletPaymentSchema),
        defaultValues: { wallet: "" }
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const processPayment = () => {
        // Simulate payment processing
        if (typeof window !== 'undefined') {
            localStorage.setItem('last-order', JSON.stringify({ items: cart, total: finalTotal }));
        }
        toast({
            title: "Payment Successful!",
            description: "Your order has been confirmed.",
        });
        clearCart();
        router.push('/checkout/confirmation');
    };

    const handlePayment = async () => {
        let isValid = false;
        if (activeTab === "card") {
            isValid = await cardForm.trigger();
            if (isValid) processPayment();
        } else if (activeTab === "upi") {
            isValid = await upiForm.trigger();
             if (isValid) processPayment();
        } else if (activeTab === "netbanking") {
            isValid = await netbankingForm.trigger();
             if (isValid) processPayment();
        } else if (activeTab === "wallets") {
            isValid = await walletForm.trigger();
             if (isValid) processPayment();
        } else if (activeTab === "cod") {
            processPayment();
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Payment Method</CardTitle>
                            <CardDescription>Choose how you'd like to pay for your order.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="card"><CreditCard className="h-5 w-5"/></TabsTrigger>
                                    <TabsTrigger value="upi">UPI</TabsTrigger>
                                    <TabsTrigger value="netbanking"><Landmark className="h-5 w-5"/></TabsTrigger>
                                    <TabsTrigger value="wallets"><Wallet className="h-5 w-5"/></TabsTrigger>
                                    <TabsTrigger value="cod"><Truck className="h-5 w-5"/></TabsTrigger>
                                </TabsList>
                                <TabsContent value="card" className="pt-6">
                                     <Form {...cardForm}>
                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                            <FormField
                                                control={cardForm.control}
                                                name="cardNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Card Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="XXXX XXXX XXXX XXXX" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={cardForm.control}
                                                    name="expiry"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Expiry Date</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="MM / YY" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={cardForm.control}
                                                    name="cvv"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>CVV</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="XXX" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </form>
                                     </Form>
                                </TabsContent>
                                <TabsContent value="upi" className="pt-6 text-center">
                                    <Form {...upiForm}>
                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                            <FormField
                                                control={upiForm.control}
                                                name="upiId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Enter UPI ID</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="yourname@bank" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex items-center gap-4 justify-center">
                                                <Image src="/icons/gpay.svg" alt="Google Pay" width={40} height={40} />
                                                <Image src="/icons/phonepe.svg" alt="PhonePe" width={40} height={40} />
                                                <Image src="/icons/paytm.svg" alt="Paytm" width={40} height={40} />
                                            </div>
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value="netbanking" className="pt-6">
                                    <Form {...netbankingForm}>
                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                                            <FormField
                                                control={netbankingForm.control}
                                                name="bank"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Select Bank</FormLabel>
                                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Choose your bank" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="sbi">State Bank of India</SelectItem>
                                                                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                                                <SelectItem value="icici">ICICI Bank</SelectItem>
                                                                <SelectItem value="axis">Axis Bank</SelectItem>
                                                                <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value="wallets" className="pt-6">
                                    <Form {...walletForm}>
                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                                             <FormField
                                                control={walletForm.control}
                                                name="wallet"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Select Wallet</FormLabel>
                                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Choose your wallet" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="amazon">Amazon Pay</SelectItem>
                                                                <SelectItem value="paytm">Paytm Wallet</SelectItem>
                                                                <SelectItem value="phonepe">PhonePe Wallet</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value="cod" className="pt-6 text-center">
                                    <div className="p-4 bg-gray-100 rounded-md">
                                        <Truck className="h-10 w-10 mx-auto text-muted-foreground" />
                                        <h3 className="font-semibold mt-2">Cash on Delivery</h3>
                                        <p className="text-sm text-muted-foreground">Pay with cash at the time of delivery.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="flex items-center gap-2 mt-8 text-xs text-gray-500 justify-center">
                                <ShieldCheck className="h-4 w-4 text-green-600" />
                                <span>Your payment details are encrypted and secure.</span>
                            </div>
                            <Button size="lg" className="w-full mt-4 h-12 text-base" onClick={handlePayment}>
                                Complete Payment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                     <div className="space-y-4 max-h-64 overflow-y-auto">
                        {isClient && cart.map(item => (
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
                    {isClient && (
                    <div className="mt-6 pt-6 border-t space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between text-green-600 font-semibold">
                                <span>Discount ({appliedCoupon.code})</span>
                                <span>-{formatPrice(discountAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total</span>
                            <span>{formatPrice(finalTotal)}</span>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

    