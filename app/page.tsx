import { Scene } from '@/components/3d/Scene'
import { GlassCard } from '@/components/ui/GlassCard'
import { TactileButton } from '@/components/ui/TactileButton'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Scene />
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <GlassCard intensity="high" className="p-8 md:p-12 max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Creative Developer
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Building immersive digital experiences with Three.js, React, and WebGL
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