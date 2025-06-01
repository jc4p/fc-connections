-- Sample Users Data
INSERT INTO users (fid, display_name, avatar_url) VALUES (101, 'Sarah Mitchell', 'https://api.dicebear.com/9.x/avataaars/svg?seed=55');
INSERT INTO users (fid, display_name, avatar_url) VALUES (102, 'Jake Thompson', 'https://api.dicebear.com/9.x/avataaars/svg?seed=65');
INSERT INTO users (fid, display_name, avatar_url) VALUES (103, 'Emily Davis', 'https://api.dicebear.com/9.x/avataaars/svg?seed=140');
INSERT INTO users (fid, display_name, avatar_url) VALUES (104, 'Alex Chen', 'https://api.dicebear.com/9.x/avataaars/svg?seed=200');
INSERT INTO users (fid, display_name, avatar_url) VALUES (105, 'Maya Robertson', 'https://api.dicebear.com/9.x/avataaars/svg?seed=300');

-- Sample Profiles Data
-- User 101 - Sarah Mitchell
INSERT INTO profiles (fid, profile_type, view_count) VALUES (101, 'partner', 15);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (101, 'friend', 8);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (101, 'job', 22);

-- User 102 - Jake Thompson
INSERT INTO profiles (fid, profile_type, view_count) VALUES (102, 'partner', 12);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (102, 'friend', 18);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (102, 'job', 7);

-- User 103 - Emily Davis
INSERT INTO profiles (fid, profile_type, view_count) VALUES (103, 'partner', 25);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (103, 'friend', 14);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (103, 'job', 31);

-- User 104 - Alex Chen
INSERT INTO profiles (fid, profile_type, view_count) VALUES (104, 'partner', 9);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (104, 'job', 16);

-- User 105 - Maya Robertson
INSERT INTO profiles (fid, profile_type, view_count) VALUES (105, 'friend', 20);
INSERT INTO profiles (fid, profile_type, view_count) VALUES (105, 'job', 11);

-- Profile Field Values Data (based on new schema field IDs)

-- Profile ID: 1 (User 101 - Sarah, Type: partner)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 1, '28');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 2, 'Austin, TX');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 3, 'Woman');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 4, 'Men who appreciate both adventure and cozy nights in');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 5, 'Farmers market browsing, cooking a new recipe, then binge-watching something good with takeout');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 6, 'Genuine compliments about things I care about');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 7, 'Travel stories, marketing psychology, and why certain songs just hit different');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 8, 'When they remember little things I mentioned and check in during stressful times');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 9, '6');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 10, 'Want to talk it out immediately');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 11, 'Acts of service');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (1, 12, 'Through quality time together');

-- Profile ID: 2 (User 101 - Sarah, Type: friend)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 13, 'Austin, TX');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 14, 'Enthusiasm for trying new restaurants, solid brunch game, and always down for adventures');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 15, 'Someone to explore Austin with - food tours, live music, weekend trips');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 16, 'Planned weekly/monthly catch-ups');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 17, 'The social coordinator who always knows about cool events happening');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 18, 'Trying a new restaurant, then walking around South by Southwest or checking out local art');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 19, 'Thoughtful check-in texts');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 20, 'Someone who listens without judgment');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 21, 'Witty and sarcastic');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 22, '7');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (2, 23, '8');

-- Profile ID: 3 (User 101 - Sarah, Type: job)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 24, 'false');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 25, 'Austin, TX');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 26, 'Digital Marketing Manager with 5 years experience in SaaS growth and acquisition strategy');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 27, 'Senior marketing role at high-growth startup where I can lead acquisition strategy');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 28, 'Advanced analytics and attribution modeling for marketing campaigns');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 29, 'Building marketing systems that actually move the needle on business growth');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 30, 'Data-driven but collaborative environment with smart, ambitious people');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 31, 'Creating scalable growth systems for a product I actually believe in');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 32, 'Advanced SQL and statistical analysis for marketing');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (3, 33, 'The shift toward privacy-first marketing and first-party data strategies');

-- Profile ID: 4 (User 102 - Jake, Type: partner)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 1, '32');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 2, 'Denver, CO');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 3, 'Man');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 4, 'Women who love both outdoor adventures and cozy nights with a good movie');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 5, 'Long hike with Max, then brewery hopping with friends, ending with takeout and a documentary');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 6, 'When someone gets excited about something I care about, even if they don''t fully understand it');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 7, 'Why certain hiking trails feel magical, the craft beer scene, and random engineering problems');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 8, 'When they remember I had a big presentation and ask how it went');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 9, '7');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 10, 'Use humor to diffuse tension');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 11, 'Quality time');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (4, 12, 'Through physical affection');

-- Profile ID: 5 (User 102 - Jake, Type: friend)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 13, 'Denver, CO');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 14, 'Outdoor adventure enthusiasm, brewery knowledge, and a golden retriever sidekick');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 15, 'Hiking buddies and people who appreciate good beer and mountain views');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 16, 'Spontaneous texts & hangouts');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 17, 'The activity planner who always has hiking trail recommendations');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 18, 'Morning hike followed by brewery lunch, then maybe some board games');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 19, 'Spontaneous calls or meetups');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 20, 'Distraction and fun activities');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 21, 'Goofy and silly');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 22, '8');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (5, 23, '9');

