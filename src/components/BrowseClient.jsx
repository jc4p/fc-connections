'use client';

import { useState, useEffect } from 'react';
import { getProfiles } from '@/lib/api';
import { useRouter } from 'next/navigation';
import ProfileCard from '@/components/profiles/ProfileCard';
import styles from './BrowseClient.module.css';

export default function BrowseClient({ profileType, initialProfiles, initialError, initialHasMore, initialFilters }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(initialProfiles || []);
  const [loading, setLoading] = useState(false); // Initial load done on server
  const [error, setError] = useState(initialError);
  const [page, setPage] = useState(1); // Start at page 1 (already loaded)
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [filters, setFilters] = useState(initialFilters || {});

  const getTypeTitle = (type) => {
    switch (type) {
      case 'partner': return 'Dating Connections';
      case 'friend': return 'Friend Connections';
      case 'job': return 'Job Connections';
      default: return 'Listings';
    }
  };

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
      
      // Fix hasMore logic - we have more if we got a full page of results
      const pageSize = 20; // Default from API
      const hasMoreResults = newProfiles.length === pageSize;
      setHasMore(hasMoreResults);
      console.log(`Client fetch found ${newProfiles.length} profiles. Has More: ${hasMoreResults}`);

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
    <div className={styles.container}>
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h2 className={styles.pageTitle}>{getTypeTitle(profileType)}</h2>
        </div>

        {/* Error State */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Empty State */}
        {profiles.length === 0 && !loading && !error && (
          <div className={styles.emptyState}>
            No profiles found matching your criteria.
          </div>
        )}

        {/* Profiles List */}
        <div className={styles.profilesList}>
          {profiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            Loading profiles...
          </div>
        )}

        {/* Load More */}
        {!loading && hasMore && (
          <button className={styles.loadMoreButton} onClick={loadMore}>
            Load More
          </button>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <button className={styles.navItem} onClick={() => router.push('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
          </svg>
        </button>
        <button className={styles.navItemActive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive} onClick={() => router.push('/create')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
          </svg>
        </button>
        <button className={styles.navItemInactive} onClick={() => router.push('/my-profiles')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 