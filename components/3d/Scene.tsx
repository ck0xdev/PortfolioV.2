'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { LiquidBlob } from './LiquidBlob'

export function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      
      console.log('Mouse:', { x: x.toFixed(2), y: y.toFixed(2) })
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
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
        <LiquidBlob mousePosition={mouse} />
      </Canvas>
    </div>
  )
}