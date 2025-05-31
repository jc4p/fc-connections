import HomepageClient from '@/components/HomepageClient';

// Define fc:frame metadata
// TODO: Replace placeholder values with your actual frame details
const frameConfig = {
  version: "next", // Correct version for vNext
  imageUrl: "https://placehold.co/600x400/7A5AF8/FFFFFF/png?text=FC-Connections", // Updated 600x400
  // Define the primary action button for launching the frame
  button: {
    title: "Open Connections", // Text on the button
    action: {
      type: "launch_frame", // Action type to open the mini-app
      name: "fc-connections", // Your frame's unique name
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
    'og:image': "https://placehold.co/600x400/7A5AF8/FFFFFF/png?text=FC-Connections", // Updated 600x400
  },
};

// Server Component for the Homepage
export default function Home() {
  // Server-side logic can go here if needed (e.g., fetching general config)
  // User-specific data (like profile status) will be fetched client-side

  return (
    <main> 
      {/* Render Client Component for Dynamic Sections */} 
      <HomepageClient />
    </main>
  );
}
