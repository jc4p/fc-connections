import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRoutes } from './routes/users.js';
import { profileRoutes } from './routes/profiles.js';
import { definitionRoutes } from './routes/definitions.js';

// Create the main Hono app
const app = new Hono();

// Apply CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
}));

// Define a simple health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'FC Connections API is running',
    environment: c.env.APP_PUBLIC_ENV || 'development'
  });
});

// Mount route groups
app.route('/api/users', userRoutes);
app.route('/api/profiles', profileRoutes);
app.route('/api/field-definitions', definitionRoutes);

// Export for Cloudflare Workers
export default app; 