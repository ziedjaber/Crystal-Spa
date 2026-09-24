'use client';

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: string;
}

export default function Skeleton({
  className = '',
  rounded = 'rounded-md',
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-luxury ${rounded} ${className}`}
      {...props}
    />
  );
}
