
'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SupportChat } from './support-chat';
import { MessageSquare } from 'lucide-react';

const AiBotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 1024 1024" id="chatbot" className="h-7 w-7" {...props}>
        <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="m577.27 804.78-41.85.78-166.87 110.62c-.57.41-1.36 0-1.36-.7V804.34h-81.51c-59 0-106.81-47.82-106.81-106.81V394.45c0-58.99 47.81-106.81 106.81-106.81H738.33c58.99 0 106.81 47.82 106.81 106.81v303.08c0 58.99-47.82 106.81-106.81 106.81l-43.64.44H577.27z"></path>
        <circle cx="389.34" cy="448.2" r="61.34" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <circle cx="635.34" cy="448.2" r="61.34" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="M847.21 634.45V463.13h46.48c19.39 0 35.11 15.72 35.11 35.11v101.11c0 19.39-15.72 35.11-35.11 35.11h-46.48zM95.2 599.35V498.24c0-19.39 15.72-35.11 35.11-35.11h46.48v171.33h-46.48c-19.39-.01-35.11-15.73-35.11-35.11zm546.66 6.99c-8.57 61.51-64.53 109-132.32 109-67.77 0-123.75-47.49-132.32-109h264.64z"></path>
        <circle cx="509.54" cy="149.59" r="41.94" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20"></circle>
        <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="20" d="M509.54 244.21v-52.68"></path>
    </svg>
)

export function FloatingSupportButton() {
  return (
    <div className="fixed bottom-8 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-14 h-14 bg-black/80 text-white shadow-lg hover:bg-gray-800"
          >
            <AiBotIcon />
            <span className="sr-only">Support Chat</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
            side="top"
            align="end"
            className="w-80 md:w-96 mr-4 mb-2 p-0 border-0 rounded-2xl bg-gradient-to-br from-white to-purple-50 shadow-2xl"
        >
            <div className="p-4 pt-4 flex flex-col flex-grow h-96">
                <SupportChat />
            </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
