
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  street: z.string().min(1, "Street address is required"),
  locality: z.string().min(1, "Locality/Area is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit pin code"),
  addressType: z.enum(["home", "work", "other"]),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressPage() {
    const { cart, totalPrice, discountAmount, finalTotal, appliedCoupon } = useCart();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const form = useForm<AddressFormData>({
      resolver: zodResolver(addressSchema),
      defaultValues: {
        fullName: "",
        mobile: "",
        email: "",
        street: "",
        locality: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "home",
      },
    });

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const savedAddress = localStorage.getItem('shippingAddress');
            if (savedAddress) {
                form.reset(JSON.parse(savedAddress));
            }
        }
    }, [form]);

    const onSubmit = (data: AddressFormData) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('shippingAddress', JSON.stringify(data));
        }
        router.push('/checkout/payment');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & Address Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mobile Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 98765 43210" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email ID</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel>Address</FormLabel>
                                         <FormField
                                            control={form.control}
                                            name="street"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input placeholder="Street Name & Number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name="locality"
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input placeholder="Locality / Area" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Input id="address-landmark" placeholder="Landmark (Optional)" {...form.register("landmark")} />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Mumbai" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Maharashtra" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name="pincode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pin Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., 400001" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="addressType"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Save address as</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex gap-4"
                                                    >
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="home" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">Home</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="work" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">Work</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="other" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">Other</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <Button type="submit" size="lg" className="w-full mt-6 h-12 text-base">
                                        Proceed to Payment
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
                <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                     <div className="space-y-4">
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
    )
}

    