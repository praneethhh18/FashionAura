
'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterForm } from '@/components/newsletter-form';
import { getImage } from '@/lib/placeholder-images';

const PraneethIcon = () => (
    <svg width="80" height="80" viewBox="0 0 512 512" id="business-profession">
        <path d="M200.607 2.125L304.058 1.96159C314.373 2.0346 322.928 10.2084 324.739 20.25C325.206 22.8442 325.074 26.1554 326.333 28.4856L326.481 28.75C335.682 45.677 373.495 37.3004 373.018 83.4077L372.979 124.669C373.454 125.176 373.908 125.682 374.47 126.096C384.769 133.683 383.229 148.446 383.227 159.582C383.225 175.242 384.454 194.748 364.5 199.829C361.211 200.667 355.67 200.696 352.374 199.988L352.072 199.917C351.801 208.359 352.38 216.513 350.139 224.797C344.866 244.294 335.961 259.426 318.882 271.379C323.238 275.162 329.21 277.963 334.38 280.482L429.598 327.738C474.168 352.53 505.807 396.609 509.779 448.292C510.452 457.038 510.02 466.061 510.024 474.838L510.027 493.489C510.026 497.127 510.177 500.836 509.883 504.461L507.732 505.532C507.096 506.784 506.601 507.949 506.446 509.359L506.42 509.618C505.639 509.978 504.478 509.978 503.625 509.997L311.125 510.003L89.1846 510.006C80.538 510.006 8.0681 510.482 6.375 509.698C4.06875 503.525 2.02258 507.189 1.99862 498.639L1.99092 461.052C1.9909 456.281 1.7235 451.318 2.22141 446.572C7.41079 397.118 35.7937 355.076 78.6023 329.61C92.1998 321.521 107.061 315.237 121.322 308.414L193.524 272.25C170.392 255.329 158.29 227.966 159.774 199.591C154.666 200.536 148.41 200.382 143.682 197.978L142.805 197.539C126.753 189.658 128.73 173.184 128.685 158.347L128.666 148.026C128.661 139.686 129.891 132.05 136.875 126.38C138.285 125.235 139.76 125.188 139.7 123.242L139.509 90.2672C139.51 79.7261 138.58 69.1237 143.644 59.4345L143.839 59.0663C145.789 55.3207 148.657 51.6421 152.089 49.1472L152.473 48.875C156.918 45.6795 164.285 44.0043 166.771 41.7707C176.78 32.7759 173.063 3.89784 200.607 2.125ZM283.799 94.9651C272.194 103.244 241.562 110.993 227.792 114.885L183.257 126.776C181.434 127.233 178.236 127.559 177.835 129.745L177.672 131.073C176.862 138.617 176.751 143.773 176.743 151.484L176.74 196.541C176.744 200.544 176.531 204.675 176.805 208.663C178.132 227.96 187.028 246.23 203.162 257.29C211.846 263.244 222.373 266.402 232.439 269.092C270.832 279.366 322.016 264.636 333.127 222.129C335.597 212.678 335.058 203.159 335.018 193.5L334.992 145.297C334.973 120.952 333.03 121.885 312.285 112.47C302.634 108.09 291.492 102.493 283.799 94.9651ZM201.581 287.625L189.75 293.496C186.908 294.936 183.917 296.243 181.313 298.086L209.007 358.623C212.446 356.937 215.549 354.607 218.514 352.195C222.472 349.085 242.208 333.488 244.218 329.821L203.002 287.918C202.529 287.446 202.21 287.432 201.581 287.625ZM311.333 287.159L267.662 329.679L284.117 344.183C287.436 346.938 290.762 349.851 294.335 352.273L303.07 358.517L330.788 298.039L311.333 287.159ZM152.291 137.01C149.97 137.716 148.291 138.609 146.875 140.652L146.631 140.999C146.075 141.806 145.82 142.285 145.75 143.25L145.72 143.585C145.344 148.311 145.738 153.325 145.747 158.075L145.773 169.606C145.8 175.919 146.05 182.332 154.035 183.505C159.262 183.437 159.809 182.774 159.977 177.838L160.104 151.728C160.152 145.851 162.031 139.731 154.875 137.25L154.614 137.157C153.865 136.91 153.067 136.982 152.291 137.01ZM356.931 137.08C355.672 137.274 353.145 137.589 352.391 138.75C351.164 140.639 351.997 178.937 352.207 182.356C355.433 183.306 357.902 183.278 361.165 182.498C363.536 181.235 364.917 179.766 365.689 177.125L366.001 175.476C366.38 173.229 366.263 170.85 366.272 168.575L366.346 147.977C366.187 142.684 364.64 138.069 358.441 137.084C358.031 137.019 357.323 136.928 356.931 137.08ZM289.195 370.625L289.53 398.09L291.569 392.381L296.948 375.018L292.167 372.132C291.25 371.561 290.251 370.788 289.195 370.625ZM222.475 371.375C220.078 372.657 217.201 374.093 215.248 375.995L220.509 390.648C221.28 392.414 221.964 394.588 222.947 396.221L222.475 371.375Z" />
        <path fill="#E55A42" d="M224.537 285.691C231.338 286.395 238.098 288.259 244.9 289.156 258.057 290.891 275.366 288.892 288.555 285.7L273.982 299.098 256.282 317.27 234.709 295.15C231.542 292.037 228.415 288.709 224.908 285.978L224.537 285.691zM342.949 314.046L359.212 336.921C353.463 341.734 347.947 346.129 344.463 352.954L359.052 377.478 304.457 432.572 296.029 441.354C293.83 443.684 291.716 446.081 289.07 447.92 289.412 443.158 291.344 438.697 293.009 434.272L318.115 368.135 342.949 314.046zM169.747 314.663C171.804 317.961 173.038 321.702 174.456 325.304L188.831 357.442C191.177 362.246 193.67 367.014 195.708 371.959L219.01 433.649C220.806 438.164 222.71 442.936 223.371 447.776L206.522 432.161 157.83 382.47C156.006 380.663 153.955 378.894 152.466 376.797 154.817 372.409 158.188 368.473 161.029 364.384 163.591 360.697 165.802 356.791 168.478 353.182 164.908 346.936 158.303 342.086 153.123 337.195 159.493 330.324 162.83 321.162 169.747 314.663zM256.403 342.683L271.725 357.064C273.106 358.644 272.337 359.946 272.323 361.937L272.363 433.305C272.371 448.413 267.031 466.562 259.389 479.356 258.587 480.7 257.724 482.499 256.505 483.502L255.96 483.125C248.477 475.81 245.659 463.597 242.934 453.836 239.984 443.27 239.612 440.178 239.651 429.418L239.613 361.667C239.587 360.733 239.375 359.75 239.392 358.828 239.423 357.128 254.092 344.662 256.403 342.683z" />
        <path fill="#4785DD" d="M211.39 18.8091L298.937 18.9055C305.635 19.2226 307 19.2596 308.413 26.0154C311.738 41.9161 319.076 47.1662 333.187 54.1559L343.715 59.1976C353.576 64.0543 355.421 69.0136 355.449 80.0766L355.463 91.302C355.469 100.793 355.898 110.528 355.274 119.99C350.06 121.639 350.045 119.076 346.646 114.785C333.106 97.6895 308.894 97.6145 294.292 79.6834L291.817 76.967C285.91 71.439 281.687 75.0928 276.093 79.0207C262.729 88.4058 246.244 91.7613 230.767 96.0409L181.578 109.374C170.348 112.351 169.088 113.03 161.542 121.8C160.013 121.314 158.524 120.77 157.178 119.882L157.246 79.5059C157.252 76.1054 157.008 71.9801 158.15 68.7433L158.286 68.375C159.864 63.9835 161.528 62.7029 165.822 61.37C179.078 57.2556 184.008 48.5302 188.751 35.9229C194.25 21.3057 194.663 19.3851 211.39 18.8091Z" />
        <path fill="#E2C744" d="M363.328 313.668L386.233 325.581C400.236 332.28 414.937 338.285 428.121 346.536 466.723 370.696 489.843 408.95 493.121 454.101 493.487 459.152 493.332 464.27 493.336 469.334L493.346 494.022C490.539 493.656 487.658 493.729 484.832 493.72L431.158 493.632 430.99 429.202C430.985 427.017 431.159 424.546 430.783 422.395 430.181 418.956 425.915 415.128 422.455 415.126 412.631 415.121 414.23 428.019 414.227 434.077L414.232 459.625 414.227 493.578 271.726 493.732C273.207 492.776 274.609 489.909 275.855 488.451L289.239 473.612 369.722 390.59C373.302 387.055 378.557 383.795 380.85 379.233 380.236 376.701 378.79 374.591 377.335 372.472L364.913 354.08C370.288 351.051 377.714 345.732 381.023 340.301 378.8 333.289 373.781 327.911 369.438 322.146L363.328 313.668zM148.053 314.375C148.243 314.934 147.838 315.193 147.522 315.644L140.5 325.4C138.282 328.447 132.65 335.135 132.333 339.03 132.03 342.759 140.814 350.834 143.718 353.296L146.403 355.459C146.955 355.89 145.532 357.188 145.198 357.677L139.546 365.918C134.838 372.629 129.093 376.799 135.219 383.653 141.641 390.84 148.924 397.479 155.705 404.344L226.886 478.363 236.481 489.249C237.362 490.33 238.815 493.04 239.891 493.615L97.6758 493.623 97.5116 458.049 97.4681 427.141C97.4502 425.249 97.6567 423.026 96.8119 421.288L96.6796 421.024C92.8219 412.7 81.9337 413.759 80.7222 422.238 80.3857 424.592 80.6876 427.047 80.7201 429.418L80.7771 493.661 18.5169 493.713C18.1801 492.724 18.3236 491.3 18.3081 490.237L18.2699 481.706C18.2538 473.133 17.9011 464.381 18.3867 455.826 21.2254 405.812 50.3219 364.003 93.6802 340.665L148.053 314.375z" />
    </svg>
)

