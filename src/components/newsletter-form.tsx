
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const NewsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type NewsletterFormData = z.infer<typeof NewsletterSchema>;

export function NewsletterForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
        try {
        console.log('Newsletter subscription:', data.email);
        toast({
            title: 'Thank you for subscribing!',
            description: "You're now on our list for the latest news and offers.",
        });
        reset();
        } catch (error) {
        console.error('Newsletter subscription failed:', error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'Could not subscribe. Please try again later.',
        });
        } finally {
            setIsSubmitting(false);
        }
    }, 1000);
  };

  return (
    <div>
      <h3 className="font-bold uppercase tracking-wider mb-4">Newsletter</h3>
      <p className="text-sm text-gray-300 mb-2">
        Subscribe to get the latest news and offers.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <Input
          type="email"
          placeholder="Enter your email"
          className="bg-gray-800 text-white px-3 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...register('email')}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          className="rounded-r-md rounded-l-none bg-primary text-primary-foreground hover:bg-gray-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
        </Button>
      </form>
      {errors.email && (
        <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
      )}
    </div>
  );
}
