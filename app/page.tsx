"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "@/components/3d/Scene";
import { About } from "@/app/sections/About";
import { Projects } from "@/app/sections/Projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        y: -150,
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative">
      {/* 3D BACKGROUND - Always visible */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* ALL CONTENT - Transparent to show 3D behind */}
      <div className="relative z-10">
        {/* Hero Section - Image on top of text */}
        <section className="h-screen flex flex-col items-center justify-center sticky top-0 overflow-hidden">
          <div
            ref={heroRef}
            className="relative flex flex-col items-center will-change-transform w-full h-full justify-center"
          >
            {/* Text BEHIND image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <h1 className="text-[18vw] md:text-[14vw] font-bold text-white tracking-tighter whitespace-nowrap opacity-90">
                ck0xDev
              </h1>
            </div>

            {/* Image ON TOP of text */}
            <div className="relative z-10 w-[220px] h-[280px] md:w-[300px] md:h-[380px]">
              <Image
                src="/avatar.png"
                alt="ck0xDev"
                fill
                className="object-cover object-top drop-shadow-2xl"
                priority
              />
            </div>

            <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/50 font-light relative z-10">
              Immersive Web Experience
            </p>
          </div>
        </section>

        {/* About - Transparent background */}
        <div className="relative">
          <About />
        </div>

        {/* Projects - Transparent background */}
        <div className="relative">
          <Projects />
        </div>

      </div>
    </main>
  );
}
