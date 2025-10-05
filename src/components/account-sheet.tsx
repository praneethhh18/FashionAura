
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { Loader2, User as UserIcon, Package, LogOut } from 'lucide-react';
import type { Order, UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from './ui/scroll-area';

interface AccountSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountSheet({ open, onOpenChange }: AccountSheetProps) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const auth = useAuth();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  
  const ordersCollectionRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'orders');
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);
  const { data: orders, isLoading: areOrdersLoading } = useCollection<Order>(ordersCollectionRef);

  const handleLogout = async () => {
    await signOut(auth);
    onOpenChange(false);
    router.push('/');
  };

  const isLoading = isUserLoading || isProfileLoading || areOrdersLoading;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-2xl font-bold">My Account</SheetTitle>
          <SheetDescription>View your profile and order history.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="p-6">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-6 w-6" />
                      <span>Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userProfile ? (
                      <div>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                      </div>
                    ) : (
                      <p>Could not load user profile.</p>
                    )}
                  </CardContent>
                </Card>

                <Separator className="my-8" />

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-6 w-6" />
                      <span>Order History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders && orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                  <p className="font-semibold text-xs">Order ID: <span className="font-mono text-xs text-muted-foreground">{order.id}</span></p>
                                  <p className="text-sm text-muted-foreground">
                                      Date: {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                  </p>
                              </div>
                              <p className="font-bold text-base">{formatPrice(order.total)}</p>
                            </div>
                            <Separator />
                            <div className="mt-4 space-y-2">
                              <h4 className="font-semibold">Items:</h4>
                              {order.items.map(item => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                      <span>{item.name} (x{item.quantity})</span>
                                      <span>{formatPrice(item.price * item.quantity)}</span>
                                  </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>You haven't placed any orders yet.</p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </ScrollArea>
        <div className="p-6 border-t">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
