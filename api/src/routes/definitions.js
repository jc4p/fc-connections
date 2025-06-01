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
      `SELECT field_key, field_label, field_type, field_category, field_options, 
              char_limit, slider_min, slider_max, slider_labels, is_required, field_order 
       FROM profile_field_definitions 
       WHERE profile_type = ? 
       ORDER BY field_order ASC`
    ).bind(type).all();

    if (!results || results.length === 0) {
      console.warn(`No field definitions found for type: ${type}`);
      return c.json({ error: `No definitions found for type ${type}` }, 404); 
    }

    // Parse JSON fields and structure response
    const processedResults = results.map(field => ({
      ...field,
      field_options: field.field_options ? JSON.parse(field.field_options) : null,
      slider_labels: field.slider_labels ? JSON.parse(field.slider_labels) : null
    }));

    // Group by category for frontend convenience
    const categorized = {
      essential: processedResults.filter(f => f.field_category === 'essential'),
      extra: processedResults.filter(f => f.field_category === 'extra')
    };

    return c.json(categorized);
  } catch (error) {
    console.error(`Error fetching field definitions for type ${type}:`, error);
    return c.json({ error: 'Failed to fetch field definitions' }, 500);
  }
});

export { definitions as definitionRoutes }; 