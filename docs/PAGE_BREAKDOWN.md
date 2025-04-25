# FC-Connections Mini App - Detailed Page Breakdown

## 1. Homepage / Landing Page (`/`)

**Purpose:** Entry point and navigation hub

**UI Elements:**
- FC-Connections logo and branding
- Welcome message with app description
- Three visually distinct profile type cards:
  - Partner connections (color: #FF5E7D)
  - Friend connections (color: #4CAF50)
  - Job connections (color: #2196F3)
- User's Farcaster PFP displayed in corner
- "My Profiles" section showing which profile types the user has created

**Data Requirements:**
- User's fid (Farcaster ID)
- User's existing profile status (which types they've created)
- Profile view statistics

**API Endpoints:**
- `GET /api/user/{fid}` - Get user info and profile status
- `GET /api/user/{fid}/stats` - Get profile view statistics

**Interactions:**
- Click on profile type card → Go to Browse page for that type
- Click on "Create Profile" for a type → Go to Create Profile page
- Click on "View My Profile" for a type → Go to Edit Profile page
- Click on "My Profiles" → Go to My Profiles page

## 2. Browse Profiles Pages (`/browse/[type]`)

**Purpose:** Discover and filter profiles of a specific type

**UI Elements:**
- Custom back button to homepage
- Large title indicating profile type ("Dating Connections", "Friend Connections", "Job Connections")
- Filter controls:
  - Dropdown filters based on profile type fields
  - Search input for text searching
  - Sort options (newest, most viewed)
- Grid of profile cards with:
  - User's Farcaster PFP (or override)
  - Display name
  - 2-3 key profile fields based on type
  - Visual styling matching profile type color
- Loading states and pagination controls

**Data Requirements:**
- Profile listings with pagination
- Filter options based on profile_field_definitions
- User PFP from Farcaster

**API Endpoints:**
- `GET /api/profiles/{type}?page=1&filters=...` - Get paginated, filtered profiles
- `GET /api/profiles/filters/{type}` - Get available filter options

**Interactions:**
- Click on profile card → Go to Profile Detail page
- Click on filter controls → Update profile listings
- Click back button → Return to homepage
- Scroll to bottom → Load more profiles (pagination)

## 3. Profile Detail Page (`/profile/[id]`)

**Purpose:** View complete information about a specific profile

**UI Elements:**
- Custom back button to browse page
- User's Farcaster PFP (or override) prominently displayed
- Display name and profile creation date
- All profile fields displayed in formatted sections
- Visually styled according to profile type
- Contact/Connect button
- Report button (small, secondary placement)

**Data Requirements:**
- Complete profile data with all fields
- User Farcaster info

**API Endpoints:**
- `GET /api/profile/{id}` - Get complete profile data
- `POST /api/profile/{id}/view` - Record a profile view
- `POST /api/report` - Submit a profile report

**Interactions:**
- Click back button → Return to browse page
- Click contact button → Open Farcaster-supported contact method
- Click report button → Open report modal

## 4. Create Profile Pages (`/create/[type]`)

**Purpose:** Allow users to create a new profile of specified type

**UI Elements:**
- Custom back button to homepage
- Title ("Create Dating Profile", "Create Friend Profile", "Create Job Profile")
- Dynamic form with fields based on profile type:
  - Text inputs
  - Dropdowns
  - Toggles
  - Multi-select fields (for arrays)
  - Text areas for longer content
- Required field indicators
- Helper text for fields
- PFP override option (optional)
- Preview toggle to see profile as others would
- Submit and Cancel buttons

**Data Requirements:**
- Profile field definitions for selected type
- User's Farcaster info

**API Endpoints:**
- `GET /api/field-definitions/{type}` - Get field definitions for profile type
- `POST /api/profile/{type}` - Create new profile

**Interactions:**
- Click submit → Create profile and redirect to homepage
- Click cancel → Return to homepage (with confirmation)
- Toggle preview → Show/hide profile preview
- Fill required fields → Enable submit button

## 5. Edit Profile Page (`/edit/[id]`)

**Purpose:** Allow users to modify an existing profile

**UI Elements:**
- Nearly identical to Create Profile page
- Pre-populated with existing profile data
- Additional option to delete profile
- Active/Inactive toggle

**Data Requirements:**
- Existing profile data
- Profile field definitions

**API Endpoints:**
- `GET /api/profile/{id}/edit` - Get profile data for editing
- `PUT /api/profile/{id}` - Update profile
- `DELETE /api/profile/{id}` - Delete profile
- `PATCH /api/profile/{id}/status` - Toggle active status

**Interactions:**
- Click update → Save changes and return to homepage
- Click delete → Confirmation modal then delete and return to homepage
- Toggle active/inactive → Update profile status

## 6. My Profiles Page (`/my-profiles`)

**Purpose:** Manage all user profiles in one place

**UI Elements:**
- Custom back button to homepage
- Tabs or sections for each profile type
- Profile cards showing:
  - Profile type and creation date
  - View statistics
  - Active/Inactive status
  - Edit button
  - Delete button
- Create new profile buttons for types without profiles

**Data Requirements:**
- All user profiles
- View statistics for each

**API Endpoints:**
- `GET /api/user/{fid}/profiles` - Get all profiles for user
- `DELETE /api/profile/{id}` - Delete profile
- `PATCH /api/profile/{id}/status` - Toggle active status

**Interactions:**
- Click edit → Go to Edit Profile page
- Click delete → Confirmation modal then delete profile
- Click create → Go to Create Profile page for that type
- Click back → Return to homepage

## 7. Global Components

**Custom Back Button:**
- Consistent styling across all pages
- Maintains navigation history
- Custom animation when pressed

**Error States:**
- API error handling
- Friendly error messages
- Retry options
- Offline detection

**Loading States:**
- Skeleton loaders for profiles
- Progress indicators for actions

**Navigation Context:**
- Next.js navigation wrapper
- History tracking
- Custom routing for Farcaster mini app environment

## Technical Implementation Requirements

**Frontend:**
- Next.js App Router implementation
- Responsive design (mobile-first)
- CSS modules or Tailwind CSS
- React Context for state management
- Form validation library

**Backend (Cloudflare Workers):**
- D1 database implementation with schema as discussed
- Farcaster authentication integration
- API endpoints for all data operations
- Rate limiting and security measures
- File storage for PFP overrides (if implemented)

**Optimizations:**
- Static Generation for stable pages
- Server Components for data-heavy pages
- Incremental Static Regeneration for browse pages
- Edge caching strategies