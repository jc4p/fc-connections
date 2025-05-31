-- Users Data --
INSERT INTO users (fid, display_name, avatar_url) VALUES (101, 'Alice Wonderland', 'https://example.com/alice.png');
INSERT INTO users (fid, display_name, avatar_url) VALUES (102, 'Bob The Builder', 'https://example.com/bob.png');
INSERT INTO users (fid, display_name, avatar_url) VALUES (103, 'Charlie Brown', 'https://example.com/charlie.png');

-- Profiles Data --
-- User 101
INSERT INTO profiles (fid, profile_type) VALUES (101, 'partner');
INSERT INTO profiles (fid, profile_type) VALUES (101, 'friend');
INSERT INTO profiles (fid, profile_type) VALUES (101, 'job');

-- User 102
INSERT INTO profiles (fid, profile_type) VALUES (102, 'partner');
INSERT INTO profiles (fid, profile_type) VALUES (102, 'friend');
INSERT INTO profiles (fid, profile_type) VALUES (102, 'job');

-- User 103
INSERT INTO profiles (fid, profile_type) VALUES (103, 'partner');
INSERT INTO profiles (fid, profile_type) VALUES (103, 'friend');
INSERT INTO profiles (fid, profile_type) VALUES (103, 'job');

-- Profile Field Values Data --
-- Profile Field Values --

-- Profile ID: 1 (User 101 - Alice, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 1, 'Looking for a kind and adventurous partner like Alice would.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 2, 'Female');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 3, 46);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 4, 'Near Builderville');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 5, 'I am Alice. I enjoy long walks and quiet evenings.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 6, '["reading", "stargazing", "travel"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 7, 'Something serious and long-term for Alice.');

-- Profile ID: 2 (User 101 - Alice, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 8, 'Alice here! Let us be friends.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 9, '["board games", "concerts", "hiking"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 10, 'Evenings');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 11, 'In Neverland');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 12, 'New friends for Alice to hang out with.');

-- Profile ID: 3 (User 101 - Alice, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 13, 1);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 14, 'Product Manager');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 15, 'Wayne Enterprises');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 16, 'Healthcare');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 17, '["python", "java", "sql"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 18, '4 years in the field for Alice');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 19, 'New York');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 20, 'Alice is seeking a challenging role in a dynamic company.');

-- Profile ID: 4 (User 102 - Bob, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 1, 'Looking for a kind and adventurous partner like Bob would.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 2, 'Non-binary');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 3, 29);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 4, 'Near Cartoon City');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 5, 'I am Bob. I enjoy long walks and quiet evenings.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 6, '["reading", "gardening", "travel"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 7, 'Something serious and long-term for Bob.');

-- Profile ID: 5 (User 102 - Bob, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 8, 'Bob here! Let us be friends.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 9, '["board games", "volunteering", "hiking"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 10, 'Most of the time');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 11, 'In Oz');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 12, 'New friends for Bob to hang out with.');

-- Profile ID: 6 (User 102 - Bob, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 13, 0);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 14, 'UX Designer');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 15, 'Stark Industries');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 16, 'Finance');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 17, '["python", "golang", "sql"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 18, '6 years in the field for Bob');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 19, 'San Francisco');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 20, 'Bob is seeking a challenging role in a dynamic company.');

-- Profile ID: 7 (User 103 - Charlie, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 1, 'Looking for a kind and adventurous partner like Charlie would.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 2, 'Male');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 3, 50);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 4, 'Near Wonderland');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 5, 'I am Charlie. I enjoy long walks and quiet evenings.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 6, '["reading", "chess", "travel"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 7, 'Something serious and long-term for Charlie.');

-- Profile ID: 8 (User 103 - Charlie, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 8, 'Charlie here! Let us be friends.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 9, '["board games", "movies", "hiking"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 10, 'Weekends');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 11, 'In the Shire');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 12, 'New friends for Charlie to hang out with.');

-- Profile ID: 9 (User 103 - Charlie, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 13, 1);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 14, 'Software Engineer');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 15, 'Acme Corp');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 16, 'Tech');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 17, '["python", "javascript", "sql"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 18, '8 years in the field for Charlie');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 19, 'Remote');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 20, 'Charlie is seeking a challenging role in a dynamic company.');
