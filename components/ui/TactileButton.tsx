'use client'

import { cn } from '@/lib/utils'

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function TactileButton({ 
  className, 
  variant = 'primary',
  size = 'md',
  children, 
  ...props 
}: TactileButtonProps) {
  const sizes = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-base'
  }

  return (
    <button
      className={cn(
        'relative rounded-xl font-semibold uppercase tracking-wider',
        'transition-all duration-300 ease-out',
        'active:scale-[0.98] active:translate-y-[2px]',
        'group overflow-hidden',
        variant === 'primary' 
          ? 'text-white' 
          : 'text-white/90 hover:text-white',
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Background */}
      <span className={cn(
        'absolute inset-0 rounded-xl',
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-[100%_0] transition-all duration-500'
          : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
      )} />
      
      {/* Top highlight */}
      <span className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Text */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}