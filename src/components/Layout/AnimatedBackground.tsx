"use client"

import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingDots() {
    const groupRef = useRef<THREE.Group>(null)
    
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001
        }
    })

    const dots = Array.from({ length: 100 }, (_, i) => {
    const x = THREE.MathUtils.randFloatSpread(10)
    const y = THREE.MathUtils.randFloatSpread(10)
    const z = THREE.MathUtils.randFloatSpread(10)

    return <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
        </mesh>
        })
        
        return <group ref={groupRef}>{dots}</group>
        }

    export default function AnimatedBackground() {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                backgroundColor: '#000',
            }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingDots />
            </Canvas>
        </div>
        )
    }