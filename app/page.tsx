'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scene } from '@/components/3d/Scene'
import { About } from '@/app/sections/About'
import { Projects } from '@/app/sections/Projects'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        y: -150,
        opacity: 0,
        filter: 'blur(20px)',
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="relative bg-black">
      {/* 3D Scene - Fixed background with particles */}
      <Scene />
      
      {/* Hero Section */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center relative overflow-hidden z-10">
        <div 
          ref={heroRef}
          className="relative flex flex-col items-center justify-center will-change-transform w-full h-full"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
            <h1 className="text-[15vw] md:text-[12vw] font-bold text-white tracking-tighter whitespace-nowrap">
              ck0xDev
            </h1>
          </div>

          <div className="relative z-10 w-[200px] h-[250px] md:w-[280px] md:h-[350px]">
            <Image
              src="/avatar.png"
              alt="ck0xDev"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-light">
            Immersive Web Experience
          </p>
        </div>
      </section>

      

      {/* About Section */}
      <div className="relative z-20">
        <About />
      </div>

      {/* Projects Section */}
      <div className="relative z-20">
        <Projects />
      </div>
      
    </main>
  )
}