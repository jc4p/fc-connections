# Async Standup Notes - Dev 1 and Dev 2 - Session 1

**Session Focus:** Initial Next.js frontend setup, Frame V2 integration, page structure, API client, and adherence to Next.js best practices (Server/Client component separation).

## Summary of Progress (Session 1)

*   **Project Structure:** Confirmed existing Next.js (`app` router) and Cloudflare Workers (`api`) structure.
*   **Frame V2 Integration:**
    *   Added `@farcaster/frame-sdk` dependency (assumed, as we used its imports).
    *   Created `components/FrameInit.jsx` client component to initialize the SDK.
    *   Created `lib/frame.js` utility for SDK interaction (including FID retrieval via `window.userFid` for now).
    *   Integrated `FrameInit` into the root layout (`src/app/layout.js`).
    *   Configured `fc:frame` metadata in the root page (`src/app/page.js`) using `JSON.stringify` as per `FRAME_INTEGRATION.md` for a `launch_frame` action.
*   **Styling & Font:**
    *   Set up 'Inter' font via `next/font/google` in `src/app/layout.js`.
    *   Updated `src/app/globals.css` to use the Inter font variable.
*   **API Client:**
    *   Created `src/lib/api.js` with helper functions (`fetchApi`) to interact with the backend API (`http://localhost:8787/api`).
    *   Added functions for User, Profile, and Field Definition endpoints based on `PAGE_BREAKDOWN.md` and existing API code (`api/src/routes/users.js`). Noted necessary TODOs for missing/unverified endpoints.
*   **Page Structure & Refactoring (Server/Client Components):**
    *   Created page shells (Server Components) for: `/`, `/browse/[type]`, `/profile/[id]`, `/create/[type]`, `/edit/[id]`, `/my-profiles`.
    *   Implemented initial server-side data fetching in page components where appropriate (e.g., fetching initial profiles in `browse`, profile data in `profile/[id]`, field definitions in `create` and `edit`).
    *   Created corresponding placeholder Client Components (`BrowseClient`, `ProfileDetailClient`, `CreateProfileClient`, `EditProfileClient`, `MyProfilesClient`) to handle state, user interactions, and subsequent client-side data fetching (e.g., pagination, form submission, FID-dependent loading).
    *   Refactored page components to pass initial data as props to their respective client components.
    *   Acknowledged that `/my-profiles` requires client-side FID fetching first, so its Server Component is minimal, relying on `MyProfilesClient` for primary logic.

## Week 1 Goal Check-in (`DEVELOPMENT_TIMELINE.md`)

**Developer 1 (API/Backend Focus):**

*   [✅] Set up Cloudflare Workers project structure with proper routing (Confirmed).
*   [✅] Implement D1 database schema with all tables and indexes (Confirmed via `schema.sql`).
*   [✅] Create seed script for profile field definitions (`INSERT` statements in `schema.sql` serve this purpose).
*   [🟡] Develop and test basic user authentication with Farcaster ID (fid) (`POST /api/users` exists, needs testing).
*   [✅] Implement user profile endpoints (GET/POST) (**Correction:** Core profile CRUD `GET /api/profiles`, `GET /api/profiles/:id`, `POST /api/profiles`, `PUT /api/profiles/:id` are implemented in `profiles.js`. Some related routes still needed - see TODOs).

**Developer 2 (Frontend Focus):**

*   [✅] Initialize Next.js project with routing structure (Project exists, page files created according to `PAGE_BREAKDOWN.md`).
*   [🟡] Set up CSS modules configuration (Using `globals.css` currently. Can switch to CSS modules if preferred, but basic CSS is working).
*   [🟡] Create design system basics (colors, typography, spacing) (Inter font and basic brand colors set up/used. Needs systematic implementation in components/CSS).
*   [❌] Implement custom navigation context for mini-app behavior (Not started).
*   [🟡] Build reusable components (back button, loading states, etc.) (Client component placeholders created, actual UI components need implementation).
*   [🟡] Create homepage layout and profile type selection UI (Basic Server Component layout done in `page.js`. Needs refinement and potentially a Client Component for dynamic sections like 'My Profiles').

## Key Issues / Blockers / TODOs

1.  **Missing/Incomplete API Endpoints:** While core profile CRUD exists, several key API routes are still missing or need refinement. **Dev 1 needs to implement/refine:**
    *   **Profile Deletion:** `DELETE /api/profiles/:id` (Completely missing).
    *   **User-Specific Profiles:** `GET /api/users/:fid/profiles` (Missing - needed for 'My Profiles' page).
    *   **Field Definitions:** `GET /api/field-definitions/:type` (Missing - needed for forms. Frontend *can* temporarily work around this by fetching a dummy profile of the type, but a dedicated endpoint is better).
    *   **View Tracking:** `GET /api/profiles/:id` currently increments views. Consider if a separate `POST /api/profiles/:id/view` is needed/preferable for security or different logic.
    *   **Reporting:** `POST /api/report` (Missing - needs DB schema + route).
    *   **Pagination:** `GET /api/profiles` needs proper pagination (e.g., using `limit` and `offset` query params) instead of a hardcoded `LIMIT 50`.
2.  **Frontend Component Implementation:** All interactive parts are currently placeholders (e.g., `BrowseClient`, `ProfileDetailClient`, `DynamicForm`, `ProfileCard`, `FilterControls`, `CustomBackButton`). **Dev 2 needs to build these actual components.**
3.  **Styling / Design System:** Basic font/colors are set, but need a systematic approach (CSS Modules or Tailwind, component styling) based on `MVP_REQUIREMENTS.md`.
4.  **Client-Side State (FID):** Currently using `window.userFid` set by `FrameInit`. Consider implementing a React Context or state management library (like Zustand, Jotai) for cleaner global state management of the user's FID and potentially other frame context data.
5.  **Error Handling & Loading States:** Basic text placeholders exist. Need proper UI treatment for loading states (skeletons?) and user-friendly error messages/fallbacks.
6.  **Navigation:** Placeholder back buttons/links used. Implement proper navigation using `next/link` or `useRouter` within Client Components, and potentially the custom navigation context mentioned in Week 1 goals.

## Next Steps for Tomorrow

**Developer 1 (API/Backend):**

1.  **Implement Missing Routes:** Prioritize the remaining critical routes:
    *   `GET /api/field-definitions/:type` (High priority for forms)
    *   `GET /api/users/:fid/profiles` (High priority for 'My Profiles')
    *   `DELETE /api/profiles/:id` (Needed for profile management)
2.  **Refine Existing Routes:** Add pagination to `GET /api/profiles`.
4.  **Testing:** Test existing (`POST /users`) and new routes as they are implemented.

**Developer 2 (Frontend):**

1.  **Implement Core Components:** Start building the actual UI for:
    *   `DynamicForm` (crucial for create/edit - can be built based on the known schema even if the dedicated API is pending)
    *   `ProfileCard` (for browse page)
    *   `FilterControls` (for browse page)
2.  **Integrate Client Components:** Replace placeholders in page files (`browse`, `profile`, `create`, `edit`, `my-profiles`) with the actual client components once they have basic structure.
3.  **Styling:** Begin applying consistent styling to implemented components based on brand guidelines.
4.  **Homepage Client Component:** Create a client component for the dynamic sections of the homepage (e.g., showing 'Create' vs 'Edit' buttons based on profile status fetched using FID). 