'use client';

import { useState, useEffect } from 'react';
import { getProfiles } from '@/lib/api';
// import ProfileCard from '@/components/ProfileCard';
// import FilterControls from '@/components/FilterControls';

export default function BrowseClient({ profileType, initialProfiles, initialError, initialHasMore, initialFilters }) {
  const [profiles, setProfiles] = useState(initialProfiles || []);
  const [loading, setLoading] = useState(false); // Initial load done on server
  const [error, setError] = useState(initialError);
  const [page, setPage] = useState(1); // Start at page 1 (already loaded)
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [filters, setFilters] = useState(initialFilters || {});

  // Function to load subsequent pages or refetch on filter change
  const loadProfiles = async (newPage, newFilters) => {
    setLoading(true);
    setError(null);
    try {
      const apiParams = { type: profileType, page: newPage, ...newFilters };
      console.log(`Fetching profiles page ${newPage} for type ${profileType} on client...`, apiParams);
      const data = await getProfiles(apiParams);
      const newProfiles = data?.profiles || [];
      
      if (newPage === 1) {
          setProfiles(newProfiles); // Replace profiles if it's a filter change (page 1)
      } else {
          setProfiles(prev => [...prev, ...newProfiles]); // Append for pagination
      }
      
      // TODO: Adjust hasMore logic based on API
      setHasMore(newProfiles.length > 0);
      console.log(`Client fetch found ${newProfiles.length} profiles. Has More: ${newProfiles.length > 0}`);

    } catch (err) {
      const errorMsg = err.message || `Failed to load page ${newPage} for ${profileType} profiles.`;
      setError(errorMsg);
      console.error("BrowseClient loadProfiles Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for loading the next page
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProfiles(nextPage, filters);
    }
  };

  // Handler for when filters are changed by FilterControls component
  const handleFilterChange = (newFilters) => {
      console.log('Filters changed:', newFilters);
      setFilters(newFilters);
      setPage(1); // Reset to first page
      setProfiles([]); // Clear current profiles before loading new ones
      setHasMore(true); // Assume there might be results with new filters
      loadProfiles(1, newFilters); // Fetch page 1 with new filters
  };
  
  // Reset when profileType changes (if component stays mounted during type navigation)
  useEffect(() => {
      setProfiles(initialProfiles || []);
      setError(initialError);
      setPage(1);
      setHasMore(initialHasMore);
      setFilters(initialFilters || {});
  }, [profileType, initialProfiles, initialError, initialHasMore, initialFilters]);


  return (
    <div>
      {/* TODO: Implement actual FilterControls component */} 
      {/* <FilterControls type={profileType} initialFilters={filters} onChange={handleFilterChange} /> */}
      <p>Filter Controls Placeholder</p>
      <button onClick={() => handleFilterChange({ someFilter: Math.random() })}>Simulate Filter Change</button>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {profiles.length === 0 && !loading && !error && (
        <p>No profiles found matching your criteria.</p>
      )}

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {profiles.map(profile => (
          <div key={profile.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            {/* TODO: Implement actual ProfileCard component */}
            {/* <ProfileCard profile={profile} /> */}
            <p>Profile Card Placeholder</p>
            <p>ID: {profile.id} ({profile.type})</p>
             <a href={`/profile/${profile.id}`}>View Details</a> 
          </div>
        ))}
      </div>

      {loading && <p>Loading profiles...</p>}

      {!loading && hasMore && (
        <button onClick={loadMore}>Load More</button>
      )}
      {!loading && !hasMore && profiles.length > 0 && (
         <p>No more profiles to load.</p>
      )}
    </div>
  );
} 