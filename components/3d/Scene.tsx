'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { LiquidBlob } from './LiquidBlob'

export function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          powerPreference: 'high-performance',
          alpha: true 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[-5, 5, 5]} intensity={2} color="#4f46e5" />
        
        <LiquidBlob mousePosition={mouse} />
        
        {/* Ground shadow */}
        <ContactShadows 
          position={[0, -1.2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        
        {/* Environment for metal reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}