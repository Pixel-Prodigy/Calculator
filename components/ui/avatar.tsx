'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

export const Avatar = AvatarPrimitive.Root;

export const AvatarImage = ({ className, ...props }: AvatarPrimitive.AvatarImageProps) => (
  <AvatarPrimitive.Image className={cn('h-full w-full object-cover', className)} {...props} />
);

export const AvatarFallback = ({ className, ...props }: AvatarPrimitive.AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white',
      className
    )}
    {...props}
  />
);
