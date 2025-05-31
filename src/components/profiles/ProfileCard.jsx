'use client'; // May need client-side interactions later (e.g., link)

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For potential PFP display
import styles from './ProfileCard.module.css'; // Import CSS module

// Helper function to get the right *CSS module class* based on profile type
const getCardClass = (type) => {
    switch (type) {
        case 'partner': return styles.cardPartner;
        case 'friend': return styles.cardFriend;
        case 'job': return styles.cardJob;
        default: return ''; // No extra class for default border
    }
};

const ProfileCard = ({ profile }) => {
    if (!profile) return null;

    // Destructure needed fields (adjust based on actual API response for GET /api/profiles)
    const {
        id,
        type,
        status,
        created_at,
        user_fid, // Assuming API provides this
        user_pfp_url, // Assuming API provides this or we fetch separately
        user_display_name, // Assuming API provides this
        // TODO: Get actual key fields from profile object structure
        // Example assuming they are in profile.summary_fields = { key1: value1, key2: value2 }
        summary_fields
    } = profile;

    // Mock some additional info like followers and mutuals for the design
    const mockStats = {
        age: Math.floor(Math.random() * 15) + 20, // 20-35
        followers: Math.floor(Math.random() * 2000) + 100, // 100-2100
        mutuals: Math.floor(Math.random() * 100) + 5 // 5-105
    };

    return (
        <Link href={`/profile/${id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.pfpWrapper}>
                    <Image 
                        src={user_pfp_url || 'https://via.placeholder.com/56'} // Larger PFP to match design
                        alt={user_display_name || 'User PFP'}
                        width={56}
                        height={56}
                        className={styles.pfp}
                        unoptimized
                    />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.displayName}>
                        {user_display_name || `User ${user_fid}`}
                    </p>
                    <p className={styles.userMeta}>
                        {mockStats.age} · {mockStats.followers} followers · {mockStats.mutuals} mutuals
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProfileCard; 