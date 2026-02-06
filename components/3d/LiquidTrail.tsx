'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface LiquidTrailProps {
  mousePosition: { x: number; y: number }
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.5 + 0.5;
    
    float dist = distance(uv, mouse);
    
    // Ripple effect
    float ripple = sin(dist * 30.0 - uTime * 4.0) * 0.5 + 0.5;
    ripple *= exp(-dist * 4.0);
    
    // Color - mercury silver with blue tint
    vec3 color = mix(
      vec3(0.8, 0.85, 0.9),
      vec3(0.4, 0.5, 1.0),
      ripple * 0.5
    );
    
    float alpha = ripple * 0.15 * uIntensity;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function LiquidTrail({ mousePosition }: LiquidTrailProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIntensity: { value: 1.0 }
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    uniforms.uTime.value = state.clock.elapsedTime
    
    // Smooth mouse follow
    uniforms.uMouse.value.x += (mousePosition.x - uniforms.uMouse.value.x) * 0.1
    uniforms.uMouse.value.y += (mousePosition.y - uniforms.uMouse.value.y) * 0.1
    
    meshRef.current.position.x = (uniforms.uMouse.value.x * viewport.width) / 2
    meshRef.current.position.y = (uniforms.uMouse.value.y * viewport.height) / 2
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}