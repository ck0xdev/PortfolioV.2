'use client'

import { cn } from '@/lib/utils'

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function TactileButton({ 
  className, 
  variant = 'primary', 
  children, 
  ...props 
}: TactileButtonProps) {
  return (
    <button
      className={cn(
        'relative px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider',
        'transition-all duration-300 ease-out',
        'active:scale-[0.98] active:translate-y-[2px]',
        'group overflow-hidden',
        variant === 'primary' 
          ? 'text-white' 
          : 'text-white/90 hover:text-white',
        className
      )}
      {...props}
    >
      {/* Button background with glass effect */}
      <span className={cn(
        'absolute inset-0 rounded-xl',
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-[100%_0] transition-all duration-500'
          : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30'
      )} />
      
      {/* Top highlight */}
      <span className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Inner glow */}
      <span className={cn(
        'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl',
        variant === 'primary' ? 'bg-purple-500/30' : 'bg-white/10'
      )} />
      
      {/* Button text */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}