/**
 * Internal helper to build Neynar API v2 URL for user bulk endpoint.
 */
function buildNeynarUserBulkUrl(fids) {
  if (!fids || fids.length === 0) {
    throw new Error('Cannot build Neynar URL without FIDs.');
  }
  return `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fids.join(',')}`;
}

/**
 * Internal helper to process the raw JSON response from the Neynar user bulk endpoint.
 */
function processNeynarUserBulkResponse(data) {
  const usersData = {};
  if (data?.users && Array.isArray(data.users)) {
    data.users.forEach(user => {
      if (user && user.fid) {
        usersData[user.fid] = {
          fid: user.fid,
          username: user.username,
          display_name: user.display_name,
          pfp_url: user.pfp_url,
        };
      }
    });
  }
  return usersData;
}

/**
 * Fetches and processes user data from Neynar API v2.
 * Reads the API key from server-side environment variables.
 * 
 * IMPORTANT: This function is intended for SERVER-SIDE USE ONLY 
 * as it accesses server environment variables (NEYNAR_API_KEY).
 * 
 * @param {number[]} fids - Array of FIDs to fetch.
 * @returns {Promise<object>} A promise resolving to the processed user data object keyed by FID.
 * @throws {Error} If API key is missing or if the fetch fails.
 */
export async function fetchNeynarUsers(fids) {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    console.error('NEYNAR_API_KEY environment variable is not set.');
    throw new Error('Neynar API key is not configured on the server.');
  }
  
  if (!fids || fids.length === 0) {
     console.warn('fetchNeynarUsers called with empty fids array.');
     return {}; // Return empty object if no FIDs are provided
  }

  const apiUrl = buildNeynarUserBulkUrl(fids);
  
  try {
    console.log(`Fetching Neynar data server-side for FIDs: ${fids.join(',')}`);
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api_key': apiKey,
      },
      // Add cache options if desired for server-side fetches
      // cache: 'no-store', // or cache: 'force-cache', next: { revalidate: ... }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Neynar API request failed: ${response.status} ${errorBody}`);
      throw new Error(`Neynar API Error: ${response.statusText} (Status: ${response.status})`);
    }

    const rawData = await response.json();
    const processedData = processNeynarUserBulkResponse(rawData);
    console.log(`Successfully fetched and processed Neynar data for FIDs: ${fids.join(',')}`);
    return processedData;

  } catch (error) {
    console.error(`Error in fetchNeynarUsers for FIDs ${fids.join(',')}:`, error);
    // Re-throw the error to be handled by the caller (e.g., the API route)
    throw error; 
  }
}

// Export helpers if they might be useful independently (optional)
export { buildNeynarUserBulkUrl, processNeynarUserBulkResponse }; 