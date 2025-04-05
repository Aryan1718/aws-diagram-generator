import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const SparklesCore = React.memo(
  ({
    background,
    minSize,
    maxSize,
    speed,
    particleCount,
    className,
    particleColor,
  }: {
    background?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleCount?: number;
    className?: string;
    particleColor?: string;
  }) => {
    const particles = React.useMemo(() => {
      const points = Array.from({ length: particleCount || 50 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize || 4 - (minSize || 1)) + (minSize || 1),
      }));
      return points;
    }, [particleCount, maxSize, minSize]);

    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          background || "bg-black",
          className
        )}
      >
        {particles.map((particle, idx) => (
          <motion.div
            key={idx}
            animate={{
              x: [
                `${particle.x}%`,
                `${particle.x + (Math.random() * 10 - 5)}%`,
                `${particle.x}%`,
              ],
              y: [
                `${particle.y}%`,
                `${particle.y + (Math.random() * 10 - 5)}%`,
                `${particle.y}%`,
              ],
            }}
            transition={{
              duration: (speed || 2) + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: particleColor || "#fff",
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>
    );
  }
); 