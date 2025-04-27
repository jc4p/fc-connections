import * as frame from '@farcaster/frame-sdk';

export async function initializeFrame() {
  // Check if running in a browser environment
  if (typeof window === 'undefined') {
    console.log('Not in a browser environment, skipping frame initialization.');
    return;
  }

  try {
    console.log('Attempting to get frame context...');
    // Use a timeout to prevent hanging if not in a frame context
    const contextPromise = frame.sdk.context;
    const context = await Promise.race([
      contextPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout getting frame context')), 2000))
    ]);

    // The context structure might be nested as noted in FRAME_INTEGRATION.md
    let userContext = context?.user;
    if (context?.user?.user) {
        userContext = context.user.user;
    }

    if (!userContext || !userContext.fid) {
      console.log('Not running inside a Farcaster frame or user context unavailable.');
      // Optionally set a flag or default value if needed outside frame
      window.userFid = null; 
      return;
    }

    const user = userContext;
    console.log('Frame context received:', user);

    // Make FID globally accessible (consider using React Context for better state management)
    window.userFid = user.fid;
    window.dispatchEvent(new CustomEvent('frameUserLoaded', { detail: user }));

    console.log('Calling frame.sdk.actions.ready()...');
    // Call the ready function to remove the splash screen
    await frame.sdk.actions.ready();
    console.log('frame.sdk.actions.ready() called successfully.');

  } catch (error) {
    if (error.message === 'Timeout getting frame context') {
      console.log('Timed out waiting for frame context. Assuming not in a frame.');
      window.userFid = null; 
    } else {
      console.error('Error initializing frame:', error);
    }
  }
}

// Helper function to get user FID, returns null if not set
export function getUserFid() {
  return typeof window !== 'undefined' ? window.userFid : null;
} 