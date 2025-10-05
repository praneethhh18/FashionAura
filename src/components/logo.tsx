import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Image 
        src="/logos/newlogo.JPG"
        alt="Fashion Aura logo"
        width={180}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
};
