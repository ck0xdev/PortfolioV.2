'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// LIQUID BLOB - Slower, smoother
function LiquidBlob({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // MUCH slower mouse follow
    const targetX = (mouse.x * viewport.width) / 3  
    const targetY = (mouse.y * viewport.height) / 3
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03  // Slower lerp
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.03
    
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
    meshRef.current.scale.setScalar(scale)
    
    meshRef.current.rotation.y += 0.001
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1.2} position={[0, 0, -2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#1e1b4b"
          roughness={0.2}
          metalness={0.6}
          distort={0.3}
          speed={2}
          clearcoat={0.8}
        />
      </mesh>
    </Float>
  )
}

// SLOWER PARTICLES
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 300  // Reduced from 1000
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      vel[i * 3] = (Math.random() - 0.5) * 0.005  // Much slower
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }
    return [pos, vel]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3]
      positions[i * 3 + 1] += velocities[i * 3 + 1]
      positions[i * 3 + 2] += velocities[i * 3 + 2]
      
      if (Math.abs(positions[i * 3]) > 12) velocities[i * 3] *= -1
      if (Math.abs(positions[i * 3 + 1]) > 12) velocities[i * 3 + 1] *= -1
      if (Math.abs(positions[i * 3 + 2]) > 7) velocities[i * 3 + 2] *= -1
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01  // Slower rotation
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

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
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={1.5} />
        
        <ParticleField />
        <LiquidBlob mouse={mouse} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}