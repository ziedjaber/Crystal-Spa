import React from 'react';
import LuxuryLoader from '@/components/ui/LuxuryLoader';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0c0c] text-white">
      <LuxuryLoader
        variant="inline"
        title="CRYSTAL SPA"
        subtitle="Préparation de votre expérience d’exception..."
      />
    </div>
  );
}
