import CreateProfileClient from '@/components/CreateProfileClient';
// import CustomBackButton from '@/components/CustomBackButton';

const pageTitles = {
  partner: 'Create Partner Profile',
  friend: 'Create Friend Profile',
  job: 'Create Job Profile',
};

// Make component synchronous
export default function CreateProfilePage({ params }) {
  const profileType = params.type;
  let initialError = null;

  // Validate profile type only
  if (!profileType || !pageTitles[profileType]) {
    initialError = 'Invalid profile type provided.';
  }

  return (
    <div>
      {/* <CustomBackButton href="/" /> */}
      <a href="/">Cancel (Server Link)</a>
      <h1>{pageTitles[profileType] || 'Create Profile'}</h1>

      {initialError ? (
        <p style={{ color: 'red' }}>Error loading page: {initialError}</p>
      ) : (
        <CreateProfileClient 
           profileType={profileType}
        />
      )}
    </div>
  );
} 