# FC Connections API

A Cloudflare Workers API built with Bun and Hono, using Cloudflare D1 for data storage.

## Requirements

- [Bun](https://bun.sh/) (latest version)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm install -g wrangler`)
- Cloudflare account (for deployment)

## Setup

1. Clone the repository and navigate to the API directory:
   ```
   cd api
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Copy `.env.example` to `.env` (for local development):
   ```
   cp .env.example .env
   ```

## Database Setup

### Local Development

1. Create a local D1 database:
   ```
   bun run db:local
   ```

2. Execute the schema SQL on the local database:
   ```
   bun run db:execute
   ```

3. Update your `.env` file with the local database ID that is output from the `db:local` command.

### Production Setup

1. Create a D1 database in your Cloudflare account:
   ```
   bun run db:create
   ```

2. The command will output a database ID. Add this ID to your project's environment:
   ```
   # Via .env file (for wrangler.toml to use during deployment)
   FC_CONNECTIONS_DB_ID=your-database-id-here
   
   # Or set directly as a Cloudflare secret
   wrangler secret put FC_CONNECTIONS_DB_ID
   ```

3. Initialize the database schema:
   ```
   bun run db:execute:prod
   ```

## Development

To start a local development server:

```
bun run dev
```

This will start a local instance at http://localhost:8787

## Using Environment Variables

The project supports using environment variables from `.env` files:

1. Public variables can be directly defined in `wrangler.toml` under the `[vars]` section
2. Secret variables should be set using Wrangler Secrets:
   ```
   wrangler secret put SECRET_NAME
   ```

## Database Schema Migrations

For making changes to the database schema:

1. Create a new SQL file in `migrations/` folder with a timestamp (e.g., `migrations/20240101_add_new_field.sql`)
2. Run locally to test:
   ```
   wrangler d1 execute fc_connections --local --file=./migrations/20240101_add_new_field.sql
   ```
3. Apply to production:
   ```
   wrangler d1 execute fc_connections --file=./migrations/20240101_add_new_field.sql
   ```

## API Endpoints

The API includes the following endpoints:

### Health Check
- `GET /` - Simple health check endpoint

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:fid` - Get user by Farcaster ID
- `POST /api/users` - Create or update a user

### Profiles
- `GET /api/profiles` - Get all profiles (with optional type filter)
- `GET /api/profiles/:id` - Get a specific profile with all field values
- `POST /api/profiles` - Create a new profile
- `PUT /api/profiles/:id` - Update a profile

## Deployment

To deploy to Cloudflare Workers:

```
bun run deploy
```

Make sure you're authenticated with Cloudflare first by running:

```
wrangler login
```

## Environment Variables in wrangler.toml

The `wrangler.toml` file supports loading values from your `.env` file using the `$VARIABLE_NAME` syntax. For example:

```toml
[[d1_databases]]
binding = "DB"
database_name = "fc_connections"
database_id = "$FC_CONNECTIONS_DB_ID"
```

This will read the `FC_CONNECTIONS_DB_ID` value from your `.env` file during development or when deploying. 