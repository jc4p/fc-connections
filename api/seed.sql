-- Users Data --
INSERT INTO users (fid, display_name, avatar_url) VALUES (101, 'Sarah Mitchell', 'https://api.dicebear.com/9.x/avataaars/svg?seed=55');
INSERT INTO users (fid, display_name, avatar_url) VALUES (102, 'Jake Thompson', 'https://api.dicebear.com/9.x/avataaars/svg?seed=65');
INSERT INTO users (fid, display_name, avatar_url) VALUES (103, 'Emily Davis', 'https://api.dicebear.com/9.x/avataaars/svg?seed=140');

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

-- Profile ID: 1 (User 101 - Sarah, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 1, 'Looking for someone genuine who loves exploring new places and deep conversations over coffee.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 2, 'Female');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 3, 28);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 4, 'Austin, TX');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 5, 'Marketing professional who loves weekend farmers markets, trying new restaurants, and planning spontaneous road trips. Looking for someone who appreciates both Netflix nights and outdoor adventures.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 6, '["hiking", "cooking", "photography", "live music"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 7, 'Long-term relationship with someone who shares similar values and life goals.');

-- Profile ID: 2 (User 101 - Sarah, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 8, 'New to Austin and looking to build a solid friend group! Love exploring the city and always down for brunch or happy hour.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 9, '["yoga classes", "trivia nights", "food festivals", "rock climbing"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 10, 'Weekends and some weeknights');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 11, 'South Austin');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 12, 'Looking for friends to explore Austin with - from food trucks to live music venues!');

-- Profile ID: 3 (User 101 - Sarah, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 13, 1);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 14, 'Digital Marketing Manager');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 15, 'Indeed');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 16, 'Technology');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 17, '["Google Analytics", "HubSpot", "A/B testing", "SEO", "social media marketing"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 18, '5 years in digital marketing with focus on SaaS growth');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 19, 'Austin, TX');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 20, 'Seeking senior marketing role at a high-growth startup where I can lead acquisition strategy and build marketing systems.');

-- Profile ID: 4 (User 102 - Jake, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 1, 'Looking for someone who enjoys both city adventures and quiet weekend mornings. Must love dogs!');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 2, 'Male');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 3, 32);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 4, 'Denver, CO');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 5, 'Software engineer who spends weekends on hiking trails or trying new breweries. My golden retriever Max is my wingman. Love cooking, board games, and planning weekend getaways.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 6, '["hiking", "craft beer", "board games", "skiing", "cooking"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 7, 'Serious relationship with someone who wants to explore Colorado together.');

-- Profile ID: 5 (User 102 - Jake, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 8, 'Tech guy who loves the outdoors! Always looking for hiking buddies and people to check out new breweries with.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 9, '["hiking", "brewery hopping", "skiing", "volleyball", "game nights"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 10, 'Weekends and after work');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 11, 'Capitol Hill, Denver');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 12, 'Looking for a crew to explore Denver\'s outdoor scene and social spots!');

-- Profile ID: 6 (User 102 - Jake, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 13, 0);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 14, 'Senior Software Engineer');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 15, 'Palantir');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 16, 'Technology');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 17, '["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 18, '6 years building scalable web applications and APIs');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 19, 'Denver, CO');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 20, 'Looking for a tech lead role where I can mentor junior developers and architect complex systems.');

-- Profile ID: 7 (User 103 - Emily, Type: partner)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 1, 'Seeking a partner who values deep conversations, shared adventures, and building something meaningful together.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 2, 'Female');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 3, 26);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 4, 'Seattle, WA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 5, 'Graphic designer who finds inspiration in Seattle\'s coffee culture and rainy days. Love exploring local art galleries, weekend farmers markets, and cozy bookshops. Looking for someone who appreciates creativity and isn\'t afraid of deep conversations.');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 6, '["art galleries", "coffee shops", "indie films", "vintage shopping", "pottery"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 7, 'Long-term partnership with someone who shares creative passions and life goals.');

-- Profile ID: 8 (User 103 - Emily, Type: friend)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 8, 'Creative soul looking for friends who love exploring Seattle\'s art scene and trying new coffee spots!');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 9, '["art museums", "coffee tastings", "vintage markets", "indie concerts", "pottery classes"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 10, 'Weekends and some evenings');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 11, 'Capitol Hill, Seattle');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 12, 'Looking for artsy friends to explore galleries, check out new cafes, and attend creative events together!');

-- Profile ID: 9 (User 103 - Emily, Type: job)
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 13, 1);
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 14, 'Senior Graphic Designer');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 15, 'REI Co-op');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 16, 'Retail/Outdoor');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 17, '["Adobe Creative Suite", "Figma", "brand design", "packaging design", "print design"]');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 18, '4 years specializing in outdoor lifestyle and sustainable brand design');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 19, 'Seattle, WA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 20, 'Seeking creative director role at a purpose-driven company where I can lead brand strategy and sustainable design initiatives.');
