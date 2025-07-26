
"use client";

import { cn } from '@/lib/utils';
import { RuneIcon } from '../icons/rune-icon';

type StaticCoinProps = {
  side: 'light' | 'dark';
  className?: string;
};

export function StaticCoin({ side, className }: StaticCoinProps) {
  return (
    <div className={cn("group [perspective:1000px]", className)}>
      <div
        className={cn(
          "relative h-32 w-32 transition-transform duration-700 [transform-style:preserve-3d]",
           side === 'dark' ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* Front Face (Light) */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/50 via-primary/80 to-accent/70 p-1 [backface-visibility:hidden]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-card animate-coin-glow">
             <RuneIcon className="h-20 w-20 text-primary" />
          </div>
        </div>
        {/* Back Face (Dark) */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-accent/50 via-accent/80 to-primary/70 p-1 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-card animate-coin-glow">
                <RuneIcon className="h-20 w-20 text-accent -scale-x-100" />
            </div>
        </div>
      </div>
    </div>
  );
}
