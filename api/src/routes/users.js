import { Hono } from 'hono';

const users = new Hono();

// Get all users
users.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM users ORDER BY last_active DESC LIMIT 50'
    ).all();
    
    return c.json({ users: results });
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Get user by FID
users.get('/:fid', async (c) => {
  const fid = c.req.param('fid');
  
  try {
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE fid = ?'
    ).bind(fid).first();
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ user });
  } catch (error) {
    console.error(`Error fetching user ${fid}:`, error);
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Get all profiles for a specific user
users.get('/:fid/profiles', async (c) => {
  const fid = c.req.param('fid');

  try {
    // First, check if the user exists (optional, but good practice)
    const userExists = await c.env.DB.prepare(
      'SELECT 1 FROM users WHERE fid = ?'
    ).bind(fid).first();

    if (!userExists) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Fetch all profiles associated with the FID
    const { results } = await c.env.DB.prepare(
      `SELECT id, profile_type, is_active, view_count, created_at, updated_at 
       FROM profiles 
       WHERE fid = ? 
       ORDER BY created_at DESC`
    ).bind(fid).all();

    // Return an empty array if no profiles found, not an error
    return c.json({ profiles: results || [] }); 
  } catch (error) {
    console.error(`Error fetching profiles for user ${fid}:`, error);
    return c.json({ error: 'Failed to fetch user profiles' }, 500);
  }
});

// Create or update user
users.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { fid, display_name, avatar_url } = body;
    
    if (!fid) {
      return c.json({ error: 'FID is required' }, 400);
    }
    
    // Check if user exists
    const existingUser = await c.env.DB.prepare(
      'SELECT * FROM users WHERE fid = ?'
    ).bind(fid).first();
    
    if (existingUser) {
      // Update existing user
      await c.env.DB.prepare(
        'UPDATE users SET display_name = ?, avatar_url = ?, last_active = unixepoch() WHERE fid = ?'
      ).bind(display_name, avatar_url, fid).run();
      
      return c.json({ message: 'User updated successfully' });
    } else {
      // Create new user
      await c.env.DB.prepare(
        'INSERT INTO users (fid, display_name, avatar_url) VALUES (?, ?, ?)'
      ).bind(fid, display_name, avatar_url).run();
      
      return c.json({ message: 'User created successfully' }, 201);
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return c.json({ error: 'Failed to create/update user' }, 500);
  }
});

export { users as userRoutes }; 