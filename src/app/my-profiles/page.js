// This remains a Server Component - provides the page shell
// import CustomBackButton from '@/components/CustomBackButton';
import MyProfilesClient from '@/components/MyProfilesClient'; // Import the client part

export default function MyProfilesPage() {
  // No user-specific data fetching here as FID is not available server-side

  return (
    <div>
      {/* <CustomBackButton href="/" /> */}
      <a href="/">Back (Server Link)</a>
      <h1>My Profiles</h1>
      
      {/* Render the client component which will handle FID fetching and data loading */}
      <MyProfilesClient />
    </div>
  );
}