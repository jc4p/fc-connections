import Link from 'next/link';
// Import styles if you have a specific CSS module for the homepage
// import styles from './Homepage.module.css'; 
import { getUserFid } from '@/lib/api'; // We will create this API helper next

// Define fc:frame metadata
// TODO: Replace placeholder values with your actual frame details
const frameConfig = {
  version: "next", // Correct version for vNext
  imageUrl: "https://your-app.vercel.app/og-image.png", // URL for a 1.91:1 preview image
  // Define the primary action button for launching the frame
  button: {
    title: "Open Connections", // Text on the button
    action: {
      type: "launch_frame", // Action type to open the mini-app
      name: "fc-connections", // Your frame's unique name
      url: "https://your-app.vercel.app", // The URL of your Next.js app
      // Optional splash screen customization:
      // splashImageUrl: "https://your-app.vercel.app/splash.png", 
      // splashBackgroundColor: "#7A5AF8" // Example using primary brand color
    }
  }
  // Note: `post_url` is not used for `launch_frame` actions.
  // If you later add buttons with `action: 'post'`, you'll need a post_url.
};

export const metadata = {
  title: 'FC-Connections',
  description: 'Forge meaningful connections on Farcaster.',
  other: {
    // Use JSON.stringify for the 'fc:frame' property as per FRAME_INTEGRATION.md
    'fc:frame': JSON.stringify(frameConfig),
    
    // Standard Open Graph tags are still useful for general link previews
    'og:title': 'FC-Connections',
    'og:description': 'Forge meaningful connections on Farcaster.',
    'og:image': frameConfig.imageUrl, // Use the same image for consistency
  },
};

// Server Component for the Homepage
export default function Home() {
  // Server-side logic can go here if needed (e.g., fetching general config)
  // User-specific data (like profile status) will be fetched client-side

  return (
    <main>
      <header>
        {/* TODO: Add Logo Component */}
        <h1>FC-Connections</h1>
        <p>Forge meaningful connections across your personal and professional life on Farcaster.</p>
      </header>

      {/* Connection Type Links */}
      <section>
        <h2>Choose Connection Type:</h2>
        <ul>
          <li><Link href="/browse/partner">Partner Connections</Link></li>
          <li><Link href="/browse/friend">Friend Connections</Link></li>
          <li><Link href="/browse/job">Job Connections</Link></li>
        </ul>
        {/* Basic styling will be applied via globals.css or specific component CSS */}
      </section>

      {/* My Profiles Section - Placeholder */}
      {/* This section needs to be a Client Component to fetch data after FID is known */}
      <section>
        <h2>My Profiles</h2>
        {/* TODO: Replace this with a Client Component that fetches user profile status using FID */}
        <div>Loading profile status... (Requires Client Component)</div>
        <Link href="/my-profiles">Manage My Profiles</Link>
      </section>

      {/* User PFP - Placeholder */}
      {/* This also needs client-side logic after FID is known */}
      <div>User PFP Placeholder (Requires Client Component)</div>
    </main>
  );
}
