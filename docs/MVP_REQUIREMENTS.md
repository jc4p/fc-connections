# FC-Connections: Requirements & Brand Guidelines

## Ethos Statement

FC-Connections is a Farcaster mini app that empowers users to forge meaningful connections across their personal and professional lives. We believe that the web3 community thrives on authentic relationships—whether romantic, platonic, or professional. Our platform provides a seamless and purpose-driven space for Farcaster users to connect with like-minded individuals based on their specific needs, without unnecessary friction or noise.

## Brand Colors

**Primary Colors:**
- Main Brand: `#7A5AF8` (Purple - representing connection and community)
- Secondary: `#18181B` (Near black - for text and UI elements)
- Background: `#FAFAFA` (Off-white - clean interface)

**Connection Type Colors:**
- Partner Connections: `#FF5E7D` (Warm pink)
- Friend Connections: `#4CAF50` (Friendly green)
- Job Connections: `#2196F3` (Professional blue)

## Brand Fonts

**Primary Font:** Inter
- Clean, modern sans-serif
- Excellent legibility at various sizes
- Works well in UI interfaces
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)

**Secondary Font:** Space Grotesk
- For headings and feature text
- Adds personality while maintaining readability
- Weights: 500 (Medium), 700 (Bold)

## MVP Requirements

### Core Features
1. **Profile Creation**
   - User authentication via Farcaster ID (fid)
   - Profile type selection (partner, friend, job)
   - Type-specific profile fields
   - Profile photo/avatar integration

2. **Type-Specific Profiles**
   - **Partner Profile:** Dating preferences, relationship goals, interests
   - **Friend Profile:** Friendship interests, activity preferences, availability
   - **Job Profile:** Skills, experience, job preferences (for job seekers) OR company info, role details (for employers)

3. **Discovery & Filtering**
   - Separate browsing sections for each connection type
   - Basic filtering by common attributes
   - Simple card-based UI for browsing profiles

4. **Connection Actions**
   - Request connection feature
   - Accept/decline connection requests
   - Basic messaging or contact capability

### Technical Requirements
1. **Frontend**
   - Next.js for the web interface
   - Responsive design (mobile-first)
   - Simple, clean UI components

2. **Backend**
   - Cloudflare Workers for API functionality
   - Basic data storage solution
   - Farcaster integration for authentication

3. **Deployment**
   - Separate deployment flows for frontend (Vercel) and API (Cloudflare)
   - Configuration for the monorepo structure
