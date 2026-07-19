"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

type Particle = {
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  speed: number;
  driftX: number;
  driftAmp: number;
};

const WARM_PALETTE = [
  new THREE.Color("#ff9d5c"),
  new THREE.Color("#ffcf9e"),
  new THREE.Color("#ffffff"),
  new THREE.Color("#ffb37a"),
];

function createGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,255,255,0.6)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.12)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Ambient floating bokeh / particle field rendered with Three.js.
 * Purely decorative — sits above the hero video, below the copy —
 * and is aggressively optimized (pauses off-screen / hidden tab,
 * capped pixel ratio, tiny geometry, no per-frame allocations).
 */
export default function CinematicLayer({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 90 : 170;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    container.appendChild(renderer.domElement);

    const particles: Particle[] = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const baseX = (Math.random() - 0.5) * 22;
      const baseY = (Math.random() - 0.5) * 13;
      const baseZ = (Math.random() - 0.5) * 10 - 2;

      particles.push({
        baseX,
        baseY,
        baseZ,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.25,
        driftX: (Math.random() - 0.5) * 0.6,
        driftAmp: 0.4 + Math.random() * 0.9,
      });

      positions[i * 3] = baseX;
      positions[i * 3 + 1] = baseY;
      positions[i * 3 + 2] = baseZ;

      const color =
        WARM_PALETTE[Math.floor(Math.random() * WARM_PALETTE.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.35 + Math.random() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const glowTexture = createGlowTexture();

    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    function handlePointerMove(event: PointerEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", resize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    let isTabVisible = true;
    function handleVisibilityChange() {
      isTabVisible = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let rafId = 0;
    const startTime = performance.now();

    function animate() {
      rafId = requestAnimationFrame(animate);

      if (!isVisible || !isTabVisible) return;

      const elapsed = (performance.now() - startTime) / 1000;
      const positionAttr = geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const array = positionAttr.array as Float32Array;

      if (!prefersReducedMotion) {
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          const t = elapsed * p.speed + p.phase;
          array[i * 3] = p.baseX + Math.cos(t * 0.6) * p.driftAmp * 0.4 + p.driftX;
          array[i * 3 + 1] = p.baseY + Math.sin(t) * p.driftAmp;
        }
        positionAttr.needsUpdate = true;
      }

      targetCamera.x += (mouse.x * 0.8 - targetCamera.x) * 0.035;
      targetCamera.y += (-mouse.y * 0.5 - targetCamera.y) * 0.035;
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[styles.canvasHost, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
