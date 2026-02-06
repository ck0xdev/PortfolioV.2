'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  { id: 1, title: 'DataXplore', category: 'Data Visualization', year: '2024' },
  { id: 2, title: 'Bill Handler', category: 'Finance App', year: '2024' },
  { id: 3, title: 'Neon Verse', category: '3D Experience', year: '2023' },
  { id: 4, title: 'Cyber Chat', category: 'AI Interface', year: '2023' },
]

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-20 relative z-10 bg-black/50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-6xl md:text-8xl font-bold text-white mb-20"
        >
          Selected<br />Works
        </motion.h2>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group border-t border-white/10 py-8 flex items-center justify-between hover:bg-white/5 transition-colors px-4 -mx-4 cursor-pointer"
            >
              <div className="flex items-baseline gap-8">
                <span className="text-sm text-white/40 font-mono">0{project.id}</span>
                <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-white/60">{project.category}</p>
                <p className="text-white/40 text-sm">{project.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}