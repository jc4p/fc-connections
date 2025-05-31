// This remains a Server Component - provides the page shell
// import CustomBackButton from '@/components/CustomBackButton';
import MyProfilesClient from '@/components/MyProfilesClient'; // Import the client part

export default function MyProfilesPage() {
  // No user-specific data fetching here as FID is not available server-side

  return (
    <main>
      {/* Render the client component which handles its own header and navigation */}
      <MyProfilesClient />
    </main>
  );
}