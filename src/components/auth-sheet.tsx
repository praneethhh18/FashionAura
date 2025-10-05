
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeOff, Loader2 } from 'lucide-react';
import { Logo } from './logo';
import { useToast } from '@/hooks/use-toast';

interface AuthSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthSheet({ open, onOpenChange }: AuthSheetProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDummyAuth = (type: 'login' | 'signup') => {
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      if (type === 'signup') {
        if (password !== confirmPassword) {
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: "Passwords don't match.",
            });
            setIsLoading(false);
            return;
        }
        toast({
          title: 'Account Created! (Simulation)',
          description: 'Welcome to Fashion Aura. Happy shopping!',
        });
      } else {
        toast({
          title: 'Login Successful! (Simulation)',
          description: 'Welcome back! Happy shopping!',
        });
      }
      setIsLoading(false);
      onOpenChange(false);
      // Clear fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  const handlePasswordReset = () => {
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email required',
        description: 'Please enter your email address to reset your password.',
      });
      return;
    }
    toast({
        title: 'Password Reset Email Sent (Simulation)',
        description: `If an account exists for ${email}, you will receive reset instructions.`,
    });
  }


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-transparent border-none shadow-none w-full p-0">
          <div className="flex h-full">
            <div className="w-1/2 h-full hidden md:block" onClick={() => onOpenChange(false)}>
                <div className="bg-black/50 h-full w-full" />
            </div>
            <div className="w-full md:w-1/2 h-full bg-white text-black p-4 md:p-8 relative overflow-y-auto">
             <SheetHeader>
                <SheetTitle className="sr-only">Authentication</SheetTitle>
                <SheetDescription className="sr-only">Log in or create an account.</SheetDescription>
             </SheetHeader>
              <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" />
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mb-8">
                  <TabsTrigger
                    value="login"
                    className="text-base text-gray-500 rounded-none border-b-2 border-gray-200 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="text-base text-gray-500 rounded-none border-b-2 border-gray-200 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                  >
                    Create my account
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                Login
                            </h2>
                            <Logo className="h-8" />
                        </div>
                        <div className="space-y-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="login-email">Email address *</Label>
                                <Input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border-gray-400 rounded-md h-12"/>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="login-password">Password *</Label>
                                <div className="relative">
                                    <Input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border-gray-400 rounded-md h-12 pr-10"/>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    </span>
                                </div>
                            </div>
                        </div>
                         <Button
                            variant="link"
                            className="p-0 h-auto text-sm underline underline-offset-4 hover:text-gray-700"
                            onClick={handlePasswordReset}
                          >
                            Forgot your password?
                          </Button>
                        <Button className="w-full bg-black text-white rounded-full h-12 text-base font-bold" onClick={() => handleDummyAuth('login')} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign in
                        </Button>
                    </div>

                    <div className="border rounded-lg p-6 text-center space-y-4">
                        <h3 className="font-bold text-lg">Not a member yet?</h3>
                        <p className="text-sm text-gray-600 max-w-sm mx-auto">
                            Create your free Fashion Aura account for instant access to free shipping, events, special rewards, and more. It's quick and easy to join.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full border-black text-black rounded-full h-12 text-base font-bold"
                            onClick={() => setActiveTab('signup')}
                        >
                            Create my account
                        </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="signup">
                   <div className="space-y-6">
                    <div className="border rounded-lg p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Create Account
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Create an account for a faster checkout experience and to manage your orders.
                            </p>
                        </div>
                        <div className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="signup-email">Email Address*</Label>
                            <Input type="email" id="signup-email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border-gray-400 rounded-md h-12"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="signup-password">Password*</Label>
                            <Input type="password" id="signup-password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border-gray-400 rounded-md h-12"/>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="signup-confirm-password">Confirm Password*</Label>
                            <Input type="password" id="signup-confirm-password" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white border-gray-400 rounded-md h-12"/>
                        </div>
                        </div>
                        <Button className="w-full bg-black text-white rounded-full h-12 text-base font-bold" onClick={() => handleDummyAuth('signup')} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </div>
                     <div className="border rounded-lg p-6 text-center">
                        <p className="text-sm">
                            <span>Already have an account? </span>
                            <button
                                onClick={() => setActiveTab('login')}
                                className="p-0 m-0 h-auto underline underline-offset-4 font-semibold"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
      </SheetContent>
    </Sheet>
  );
}
