'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { LiquidBlob } from './LiquidBlob'

export function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }, [])

  return (
    <div 
      className="fixed inset-0 -z-10"
      onPointerMove={handlePointerMove}
    >
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