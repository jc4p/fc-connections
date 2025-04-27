import { getFieldDefinitions } from '@/lib/api';
// Import the Client Component
import CreateProfileClient from '@/components/CreateProfileClient';
// import CustomBackButton from '@/components/CustomBackButton';

const pageTitles = {
  partner: 'Create Partner Profile',
  friend: 'Create Friend Profile',
  job: 'Create Job Profile',
};

export default async function CreateProfilePage({ params }) {
  const profileType = params.type;
  let fieldDefinitions = [];
  let initialError = null;

  // Validate profile type
  if (!profileType || !pageTitles[profileType]) {
    initialError = 'Invalid profile type provided.';
  } else {
      try {
        console.log(`Fetching field definitions for type: ${profileType} on server...`);
        // TODO: Confirm endpoint in PAGE_BREAKDOWN.md & API implementation
        const data = await getFieldDefinitions(profileType);
        fieldDefinitions = data?.definitions || []; // Adjust based on API response
        console.log(`Found ${fieldDefinitions.length} field definitions.`);
        if (fieldDefinitions.length === 0 && !data) {
            // Handle case where API might return nothing on success instead of empty array
            console.warn('No field definitions returned from API.');
        }
      } catch (err) {
        initialError = err.message || 'Failed to load profile fields.';
        console.error("CreateProfilePage Server Error:", err);
        fieldDefinitions = []; // Ensure it's an empty array on error
      }
  }

  return (
    <div>
      {/* <CustomBackButton href="/" /> */}
      <a href="/">Cancel (Server Link)</a>
      <h1>{pageTitles[profileType] || 'Create Profile'}</h1>

      {initialError ? (
        <p style={{ color: 'red' }}>Error loading form: {initialError}</p>
      ) : (
        // Render the client component for the form, passing definitions
        <CreateProfileClient 
           profileType={profileType}
           fieldDefinitions={fieldDefinitions} 
        />
      )}
    </div>
  );
} 