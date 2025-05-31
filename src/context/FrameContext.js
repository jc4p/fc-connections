'use client';

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { initializeFrame } from '@/lib/frame'; // Assuming initializeFrame potentially sets window.userFid and dispatches event

// Define the shape of the context data
// interface FrameContextType {
//   fid: number | null;
//   isLoading: boolean;
//   error: string | null;
// }

// Create the context with a default value
const FrameContext = createContext({
  fid: null,
  isLoading: true,
  error: null,
});

// Create the Provider component
export function FrameProvider({ children }) {
  // Initialize with existing FID if available
  const [fid, setFid] = useState(() => {
    if (typeof window !== 'undefined' && window.userFid) {
      return window.userFid;
    }
    return null;
  });
  
  // Only set loading to true if we don't already have an FID
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined' && window.userFid) {
      return false;
    }
    return true;
  });
  
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const setupFrame = async () => {
        // Check if we already have FID stored (either in state or window)
        const existingFid = fid || (typeof window !== 'undefined' ? window.userFid : null);
        
        if (existingFid) {
            console.log("FrameProvider: FID already available, skipping initialization:", existingFid);
            if (isMounted && !fid) {
                setFid(existingFid);
                setIsLoading(false);
                setError(null);
            }
            return;
        }

        setIsLoading(true);
        setError(null);
        console.log("FrameProvider: Initializing frame...");

        // Listener for the custom event dispatched by initializeFrame
        const handleFrameUserLoaded = (event) => {
            if (!isMounted) return;
            const user = event.detail;
            console.log('FrameProvider received frameUserLoaded event:', user);
            if (user && user.fid) {
                setFid(user.fid);
                setError(null); // Clear any previous error
            } else {
                setError('Frame context loaded but FID was missing.');
            }
            setIsLoading(false);
        };

        window.addEventListener('frameUserLoaded', handleFrameUserLoaded);

        try {
            // Call initializeFrame which attempts to get context and sets window.userFid
            // It also dispatches 'frameUserLoaded' on success/completion.
            await initializeFrame();
            
            // Double-check window.userFid immediately after initialization finishes
            // This handles cases where the event listener might fire slightly after or if already set.
            const currentFid = typeof window !== 'undefined' ? window.userFid : null;
            if (isMounted && currentFid !== null && fid === null) { // Update only if not already set by event
                 console.log('FrameProvider: Setting FID from window object after init:', currentFid);
                 setFid(currentFid);
                 // If we found it here, loading might be finished unless init errored before event
                 // The event listener should robustly set loading to false.
                 // Consider if initializeFrame should return context directly.
                 // setIsLoading(false); 
            } else if (isMounted && currentFid === null && fid === null) {
                // If initializeFrame finished but didn't set FID and event hasn't fired,
                // it might be because we're not in a frame or timed out.
                // initializeFrame should handle logging this. We wait for the event or timeout handled within initializeFrame.
                 console.log('FrameProvider: initializeFrame finished, waiting for event or timeout...');
            }

        } catch (initError) {
             if (isMounted) {
                console.error("FrameProvider: Error during frame initialization", initError);
                setError(initError.message || 'Failed to initialize frame context.');
                setIsLoading(false);
            }
        }

        // Cleanup function for the listener
        return () => {
            isMounted = false;
            window.removeEventListener('frameUserLoaded', handleFrameUserLoaded);
            console.log("FrameProvider: Cleaned up event listener.");
        };
    };

    setupFrame();

  }, []); // Run only once on mount

  // Memoize the context value
  const value = useMemo(() => ({
     fid, isLoading, error
  }), [fid, isLoading, error]);

  return (
    <FrameContext.Provider value={value}>
      {children}
    </FrameContext.Provider>
  );
}

// Custom hook to use the FrameContext
export function useFrame() {
  const context = useContext(FrameContext);
  if (context === undefined) {
    throw new Error('useFrame must be used within a FrameProvider');
  }
  return context;
} 