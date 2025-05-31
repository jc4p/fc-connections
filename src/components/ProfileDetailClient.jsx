'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProfileDetailClient.module.css';

export default function ProfileDetailClient({ initialProfile, initialError }) {
  const router = useRouter();
  const [profile] = useState(initialProfile);
  const [error] = useState(initialError);
  
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

  // Handle error state
  if (error || !profile) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => router.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <h2 className={styles.pageTitle}>Profile</h2>
          </div>
          
          <div className={styles.errorState}>
            <h3>Profile Error</h3>
            <p>{error || 'Profile data is missing.'}</p>
            <button className={styles.retryButton} onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h2 className={styles.pageTitle}>Profile</h2>
        </div>

        {/* Profile Content */}
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <h3 className={styles.displayName}>{profile.display_name || `Profile ${profile.id}`}</h3>
              <p className={styles.profileType}>Type: {profile.type}</p>
            </div>
          </div>
          
          {/* Profile Fields */}
          <div className={styles.profileFields}>
            <h4>Profile Details</h4>
            <pre className={styles.fieldsJson}>{JSON.stringify(profile.fields || {}, null, 2)}</pre>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.connectButton} onClick={handleConnect}>
              Connect
            </button>
            <button className={styles.reportButton} onClick={handleReport}>
              Report
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <button className={styles.navItemInactive} onClick={() => router.push('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive} onClick={() => router.push('/create')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive} onClick={() => router.push('/my-profiles')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 