import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-xl',
        className
      )}
      {...props}
    />
  );
}
