
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Package, Truck, Home, Undo2, Loader2 } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';


const TrackingStatus = ({ status }: { status: string | null }) => {
    if (!status) return null;

    const steps = [
        { name: 'Ordered', icon: <Package className="h-5 w-5" /> },
        { name: 'Shipped', icon: <Truck className="h-5 w-5" /> },
        { name: 'Delivered', icon: <Home className="h-5 w-5" /> },
    ];
    
    const statusIndex = status === 'success' ? 2 : status === 'shipping' ? 1 : 0;

    return (
        <Card className="mt-6">
            <CardContent className="p-6">
                <h3 className="font-bold mb-4">Order Status</h3>
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <div key={step.name} className="flex flex-col items-center flex-1">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${index <= statusIndex ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                {step.icon}
                            </div>
                            <p className={`mt-2 text-sm font-semibold ${index <= statusIndex ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
                        </div>
                    ))}
                </div>
                 <div className="relative w-full h-1 bg-secondary mt-2">
                    <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-500" style={{ width: `${(statusIndex / (steps.length - 1)) * 100}%` }}></div>
                </div>
            </CardContent>
        </Card>
    );
}


export default function ShippingReturnsPage() {
    const { toast } = useToast();
    const [trackingId, setTrackingId] = useState('');
    const [trackingStatus, setTrackingStatus] = useState<string | null>(null);
    const [isTracking, setIsTracking] = useState(false);

    const [orderId, setOrderId] = useState('');
    const [productName, setProductName] = useState('');
    const [returnReason, setReturnReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter a tracking ID.'});
            return;
        }
        setIsTracking(true);
        setTrackingStatus(null);
        // Simulate API call
        setTimeout(() => {
            if (trackingId.toLowerCase().includes('ship')) {
                setTrackingStatus('shipping');
            } else if (trackingId.toLowerCase().includes('deliver')) {
                setTrackingStatus('success');
            } else {
                setTrackingStatus('ordered');
            }
            setIsTracking(false);
        }, 1500);
    }

    const handleReturnRequest = (e: React.FormEvent) => {
        e.preventDefault();
         if (!orderId || !productName || !returnReason) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all fields.'});
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            toast({ title: 'Return Request Submitted', description: 'We will process your request within 2 business days.'});
            setOrderId('');
            setProductName('');
            setReturnReason('');
            setIsSubmitting(false);
        }, 1500);
    }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow px-4 md:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-black uppercase tracking-wide text-foreground text-center">
            Shipping & Returns
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Easily track your order or start a return. We're here to help make your experience as smooth as possible.
          </p>
        
          <Tabs defaultValue="shipping" className="mt-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping" className="gap-2">
                <Truck className="h-5 w-5" /> Track Your Order
              </TabsTrigger>
              <TabsTrigger value="returns" className="gap-2">
                <Undo2 className="h-5 w-5" /> Request a Return
              </TabsTrigger>
            </TabsList>
            <TabsContent value="shipping">
                <Card>
                    <CardHeader>
                        <CardTitle>Track Your Shipment</CardTitle>
                        <CardDescription>Enter your tracking ID below to see the latest updates on your order.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTrackOrder} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tracking-id">Tracking ID</Label>
                                <Input 
                                    id="tracking-id" 
                                    placeholder="e.g., FASHIONAURA123456" 
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isTracking}>
                                {isTracking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Track Order
                            </Button>
                        </form>
                        {isTracking && (
                            <div className="mt-6 text-center">
                                <p className="text-muted-foreground">Searching for your order...</p>
                            </div>
                        )}
                        <TrackingStatus status={trackingStatus} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="returns">
              <Card>
                <CardHeader>
                    <CardTitle>Submit a Return Request</CardTitle>
                    <CardDescription>Fill out the form below to initiate a return. Please refer to our return policy in the FAQ.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={handleReturnRequest} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="order-id">Order ID</Label>
                            <Input id="order-id" placeholder="e.g., ORD-98765" value={orderId} onChange={e => setOrderId(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input id="product-name" placeholder="e.g., Urban Edge Sneakers" value={productName} onChange={e => setProductName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-reason">Reason for Return</Label>
                            <Select onValueChange={setReturnReason} value={returnReason}>
                                <SelectTrigger id="return-reason">
                                    <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="wrong-size">Wrong size</SelectItem>
                                    <SelectItem value="damaged-defective">Damaged or defective</SelectItem>
                                    <SelectItem value="not-as-described">Not as described</SelectItem>
                                    <SelectItem value="changed-mind">Changed my mind</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="comments">Additional Comments (Optional)</Label>
                            <Textarea id="comments" placeholder="Provide any extra details here..." />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
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
          <p>&copy; {new Date().getFullYear()} Fashion Aura. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
