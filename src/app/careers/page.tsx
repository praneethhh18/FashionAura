
'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { NewsletterForm } from '@/components/newsletter-form';

const jobPostings = [
    {
        title: 'Senior Frontend Developer',
        location: 'New York, NY (Remote)',
        department: 'Engineering',
        description: 'We are looking for an experienced Frontend Developer to build beautiful and performant user interfaces with React and Next.js.'
    },
    {
        title: 'Product Designer',
        location: 'San Francisco, CA (Hybrid)',
        department: 'Design',
        description: 'Join our design team to create intuitive and delightful experiences for our customers across all our digital platforms.'
    },
    {
        title: 'Digital Marketing Manager',
        location: 'London, UK (On-site)',
        department: 'Marketing',
        description: 'Lead our digital marketing campaigns, manage social media presence, and drive customer acquisition and engagement.'
    },
    {
        title: 'Data Scientist',
        location: 'Remote',
        department: 'Data & Analytics',
        description: 'Analyze large datasets to uncover insights, build machine learning models, and help us make data-driven decisions.'
    },
    {
        title: 'Customer Support Specialist',
        location: 'Austin, TX (Hybrid)',
        department: 'Customer Experience',
        description: 'Be the voice of Fashion Aura and provide exceptional support to our customers through various channels.'
    },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="A diverse group of colleagues celebrating success in an office."
            fill
            className="object-cover"
            data-ai-hint="diverse team success"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
              Join Our Team
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              We're building the future of fashion, and we need passionate people to help us create it. Explore our open positions and find your next opportunity.
            </p>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                 <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Why Work At Fashion Aura?</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="font-bold text-xl mb-2">Innovate & Create</h3>
                        <p className="text-muted-foreground">Work on challenging problems and have a real impact on a product used by millions.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl mb-2">Growth & Development</h3>
                        <p className="text-muted-foreground">We invest in our people with opportunities for learning, mentorship, and career advancement.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl mb-2">Vibrant Culture</h3>
                        <p className="text-muted-foreground">Join a collaborative, inclusive, and fun-loving team that values every voice.</p>
                    </div>
                 </div>
            </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-secondary">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Open Positions</h2>
                <div className="space-y-6">
                    {jobPostings.map(job => (
                        <Card key={job.title}>
                            <CardHeader className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
                                <div className="md:col-span-2">
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>{job.department}</CardDescription>
                                </div>
                                <div className="text-sm text-muted-foreground md:text-right">
                                    {job.location}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{job.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button>Apply Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
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
          <p>&copy; {new Date().getFullYear()} Fashion Aura. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
