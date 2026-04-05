"use client";

/**
 * LiquidCurtain — Reusable GPU liquid-wave reveal component.
 *
 * Props:
 *  progress      {number}   0.0 → 1.0. 0 = fully closed (black), 1 = fully open (gone).
 *  noiseStrength {number}   Wobble intensity. Default 0.03. Set 0 for a clean edge.
 *  bulgeMax      {number}   Max curve depth. Default 0.35.
 *  edgeSoftness  {number}   Anti-alias edge width. Default 0.003.
 *  edgeDir       {number}   +1 = reveal left-to-right (loader), -1 = right-to-left (sidemenu).
 *
 * Usage (inside a @react-three/fiber <Canvas>):
 *   <LiquidCurtainMesh progress={0.5} noiseStrength={0.03} bulgeMax={0.35} />
 *
 * Or use the convenience wrapper <LiquidCurtain> which provides its own Canvas:
 *   <LiquidCurtain progress={0.5} style={{ position: "fixed", inset: 0, zIndex: 9999 }} />
 */

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { liquidVertexShader, liquidFragmentShader } from "./liquidShaders";

// ============================================================================
// Inner Three.js mesh — use this directly inside any existing <Canvas>
// ============================================================================
export const LiquidCurtainMesh = ({
    progress = 0,
    noiseStrength = 0.03,
    bulgeMax = 0.35,
    edgeSoftness = 0.003,
    edgeDir = 1,
}) => {
    const meshRef = useRef();
    const { viewport, size } = useThree();

    const uniforms = useMemo(() => ({
        uTime:          { value: 0 },
        uProgress:      { value: progress },
        uResolution:    { value: new THREE.Vector2(0, 0) },
        uNoiseStrength: { value: noiseStrength },
        uBulgeMax:      { value: bulgeMax },
        uEdgeSoftness:  { value: edgeSoftness },
        uEdgeDir:       { value: edgeDir },
    }), []); // eslint-disable-line react-hooks/exhaustive-deps

    useFrame((state) => {
        if (!meshRef.current) return;
        const u = meshRef.current.material.uniforms;
        u.uTime.value      = state.clock.getElapsedTime();
        u.uProgress.value  = progress;
        u.uResolution.value.set(size.width, size.height);
        u.uNoiseStrength.value = noiseStrength;
        u.uBulgeMax.value      = bulgeMax;
        u.uEdgeDir.value       = edgeDir;
    });

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
// Standalone wrapper — provides its own Canvas + positioning div
// ============================================================================
export default function LiquidCurtain({
    progress = 0,
    noiseStrength = 0.03,
    bulgeMax = 0.35,
    edgeSoftness = 0.003,
    edgeDir = 1,
    style = {},
    className = "",
}) {
    return (
        <div
            className={className}
            style={{
                pointerEvents: "none",
                ...style,
            }}
        >
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 100] }}
                gl={{
                    antialias: true,
                    alpha: true,
                    stencil: false,
                    depth: false,
                }}
                dpr={[1, 2]}
            >
                <LiquidCurtainMesh
                    progress={progress}
                    noiseStrength={noiseStrength}
                    bulgeMax={bulgeMax}
                    edgeSoftness={edgeSoftness}
                    edgeDir={edgeDir}
                />
            </Canvas>
        </div>
    );
}
