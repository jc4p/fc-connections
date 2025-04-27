// Remove 'use client'; - This is now a Server Component
import { getProfile, getFieldDefinitions } from '@/lib/api';
// Import the Client Component
import EditProfileClient from '@/components/EditProfileClient';
// import CustomBackButton from '@/components/CustomBackButton';

export default async function EditProfilePage({ params }) {
  const profileId = params.id;
  let initialProfileData = null;
  let fieldDefinitions = [];
  let initialError = null;

  if (!profileId) {
    initialError = 'No profile ID provided.';
  } else {
    try {
      // Fetch profile data first
      console.log(`Fetching profile ${profileId} for editing on server...`);
      const profileResult = await getProfile(profileId);
      initialProfileData = profileResult?.profile;
      if (!initialProfileData) {
        throw new Error('Profile not found.');
      }

      // Then fetch field definitions based on profile type
      const profileType = initialProfileData.type;
      if (!profileType) {
           throw new Error('Profile type is missing in fetched data.');
      }
      console.log(`Fetching field definitions for type: ${profileType} on server...`);
      const definitionsResult = await getFieldDefinitions(profileType);
      fieldDefinitions = definitionsResult?.definitions || [];
      console.log(`Found ${fieldDefinitions.length} field definitions.`);
      
    } catch (err) {
      initialError = err.message || 'Failed to load data for editing.';
      console.error("EditProfilePage Server Error:", err);
      // Reset data on error
      initialProfileData = null;
      fieldDefinitions = [];
    }
  }

  return (
    <div>
      {/* <CustomBackButton href="/my-profiles" /> */}
      <a href="/my-profiles">Back to My Profiles (Server Link)</a>
      <h1>Edit {initialProfileData?.type || ''} Profile</h1>

      {initialError ? (
        <p style={{ color: 'red' }}>Error loading editor: {initialError}</p>
      ) : initialProfileData ? (
        // Render the client component for the form
        <EditProfileClient
          profileId={profileId}
          initialProfileData={initialProfileData}
          fieldDefinitions={fieldDefinitions}
        />
      ) : (
          // Should have been caught by initialError, but as a fallback
          <p>Loading...</p> 
      )}
    </div>
  );
} 