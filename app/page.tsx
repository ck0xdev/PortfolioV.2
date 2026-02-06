'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scene } from '@/components/3d/Scene'
import { GlassCard } from '@/components/ui/GlassCard'
import { TactileButton } from '@/components/ui/TactileButton'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        scale: 2.5,
        opacity: 0,
        filter: 'blur(20px)',
        y: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="relative h-[200vh]">
      <Scene />
      
      {/* Sticky hero section */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4">
        <GlassCard 
          ref={cardRef} 
          intensity="high" 
          className="max-w-2xl text-center will-change-transform"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            ck0xDev
          </h1>
          <p className="text-xl text-white/80 mb-8 font-light">
            Creative Developer & 3D Designer
          </p>
          <div className="flex gap-4 justify-center">
            <TactileButton>View Projects</TactileButton>
            <TactileButton variant="secondary">Contact Me</TactileButton>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}