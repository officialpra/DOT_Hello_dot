"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

// Silence the THREE.Clock deprecation warning if it's coming from library internals
if (typeof window !== "undefined") {
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes("THREE.Clock")) return;
        originalWarn(...args);
    };
}

// ============================================================================
// 1. THE WEBGL SHADERS
// ============================================================================

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform vec2 uViewport;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Calculate distance from this specific pixel to the mouse cursor
    float dist = distance(uv, uMouse);

    // How wide the liquid wave spreads (0.35 = 35% of the card)
    float threshold = 0.50;

    // If the pixel is inside the wave radius, warp it!
    if (dist < threshold) {
       // Cosine curve ensures the wave is perfectly smooth with no sharp edges
       float intensity = cos((dist / threshold) * 1.570796) * uHover;

       // Calculate a vector pointing toward the exact center of the card
       vec2 dir = vec2(0.5) - uv;

       // Push the vertices inward.
       pos.x += dir.x * intensity * uViewport.x * 0.45;
       pos.y += dir.y * intensity * uViewport.y * 0.45;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uOpacity;

  void main() {
    // Sample the project image texture instead of drawing a gradient
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
  }
`;

// ============================================================================
// 2. THE 3D MESH COMPONENT
// ============================================================================

const LiquidMesh = ({ hovered, mousePos, imagePath }) => {
    const materialRef = useRef();
    const { viewport } = useThree();

    // Load the project image as a WebGL texture
    const texture = useTexture(imagePath);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 },
        uViewport: { value: new THREE.Vector2(1, 1) },
        uOpacity: { value: 1.0 }
    }), [texture]);

    useFrame(() => {
        if (materialRef.current) {
            const targetHover = hovered ? 1.0 : 0.0;
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                targetHover,
                0.1
            );

            materialRef.current.uniforms.uMouse.value.set(mousePos.x, mousePos.y);
            materialRef.current.uniforms.uViewport.value.set(viewport.width, viewport.height);
        }
    });

    return (
        <mesh scale={[1.05, 1.05, 1]}>
            <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

// ============================================================================
// 3. THE MAIN COMPONENT EXPORT
// ============================================================================

const LiquidMedia = ({ hovered, mousePos, imagePath }) => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                className="w-full h-full"
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 15 }} // Adjusted for flat plane look
            >
                <LiquidMesh hovered={hovered} mousePos={mousePos} imagePath={imagePath} />
            </Canvas>
        </div>
    );
};

export default LiquidMedia;
