'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUserProfiles, ensureUserExists } from '@/lib/api';
import { useFrame } from '@/context/FrameContext'; // Import the custom hook
import styles from './HomepageClient.module.css';

// Helper function to fetch user data from our internal API route
async function fetchUserDataFromApi(fids) {
    if (!fids || fids.length === 0) return {};
    try {
        const response = await fetch(`/api/user-data?fids=${fids.join(',')}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching from /api/user-data:", error);
        throw error; 
    }
}

export default function HomepageClient() {
    // Get FID state from context
    const { fid, isLoading: isFrameLoading, error: frameError } = useFrame(); 
    
    // Local state for API data fetching (Neynar, Profiles)
    const [neynarUserData, setNeynarUserData] = useState(null);
    const [userProfiles, setUserProfiles] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false); // Separate loading state for API calls
    const [dataError, setDataError] = useState(null); // Separate error state for API calls

    // Function to load Neynar/Profile data *after* FID is available
    const loadInitialData = async (userFid) => {
        if (!userFid) return; // Should already be checked before calling
        
        setIsDataLoading(true);
        setDataError(null);
        let fetchedUserData = null;
        let fetchedProfiles = [];

        try {
            // Step 1: Fetch User Data
            const userDataResult = await fetchUserDataFromApi([userFid]);
            if (userDataResult && userDataResult[userFid]) {
                fetchedUserData = userDataResult[userFid];
                setNeynarUserData(fetchedUserData);
                // Step 2: Ensure user exists
                try {
                    await ensureUserExists({
                        fid: userFid,
                        display_name: fetchedUserData.display_name,
                        pfp_url: fetchedUserData.pfp_url 
                    });
                } catch (ensureError) {
                     console.error(`Failed to ensure user ${userFid} in DB:`, ensureError);
                }
            } else {
                console.warn(`User data fetch failed for FID: ${userFid}`);
                setNeynarUserData({ fid: userFid, display_name: `User ${userFid}`, pfp_url: null });
            }

            // Step 3: Fetch user profiles
            try {
                fetchedProfiles = await getUserProfiles(userFid);
                setUserProfiles(fetchedProfiles || []);
            } catch (profileError) {
                 if (profileError?.message?.includes('404') || profileError?.message?.includes('Not Found')) {
                     console.log(`User ${userFid} has no profiles yet.`);
                     setUserProfiles([]); 
                 } else {
                    console.error("Error fetching user profiles:", profileError);
                    setDataError(profileError?.message || 'Failed to load profile status.');
                    setUserProfiles([]);
                 }
            }
        } catch (err) {
            console.error("HomepageClient data loading error:", err);
            setDataError(err.message || 'Failed to load user data.');
            // Set defaults even if fetch fails
            if (!fetchedUserData) setNeynarUserData({ fid: userFid, display_name: `User ${userFid}`, pfp_url: null });
            setUserProfiles([]);
        } finally {
            setIsDataLoading(false);
        }
    };

    // Effect to load data when FID becomes available from context
    useEffect(() => {
        if (fid && !isFrameLoading && !frameError) {
            console.log('HomepageClient: FID available from context, loading data...', fid);
            loadInitialData(fid);
        }
    }, [fid, isFrameLoading, frameError]); // Rerun if FID or frame loading/error state changes

    const hasProfileType = (type) => userProfiles.some(profile => profile.type === type);

    const profileTypes = [
        { key: 'partner', name: 'Partner', className: styles.partnerLink },
        { key: 'friend', name: 'Friend', className: styles.friendLink },
        { key: 'job', name: 'Job', className: styles.jobLink },
    ];

    // --- Render Logic --- 

    // Initial state while frame context is loading
    if (isFrameLoading) {
         return (
            <>
                <section className={styles.sectionPlaceholder}>Waiting for Farcaster user...</section>
            </>
        );
    }
    
    // Handle error from Frame context itself
    if (frameError) {
        return <div className={styles.errorText}>{frameError}</div>;
    }

    // Handle state where FID is null after loading (not in a frame)
    if (fid === null && !isFrameLoading) {
        return <div className={styles.errorText}>Could not determine Farcaster user. Are you in a frame?</div>;
    }

    // Loading state for API data after FID is confirmed
    if (isDataLoading) {
        return (
            <>
                <section className={styles.sectionPlaceholder}>Loading Profile Status...</section>
                {/* Display PFP placeholder using potentially available Neynar data while profiles load */} 
                {neynarUserData ? (
                    <div className={styles.pfpPlaceholder}>Loading...</div> // Simple text or small spinner 
                ) : (
                     <div className={styles.pfpPlaceholder}>Loading User Info...</div>
                )}
            </>
        );
    }

    // Handle error from API data fetching
    if (dataError) {
        // Still try to render PFP section if Neynar data is available
        return (
             <>
                <div className={styles.errorText}>{dataError}</div>
                {neynarUserData && (
                     <div className={styles.pfpSection}> 
                        <Image 
                            src={neynarUserData.pfp_url || 'https://via.placeholder.com/48'}
                            alt={neynarUserData.display_name || 'User PFP'}
                            width={48}
                            height={48}
                            className={styles.pfpImage}
                            unoptimized
                        />
                        <span className={styles.pfpDisplayName}>{neynarUserData.display_name || 'User'}</span>
                    </div>
                )}
            </>
        )
    }

    // --- Successful Render --- 
    return (
        <>
            <section className={`${styles.section} ${styles.myProfilesSection}`}> 
                <h2 className={styles.sectionTitle}>My Profiles</h2>
                <ul className={styles.profileStatusList}>
                    {profileTypes.map(pt => {
                        const exists = hasProfileType(pt.key);
                        const profile = exists ? userProfiles.find(p => p.type === pt.key) : null;
                        return (
                            <li key={pt.key}>
                                <span className={`${styles.profileTypeName} ${pt.className}`}>{pt.name}:</span>
                                {exists && profile ? (
                                    <Link href={`/edit/${profile.id}`} className={styles.profileActionLink}>
                                        View/Edit
                                    </Link>
                                ) : (
                                    <Link href={`/create/${pt.key}`} className={styles.profileActionLink}>
                                        Create
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <Link href="/my-profiles" className={styles.manageLink}>Manage All My Profiles</Link>
            </section>

            {neynarUserData && (
                <div className={styles.pfpSection}> 
                    <Image 
                        src={neynarUserData.pfp_url || 'https://via.placeholder.com/48'}
                        alt={neynarUserData.display_name || 'User PFP'}
                        width={48}
                        height={48}
                        className={styles.pfpImage}
                        unoptimized
                    />
                    <span className={styles.pfpDisplayName}>{neynarUserData.display_name || 'User'}</span>
                </div>
            )}
        </>
    );
} 