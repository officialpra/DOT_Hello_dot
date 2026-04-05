"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ADVANCED LIQUID SHADER
 * Features: 
 * 1. Cubic Bezier boundary for perfect curve matching.
 * 2. Simplex-like noise for organic liquid displacement.
 * 3. High-quality anti-aliasing.
 */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uResolution;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Noise function for liquid displacement
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);
      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);
      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);
      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));
      vec4 o3 = o1 * d.z + o2 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
      return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  // Cubic Bezier Boundary x(y)
  float cubicBezier(float t, float p0, float p1, float p2, float p3) {
    float it = 1.0 - t;
    return it*it*it*p0 + 3.0*it*it*t*p1 + 3.0*it*t*t*p2 + t*t*t*p3;
  }

  float getBoundary(float y, float progress, float bulge) {
    // We use two segments to match the navbar's "curtain" curve exactly.
    // Segment 1 (Top): y from 0 to 0.5
    // Segment 2 (Bottom): y from 0.5 to 1.0
    
    float t;
    float b;
    
    if (y < 0.5) {
      t = y * 2.0;
      // Match SVG: C 100 25, 20 25, 20 50 (but normalized/inverted)
      // Top point p0=progress, Middle peak p3=progress-bulge
      b = cubicBezier(t, progress, progress, progress - bulge, progress - bulge);
    } else {
      t = (y - 0.5) * 2.0;
      // Bottom segment: from peak back to edge
      b = cubicBezier(t, progress - bulge, progress - bulge, progress, progress);
    }
    return b;
  }

  void main() {
    float bulgeFactor = sin(uProgress * PI);
    float bulge = 0.35 * bulgeFactor; // Deep liquid bulge
    
    // Organic liquid wobble
    float wobble = noise(vec3(vUv.y * 4.0, uTime * 0.6, 0.0)) * 0.03 * bulgeFactor;
    
    // Calculate boundaries for RGB split (Chromatic Aberration)
    float boundaryR = getBoundary(vUv.y, uProgress, bulge) + wobble;
    float boundaryG = getBoundary(vUv.y, uProgress, bulge * 1.02) + wobble * 1.1;
    float boundaryB = getBoundary(vUv.y, uProgress, bulge * 1.04) + wobble * 1.2;
    
    float edge = 0.003;
    float alphaR = smoothstep(boundaryR, boundaryR + edge, vUv.x);
    float alphaG = smoothstep(boundaryG, boundaryG + edge, vUv.x);
    float alphaB = smoothstep(boundaryB, boundaryB + edge, vUv.x);
    
    // Safety for initial/final states
    if (uProgress < 0.001) { alphaR = alphaG = alphaB = 1.0; }
    if (uProgress > 0.999) { alphaR = alphaG = alphaB = 0.0; }

    // Final color: Black with chromatic aberration at the edge
    // Since it's black on a transparent bg, the aberration will look like a subtle 
    // dark-cyan/red fringe at the very edge.
    vec3 color = vec3(0.0);
    float totalAlpha = max(alphaR, max(alphaG, alphaB));

    if (totalAlpha <= 0.0) discard;

    // To see the aberration better, we can slightly tint the edge
    color.r = (alphaR - alphaG) * 0.2; // Subtle red tint
    color.b = (alphaB - alphaG) * 0.2; // Subtle blue tint

    gl_FragColor = vec4(color, totalAlpha);
  }
`;

const LoaderPlane = ({ onComplete }) => {
    const meshRef = useRef();
    const { viewport, size } = useThree();
    const startTime = useRef(null);
    const duration = 1400; // ms
    const delay = 1000; // 1 second static black
    const [isDone, setIsDone] = useState(false);

    useFrame((state) => {
        if (isDone) return;
        if (startTime.current === null) {
            startTime.current = Date.now();
        }

        const rawElapsed = Date.now() - startTime.current;
        const elapsed = Math.max(0, rawElapsed - delay);
        let progress = elapsed / duration;

        if (progress >= 1.0) {
            progress = 1.0;
            if (!isDone) {
                setIsDone(true);
                onComplete();
            }
        }

        // Exponential ease-out for that premium snap
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        if (meshRef.current) {
            meshRef.current.material.uniforms.uProgress.value = easedProgress;
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(0, 0) },
        }),
        []
    );

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                transparent={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
};

export default function LoaderScreen() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div
            id="site-loader"
            className="fixed inset-0"
            style={{
                zIndex: 9999,
                background: "transparent",
                pointerEvents: "auto",
            }}
        >
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 100] }}
                gl={{
                    antialias: true,
                    alpha: true,
                    stencil: false,
                    depth: false
                }}
                dpr={[1, 2]}
            >
                <LoaderPlane onComplete={() => setVisible(false)} />
            </Canvas>
        </div>
    );
}
