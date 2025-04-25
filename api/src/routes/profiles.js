import { Hono } from 'hono';

const profiles = new Hono();

// Get all profiles (with optional type filter)
profiles.get('/', async (c) => {
  try {
    const type = c.req.query('type');
    let query = 'SELECT p.*, u.display_name, u.avatar_url FROM profiles p JOIN users u ON p.fid = u.fid WHERE p.is_active = 1';
    const bindings = [];
    
    if (type) {
      query += ' AND p.profile_type = ?';
      bindings.push(type);
    }
    
    query += ' ORDER BY p.view_count DESC LIMIT 50';
    
    const { results } = await c.env.DB.prepare(query).bind(...bindings).all();
    
    return c.json({ profiles: results });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return c.json({ error: 'Failed to fetch profiles' }, 500);
  }
});

// Get a specific profile with all field values
profiles.get('/:id', async (c) => {
  const profileId = c.req.param('id');
  
  try {
    // Get profile details
    const profile = await c.env.DB.prepare(`
      SELECT p.*, u.display_name, u.avatar_url 
      FROM profiles p 
      JOIN users u ON p.fid = u.fid 
      WHERE p.id = ?
    `).bind(profileId).first();
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    // Get profile field values
    const { results: fieldValues } = await c.env.DB.prepare(`
      SELECT fd.field_key, fd.field_label, fd.field_type, fv.field_value
      FROM profile_field_values fv
      JOIN profile_field_definitions fd ON fv.field_id = fd.id
      WHERE fv.profile_id = ?
      ORDER BY fd.field_order
    `).bind(profileId).all();
    
    // Increment view count
    await c.env.DB.prepare(`
      UPDATE profiles SET view_count = view_count + 1 WHERE id = ?
    `).bind(profileId).run();
    
    return c.json({ 
      profile,
      fields: fieldValues 
    });
  } catch (error) {
    console.error(`Error fetching profile ${profileId}:`, error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Create a new profile
profiles.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { fid, profile_type, fields } = body;
    
    if (!fid || !profile_type || !fields) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Check valid profile type
    if (!['partner', 'friend', 'job'].includes(profile_type)) {
      return c.json({ error: 'Invalid profile type' }, 400);
    }
    
    // Begin transaction
    const { results: existingProfile } = await c.env.DB.prepare(`
      SELECT id FROM profiles WHERE fid = ? AND profile_type = ?
    `).bind(fid, profile_type).all();
    
    if (existingProfile.length > 0) {
      return c.json({ error: 'Profile of this type already exists for user' }, 400);
    }
    
    // Create profile
    const profileInsertResult = await c.env.DB.prepare(`
      INSERT INTO profiles (fid, profile_type) VALUES (?, ?)
    `).bind(fid, profile_type).run();
    
    const profileId = profileInsertResult.meta.last_row_id;
    
    // Get field definitions for this profile type
    const { results: fieldDefinitions } = await c.env.DB.prepare(`
      SELECT id, field_key, is_required FROM profile_field_definitions 
      WHERE profile_type = ?
    `).bind(profile_type).all();
    
    // Create a map of field keys to field IDs
    const fieldMap = {};
    fieldDefinitions.forEach(def => {
      fieldMap[def.field_key] = { id: def.id, is_required: def.is_required };
    });
    
    // Insert field values
    for (const [key, value] of Object.entries(fields)) {
      if (!fieldMap[key]) {
        continue; // Skip unknown fields
      }
      
      const fieldDef = fieldMap[key];
      let processedValue = value;
      
      // Handle array fields
      if (Array.isArray(value)) {
        processedValue = JSON.stringify(value);
      }
      
      await c.env.DB.prepare(`
        INSERT INTO profile_field_values (profile_id, field_id, field_value)
        VALUES (?, ?, ?)
      `).bind(profileId, fieldDef.id, processedValue).run();
    }
    
    return c.json({ 
      message: 'Profile created successfully',
      profile_id: profileId
    }, 201);
  } catch (error) {
    console.error('Error creating profile:', error);
    return c.json({ error: 'Failed to create profile' }, 500);
  }
});

// Update a profile
profiles.put('/:id', async (c) => {
  const profileId = c.req.param('id');
  
  try {
    const body = await c.req.json();
    const { fields } = body;
    
    if (!fields) {
      return c.json({ error: 'No fields to update' }, 400);
    }
    
    // Get profile first to check if it exists
    const profile = await c.env.DB.prepare(`
      SELECT * FROM profiles WHERE id = ?
    `).bind(profileId).first();
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    // Get field definitions for this profile type
    const { results: fieldDefinitions } = await c.env.DB.prepare(`
      SELECT id, field_key FROM profile_field_definitions 
      WHERE profile_type = ?
    `).bind(profile.profile_type).all();
    
    const fieldMap = {};
    fieldDefinitions.forEach(def => {
      fieldMap[def.field_key] = def.id;
    });
    
    // Update field values
    for (const [key, value] of Object.entries(fields)) {
      if (!fieldMap[key]) {
        continue; // Skip unknown fields
      }
      
      let processedValue = value;
      
      // Handle array fields
      if (Array.isArray(value)) {
        processedValue = JSON.stringify(value);
      }
      
      // Use upsert pattern
      await c.env.DB.prepare(`
        INSERT INTO profile_field_values (profile_id, field_id, field_value)
        VALUES (?, ?, ?)
        ON CONFLICT (profile_id, field_id) 
        DO UPDATE SET field_value = ?, updated_at = unixepoch()
      `).bind(profileId, fieldMap[key], processedValue, processedValue).run();
    }
    
    // Update profile's updated_at timestamp
    await c.env.DB.prepare(`
      UPDATE profiles SET updated_at = unixepoch() WHERE id = ?
    `).bind(profileId).run();
    
    return c.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(`Error updating profile ${profileId}:`, error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

export { profiles as profileRoutes }; 