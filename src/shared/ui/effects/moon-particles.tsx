"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export function MoonParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars: Particle[] = [];
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: 0,
        speedY: 0,
        opacity: Math.random() * 0.8 + 0.2,
        color: "#FFE5B8",
      });
    }

    const particles: Particle[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2,
        color: Math.random() > 0.5 ? "#FFE5B8" : "#FFD88A",
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      stars.forEach((star) => {
        const twinkle =
          Math.sin(time * 2 + star.x * 0.01 + star.y * 0.01) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        ctx.save();
        ctx.translate(star.x, star.y);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, star.size * 2);
        gradient.addColorStop(0, `rgba(255, 229, 184, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 229, 184, ${alpha * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 229, 184, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, star.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 229, 184, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, -star.size);
        ctx.lineTo(star.size * 0.2, -star.size * 0.2);
        ctx.lineTo(star.size, 0);
        ctx.lineTo(star.size * 0.2, star.size * 0.2);
        ctx.lineTo(0, star.size);
        ctx.lineTo(-star.size * 0.2, star.size * 0.2);
        ctx.lineTo(-star.size, 0);
        ctx.lineTo(-star.size * 0.2, -star.size * 0.2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, particle.color + "AA");
        gradient.addColorStop(0.5, particle.color + "44");
        gradient.addColorStop(1, particle.color + "00");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
