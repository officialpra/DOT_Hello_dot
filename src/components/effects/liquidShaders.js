/**
 * LIQUID CURTAIN SHADERS
 * Shared GLSL shaders for the liquid/wave reveal effect.
 * Used by: LoaderScreen, SideMenu, or any component needing this effect.
 *
 * Techniques:
 *  - Dual-segment Cubic Bézier boundary
 *  - Simplex-like noise for organic liquid wobble
 *  - Chromatic Aberration (RGB split) at the moving edge
 *  - GPU-based exponential ease-out (done externally, passed via uProgress)
 */

export const liquidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidFragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2  uResolution;
  uniform float uNoiseStrength;
  uniform float uBulgeMax;
  uniform float uEdgeSoftness;
  uniform float uEdgeDir;

  varying vec2 vUv;   // must be declared in fragment shader too

  #define PI 3.14159265359

  // ── Noise helpers ──────────────────────────────────────────────────────────
  float mod289f(float x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4  mod289v(vec4  x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4  perm(vec4 x){ return mod289v(((x * 34.0) + 1.0) * x); }

  float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b  = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c  = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o1 * d.z + o2 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  // ── Cubic Bézier ───────────────────────────────────────────────────────────
  float cubicBezier(float t, float p0, float p1, float p2, float p3) {
    float it = 1.0 - t;
    return it*it*it*p0 + 3.0*it*it*t*p1 + 3.0*it*t*t*p2 + t*t*t*p3;
  }

  // Two-segment S-curve boundary (matches navbar SVG wave shape)
  float getBoundary(float y, float progress, float bulge) {
    float t;
    if (y < 0.5) {
      t = y * 2.0;
      return cubicBezier(t, progress, progress, progress - bulge, progress - bulge);
    } else {
      t = (y - 0.5) * 2.0;
      return cubicBezier(t, progress - bulge, progress - bulge, progress, progress);
    }
  }

  // ── Main ───────────────────────────────────────────────────────────────────
  void main() {
    float bulgeFactor = sin(uProgress * PI);
    float bulge  = uBulgeMax * bulgeFactor;
    float wobble = noise(vec3(vUv.y * 4.0, uTime * 0.6, 0.0)) * uNoiseStrength * bulgeFactor;

    // Chromatic aberration: R/G/B each get a slightly different boundary
    float bR = getBoundary(vUv.y, uProgress, bulge)        + wobble;
    float bG = getBoundary(vUv.y, uProgress, bulge * 1.02) + wobble * 1.1;
    float bB = getBoundary(vUv.y, uProgress, bulge * 1.04) + wobble * 1.2;

    float edge = uEdgeSoftness;
    float aR, aG, aB;

    // uEdgeDir: +1 = keep left side (curtain closes from right)
    //           -1 = keep right side (curtain opens to left)
    if (uEdgeDir > 0.0) {
      aR = smoothstep(bR, bR + edge, vUv.x);
      aG = smoothstep(bG, bG + edge, vUv.x);
      aB = smoothstep(bB, bB + edge, vUv.x);
    } else {
      aR = 1.0 - smoothstep(bR - edge, bR, vUv.x);
      aG = 1.0 - smoothstep(bG - edge, bG, vUv.x);
      aB = 1.0 - smoothstep(bB - edge, bB, vUv.x);
    }

    // Hard clamp for fully closed / fully open states
    if (uProgress < 0.001) { aR = aG = aB = 1.0; }
    if (uProgress > 0.999) { aR = aG = aB = 0.0; }

    float totalAlpha = max(aR, max(aG, aB));
    if (totalAlpha <= 0.0) discard;

    // Black with subtle chromatic fringe at the edge
    vec3 color = vec3(0.0);
    color.r = (aR - aG) * 0.2;
    color.b = (aB - aG) * 0.2;

    gl_FragColor = vec4(color, totalAlpha);
  }
`;
