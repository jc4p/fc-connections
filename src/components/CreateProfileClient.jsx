'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProfile, getFidFromWindow } from '@/lib/api';
// import DynamicForm from '@/components/DynamicForm'; // Your form component

export default function CreateProfileClient({ profileType, fieldDefinitions }) {
  const router = useRouter();
  const [fid, setFid] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get FID on component mount (client-side)
  useEffect(() => {
    const userFid = getFidFromWindow();
    if (!userFid) {
      // Handle error: user might not be in frame context or FID not loaded yet
      setError('User Farcaster ID not found. Cannot create profile. Please ensure you are using this within a Farcaster frame.');
    } else {
      setFid(userFid);
    }
  }, []);

  const handleSubmit = async (formData) => {
    if (!fid) {
        setError('User FID is missing. Cannot submit.');
        return;
    }
    if (isSubmitting) return; // Prevent double submission

    console.log('Submitting new profile via Client Component:', formData);
    setError(null);
    setIsSubmitting(true);

    try {
      // Structure payload correctly for your API
      const payload = { 
        fid, 
        type: profileType, 
        fields: formData 
        // Add any other required base fields 
      }; 
      await createProfile(payload);
      alert('Profile created successfully!');
      // Redirect to My Profiles page on success
      router.push('/my-profiles'); 
    } catch (err) {
      setError(err.message || 'Failed to create profile.');
      console.error("CreateProfileClient Submit Error:", err);
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Ask for confirmation before navigating away
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/'); // Redirect to homepage or appropriate page
    }
  };

  // Handle initial FID loading state or error
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  // Optional: Show loading state while FID is being fetched?
  // if (fid === null) return <p>Loading user information...</p>;

  return (
    <div>
      {/* Placeholder for DynamicForm implementation */}
      {/* 
      <DynamicForm 
        fields={fieldDefinitions} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        isSubmitting={isSubmitting}
        submitText="Create Profile"
        cancelText="Cancel"
      /> 
      */}
      
      <p>Dynamic Form Placeholder (Client)</p>
      <p>Fields:</p>
      <pre>{JSON.stringify(fieldDefinitions, null, 2)}</pre>
      {fid ? <p>User FID: {fid}</p> : <p>Waiting for User FID...</p>}
      
      {/* Simulate form actions */} 
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => handleSubmit({ testField: 'client submit data' })} disabled={isSubmitting || !fid}>
          {isSubmitting ? 'Submitting...' : 'Simulate Submit'}
        </button>
        <button onClick={handleCancel} style={{ marginLeft: '1rem' }} disabled={isSubmitting}>
          Simulate Cancel
        </button>
      </div>
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Submit Error: {error}</p>} 
    </div>
  );
} 