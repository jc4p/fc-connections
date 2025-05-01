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
      router.push('/');
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

  // Render form once FID is ready
  return (
    <div className={styles.container}> 
      <DynamicProfileForm
        profileType={profileType}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Creating...' : 'Create Profile'}
        isSubmitting={isSubmitting} // Pass submitting state to disable form button
      />

      <button 
        onClick={handleCancel} 
        disabled={isSubmitting}
        className={styles.cancelButton}
      >
          Cancel
      </button>

      {/* Display submission error */} 
      {submitError && <p className={styles.submitErrorText}>Submit Error: {submitError}</p>} 
    </div>
  );
} 