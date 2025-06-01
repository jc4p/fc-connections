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

    // Destructure needed fields based on profiles list API response structure
    const {
        id,
        profile_type: type,
        is_active: status,
        created_at,
        fid: user_fid,
        avatar_url: user_pfp_url,
        display_name: user_display_name,
        // Now includes profile_field_values from the updated API
        profile_field_values
    } = profile;

    // Convert field values array to object for easier access (if available)
    const fieldValues = profile_field_values ? 
        profile_field_values.reduce((acc, field) => {
            acc[field.field_key] = field.value;
            return acc;
        }, {}) : {};

    // Get actual data from profile fields
    const getDisplayStats = () => {
        const stats = [];
        
        // Try to get age from profile data (for partner profiles)
        if (type === 'partner') {
            const age = fieldValues['age'];
            if (age && !isNaN(age)) {
                stats.push(`${age} years old`);
            }
        }
        
        // Try to get location
        const location = fieldValues['location'];
        if (location && typeof location === 'string' && location.length < 30) {
            stats.push(location);
        }
        
        // Add view count if significant
        if (profile.view_count > 0) {
            stats.push(`${profile.view_count} views`);
        }
        
        return stats.length > 0 ? stats.join(' · ') : '';
    };

    // Get preview text from actual field values
    const getPreviewText = () => {
        if (profile_field_values && profile_field_values.length > 0) {
            // For partner profiles, prioritize "seeking_orientation" (looking for...)
            if (type === 'partner') {
                const seekingOrientation = fieldValues['seeking_orientation'];
                if (seekingOrientation && typeof seekingOrientation === 'string') {
                    return `Looking for ${seekingOrientation}`;
                }
            }
            
            // For friend profiles, prioritize "friendship_seeking" (looking for...)
            if (type === 'friend') {
                const friendshipSeeking = fieldValues['friendship_seeking'];
                if (friendshipSeeking && typeof friendshipSeeking === 'string') {
                    return `Looking for ${friendshipSeeking}`;
                }
            }
            
            // Try to find good preview fields for each type
            const previewFieldOrder = {
                'partner': ['heart_access', 'ideal_sunday', 'passion_talk'],
                'friend': ['friendship_offer', 'perfect_hangout', 'friend_role', 'friendship_seeking'],
                'job': ['professional_summary', 'current_focus', 'career_motivation', 'learning_interest']
            };
            
            const fieldsToTry = previewFieldOrder[type] || [];
            
            // Try preferred fields for this profile type
            for (const fieldKey of fieldsToTry) {
                const value = fieldValues[fieldKey];
                if (value && typeof value === 'string' && value.length > 15 && value.length < 120) {
                    return value;
                }
            }
            
            // If no preferred fields found, try any non-essential field
            const availableFields = Object.entries(fieldValues);
            for (const [key, value] of availableFields) {
                if (value && typeof value === 'string' && value.length > 15 && value.length < 120) {
                    return value;
                }
            }
            
            // Fallback to any field
            const [key, value] = availableFields[0];
            return value || 'Click to view full profile...';
        }
        
        // Fallback if no field values
        const typeMessages = {
            'partner': 'Looking for meaningful connections...',
            'friend': 'Open to new friendships...',
            'job': 'Professional networking...'
        };
        return typeMessages[type] || 'Click to view profile...';
    };

    return (
        <Link href={`/profile/${id}`} className={styles.cardLink}>
            <div className={`${styles.card} ${getCardClass(type)}`}>
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
                        {getDisplayStats()}
                    </p>
                    <p className={styles.previewText}>
                        {getPreviewText()}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProfileCard; 