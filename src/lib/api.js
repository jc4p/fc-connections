const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787/api';

// Helper function for making API requests
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // Attempt to parse error response from API
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore if response is not JSON
      }
      console.error(`API Error (${response.status}): ${response.statusText}`, errorData);
      throw new Error(errorData?.error || `Request failed with status ${response.status}`);
    }

    // Handle cases where the response might be empty (e.g., 204 No Content)
    if (response.status === 204) {
        return null; 
    }

    return await response.json();
  } catch (error) {
    console.error(`Network or fetch error for ${url}:`, error);
    // Re-throw the error to be handled by the caller
    throw error; 
  }
}

// --- User Endpoints --- 

/**
 * Fetches user data by Farcaster ID (fid).
 * GET /users/:fid
 */
export async function getUser(fid) {
  if (!fid) throw new Error('FID is required to get user data.');
  return fetchApi(`/users/${fid}`);
}

/**
 * Creates or updates a user.
 * POST /users
 * @param {object} userData - { fid, display_name, avatar_url }
 */
export async function upsertUser(userData) {
  if (!userData || !userData.fid) {
    throw new Error('User data with FID is required.');
  }
  return fetchApi('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Fetches all profiles for a given user FID.
 * GET /users/:fid/profiles
 */
export async function getUserProfiles(fid) {
  if (!fid) throw new Error('FID is required to get user profiles.');
  const data = await fetchApi(`/users/${fid}/profiles`); 
  // Ensure we return the array within the response, or an empty array if data is unexpected
  return data?.profiles || []; 
}

// --- Profile Endpoints --- 

/**
 * Fetches profiles, optionally filtering by type and other params.
 * GET /profiles?type=...&limit=...&offset=...&filters=...
 * @param {object} params - { type, page, limit, filters, ... }
 */
export async function getProfiles(params = {}) {
  // Convert page to offset/limit for backend API
  const { page = 1, limit = 20, ...otherParams } = params;
  const offset = (page - 1) * limit;
  
  const apiParams = {
    ...otherParams,
    limit,
    offset
  };
  
  const query = new URLSearchParams(apiParams).toString();
  return fetchApi(`/profiles?${query}`);
}

/**
 * Fetches a single profile by its ID.
 * GET /profiles/:id
 */
export async function getProfile(profileId) {
  if (!profileId) throw new Error('Profile ID is required.');
  return fetchApi(`/profiles/${profileId}`);
}

/**
 * Creates a new profile.
 * POST /profiles
 * @param {object} profileData - { fid, type, fields: {...} } 
 */
export async function createProfile(profileData) {
  // TODO: Confirm the exact payload structure expected by your API
  if (!profileData || !profileData.fid || !profileData.type) {
    throw new Error('Profile data with fid and type is required.');
  }
  return fetchApi('/profiles', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
}

/**
 * Updates an existing profile.
 * PUT /profiles/:id
 */
export async function updateProfile(profileId, profileData) {
  if (!profileId) throw new Error('Profile ID is required for update.');
  return fetchApi(`/profiles/${profileId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

/**
 * Deletes a profile.
 * DELETE /profiles/:id
 */
export async function deleteProfile(profileId) {
  if (!profileId) throw new Error('Profile ID is required for deletion.');
  return fetchApi(`/profiles/${profileId}`, { method: 'DELETE' });
}

// --- Field Definition Endpoints --- 

/**
 * Fetches field definitions for a specific profile type.
 * GET /field-definitions/:type
 */
export async function getFieldDefinitions(profileType) {
  if (!profileType) throw new Error('Profile type is required.');
  // Corrected endpoint path to match actual route mounting in index.js
  return fetchApi(`/field-definitions/${profileType}`); 
}

// --- Frame SDK related helpers (if needed here) ---

// Helper function to get user FID from the window object (set by FrameInit)
// Consider using React Context for better state management than window globals.
export function getFidFromWindow() {
  if (typeof window !== 'undefined') {
    return window.userFid || null;
  }
  return null;
}

// Creates a user if they don't exist, or updates their info
export async function ensureUserExists(userData) {
    const { fid, display_name, pfp_url } = userData;
    if (!fid) {
        throw new Error("FID is required to ensure user exists.");
    }
    // POST /api/users handles create or update
    return fetchApi('/users', {
        method: 'POST',
        body: JSON.stringify({ 
            fid, 
            display_name: display_name || `User ${fid}`, // Provide a default display name
            avatar_url: pfp_url // Pass the avatar URL
        }), 
    });
} 