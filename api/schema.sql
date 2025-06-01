-- Users table (minimal user info)
CREATE TABLE users (
  fid INTEGER PRIMARY KEY, -- Farcaster ID as primary key
  display_name TEXT,       -- Can be updated separately from Farcaster if needed
  avatar_url TEXT,         -- Optional override for Farcaster avatar
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  last_active INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Profiles table (stores which profile types a user has created)
CREATE TABLE profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fid INTEGER NOT NULL,
  profile_type TEXT NOT NULL CHECK(profile_type IN ('partner', 'friend', 'job')),
  is_active BOOLEAN NOT NULL DEFAULT 1,
  view_count INTEGER NOT NULL DEFAULT 0,  -- For tracking popularity
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (fid) REFERENCES users(fid),
  UNIQUE(fid, profile_type) -- One of each type per user
);

-- Field definitions table (defines possible fields for each profile type)
CREATE TABLE profile_field_definitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_type TEXT NOT NULL CHECK(profile_type IN ('partner', 'friend', 'job')),
  field_key TEXT NOT NULL,        -- Machine-readable field name (e.g., "gender", "skills")
  field_label TEXT NOT NULL,      -- Human-readable label (e.g., "Gender", "Skills")
  field_type TEXT NOT NULL CHECK(field_type IN ('text', 'number', 'dropdown', 'multi_select', 'slider', 'boolean', 'json_array')),
  field_category TEXT NOT NULL CHECK(field_category IN ('essential', 'extra')), -- Essential for basic matching, extra for deeper insights
  field_options TEXT,             -- JSON array for dropdown/multi-select options
  slider_min INTEGER,             -- For slider fields
  slider_max INTEGER,             -- For slider fields
  slider_labels TEXT,             -- JSON object with min/max labels for sliders
  char_limit INTEGER,             -- Character limit for text fields
  is_required BOOLEAN NOT NULL DEFAULT 0,
  field_order INTEGER NOT NULL,   -- For controlling display order
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(profile_type, field_key) -- Field keys must be unique per profile type
);

-- Field values table (stores actual profile field values)
CREATE TABLE profile_field_values (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL,
  field_id INTEGER NOT NULL,
  field_value TEXT,               -- All values stored as text (JSON for complex types)
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (field_id) REFERENCES profile_field_definitions(id) ON DELETE CASCADE,
  UNIQUE(profile_id, field_id)    -- One value per field per profile
);

-- Profile views (for analytics and ranking)
CREATE TABLE profile_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL,
  viewer_fid INTEGER NOT NULL,
  viewed_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (viewer_fid) REFERENCES users(fid),
  UNIQUE(profile_id, viewer_fid) -- Track unique views
);

-- Create indexes for faster querying
CREATE INDEX idx_profiles_fid ON profiles(fid);
CREATE INDEX idx_profiles_type ON profiles(profile_type);
CREATE INDEX idx_profiles_view_count ON profiles(view_count DESC);
CREATE INDEX idx_field_defs_profile_type ON profile_field_definitions(profile_type);
CREATE INDEX idx_field_defs_order ON profile_field_definitions(field_order);
CREATE INDEX idx_field_values_profile ON profile_field_values(profile_id);
CREATE INDEX idx_field_values_field ON profile_field_values(field_id);
CREATE INDEX idx_profile_views_profile ON profile_views(profile_id);
CREATE INDEX idx_profile_views_viewer ON profile_views(viewer_fid);

-- PARTNER PROFILE FIELDS
-- Essentials (required for basic matching)
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, is_required, field_order)
VALUES
('partner', 'age', 'Age', 'number', 'essential', NULL, NULL, 1, 1),
('partner', 'location', 'Location', 'text', 'essential', NULL, 100, 1, 2),
('partner', 'gender_identity', 'I identify as', 'text', 'essential', NULL, 50, 1, 3),
('partner', 'seeking_orientation', 'Interested in connecting with', 'text', 'essential', NULL, 100, 1, 4);

