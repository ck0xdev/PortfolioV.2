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
  
  // Water droplet material - transparent, refractive
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#4fc3f7'), // Light blue water color
      metalness: 0.1,                    // Low metalness for water
      roughness: 0.05,                   // Very smooth for liquid
      transmission: 0.9,                 // High transparency
      thickness: 2.0,                    // Volume for refraction
      ior: 1.33,                         // Index of refraction for water
      clearcoat: 1.0,                    // Wet surface
      clearcoatRoughness: 0.1,
      attenuationColor: new THREE.Color('#0288d1'), // Blue tint inside
      attenuationDistance: 1.5,
      transparent: true,
    })
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 64)
    geo.userData.originalPositions = geo.attributes.position.array.slice()
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const positions = geometry.attributes.position.array as Float32Array
    const originalPositions = geometry.userData.originalPositions as Float32Array
    
    // Water wobble - more fluid motion
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      const z = originalPositions[i + 2]
      
      // More organic water movement
      const wobble = 
        Math.sin(x * 3 + time * 2.5) * 0.04 +
        Math.cos(y * 4 + time * 2) * 0.04 +
        Math.sin(z * 3.5 + time * 1.5) * 0.04
      
      const factor = 1 + wobble
      positions[i] = x * factor
      positions[i + 1] = y * factor
      positions[i + 2] = z * factor
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    
    // Mouse following
    const targetX = (mousePosition.x * viewport.width) / 2
    const targetY = (mousePosition.y * viewport.height) / 2
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
    
    meshRef.current.rotation.y += 0.001
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
    />
  )
}