-- Profile ID: 6 (User 102 - Jake, Type: job)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 24, 'false');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 25, 'Denver, CO');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 26, 'Senior Software Engineer with 6 years building scalable web applications and APIs');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 27, 'Tech lead role where I can mentor developers and architect complex systems');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 28, 'System design patterns and distributed architecture');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 29, 'Building elegant solutions to complex technical problems');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 30, 'Collaborative team environment with smart engineers and interesting technical challenges');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 31, 'Leading the architecture for a high-scale system that millions of people use');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 32, 'Advanced TypeScript patterns and system design principles');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (6, 33, 'The evolution of edge computing and how it''s changing web architecture');

-- Profile ID: 7 (User 103 - Emily, Type: partner)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 1, '26');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 2, 'Seattle, WA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 3, 'Woman');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 4, 'Someone who values creativity, deep conversations, and building something meaningful together');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 5, 'Gallery hopping, pottery class, then cozy coffee shop reading with rain on the windows');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 6, 'When someone notices the little creative details I put effort into');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 7, 'Design philosophy, why certain art moves people, and the stories behind vintage finds');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 8, 'When they share their own vulnerabilities and creative struggles with me');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 9, '4');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 10, 'Need space to think');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 11, 'Giving gifts');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (7, 12, 'When I receive gifts');

-- Profile ID: 8 (User 103 - Emily, Type: friend)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 13, 'Seattle, WA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 14, 'Creative eye for hidden gems, knowledge of Seattle''s art scene, and good vintage shopping instincts');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 15, 'Fellow creatives who love exploring art, coffee culture, and unique experiences');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 16, 'Planned weekly/monthly catch-ups');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 17, 'The one who finds the coolest hole-in-the-wall galleries and vintage shops');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 18, 'New art exhibition, then coffee at a cozy indie spot, maybe some vintage shopping');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 19, 'Funny memes and GIFs');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 20, 'Space but with regular check-ins');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 21, 'Observational and dry');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 22, '6');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (8, 23, '7');

-- Profile ID: 9 (User 103 - Emily, Type: job)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 24, 'false');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 25, 'Seattle, WA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 26, 'Senior Graphic Designer specializing in sustainable brand design and outdoor lifestyle');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 27, 'Creative director role at purpose-driven company focusing on brand strategy and sustainable design');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 28, 'Sustainable packaging design and circular design principles');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 29, 'Creating designs that actually make a positive impact on the world');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 30, 'Purpose-driven company with strong values and creative freedom');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 31, 'Leading brand strategy for a company that''s genuinely trying to solve environmental problems');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 32, 'Motion graphics and interactive design for digital experiences');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (9, 33, 'Sustainable design practices and how brands are authentically incorporating environmental values');

-- Profile ID: 10 (User 104 - Alex, Type: partner)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 1, '29');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 2, 'San Francisco, CA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 3, 'Non-binary');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 4, 'Someone who appreciates both intellectual conversations and silly moments');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 5, 'Dim sum brunch, Golden Gate Park wandering, then home for cooking experiments and documentaries');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 6, 'Genuine curiosity about my thoughts and random observations');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 7, 'Urban planning, why certain neighborhoods feel alive, and the psychology of technology');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 8, 'When they share their own weird thoughts without worrying about being judged');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 9, '5');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 10, 'Try to find a quick compromise');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 11, 'Words of affirmation');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (10, 12, 'Through words of affirmation');

-- Profile ID: 11 (User 104 - Alex, Type: job)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 24, 'true');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 25, 'San Francisco, CA');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 26, 'Product Manager at early-stage fintech startup, building tools for financial inclusion');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 27, 'Looking for senior PM candidates who care about building products that actually help people');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 28, 'Behavioral economics and how to design financial products that encourage good habits');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 29, 'Building products that genuinely improve people''s financial wellbeing');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 30, 'Mission-driven team that moves fast but thinks deeply about user impact');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 31, 'Scaling financial tools that can reach underserved communities effectively');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 32, 'Advanced user research methods and quantitative product analysis');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (11, 33, 'Embedded finance and how financial services are becoming invisible infrastructure');

-- Profile ID: 12 (User 105 - Maya, Type: friend)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 13, 'Portland, OR');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 14, 'Excellent food recommendations, yoga expertise, and infectious enthusiasm for new experiences');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 15, 'Active friends who love trying new things and exploring Portland''s food and wellness scene');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 16, 'A bit of everything!');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 17, 'The wellness guru who somehow makes healthy habits feel fun and accessible');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 18, 'Morning yoga class, farmers market shopping, then cooking together with wine');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 19, 'Voice notes');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 20, 'Practical advice and solutions');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 21, 'I laugh at everything!');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 22, '8');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (12, 23, '9');

-- Profile ID: 13 (User 105 - Maya, Type: job)
-- Essential fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 24, 'false');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 25, 'Portland, OR');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 26, 'UX Research Lead with expertise in wellness and health tech user behavior');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 27, 'Senior research role at health tech company focused on improving wellness outcomes');
-- Extra fields
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 28, 'Mixed methods research and how to make research insights actually actionable');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 29, 'Understanding how people actually change their habits and designing experiences that support that');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 30, 'Research-driven culture where insights directly influence product decisions');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 31, 'Leading research for products that genuinely help people build healthier, happier lives');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 32, 'Advanced statistical analysis and longitudinal user behavior studies');
INSERT INTO profile_field_values (profile_id, field_id, field_value) VALUES (13, 33, 'How wearable data is changing our understanding of wellness and behavior change');
