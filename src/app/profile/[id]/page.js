// Remove 'use client'; - This is now a Server Component
import { getProfile } from '@/lib/api';
// Import the Client Component
import ProfileDetailClient from '@/components/ProfileDetailClient';
// import CustomBackButton from '@/components/CustomBackButton'; // If it uses hooks, needs to be Client

export default async function ProfileDetailPage({ params }) {
  const profileId = params.id;
  let initialProfile = null;
  let initialError = null;

  if (!profileId) {
    // This case should ideally be handled by routing or middleware
    // but we can set an error state here.
    initialError = 'No profile ID provided in URL.';
  } else {
    try {
      // TODO: Implement view tracking server-side if possible, or trigger from client
      console.log(`Fetching profile ${profileId} on server...`);
      const data = await getProfile(profileId);
      initialProfile = data?.profile; // Adjust based on API response structure
      if (!initialProfile) {
          throw new Error('Profile not found from API.');
      }
      console.log(`Found profile type: ${initialProfile?.type}`);
    } catch (err) {
      initialError = err.message || 'Failed to load profile.';
      console.error("ProfileDetailPage Server Error:", err);
      // Set profile to null if fetch failed but ID was present
      initialProfile = null; 
    }
  }

  // TODO: Record profile view (maybe via a separate Route Handler or Server Action called from client?)
  
  return (
    <div>
      {/* <CustomBackButton href={`/browse/${initialProfile?.type || ''}`} /> */}
      <a href={initialProfile ? `/browse/${initialProfile.type}` : '/'}>Back (Server Link)</a>
      
      {/* Render Client Component if profile loaded, otherwise show error */}
      {initialProfile ? (
        // Render the client component, passing the fetched profile
        <ProfileDetailClient 
           initialProfile={initialProfile} 
        /> 
      ) : (
        <div>
          <h1>Profile Error</h1>
          <p style={{ color: 'red' }}>{initialError || 'Could not load profile data.'}</p>
        </div>
      )}
    </div>
  );
} 