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

    const typeSpecificClass = getCardClass(type);

    // Prepare summary fields display
    const summaryItems = summary_fields 
        ? Object.entries(summary_fields).slice(0, 2) // Take max 2 fields
        : [];

    return (
        <Link href={`/profile/${id}`} className={styles.cardLink}>
            {/* Combine base card class with type-specific border class */}
            <div className={`${styles.card} ${typeSpecificClass}`}>
                <div className={styles.header}>
                    <div className={styles.pfpWrapper}>
                        <Image 
                            src={user_pfp_url || 'https://via.placeholder.com/40'} // Placeholder PFP
                            alt={user_display_name || 'User PFP'}
                            width={40}
                            height={40}
                            className={styles.pfp} // Apply PFP style
                            unoptimized // Add this prop
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.displayName}>
                            {user_display_name || `User ${user_fid}`}
                        </p>
                         <p className={styles.fidText}>
                            Farcaster ID: {user_fid || 'N/A'}
                        </p>
                    </div>
                </div>
                
                {/* Key Profile Fields Display */} 
                {summaryItems.length > 0 && (
                    <div className={styles.fields}>
                        {summaryItems.map(([key, value]) => (
                            <p key={key}>
                                {/* TODO: Replace 'key' with a friendlier label if possible */} 
                                <span className={styles.fieldLabel}>{key}:</span> {value}
                            </p>
                        ))}
                    </div>
                )}
                
                {/* Footer? e.g., Creation date */} 
                {/* <div className="mt-2 text-xs text-gray-400">
                    Created: {new Date(created_at).toLocaleDateString()}
                </div> */} 
            </div>
        </Link>
    );
};

export default ProfileCard; 