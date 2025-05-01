// Remove 'use client'; - This is now a Server Component
import { getProfile } from '@/lib/api';
// Import the Client Component
import EditProfileClient from '@/components/EditProfileClient';
// import CustomBackButton from '@/components/CustomBackButton';

export default async function EditProfilePage({ params }) {
  const profileId = params.id;
  let initialProfileData = null;
  let initialError = null;

  if (!profileId) {
    initialError = 'No profile ID provided.';
  } else {
    try {
      // Fetch profile data only
      console.log(`Fetching profile ${profileId} for editing on server...`);
      const profileResult = await getProfile(profileId); 
      // Note: getProfile fetches profile AND fields according to api.js, 
      // make sure it returns the core profile data needed by EditProfileClient.
      initialProfileData = profileResult?.profile; // Assuming structure { profile: {...}, fields: [...] }
      if (!initialProfileData) {
        throw new Error('Profile not found.');
      }
      
    } catch (err) {
      initialError = err.message || 'Failed to load data for editing.';
      console.error("EditProfilePage Server Error:", err);
      initialProfileData = null;
    }
  }

  return (
    <div>
      {/* <CustomBackButton href="/my-profiles" /> */}
      <a href="/my-profiles">Back to My Profiles (Server Link)</a>
      <h1>Edit {initialProfileData?.profile_type || ''} Profile</h1>

      {initialError ? (
        <p style={{ color: 'red' }}>Error loading editor: {initialError}</p>
      ) : initialProfileData ? (
        // Pass only profileId and initialProfileData
        <EditProfileClient
          profileId={profileId}
          initialProfileData={initialProfileData}
          profileType={initialProfileData.profile_type} // Pass profileType needed by form
        />
      ) : (
          <p>Loading...</p> 
      )}
    </div>
  );
} 