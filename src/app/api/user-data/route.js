import { NextResponse } from 'next/server';
import { fetchNeynarUsers } from '@/lib/neynar'; // Import the simplified server-side function

export const runtime = 'edge'; // Specify edge runtime

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fidsParam = searchParams.get('fids');

  if (!fidsParam) {
    return NextResponse.json({ error: 'Missing fids query parameter' }, { status: 400 });
  }

  // Simple validation: split and ensure they look like numbers
  const fids = fidsParam.split(',').map(fid => parseInt(fid.trim(), 10)).filter(fid => !isNaN(fid));

  if (fids.length === 0) {
     return NextResponse.json({ error: 'Invalid or no valid fids provided' }, { status: 400 });
  }

  try {
    // Call the library function directly
    const usersData = await fetchNeynarUsers(fids);
    return NextResponse.json(usersData);

  } catch (error) {
    // Catch errors thrown from fetchNeynarUsers
    console.error('Error processing Neynar request in API route:', error);
    const status = error.message.includes('Neynar API Error') ? 502 
                 : error.message.includes('API key is not configured') ? 500
                 : 500; // Default internal server error
    return NextResponse.json({ error: error.message || 'Internal Server Error processing Neynar request' }, { status });
  }
} 