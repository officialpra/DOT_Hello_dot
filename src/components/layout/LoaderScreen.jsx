"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { liquidVertexShader, liquidFragmentShader } from "@/components/effects/liquidShaders";

// ============================================================================
// Loader-specific animated plane
// Handles: delay → ease-out progress → onComplete callback
// Rendering: delegates to the shared liquid shaders
// ============================================================================
const LoaderPlane = ({ onComplete }) => {
    const meshRef  = useRef();
    const { viewport, size } = useThree();
    const startTime = useRef(null);
    const DURATION  = 1400; // ms — curtain animation duration
    const DELAY     = 1000; // ms — static black hold before animating
    const [isDone, setIsDone] = useState(false);

    useFrame((state) => {
        if (isDone) return;
        if (startTime.current === null) startTime.current = Date.now();

        const rawElapsed = Date.now() - startTime.current;
        const elapsed    = Math.max(0, rawElapsed - DELAY);
        let   progress   = Math.min(elapsed / DURATION, 1.0);

        // Exponential ease-out — heavy start, premium snap finish
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        if (meshRef.current) {
            const u = meshRef.current.material.uniforms;
            u.uProgress.value  = easedProgress;
            u.uTime.value      = state.clock.getElapsedTime();
            u.uResolution.value.set(size.width, size.height);
        }

        if (progress >= 1.0 && !isDone) {
            setIsDone(true);
            onComplete();
        }
    });

    const uniforms = useMemo(() => ({
        uTime:          { value: 0 },
        uProgress:      { value: 0 },
        uResolution:    { value: new THREE.Vector2(0, 0) },
        uNoiseStrength: { value: 0.03 },
        uBulgeMax:      { value: 0.35 },
        uEdgeSoftness:  { value: 0.003 },
        uEdgeDir:       { value: 1.0 },   // +1 = reveal left-to-right
    }), []);

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                transparent={true}
                vertexShader={liquidVertexShader}
                fragmentShader={liquidFragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

// ============================================================================
// Public export
// ============================================================================
export default function LoaderScreen() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return (
        <div
            id="site-loader"
            className="fixed inset-0"
            style={{ zIndex: 9999, background: "transparent", pointerEvents: "auto" }}
        >
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 100] }}
                gl={{ antialias: true, alpha: true, stencil: false, depth: false }}
                dpr={[1, 2]}
            >
                <LoaderPlane onComplete={() => setVisible(false)} />
            </Canvas>
        </div>
    );
}


