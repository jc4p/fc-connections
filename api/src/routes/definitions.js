import { Hono } from 'hono';

// Define types for context bindings and variables if needed
// type Bindings = { DB: D1Database };
// type Variables = {};

const definitions = new Hono(); // Assuming Bindings and Variables if needed

definitions.get('/:type', async (c) => {
  const type = c.req.param('type');
  const validTypes = ['partner', 'friend', 'job'];

  if (!validTypes.includes(type)) {
    return c.json({ error: 'Invalid profile type' }, 400);
  }

  try {
    const { results } = await c.env.DB.prepare(
      `SELECT field_key, field_label, field_type, is_required, field_order 
       FROM profile_field_definitions 
       WHERE profile_type = ? 
       ORDER BY field_order ASC`
    ).bind(type).all();

    if (!results || results.length === 0) {
      // This case might indicate an issue if definitions are expected for valid types
      console.warn(`No field definitions found for type: ${type}`);
      return c.json({ error: `No definitions found for type ${type}` }, 404); 
    }

    return c.json(results);
  } catch (error) {
    console.error(`Error fetching field definitions for type ${type}:`, error);
    return c.json({ error: 'Failed to fetch field definitions' }, 500);
  }
});

export { definitions as definitionRoutes }; 