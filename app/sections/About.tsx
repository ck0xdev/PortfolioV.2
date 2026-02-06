"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-20 py-32 relative z-10"
    >
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
        >
          {/* Left - Large Text */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Creative
              <br />
              Developer
              <br />& Designer
            </h2>
          </div>

          {/* Right - Description */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              I'm ck0xDev, a developer focused on creating immersive digital
              experiences. I specialize in Three.js, React, and WebGL to build
              websites that stand out.
            </p>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Currently available for freelance projects and collaborations.
            </p>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                Get in touch <span>→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats - Simple Line */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-32 pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl md:text-4xl font-light text-white mb-2">
                3+
              </p>
              <p className="text-sm text-white/40 uppercase tracking-wider">
                Years
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light text-white mb-2">
                50+
              </p>
              <p className="text-sm text-white/40 uppercase tracking-wider">
                Projects
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light text-white mb-2">
                20+
              </p>
              <p className="text-sm text-white/40 uppercase tracking-wider">
                Clients
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
