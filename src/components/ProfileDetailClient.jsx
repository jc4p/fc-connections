'use client';

import { useState } from 'react';
// import ProfileDisplay from '@/components/ProfileDisplay'; // Component to render profile fields nicely
// import { recordProfileView } from '@/lib/api'; // Assuming an API function for this
// import * as frame from '@farcaster/frame-sdk'; // For frame actions

export default function ProfileDetailClient({ initialProfile }) {
  // Profile data is passed from the server component
  const [profile] = useState(initialProfile);
  
  // TODO: Consider calling view tracking API here in a useEffect hook
  // useEffect(() => {
  //   if (profile?.id) {
  //     recordProfileView(profile.id).catch(console.error);
  //   }
  // }, [profile?.id]);

  const handleConnect = async () => {
    alert('Connect button clicked (Implement action)');
    // TODO: Implement connection logic 
    // Check if frame SDK is available
    // if (frame.sdk && profile?.fid) {
    //   try {
    //     console.log(`Attempting to view profile FID: ${profile.fid}`);
    //     await frame.sdk.actions.viewProfile({ fid: profile.fid });
    //   } catch (error) {
    //     console.error('Frame SDK action failed:', error);
    //     alert('Could not open profile in Farcaster client.');
    //   }
    // } else {
    //   alert('Farcaster client action not available.');
    // }
  };

  const handleReport = () => {
    alert('Report button clicked (Implement action)');
    // TODO: Implement report modal/logic (e.g., POST /api/report)
  };

  if (!profile) {
    // This should ideally not happen if the server component handles errors,
    // but include a fallback just in case.
    return <p>Error: Profile data is missing.</p>;
  }
  
  // TODO: Get color based on profile.type
  const profileColor = {
      partner: '#FF5E7D',
      friend: '#4CAF50',
      job: '#2196F3'
  }[profile.type] || '#ccc';

  return (
    <div style={{ border: `3px solid ${profileColor}`, padding: '1.5rem', borderRadius: '8px' }}>
       {/* TODO: Add PFP and Display Name prominently */} 
      <h2>{profile.display_name || `Profile ${profile.id}`}</h2>
      <p>Type: {profile.type}</p>

      {/* TODO: Implement actual ProfileDisplay component */} 
      {/* <ProfileDisplay profileData={profile.fields || {}} /> */}
      <p>Profile Fields Placeholder:</p>
      <pre>{JSON.stringify(profile.fields || {}, null, 2)}</pre>
      
      <div style={{ marginTop: '1.5rem' }}>
        <button 
          onClick={handleConnect} 
          style={{ marginRight: '1rem', backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem' }}>
          Connect
        </button>
        <button 
          onClick={handleReport} 
          style={{ backgroundColor: '#f44336', color: 'white', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          Report
        </button>
      </div>
    </div>
  );
} 