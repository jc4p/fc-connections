import CreateProfileClient from '@/components/CreateProfileClient';
// import CustomBackButton from '@/components/CustomBackButton';

const pageTitles = {
  partner: 'Create Partner Profile',
  friend: 'Create Friend Profile',
  job: 'Create Job Profile',
};

// Make component synchronous
export default async function CreateProfilePage({ params }) {
  const profileType = (await params).type;
  let initialError = null;

  // Validate profile type only
  if (!profileType || !pageTitles[profileType]) {
    initialError = 'Invalid profile type provided.';
  }

  return (
    <main>
      {initialError ? (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#fbf9f9',
          padding: '1rem'
        }}>
          <div style={{
            color: '#d32f2f',
            textAlign: 'center',
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            border: '1px solid rgba(211, 47, 47, 0.3)',
            borderRadius: '0.5rem',
            padding: '2rem'
          }}>
            <h2>Page Error</h2>
            <p>Error loading page: {initialError}</p>
          </div>
        </div>
      ) : (
        <CreateProfileClient 
           profileType={profileType}
        />
      )}
    </main>
  );
} 