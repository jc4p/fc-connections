'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/lib/api';
import { useFrame } from '@/context/FrameContext'; // Import the hook
import DynamicProfileForm from './profiles/DynamicProfileForm';
import styles from './CreateProfileClient.module.css'; // Import CSS Module

export default function CreateProfileClient({ profileType }) {
  const router = useRouter();
  // Get FID state from context
  const { fid, isLoading: isFrameLoading, error: frameError } = useFrame();
  
  // Local state for submission
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    // Ensure FID is available before attempting submission
    if (!fid) {
        setSubmitError('User FID is not available. Cannot submit.');
        return;
    }
    if (isSubmitting) return;

    console.log('Submitting new profile:', formData);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        fid,
        type: profileType,
        status: 'active',
        profile_field_values: Object.entries(formData).map(([key, value]) => ({ 
            field_key: key, 
            value: String(value)
        }))
      };
      console.log("Submitting Payload:", payload);
      const createdProfile = await createProfile(payload);
      alert('Profile created successfully!');
      router.push(`/profile/${createdProfile.id}`);

    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create profile.';
      setSubmitError(errorMessage);
      console.error("CreateProfileClient Submit Error:", err);
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.back();
    }
  };

  // Handle frame loading/error states
  if (isFrameLoading) {
      return <p className={styles.loadingText}>Waiting for Farcaster user...</p>;
  }
  if (frameError) {
      return <p className={styles.errorText}>Error: {frameError}</p>;
  }
  if (!fid) {
       return <p className={styles.errorText}>Error: Could not determine Farcaster user FID.</p>;
  }

  const getPageTitle = () => {
    switch (profileType) {
      case 'partner': return 'Create Partner Listing';
      case 'friend': return 'Create Friend Listing'; 
      case 'job': return 'Create Job Listing';
      default: return 'Create Listing';
    }
  };

  // Render form once FID is ready
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={handleCancel} disabled={isSubmitting}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
          <h2 className={styles.pageTitle}>{getPageTitle()}</h2>
        </div>

        {/* Form Section */}
        <h3 className={styles.sectionTitle}>Prompts</h3>
        <DynamicProfileForm
          profileType={profileType}
          onSubmit={handleSubmit}
          submitButtonText={isSubmitting ? 'Creating...' : 'Next'}
          isSubmitting={isSubmitting}
        />

        {/* Display submission error */} 
        {submitError && <div className={styles.submitErrorText}>Submit Error: {submitError}</div>} 
      </div>
    </div>
  );
} 