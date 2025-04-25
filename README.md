# FC-Connections

A Farcaster mini app that empowers users to forge meaningful connections across their personal and professional lives.

*Original design docs created with Claude: [https://claude.ai/share/dd97373f-1323-4f07-8b86-f77282ea1fd4](https://claude.ai/share/dd97373f-1323-4f07-8b86-f77282ea1fd4)*

## 📱 What is FC-Connections?

FC-Connections provides Farcaster users with a seamless, purpose-driven space to connect with like-minded individuals based on specific needs. Users can create and discover three types of connection profiles:

- 💖 **Partner Connections** - For dating and romantic relationships
- 🤝 **Friend Connections** - For platonic friendships and activities
- 💼 **Job Connections** - For professional opportunities

## 🏗️ Project Structure

- **Frontend**: NextJS app in the root directory
- **Backend**: Cloudflare Workers API in the `/api` directory

## 🎨 Design Philosophy

FC-Connections embraces a clean, modern interface with a color palette that intuitively distinguishes between connection types:

- 💖 Partner: `#FF5E7D` (Warm pink)
- 🤝 Friend: `#4CAF50` (Friendly green)
- 💼 Job: `#2196F3` (Professional blue)

We use **Inter** for UI text and **Space Grotesk** for headings to create a friendly, approachable experience.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Bun
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account (for API deployment)

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### API Setup

```bash
# Navigate to API directory
cd api

# Install dependencies
bun install

# Setup local database (see api/README.md for details)
bun run db:local
bun run db:execute

# Run development server
bun run dev
```

## 📚 Documentation

- For detailed API setup, see [api/README.md](api/README.md)
- For complete MVP requirements, see [docs/MVP_REQUIREMENTS.md](docs/MVP_REQUIREMENTS.md)
- For page breakdown details, see [docs/PAGE_BREAKDOWN.md](docs/PAGE_BREAKDOWN.md)
- For database schema information, see [docs/DB_INITIAL_PLAN.md](docs/DB_INITIAL_PLAN.md)

## 🔒 Authentication

FC-Connections uses Farcaster authentication for a seamless web3 social experience. Users connect with their Farcaster ID (FID) to access the platform.

## 📱 Key Features

- **Type-Specific Profiles** - Create different profiles for different connection needs
- **Discovery & Filtering** - Find matches based on preferences and interests
- **Mobile-First Design** - Optimized for the Farcaster frames and mobile experience
