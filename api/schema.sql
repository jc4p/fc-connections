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
  field_type TEXT NOT NULL,       -- Type of field (text, number, json_array, etc.)
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

-- Partner Profile Fields
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, is_required, field_order)
VALUES
('partner', 'seeking', 'Looking For', 'text', 1, 1),
('partner', 'gender', 'Gender', 'text', 0, 2),
('partner', 'age', 'Age', 'number', 1, 3),
('partner', 'location', 'Location', 'text', 1, 4),
('partner', 'bio', 'About Me', 'text', 1, 5),
('partner', 'interests', 'Interests', 'json_array', 0, 6),
('partner', 'relationship_goals', 'Relationship Goals', 'text', 0, 7);

-- Friend Profile Fields
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, is_required, field_order)
VALUES
('friend', 'bio', 'About Me', 'text', 1, 1),
('friend', 'activities', 'Favorite Activities', 'json_array', 1, 2),
('friend', 'availability', 'Availability', 'text', 0, 3),
('friend', 'location', 'Location', 'text', 1, 4),
('friend', 'seeking', 'Looking For', 'text', 1, 5);

-- Job Profile Fields
INSERT INTO profile_field_definitions 
(profile_type, field_key, field_label, field_type, is_required, field_order)
VALUES
('job', 'is_employer', 'I am an employer', 'boolean', 1, 1),
('job', 'title', 'Title/Position', 'text', 1, 2),
('job', 'company', 'Company', 'text', 0, 3),
('job', 'industry', 'Industry', 'text', 1, 4),
('job', 'skills', 'Skills', 'json_array', 0, 5),
('job', 'experience', 'Experience', 'text', 0, 6),
('job', 'location', 'Location/Remote', 'text', 1, 7),
('job', 'description', 'Description', 'text', 1, 8); 