const teamMembers = [
    { name: 'Praneeth P K', role: 'CEO & Founder', image: null, icon: PraneethIcon },
]

const faqItems = [
    {
        question: 'What is your shipping policy?',
        answer: 'We offer free standard shipping on all orders. Expedited shipping is available for an additional fee. Most orders are processed and shipped within 1-2 business days.'
    },
    {
        question: 'How do I return an item?',
        answer: 'We accept returns within 30 days of purchase for a full refund. Items must be in their original condition. To initiate a return, please visit our returns portal or contact our support team.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 100 countries worldwide. International shipping rates and times vary by destination. Please proceed to checkout to see the options for your location.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order has shipped, you will receive an email with a tracking number. You can use this number on the carrier\'s website to track your package\'s progress.'
    }
]

export default function AboutUsPage() {
  return (
    <div className="flex flex-col bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
          <Image
            src={getImage('creative-team-collaboration').imageUrl}
            alt="A team of creative professionals collaborating in a modern office."
            fill
            className="object-cover"
            data-ai-hint={getImage('creative-team-collaboration').imageHint}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display uppercase font-black tracking-tight">
              Our Story
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              At Fashion Aura, fashion isn’t just about clothing—it’s about self-expression, confidence, and lifestyle. We bring together the latest trends, timeless classics, and everyday essentials.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-secondary">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground">Our Mission</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our mission is to make fashion accessible, innovative, and inspiring. We combine quality craftsmanship, sustainable choices, and exclusive offers to deliver value that goes beyond just style. We are your one-stop destination for modern fashion, designed to keep you comfortable, confident, and effortlessly stylish for every moment of your life.
                </p>
            </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 md:py-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Meet the Team</h2>
                <div className="flex justify-center">
                    {teamMembers.map(member => (
                        <div key={member.name} className="text-center">
                            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/20">
                                {member.image ? (
                                    <AvatarImage src={member.image} alt={member.name} />
                                ) : member.icon ? (
                                    <div className="flex items-center justify-center h-full w-full bg-secondary">
                                      <member.icon />
                                    </div>
                                ) : (
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 px-4 md:px-8 bg-secondary scroll-mt-20">
            <div className="max-w-5xl mx-auto">
                 <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Get In Touch</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Card className="p-6">
                        <CardContent className="flex flex-col items-center gap-4 p-0">
                           <div className="bg-primary text-primary-foreground rounded-full p-3">
                                <MapPin className="h-8 w-8"/>
                           </div>
                           <h3 className="font-bold text-xl">Our Office</h3>
                           <p className="text-muted-foreground">India</p>
                        </CardContent>
                    </Card>
                     <Card className="p-6">
                        <CardContent className="flex flex-col items-center gap-4 p-0">
                           <div className="bg-primary text-primary-foreground rounded-full p-3">
                                <Mail className="h-8 w-8"/>
                           </div>
                           <h3 className="font-bold text-xl">Email Us</h3>
                           <p className="text-muted-foreground">support@fashionaura.com</p>
                        </CardContent>
                    </Card>
                     <Card className="p-6">
                        <CardContent className="flex flex-col items-center gap-4 p-0">
                           <div className="bg-primary text-primary-foreground rounded-full p-3">
                                <Phone className="h-8 w-8"/>
                           </div>
                           <h3 className="font-bold text-xl">Call Us</h3>
                           <p className="text-muted-foreground">+XX XXXXXXXXXX</p>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 px-4 md:px-8 scroll-mt-20">
             <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-display font-black uppercase tracking-wide text-foreground text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map(item => (
                        <AccordionItem key={item.question} value={item.question}>
                            <AccordionTrigger className="text-lg font-bold text-left">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
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
