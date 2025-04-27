'use client';

import { useEffect } from 'react';
import { initializeFrame } from '@/lib/frame'; // Assuming lib is at the root

export function FrameInit() {
  useEffect(() => {
    // Ensure this runs only once on the client
    if (typeof window !== 'undefined') {
      console.log('FrameInit mounted, initializing frame...');
      initializeFrame();
    }
  }, []); // Empty dependency array ensures it runs once on mount

  return null; // This component doesn't render anything
} 