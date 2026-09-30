'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MovingBorderProps {
  children?: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}

export const MovingBorder = ({
  children,
  duration = 8000,
  rx = '20',
  ry = '20',
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const lengthRef = useRef<number>(0);
  const progress = useMotionValue<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      lengthRef.current = pathRef.current.getTotalLength();
    }
    const handleResize = () => {
      if (pathRef.current) {
        lengthRef.current = pathRef.current.getTotalLength();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame((time) => {
    let length = lengthRef.current;
    if (!length && pathRef.current) {
      length = pathRef.current.getTotalLength();
      lengthRef.current = length;
    }
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full pointer-events-none"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export interface MovingBorderCardProps {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  blobClassName?: string;
  [key: string]: any;
}

export function MovingBorderCard({
  borderRadius = '1.25rem',
  children,
  as: Component = 'div',
  containerClassName,
  borderClassName,
  duration = 8000,
  rx = '20',
  ry = '20',
  className,
  blobClassName,
  ...otherProps
}: MovingBorderCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Component
      className={cn(
        'bg-transparent relative p-[1.5px] overflow-hidden group transition-all duration-300',
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Moving border animation layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {mounted && (
          <MovingBorder duration={duration} rx={rx} ry={ry}>
            <div
              className={cn(
                'h-28 w-28 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300',
                'bg-[radial-gradient(circle_at_center,#f2ca50_0%,#c5a059_40%,transparent_75%)]',
                blobClassName
              )}
            />
          </MovingBorder>
        )}
      </div>

      {/* Inner card surface */}
      <div
        className={cn(
          'relative w-full h-full backdrop-blur-xl transition-all duration-300',
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export default MovingBorderCard;
