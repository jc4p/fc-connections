import { getProfiles } from '@/lib/api';
// Import the Client Component
import BrowseClient from '@/components/BrowseClient'; 
// import CustomBackButton from '@/components/CustomBackButton'; // Assuming this is a Client Component or link

const pageTitles = {
  partner: 'Partner Connections',
  friend: 'Friend Connections',
  job: 'Job Connections',
};

// Fetch initial data on the server
export default async function BrowsePage({ params, searchParams }) {
  const profileType = params.type;
  const initialPage = 1; 
  // TODO: Parse initial filters from searchParams if needed
  const initialFilters = {}; 

  let initialProfiles = [];
  let initialError = null;
  let initialHasMore = false; // Assume we need to fetch more unless proven otherwise

  try {
    const apiParams = { type: profileType, page: initialPage, ...initialFilters };
    console.log(`Fetching initial profiles for type: ${profileType} on server...`);
    const data = await getProfiles(apiParams);
    initialProfiles = data?.profiles || [];
    // TODO: Adjust hasMore logic based on actual API pagination response
    initialHasMore = initialProfiles.length > 0; // Simple check for now
    console.log(`Initial fetch found ${initialProfiles.length} profiles.`);
  } catch (err) {
    initialError = err.message || `Failed to load initial ${profileType} profiles.`;
    console.error("BrowsePage Server Error:", err);
  }

  return (
    <main>
      {/* Render the Client Component which handles its own header and navigation */}
      <BrowseClient
        profileType={profileType}
        initialProfiles={initialProfiles}
        initialError={initialError}
        initialHasMore={initialHasMore}
        initialFilters={initialFilters} 
      /> 
    </main>
  );
} 