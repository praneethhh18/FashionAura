
'use client';

import { useState, useRef, useEffect, type FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { Loader2, Mic, Paperclip, SendHorizonal, User, ArrowRight, X } from 'lucide-react';
import { customerSupport } from '@/ai/flows/customer-support-flow';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


type Message = {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
};

const AiBotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 1024 1024" id="chatbot" {...props}>
        <path fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="m577.27 804.78-41.85.78-166.87 110.62c-.57.41-1.36 0-1.36-.7V804.34h-81.51c-59 0-106.81-47.82-106.81-106.81V394.45c0-58.99 47.81-106.81 106.81-106.81H738.33c58.99 0 106.81 47.82 106.81 106.81v303.08c0 58.99-47.82 106.81-106.81 106.81l-43.64.44H577.27z"></path>
        <circle cx="389.34" cy="448.2" r="61.34" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <circle cx="635.34" cy="448.2" r="61.34" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="M847.21 634.45V463.13h46.48c19.39 0 35.11 15.72 35.11 35.11v101.11c0 19.39-15.72 35.11-35.11 35.11h-46.48zM95.2 599.35V498.24c0-19.39 15.72-35.11 35.11-35.11h46.48v171.33h-46.48c-19.39-.01-35.11-15.73-35.11-35.11zm546.66 6.99c-8.57 61.51-64.53 109-132.32 109-67.77 0-123.75-47.49-132.32-109h264.64z"></path>
        <circle cx="509.54" cy="149.59" r="41.94" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="M509.54 244.21v-52.68"></path>
    </svg>
)

export function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const suggestions = [
      'What are your shipping policies?',
      'How do I return an item?',
      'Tell me about new arrivals'
  ]

  const handleSendMessage = async (e: FormEvent, message?: string) => {
    e.preventDefault();
    const query = message || input;
    if (!query.trim() && !image) return;

    const userMessage: Message = { role: 'user', content: query, image: image || undefined };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setIsLoading(true);

    try {
      const response = await customerSupport({ query: query, imageDataUri: image || undefined });
      
      if (response.error) {
        const errorMessage: Message = { role: 'assistant', content: response.error };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (response.response) {
        const assistantMessage: Message = { role: 'assistant', content: response.response };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = { role: 'assistant', content: "The AI didn't provide a response." };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Failed to get support response:', error);
      const errorMessageContent = "Sorry, I'm having trouble connecting at the moment. Please try again later.";
      const errorMessage: Message = { role: 'assistant', content: errorMessageContent };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Please upload an image smaller than 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone permissions in your browser settings.',
          });
        } else if (event.error !== 'no-speech' && event.error !== 'audio-capture') {
          console.error('Speech recognition error:', event.error);
          toast({
            variant: 'destructive',
            title: 'Voice Input Error',
            description: 'Something went wrong with speech recognition.',
          });
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [toast]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Voice Input Not Supported',
        description: 'Your browser does not support speech recognition.',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
              <div className="text-center text-sm text-gray-500 pt-10">
                  <div className="inline-block p-3 bg-white/50 rounded-full mb-4">
                     <AiBotIcon className="h-10 w-10 text-primary"/>
                  </div>
                  <p className="font-semibold text-base text-gray-700">AI Assistant</p>
                  <p>Ask me anything about products, shipping, or returns!</p>
              </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                  <AvatarFallback className="bg-transparent"><AiBotIcon className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-sm rounded-2xl px-4 py-3 text-sm',
                  message.role === 'user'
                    ? 'bg-gray-100 text-gray-800 rounded-br-none'
                    : 'bg-gray-900 text-white rounded-bl-none'
                )}
              >
                {message.image && (
                    <div className="mb-2 rounded-lg overflow-hidden">
                        <Image src={message.image} alt="User upload" width={200} height={150} className="object-cover" />
                    </div>
                )}
                {message.content && <p>{message.content}</p>}
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                <AvatarFallback className="bg-transparent"><AiBotIcon className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-900/80 rounded-2xl rounded-bl-none px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="mt-auto pt-4">
        {image && (
            <div className="relative w-24 h-24 mb-2 p-2 border rounded-lg">
                <Image src={image} alt="Preview" layout="fill" objectFit="cover" className="rounded-md" />
                <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-600 text-white" onClick={() => setImage(null)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )}
         {messages.length === 0 && !image && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {suggestions.map(s => (
                    <Button key={s} size="sm" variant="outline" className="rounded-full text-xs text-gray-600 bg-white/50" onClick={(e) => handleSendMessage(e, s)}>
                        {s}
                    </Button>
                ))}
            </div>
         )}
        <form onSubmit={handleSendMessage} className="relative">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100", isListening && "bg-red-100 text-red-500 hover:bg-red-200")}
                onClick={handleVoiceInput}
            >
                <Mic className="w-5 h-5" />
            </Button>
            <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask me anything..."}
            className="h-12 flex-grow rounded-full pl-10 pr-20 bg-white border-purple-200 focus-visible:ring-primary/50"
            disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                >
                    <Paperclip className="w-5 h-5" />
                </Button>
                 <Button
                    type="submit"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 disabled:bg-primary/50"
                    disabled={isLoading || (!input.trim() && !image)}
                    aria-label="Send message"
                >
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
}
