'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Particles } from './Particles'

export function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          alpha: true 
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* Floating particles */}
        <Particles />
        
        {/* Add more 3D elements here */}
      </Canvas>
    </div>
  )
}