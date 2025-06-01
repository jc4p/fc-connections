'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './ProfileDetailClient.module.css';

export default function ProfileDetailClient({ initialProfile, initialError }) {
  const router = useRouter();
  const [profile] = useState(initialProfile);
  const [error] = useState(initialError);
  
  // Convert field values array to object for easier access
  const fieldValues = profile?.profile_field_values ? 
    profile.profile_field_values.reduce((acc, field) => {
      acc[field.field_key] = field.value;
      return acc;
    }, {}) : {};
  
  // Get field definition with label
  const getFieldWithLabel = (fieldKey) => {
    const field = profile?.profile_field_values?.find(f => f.field_key === fieldKey);
    return field || null;
  };
  
  // Categorize fields by how they should be rendered
  const metadataFields = ['age', 'location', 'gender_identity', 'seeking_orientation', 'is_employer'];
  const conversationalFields = [
    'ideal_sunday', 'heart_access', 'passion_talk', 'trust_signal', 'friendship_offer', 
    'friendship_seeking', 'friend_role', 'perfect_hangout', 'professional_summary', 
    'current_focus', 'career_motivation', 'learning_interest'
  ];
  const choiceFields = [
    'conflict_style', 'love_language_give', 'love_language_receive', 'communication_style', 
    'support_preference', 'humor_style', 'availability_style', 'work_environment'
  ];
  const sliderFields = ['social_battery', 'new_experience_openness'];
  
  // Get metadata for badges and stats
  const getMetadataTags = () => {
    const tags = [];
    
    if (fieldValues['is_employer'] === 'true') {
      tags.push({ text: 'Employer', color: 'var(--connection-job)' });
    }
    
    if (fieldValues['gender_identity']) {
      tags.push({ text: fieldValues['gender_identity'], color: 'var(--text-secondary)' });
    }
    
    return tags;
  };
  
  // Get seeking/looking for info
  const getSeekingInfo = () => {
    if (profile.profile_type === 'partner' && fieldValues['seeking_orientation']) {
      return `Looking for ${fieldValues['seeking_orientation']}`;
    }
    if (profile.profile_type === 'friend' && fieldValues['friendship_seeking']) {
      return fieldValues['friendship_seeking'];
    }
    return null;
  };
  
  // Get conversational Q&A fields
  const getConversationalFields = () => {
    return profile?.profile_field_values?.filter(field => 
      conversationalFields.includes(field.field_key) && field.value
    ) || [];
  };
  
  // Get choice/preference fields
  const getChoiceFields = () => {
    return profile?.profile_field_values?.filter(field => 
      choiceFields.includes(field.field_key) && field.value
    ) || [];
  };
  
  // Get slider fields with visual representation
  const getSliderFields = () => {
    return profile?.profile_field_values?.filter(field => 
      sliderFields.includes(field.field_key) && field.value
    ) || [];
  };
  
  // Render slider value as visual
  const renderSliderValue = (field) => {
    const value = parseInt(field.value) || 5;
    const percentage = (value / 10) * 100;
    
    return (
      <div className={styles.sliderDisplay}>
        <div className={styles.sliderTrack}>
          <div 
            className={styles.sliderFill} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={styles.sliderValue}>{value}/10</span>
      </div>
    );
  };
  
  // TODO: Consider calling view tracking API here in a useEffect hook
  // useEffect(() => {
  //   if (profile?.id) {
  //     recordProfileView(profile.id).catch(console.error);
  //   }
  // }, [profile?.id]);

  const handleConnect = async () => {
    // TODO: Implement connection logic without alert (blocked in frame)
    console.log('Connect button clicked for FID:', profile?.fid);
  };

  const handleReport = () => {
    // TODO: Implement report modal/logic without alert (blocked in frame)
    console.log('Report button clicked for profile:', profile?.id);
  };
  
  const getProfileTypeTitle = (type) => {
    switch (type) {
      case 'partner': return 'Dating Profile';
      case 'friend': return 'Friend Profile';
      case 'job': return 'Professional Profile';
      default: return 'Profile';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'partner': return 'var(--connection-partner)';
      case 'friend': return 'var(--connection-friend)';
      case 'job': return 'var(--connection-job)';
      default: return 'var(--brand-primary)';
    }
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
          {/* User Header */}
          <div className={styles.userHeader}>
            <div className={styles.userAvatar}>
              <Image 
                src={profile.avatar_url || 'https://via.placeholder.com/80'}
                alt={profile.display_name || 'User avatar'}
                width={80}
                height={80}
                className={styles.avatar}
                unoptimized
              />
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.displayName}>{profile.display_name || `User ${profile.fid}`}</h2>
              <div className={styles.profileTypeBadge} style={{backgroundColor: getTypeColor(profile.profile_type)}}>
                {getProfileTypeTitle(profile.profile_type)}
              </div>
              <div className={styles.userStats}>
                {fieldValues['age'] && (
                  <span className={styles.stat}>{fieldValues['age']} years old</span>
                )}
                {fieldValues['location'] && (
                  <span className={styles.stat}>{fieldValues['location']}</span>
                )}
                <span className={styles.stat}>{profile.view_count || 0} views</span>
              </div>
              
              {/* Metadata Tags */}
              {getMetadataTags().length > 0 && (
                <div className={styles.tagContainer}>
                  {getMetadataTags().map((tag, index) => (
                    <span 
                      key={index} 
                      className={styles.metadataTag}
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Seeking Information */}
              {getSeekingInfo() && (
                <div className={styles.seekingInfo}>
                  {getSeekingInfo()}
                </div>
              )}
            </div>
          </div>
          
          {/* Conversational Q&A */}
          {getConversationalFields().length > 0 && (
            <div className={styles.fieldSection}>
              <h3 className={styles.sectionTitle}>About Me</h3>
              <div className={styles.fieldList}>
                {getConversationalFields().map(field => (
                  <div key={field.field_key} className={styles.conversationalField}>
                    <div className={styles.questionText}>{field.field_label}</div>
                    <div className={styles.answerText}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Preferences & Choices */}
          {getChoiceFields().length > 0 && (
            <div className={styles.fieldSection}>
              <h3 className={styles.sectionTitle}>Preferences</h3>
              <div className={styles.preferenceGrid}>
                {getChoiceFields().map(field => (
                  <div key={field.field_key} className={styles.preferenceItem}>
                    <div className={styles.preferenceLabel}>{field.field_label}</div>
                    <div className={styles.preferenceValue}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Personality Traits (Sliders) */}
          {getSliderFields().length > 0 && (
            <div className={styles.fieldSection}>
              <h3 className={styles.sectionTitle}>Personality</h3>
              <div className={styles.sliderList}>
                {getSliderFields().map(field => (
                  <div key={field.field_key} className={styles.sliderField}>
                    <div className={styles.sliderLabel}>{field.field_label}</div>
                    {renderSliderValue(field)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.connectButton} onClick={handleConnect}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M240,128a87.89,87.89,0,0,1-24.18,60.9l-56.06-40.31a32,32,0,1,0-63.52,0L40.18,188.9A88,88,0,1,1,240,128Z"></path>
              </svg>
              Connect
            </button>
            <button className={styles.reportButton} onClick={handleReport}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"></path>
              </svg>
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