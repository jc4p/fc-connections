'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Needed for edit navigation
import { getUserProfiles, deleteProfile, getFidFromWindow } from '@/lib/api';

export default function MyProfilesClient() {
  const router = useRouter();
  const [profiles, setProfiles] = useState({ partner: null, friend: null, job: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fid, setFid] = useState(null);

  const profileTypes = ['partner', 'friend', 'job'];
  const colors = {
    partner: '#FF5E7D',
    friend: '#4CAF50',
    job: '#2196F3',
  };

  // Effect to get FID and load profiles
  useEffect(() => {
    const userFid = getFidFromWindow();
    if (!userFid) {
      setError('User Farcaster ID not found. Cannot load profiles. Please ensure you are using this within a Farcaster frame.');
      setLoading(false);
      return;
    }
    setFid(userFid);

    async function loadProfiles(currentFid) {
        setLoading(true);
        setError(null);
        try {
            // TODO: Verify/adjust endpoint `/users/:fid/profiles` based on API implementation
            console.log(`Fetching profiles for FID: ${currentFid} on client...`);
            const data = await getUserProfiles(currentFid);
            const fetchedProfiles = data?.profiles || []; // Adjust based on API structure
            console.log(`Found ${fetchedProfiles.length} profiles`);
            
            // Organize profiles by type
            const organized = { partner: null, friend: null, job: null };
            fetchedProfiles.forEach(p => {
              if (profileTypes.includes(p.type)) {
                organized[p.type] = p;
              }
            });
            setProfiles(organized);
        } catch (err) {
            setError(err.message || 'Failed to load your profiles.');
            console.error("MyProfilesClient loadProfiles Error:", err);
        } finally {
            setLoading(false);
        }
    }

    loadProfiles(userFid);
  }, []); // Run once on mount

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

  if (loading) return <p>Loading your profiles...</p>;
  // Initial error state before loading starts (e.g., FID not found)
  if (error && profiles.partner === null && profiles.friend === null && profiles.job === null) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
        {/* Display loading error if it occurs after initial state */}
        {error && !loading && <p style={{ color: 'red' }}>Error: {error}</p>} 

        {profileTypes.map(type => {
            const profile = profiles[type];
            return (
            <section key={type} style={{ border: `2px solid ${colors[type] || '#ccc'}`, padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '8px' }}>
                <h2 style={{ color: colors[type] || '#333', textTransform: 'capitalize', marginTop: 0 }}>{type} Profile</h2>
                {profile ? (
                <div>
                    {/* TODO: Display more profile info: creation date, status, view stats */} 
                    <p>Status: {profile.status || 'Created'}</p> 
                    
                    <button onClick={() => handleEdit(profile.id)} style={{ marginRight: '1rem' }}>Edit</button>
                    <button 
                        onClick={() => handleDelete(profile.id, type)} 
                        style={{ backgroundColor: '#f44336', color: 'white' }}
                    >
                        Delete
                    </button>
                    {/* TODO: Add Active/Inactive Toggle button */} 
                </div>
                ) : (
                <div>
                    <p>You haven't created a {type} profile yet.</p>
                    <Link href={`/create/${type}`} passHref>
                    <button style={{ backgroundColor: colors[type] || '#777', color: 'white' }}>Create {type} Profile</button>
                    </Link>
                </div>
                )}
            </section>
            );
        })}
    </div>
  );
} 