-- Extras (unlocks deeper insights)
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, slider_min, slider_max, slider_labels, is_required, field_order)
VALUES
('partner', 'ideal_sunday', 'What does your ideal lazy Sunday look like?', 'text', 'extra', NULL, 150, NULL, NULL, NULL, 0, 5),
('partner', 'heart_access', 'What''s the quickest way to make you smile?', 'text', 'extra', NULL, 100, NULL, NULL, NULL, 0, 6),
('partner', 'passion_talk', 'What could you talk about for hours without getting bored?', 'text', 'extra', NULL, 100, NULL, NULL, NULL, 0, 7),
('partner', 'trust_signal', 'How do you know when you really trust someone?', 'text', 'extra', NULL, 100, NULL, NULL, NULL, 0, 8),
('partner', 'social_battery', 'Where do you fall on the social energy spectrum?', 'slider', 'extra', NULL, NULL, 1, 10, '{"1": "Homebody", "10": "Always out"}', 0, 9),
('partner', 'conflict_style', 'When disagreements arise, I tend to', 'dropdown', 'extra', '["Need space to think", "Want to talk it out immediately", "Try to find a quick compromise", "Use humor to diffuse tension"]', NULL, NULL, NULL, NULL, 0, 10),
('partner', 'love_language_give', 'How do you prefer to show you care?', 'dropdown', 'extra', '["Words of affirmation", "Acts of service", "Giving gifts", "Physical touch", "Quality time"]', NULL, NULL, NULL, NULL, 0, 11),
('partner', 'love_language_receive', 'How do you feel most loved?', 'dropdown', 'extra', '["Through words of affirmation", "When someone does things for me", "When I receive gifts", "Through physical affection", "Through quality time together"]', NULL, NULL, NULL, NULL, 0, 12);

-- FRIEND PROFILE FIELDS  
-- Essentials
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, is_required, field_order)
VALUES
('friend', 'location', 'Location', 'text', 'essential', NULL, 100, 1, 1),
('friend', 'friendship_offer', 'What do you bring to friendships?', 'text', 'essential', NULL, 100, 1, 2),
('friend', 'friendship_seeking', 'What are you looking for in a friend?', 'text', 'essential', NULL, 100, 1, 3),
('friend', 'availability_style', 'How do you prefer to hang out?', 'dropdown', 'essential', '["Spontaneous texts & hangouts", "Planned weekly/monthly catch-ups", "Mostly online with occasional meetups", "A bit of everything!"]', NULL, 1, 4);

-- Extras
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, slider_min, slider_max, slider_labels, is_required, field_order)
VALUES
('friend', 'friend_role', 'What role do you usually play in your friend group?', 'text', 'extra', NULL, 100, NULL, NULL, NULL, 0, 5),
('friend', 'perfect_hangout', 'What does a perfect hangout look like to you?', 'text', 'extra', NULL, 100, NULL, NULL, NULL, 0, 6),
('friend', 'communication_style', 'How do you prefer to stay in touch?', 'dropdown', 'extra', '["Funny memes and GIFs", "Thoughtful check-in texts", "Voice notes", "Spontaneous calls or meetups"]', NULL, NULL, NULL, NULL, 0, 7),
('friend', 'support_preference', 'When you''re going through something tough, what kind of support do you appreciate most?', 'dropdown', 'extra', '["Someone who listens without judgment", "Practical advice and solutions", "Distraction and fun activities", "Space but with regular check-ins"]', NULL, NULL, NULL, NULL, 0, 8),
('friend', 'humor_style', 'What type of humor do you appreciate?', 'dropdown', 'extra', '["Witty and sarcastic", "Goofy and silly", "Observational and dry", "Dark and absurd", "I laugh at everything!"]', NULL, NULL, NULL, NULL, 0, 9),
('friend', 'social_battery', 'How would you describe your social energy?', 'slider', 'extra', NULL, NULL, 1, 10, '{"1": "Carefully managed", "10": "Always ready"}', 0, 10),
('friend', 'new_experience_openness', 'How do you feel about trying new things?', 'slider', 'extra', NULL, NULL, 1, 10, '{"1": "Love my routines", "10": "Always exploring"}', 0, 11);

-- JOB PROFILE FIELDS
-- Essentials  
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, is_required, field_order)
VALUES
('job', 'is_employer', 'I am an employer/recruiter', 'boolean', 'essential', NULL, NULL, 1, 1),
('job', 'location', 'Location', 'text', 'essential', NULL, 100, 1, 2),
('job', 'professional_summary', 'Professional summary', 'text', 'essential', NULL, 250, 1, 3),
('job', 'current_focus', 'What are you currently working on or looking for?', 'text', 'essential', NULL, 200, 1, 4);

-- Extras
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, field_category, field_options, char_limit, is_required, field_order)
VALUES
('job', 'learning_interest', 'What is something new you''re interested in learning?', 'text', 'extra', NULL, 150, 0, 5),
('job', 'career_motivation', 'What motivates you professionally?', 'text', 'extra', NULL, 150, 0, 6),
('job', 'work_environment', 'What type of work environment do you thrive in?', 'text', 'extra', NULL, 150, 0, 7),
('job', 'professional_challenge', 'What professional challenge are you most excited to tackle?', 'text', 'extra', NULL, 150, 0, 8),
('job', 'skill_development', 'What skill are you currently developing or want to develop?', 'text', 'extra', NULL, 150, 0, 9),
('job', 'industry_trend', 'What trend in your field do you find most interesting?', 'text', 'extra', NULL, 150, 0, 10); 