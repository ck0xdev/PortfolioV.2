'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface LiquidBlobProps {
  mousePosition: { x: number; y: number }
}

export function LiquidBlob({ mousePosition }: LiquidBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#C0C0C0',
      metalness: 0.9,
      roughness: 0.2,
    })
  }, [])

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.5, 4)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Smooth mouse following
    meshRef.current.position.x += (mousePosition.x * 2 - meshRef.current.position.x) * 0.05
    meshRef.current.position.y += (mousePosition.y * 2 - meshRef.current.position.y) * 0.05
    
    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
    />
  )
}