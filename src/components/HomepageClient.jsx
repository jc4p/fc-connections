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
        <div className={styles.container}>
            <div className={styles.main}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.pageTitle}>Listings</h2>
                    <Link href="/my-profiles" className={styles.addButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                        </svg>
                    </Link>
                </div>

                {/* Categories Section */}
                <h2 className={styles.sectionTitle}>Categories</h2>
                <div className={styles.categoriesContainer}>
                    {profileTypes.map(pt => {
                        const exists = hasProfileType(pt.key);
                        const profile = exists ? userProfiles.find(p => p.type === pt.key) : null;
                        const descriptions = {
                            partner: "Find your perfect match",
                            friend: "Connect with like-minded individuals", 
                            job: "Explore exciting career opportunities"
                        };
                        
                        return (
                            <Link 
                                key={pt.key} 
                                href={`/browse/${pt.key}`}
                                className={styles.categoryCard}
                            >
                                <div className={styles.categoryIcon}></div>
                                <div className={styles.categoryContent}>
                                    <p className={styles.categoryTitle}>{pt.name}</p>
                                    <p className={styles.categoryDescription}>{descriptions[pt.key]}</p>
                                </div>
                                <div className={styles.categoryArrow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                                    </svg>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className={styles.bottomNav}>
                <Link href="/" className={styles.navItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                    </svg>
                </Link>
                <Link href="/browse" className={styles.navItemInactive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                </Link>
                <Link href="/create" className={styles.navItemInactive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                    </svg>
                </Link>
                <Link href="/messages" className={styles.navItemInactive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                    </svg>
                </Link>
                <Link href="/my-profiles" className={styles.navItemInactive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
} 