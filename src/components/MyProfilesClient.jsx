'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfiles, deleteProfile } from '@/lib/api';
import { useFrame } from '@/context/FrameContext';
import styles from './MyProfilesClient.module.css';

export default function MyProfilesClient() {
  const router = useRouter();
  const { fid, isLoading: isFrameLoading, error: frameError } = useFrame();
  const [profiles, setProfiles] = useState({ partner: null, friend: null, job: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const profileTypes = [
    { key: 'partner', name: 'Partner', description: 'Dating profile' },
    { key: 'friend', name: 'Friend', description: 'Friendship profile' },
    { key: 'job', name: 'Job', description: 'Career profile' }
  ];

  // Effect to load profiles when FID becomes available
  useEffect(() => {
    if (fid && !isFrameLoading && !frameError) {

      async function loadProfiles(currentFid) {
          setLoading(true);
          setError(null);
          try {
              console.log(`Fetching profiles for FID: ${currentFid} on client...`);
              const fetchedProfiles = await getUserProfiles(currentFid);
              console.log(`Found ${fetchedProfiles.length} profiles`);
              
              // Organize profiles by type
              const organized = { partner: null, friend: null, job: null };
              fetchedProfiles.forEach(p => {
                if (profileTypes.some(pt => pt.key === p.type)) {
                  organized[p.type] = p;
                }
              });
              setProfiles(organized);
          } catch (err) {
              if (err?.message?.includes('404') || err?.message?.includes('Not Found')) {
                  console.log(`User ${currentFid} has no profiles yet.`);
                  setProfiles({ partner: null, friend: null, job: null });
              } else {
                  setError(err.message || 'Failed to load your profiles.');
                  console.error("MyProfilesClient loadProfiles Error:", err);
              }
          } finally {
              setLoading(false);
          }
      }

      loadProfiles(fid);
    }
  }, [fid, isFrameLoading, frameError]);

  const handleDelete = async (profileId, type) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    
    setError(null); // Clear previous errors
    try {
      console.log(`Deleting profile ID: ${profileId}`);
      await deleteProfile(profileId);
      // Update state locally to reflect deletion immediately
      setProfiles(prev => ({ ...prev, [type]: null }));
      alert('Profile deleted.');
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete profile.';
      setError(errorMsg);
      alert(`Error: ${errorMsg}`); // Simple alert for feedback
      console.error("MyProfilesClient handleDelete Error:", err);
    }
  };
  
  const handleEdit = (profileId) => {
    router.push(`/edit/${profileId}`);
  };

  // Loading states
  if (isFrameLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Waiting for Farcaster user...</div>
      </div>
    );
  }

  if (frameError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>{frameError}</div>
      </div>
    );
  }

  if (fid === null && !isFrameLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>Could not determine Farcaster user. Are you in a frame?</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Loading your profiles...</div>
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
          <h2 className={styles.pageTitle}>My Profiles</h2>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Profile Cards */}
        <div className={styles.profilesList}>
          {profileTypes.map(type => {
              const profile = profiles[type.key];
              return (
                <div key={type.key} className={styles.profileCard}>
                  <div className={styles.profileHeader}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.profileInfo}>
                      <h3 className={styles.profileTitle}>{type.name}</h3>
                      <p className={styles.profileDescription}>{type.description}</p>
                    </div>
                  </div>
                  
                  {profile ? (
                    <div className={styles.profileActions}>
                      <p className={styles.profileStatus}>Status: {profile.status || 'Active'}</p>
                      <div className={styles.actionButtons}>
                        <button 
                          className={styles.editButton} 
                          onClick={() => handleEdit(profile.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDelete(profile.id, type.key)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.createSection}>
                      <p className={styles.noProfileText}>You haven't created a {type.name.toLowerCase()} profile yet.</p>
                      <Link href={`/create/${type.key}`} className={styles.createButton}>
                        Create {type.name} Profile
                      </Link>
                    </div>
                  )}
                </div>
              );
          })}
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
        <button className={styles.navItemActive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 