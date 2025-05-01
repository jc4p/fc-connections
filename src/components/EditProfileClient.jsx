'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile, deleteProfile } from '@/lib/api';
import { useFrame } from '@/context/FrameContext'; // Import the hook
import DynamicProfileForm from './profiles/DynamicProfileForm';
import styles from './EditProfileClient.module.css'; // Import CSS Module

export default function EditProfileClient({ profileType, profileId, initialProfileData }) {
  const router = useRouter();
  // Get FID state from context (might be useful for authorization checks later)
  const { fid, isLoading: isFrameLoading, error: frameError } = useFrame();
  
  // Local state
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Memoize the formatted initial form data based on the incoming profile data
  const initialFormData = useMemo(() => {
      if (initialProfileData?.profile_field_values) {
          return initialProfileData.profile_field_values.reduce((acc, item) => {
              acc[item.field_key] = item.value;
              return acc;
          }, {});
      } else {
           console.warn("Initial profile data or field values missing for edit form.");
           return {}; // Return empty object if data is missing
      }
  }, [initialProfileData]); // Only recompute if the initialProfileData prop changes

  const handleSubmit = async (formData) => {
    if (isSubmitting) return;
    // TODO: Add authorization check using fid from context if needed by API
    console.log('Updating profile:', formData);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        profile_field_values: Object.entries(formData).map(([key, value]) => ({ 
            field_key: key, 
            value: String(value)
        }))
      };
      await updateProfile(profileId, payload);
      alert('Profile updated successfully!');
      router.push('/my-profiles');
      router.refresh();
    } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to update profile.';
        setSubmitError(errorMessage);
        console.error("EditProfileClient Submit Error:", err);
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    // TODO: Add authorization check using fid from context if needed by API
    if (!window.confirm('Are you absolutely sure you want to delete this profile? This action cannot be undone.')) {
        return;
    }
    
    setSubmitError(null);
    setIsDeleting(true);
    try {
        await deleteProfile(profileId);
        alert('Profile deleted successfully!');
        router.push('/my-profiles');
        router.refresh();
    } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to delete profile.';
        setSubmitError(errorMessage);
        console.error("EditProfileClient Delete Error:", err);
        setIsDeleting(false);
    } 
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/my-profiles');
    }
  };

  // Handle frame loading/error states
  if (isFrameLoading) {
      return <p className={styles.loadingText}>Waiting for Farcaster user...</p>;
  }
  if (frameError) {
      return <p className={styles.errorText}>Error: {frameError}</p>;
  }
  // It might still be okay to edit even if FID failed, 
  // but actions might fail later if API requires FID for auth.
  // Consider if we should block editing if FID is null.
  // if (!fid) {
  //      return <p className={styles.errorText}>Error: Could not determine Farcaster user FID.</p>;
  // }

  // Determine if the initial data needed for the form is available
  // Use the memoized initialFormData directly. Check if it has keys.
  const canRenderForm = Object.keys(initialFormData).length > 0 || !initialProfileData?.profile_field_values;

  return (
    <div className={styles.container}>
      {/* Show loading text if initialFormData isn't ready yet */}
      {!canRenderForm && <p className={styles.loadingText}>Loading profile data...</p>} 
      
      {canRenderForm && (
        <DynamicProfileForm 
          profileType={profileType}
          initialData={initialFormData}
          onSubmit={handleSubmit} 
          submitButtonText={isSubmitting ? 'Saving...' : 'Save Changes'}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Render action buttons only if form can be rendered */}
      {canRenderForm && (
          <div className={styles.actionButtonsContainer}> 
            <div>
                <button 
                    onClick={handleCancel} 
                    disabled={isSubmitting || isDeleting}
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
            </div>
            <div>
                <button 
                    onClick={handleDelete} 
                    disabled={isSubmitting || isDeleting}
                    className={styles.deleteButton}
                    >
                    {isDeleting ? 'Deleting...' : 'Delete Profile'}
                </button>
            </div>
          </div>
      )}
      
      {submitError && <p className={styles.errorText}>Error: {submitError}</p>} 
    </div>
  );
} 