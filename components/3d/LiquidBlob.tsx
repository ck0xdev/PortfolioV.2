'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface LiquidBlobProps {
  mousePosition: { x: number; y: number }
}

export function LiquidBlob({ mousePosition }: LiquidBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#C0C0C0',
      metalness: 1.0,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    })
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 64)
    geo.userData.originalPositions = geo.attributes.position.array.slice()
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const positions = geometry.attributes.position.array as Float32Array
    const originalPositions = geometry.userData.originalPositions as Float32Array
    
    // Wobble effect
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      const z = originalPositions[i + 2]
      
      const wobble = 
        Math.sin(x * 2 + time * 2) * 0.03 +
        Math.cos(y * 3 + time * 1.5) * 0.03 +
        Math.sin(z * 2.5 + time) * 0.03
      
      const factor = 1 + wobble
      positions[i] = x * factor
      positions[i + 1] = y * factor
      positions[i + 2] = z * factor
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    
    // Mouse following - fixed to use viewport width/height
    const targetX = (mousePosition.x * viewport.width) / 2
    const targetY = (mousePosition.y * viewport.height) / 2
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
    
    meshRef.current.rotation.y += 0.002
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
    />
  )
}