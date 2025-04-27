'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile, deleteProfile } from '@/lib/api';
// import DynamicForm from '@/components/DynamicForm'; // Your form component

export default function EditProfileClient({ profileId, initialProfileData, fieldDefinitions }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initial form data could be extracted from initialProfileData.fields or similar
  // Example: const [formData, setFormData] = useState(initialProfileData?.fields || {});

  const handleSubmit = async (formData) => {
    if (isSubmitting) return;
    console.log('Updating profile via Client Component:', formData);
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: Structure payload as needed for your API
      const payload = { fields: formData }; // Or flatten if required
      await updateProfile(profileId, payload);
      alert('Profile updated successfully!');
      // Redirect to My Profiles page on success
      router.push('/my-profiles');
      // Optionally call router.refresh() if you want to refetch server data on the target page
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
      console.error("EditProfileClient Submit Error:", err);
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!window.confirm('Are you absolutely sure you want to delete this profile? This action cannot be undone.')) {
        return;
    }
    
    setError(null);
    setIsDeleting(true);
    try {
        await deleteProfile(profileId);
        alert('Profile deleted successfully!');
        router.push('/my-profiles'); // Redirect after deletion
        // Optionally call router.refresh()
    } catch (err) {
        setError(err.message || 'Failed to delete profile.');
        console.error("EditProfileClient Delete Error:", err);
        setIsDeleting(false); // Re-enable button if delete failed
    }
    // No finally needed for setIsDeleting as we navigate away on success
  };

  const handleCancel = () => {
    // Ask for confirmation before navigating away
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/my-profiles'); // Redirect back to My Profiles
    }
  };

  return (
    <div>
      {/* Placeholder for DynamicForm implementation */}
      {/* 
      <DynamicForm 
        fields={fieldDefinitions} 
        initialData={initialProfileData?.fields || {}} // Pass initial field values
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isSubmitting={isSubmitting}
        submitText="Update Profile"
        cancelText="Cancel"
      /> 
      */}
      
      <p>Dynamic Edit Form Placeholder (Client) for ID: {profileId}</p>
      <p>Fields:</p>
      <pre>{JSON.stringify(fieldDefinitions, null, 2)}</pre>
      <p>Initial Data (for form):</p>
      <pre>{JSON.stringify(initialProfileData?.fields || {}, null, 2)}</pre>
      
      {/* Simulate form actions */} 
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => handleSubmit({ updatedField: 'new client data' })} disabled={isSubmitting || isDeleting}>
          {isSubmitting ? 'Saving...' : 'Simulate Save Changes'}
        </button>
        <button onClick={handleCancel} style={{ marginLeft: '1rem' }} disabled={isSubmitting || isDeleting}>
          Simulate Cancel
        </button>
      </div>

      {/* Delete Button */} 
      <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <button onClick={handleDelete} disabled={isSubmitting || isDeleting} style={{ backgroundColor: '#f44336', color: 'white'}}>
             {isDeleting ? 'Deleting...' : 'Delete Profile'}
          </button>
      </div>
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>} 
    </div>
  );
} 