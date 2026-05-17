"use client";

import { useEffect, useRef } from "react";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  baseSpeed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
  baseAngle: number;
}

function createBeam(w: number, h: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * w * 1.5 - w * 0.25,
    y: Math.random() * h * 1.5 - h * 0.25,
    width: 30 + Math.random() * 60,
    length: h * 2.5,
    angle,
    baseAngle: angle,
    speed: 0.3 + Math.random() * 0.5,
    baseSpeed: 0.3 + Math.random() * 0.5,
    opacity: 0.05 + Math.random() * 0.07,
    hue: 30 + Math.random() * 20,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.012 + Math.random() * 0.018,
  };
}

function resetBeam(beam: Beam, index: number, total: number, w: number, h: number) {
  const column = index % 3;
  const spacing = w / 3;
  beam.y = h + 100;
  beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
  beam.width = 40 + Math.random() * 80;
  beam.baseAngle = -35 + Math.random() * 10;
  beam.angle = beam.baseAngle;
  beam.baseSpeed = 0.3 + Math.random() * 0.5;
  beam.speed = beam.baseSpeed;
  beam.hue = 30 + (index * 20) / total;
  beam.opacity = 0.05 + Math.random() * 0.07;
  return beam;
}

function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
  ctx.save();
  ctx.translate(beam.x, beam.y);
  ctx.rotate((beam.angle * Math.PI) / 180);
  const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
  const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
  gradient.addColorStop(0, `hsla(${beam.hue}, 30%, 88%, 0)`);
  gradient.addColorStop(0.15, `hsla(${beam.hue}, 30%, 88%, ${pulsingOpacity * 0.4})`);
  gradient.addColorStop(0.35, `hsla(${beam.hue}, 30%, 88%, ${pulsingOpacity})`);
  gradient.addColorStop(0.65, `hsla(${beam.hue}, 30%, 88%, ${pulsingOpacity})`);
  gradient.addColorStop(0.85, `hsla(${beam.hue}, 30%, 88%, ${pulsingOpacity * 0.4})`);
  gradient.addColorStop(1, `hsla(${beam.hue}, 30%, 88%, 0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
  ctx.restore();
}

export default function LightBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const containerRef = useRef<HTMLDivElement>(null);
  const MINIMUM_BEAMS = 18;
  const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    let resizeRAF = 0;
    const updateCanvasSize = () => {
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        if (!canvas || !container) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = container.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const totalBeams = isMobile ? Math.round(MINIMUM_BEAMS * 0.8) : Math.round(MINIMUM_BEAMS * 1.5);
        beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(w, h));
      });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);

    const MOUSE_RADIUS = 250;
    const MOUSE_INFLUENCE = 10;

    function animate() {
      if (!canvas || !ctx || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const totalBeams = beamsRef.current.length;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      beamsRef.current.forEach((beam, index) => {
        const dx = beam.x - mx;
        const dy = beam.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && mx > -200 && my > -200) {
          const force = 1 - dist / MOUSE_RADIUS;
          beam.angle = beam.baseAngle + (dx > 0 ? 1 : -1) * force * MOUSE_INFLUENCE;
          beam.speed = beam.baseSpeed + force * 0.4;
        } else {
          beam.angle += (beam.baseAngle - beam.angle) * 0.05;
          beam.speed += (beam.baseSpeed - beam.speed) * 0.05;
        }

        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams, w, h);
        }
        drawBeam(ctx, beam);
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(resizeRAF);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Fixed position covers the entire content-beams area
  return (
    <div
      ref={containerRef}
      className="pointer-events-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%" as const,
        zIndex: 10,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          filter: IS_MOBILE ? "blur(12px)" : "blur(25px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
