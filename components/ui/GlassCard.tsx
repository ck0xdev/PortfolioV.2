import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'low' | 'medium' | 'high'
  glow?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = 'high', glow = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative group',
          className
        )}
        {...props}
      >
        {/* Outer glow effect */}
        {glow && (
          <div className="absolute -inset-[1px] rounded-[20px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}
        
        {/* Main card with liquid glass effect */}
        <div className={cn(
          'relative rounded-[18px] p-[1px]',
          'bg-gradient-to-br from-white/40 via-white/10 to-white/5',
          'shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]',
          'backdrop-blur-[20px]',
          'overflow-hidden'
        )}>
          {/* Inner gradient border simulation */}
          <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/30 via-transparent to-white/10 pointer-events-none" />
          
          {/* Top highlight line */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          {/* Content container */}
          <div className="relative rounded-[17px] bg-black/20 p-8 md:p-12">
            {/* Noise texture overlay for liquid feel */}
            <div 
              className="absolute inset-0 rounded-[17px] opacity-[0.03] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Inner glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 blur-3xl pointer-events-none" />
            
            {/* Actual content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'