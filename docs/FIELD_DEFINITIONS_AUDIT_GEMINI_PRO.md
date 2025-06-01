Okay, this is an exciting challenge! You're absolutely right – the questions are the bedrock of engagement and rich data. Let's overhaul these field definitions to make FC-Connections incredibly sticky and insightful.

**Core Principles Applied:**

*   **Self-Discovery Journey:** Frame questions as prompts for introspection. The user learns about themselves as they answer.
*   **Curiosity Gap & Personalization:** Tease insights or compatibility scores based on answers. "Answer 3 more questions to unlock your 'Connection Style'!"
*   **Narrative & Storytelling:** Encourage users to tell mini-stories, not just list facts.
*   **Forced Choice (Sometimes):** "Would you rather..." questions can reveal underlying priorities.
*   **Indirect Probing:** Instead of "Are you empathetic?", ask "What's a small act of kindness you recently witnessed or performed that stuck with you?"
*   **Future Pacing & Ideal Self:** Questions about ideal scenarios tap into aspirations.
*   **Emotional Elicitation:** Questions that trigger mild emotional responses (humor, nostalgia, aspiration) are more memorable.
*   **Progressive Disclosure:** Start lighter, then offer opportunities for deeper sharing, perhaps in optional "Advanced Profile" sections.

---

**General Gamification & Stickiness Elements (Applicable Across Profiles):**

1.  **Profile Completeness Score/Meter:** Visually gratifying.
2.  **"Insight Unlocked!":** After answering a set of questions, provide a small, interesting "insight" about them (e.g., "Based on your answers, you're a 'Curious Explorer' when it comes to new experiences!").
3.  **"Daily Spark" or "Weekly Deeper Dive":** A single, thought-provoking question delivered via notification to encourage re-engagement and profile updates. Answers could be shareable (if desired).
4.  **"People like you also enjoy X":** Based on answers, suggest interests or activities, creating a feedback loop.
5.  **"Compatibility Glimpse":** When viewing other profiles, show *why* they might be a match based on specific shared or complementary answers to these deeper questions. E.g., "You both believe trust is built through consistent actions!"

---

Here are the revamped profile fields:

## PARTNER PROFILE FIELDS

**Goal:** Move beyond superficial attraction to core values, relationship dynamics, and genuine compatibility.

**1. Essentials (Keep & Refine):**

*   **`age`**: "Age" (type: number) - *Essential.*
*   **`location`**: "Where are you based (City, Country)?" (type: text) - *Essential.*
*   **`gender_identity`**: "I identify as..." (type: single-select/custom input, e.g., Woman, Man, Non-binary, Agender, prefer to self-describe)
    *   **Reasoning:** More inclusive than "gender." Essential for matching.
*   **`pronouns`**: "My pronouns are..." (type: multi-select/custom input, e.g., she/her, he/him, they/them, prefer to self-describe)
    *   **Reasoning:** Respectful and standard for modern apps.
*   **`sexual_orientation`**: "I'm interested in connecting with..." (type: multi-select, e.g., Men, Women, Non-binary people, Everyone, Still exploring)
    *   **Reasoning:** Replaces "seeking" for orientation. Clearer.

**2. Transformed Generic Fields (Deep Personality Insights):**

*   **Original `bio`**: "About Me"
    *   **NEW 1: `personal_tagline`**: "My life's current tagline in 7 words or less?"
        *   **Reasoning:** Forces conciseness, creativity, and self-reflection. Reveals self-perception and priorities (Big Five: Openness, Conscientiousness). A great hook.
    *   **NEW 2: `two_truths_one_lie`**: "Two truths and a lie about me... (let them guess which is which!)"
        *   **Reasoning:** Highly engaging, encourages interaction, reveals playful side and interesting facts (Personality: Playfulness, Openness). Excellent conversation starter.
*   **Original `interests`**: "Interests"
    *   **NEW: `flow_state_activity`**: "What's something you do that makes you completely lose track of time?"
        *   **Reasoning:** As per your example. Reveals genuine passions and where their intrinsic motivation lies (Values: Hedonism, Stimulation; Personality: Openness).
    *   **NEW: `currently_obsessed_with`**: "I'm currently nerding out about/binge-watching/listening to..."
        *   **Reasoning:** Current and specific, provides immediate conversation starters. Shows Openness to Experience, cultural tastes.
*   **Original `relationship_goals`**: "Relationship Goals"
    *   **NEW 1: `ideal_ordinary_day`**: "Describe your ideal 'ordinary' Sunday with a partner."
        *   **Reasoning:** Reveals preferences for daily life, energy levels (introversion/extraversion), shared activities, and pace. More concrete than abstract "goals." (Values: Security, Companionship; Attachment: Secure base).
    *   **NEW 2: `trust_signal`**: "How do you know when you *really* trust someone?"
        *   **Reasoning:** As per your example. Dives into core relationship needs and expectations (Attachment Styles, Values: Benevolence, Security).
    *   **NEW 3: `love_language_expression`**: "I show I care by [action/words/gifts/etc.] and I feel most loved when someone [action/words/gifts/etc.]." (Could be multiple choice based on 5 Love Languages then a short fill-in).
        *   **Reasoning:** Directly taps into how people give/receive affection, crucial for compatibility (Love Languages framework).

**3. New Fields for Deeper Connection & Analytics:**

*   **`quirky_hill_to_die_on`**: "What's a small, perhaps silly, hill you're willing to die on?"
    *   **Reasoning:** As per your example. Reveals personality quirks, sense of humor, and underlying values/beliefs in a lighthearted way (Personality: Openness, Agreeableness (or lack thereof in a fun way)).
*   **`dealbreaker_disguised`**: "A relationship non-negotiable for me is... (e.g., shared sense of humor, intellectual curiosity, kindness to strangers)."
    *   **Reasoning:** Softer framing than "dealbreakers." Reveals core values and absolute needs (Values Hierarchy).
*   **`conflict_navigation_style`**: "When a disagreement arises, I tend to: (a) Need space to think, (b) Want to talk it out immediately, (c) Try to find a quick compromise, (d) Use humor to diffuse tension."
    *   **Reasoning:** Reveals conflict resolution style, crucial for long-term compatibility (Attachment Styles, Big Five: Agreeableness, Neuroticism).
*   **`growth_catalyst`**: "A past relationship taught me the importance of..."
    *   **Reasoning:** Shows self-awareness, capacity for growth, and what they've learned about relationships (Attachment, Emotional Intelligence).
*   **`adventure_level`**: "My ideal first 'adventure' together is: (a) Cozy coffee & deep chat, (b) Trying a new restaurant, (c) A spontaneous day trip, (d) An escape room challenge."
    *   **Reasoning:** Gauges preferred level of initial intensity, risk-taking, and social energy (Big Five: Extraversion, Openness; Sensation-seeking).
*   **`giving_back_style`**: "If I had an extra $1000 to give away, I'd donate it to a cause related to..."
    *   **Reasoning:** Reveals altruistic values and societal concerns (Values: Universalism, Benevolence).

---

## FRIEND PROFILE FIELDS

**Goal:** Focus on shared activities, support styles, communication, and what makes a friendship "click."

**1. Essentials (Keep & Refine):**

*   **`location`**: "Where are you mostly hanging out (City, Area)?" (type: text) - *Essential.*
*   **`availability_preference`**: "My ideal friendship rhythm is: (a) Spontaneous texts & hangouts, (b) Planned weekly/monthly catch-ups, (c) Mostly online with occasional meetups, (d) A bit of everything!"
    *   **Reasoning:** More nuanced than just "Availability." Sets expectations (Social Needs, Lifestyle).

**2. Transformed Generic Fields:**

*   **Original `bio`**: "About Me"
    *   **NEW 1: `friend_group_role`**: "My friends would describe me as the '____' one in our group. (e.g., the planner, the comic relief, the good listener, the adventurous one)."
        *   **Reasoning:** Self-perception of social role, how they see themselves contributing to a friendship (Social Dynamics, Big Five: aspects of all).
    *   **NEW 2: `perfect_hangout_vibe`**: "A perfect, no-pressure hangout for me involves..."
        *   **Reasoning:** Concrete, reveals preferred activities and social energy levels (Interests, Extraversion/Introversion).
*   **Original `activities`**: "Favorite Activities"
    *   **NEW: `activity_passion_level`**: "An activity I could talk about for hours (or would love to do with a new friend) is..."
        *   **Reasoning:** Highlights genuine passion and areas for shared experience (Interests, Openness).
*   **Original `seeking`**: "Looking For"
    *   **NEW: `friendship_fuel`**: "I'm looking for friends who appreciate/enjoy [e.g., deep convos, shared hobbies like X, trying new restaurants, spontaneous adventures, supporting each other's nerdy pursuits]."
        *   **Reasoning:** More specific about the *qualities* and *shared experiences* sought in a friendship (Values, Social Needs).

**3. New Fields for Deeper Connection & Analytics:**

*   **`communication_quirk`**: "My go-to way to check in with a friend is: (a) A funny meme/GIF, (b) A 'thinking of you' text, (c) A voice note, (d) Suggesting a spontaneous call/meetup."
    *   **Reasoning:** Reveals communication style and effort level in maintaining connections (Social Behavior, Communication Styles).
*   **`support_style_preference`**: "When I'm having a tough time, I most appreciate a friend who: (a) Listens without judgment, (b) Offers practical advice, (c) Distracts me with fun, (d) Gives me space but checks in."
    *   **Reasoning:** Clarifies support needs and expectations, crucial for resilient friendships (Attachment, Empathy, Social Support styles).
*   **`new_experience_openness`**: "Something I've always wanted to try (or learn) but haven't yet is..."
    *   **Reasoning:** Indicates openness to new experiences and potential shared learning (Big Five: Openness, Growth Mindset).
*   **`humor_style`**: "My sense of humor leans towards: (a) Witty & Sarcastic, (b) Goofy & Slapstick, (c) Observational & Dry, (d) Dark & Absurdist, (e) I laugh at everything!"
    *   **Reasoning:** Shared humor is a huge bonding agent (Personality, Social Compatibility).
*   **`platonic_dealbreaker`**: "A friendship 'red flag' for me is..." (e.g., flakiness, negativity, one-sidedness)
    *   **Reasoning:** Helps filter for genuine compatibility and respect (Values, Boundaries).

---

## JOB PROFILE FIELDS (for both Job Seekers & Employers)

**Goal:** Move beyond a dry resume/job description to culture fit, work style, intrinsic motivations, and team dynamics.

**Job Seeker Focused:**

**1. Essentials (Keep & Refine):**

*   **`title_aspirations`**: "My current or desired Title/Role is..." (type: text)
    *   **Reasoning:** Clear.
*   **`industry_focus`**: "Industries I'm passionate about or experienced in:" (type: json_array/tags)
    *   **Reasoning:** Clear.
*   **`core_skills_showcase`**: "My top 3-5 skills I bring to the table are:" (type: json_array/tags)
    *   **Reasoning:** Clear.
*   **`experience_level`**: "Years of relevant experience:" (type: number or dropdown e.g., Entry (0-2), Mid (3-5), Senior (5-10), Lead (10+))
    *   **Reasoning:** Standardized.
*   **`work_preference`**: "I'm looking for: (a) Fully Remote, (b) Hybrid (open to X days in office), (c) Fully In-Office in [City/Region]."
    *   **Reasoning:** Clearer than just "Location/Remote."

**2. Transformed Generic Fields:**

*   **Original `description`**: "Description"
    *   **NEW 1: `value_proposition`**: "Beyond my resume, the unique superpower I bring to a team is..."
        *   **Reasoning:** Encourages differentiation, focus on unique value, not just tasks (Self-Perception, Confidence).
    *   **NEW 2: `problem_solving_passion`**: "The type of problem that gets me excited to jump out of bed and work on is..."
        *   **Reasoning:** Reveals intrinsic motivation and preferred challenges (Motivation Theory, Cognitive Styles).
*   **Original `company`**: "Company" (if currently employed or past)
    *   **NEW (Optional): `past_role_highlight`**: "A project/achievement from a past role I'm particularly proud of, and why:"
        *   **Reasoning:** Shows impact, what they value in their work, and storytelling ability (Achievement Orientation, Values).

**3. New Fields for Deeper Connection & Analytics (Job Seeker):**

*   **`ideal_team_dynamic`**: "I thrive in a team that is: (a) Highly collaborative & communicative, (b) Autonomous with clear individual responsibilities, (c) Fast-paced & experimental, (d) Structured & methodical."
    *   **Reasoning:** Assesses preferred work environment and team culture (Work Styles, Big Five: Conscientiousness, Extraversion).
*   **`learning_growth_priority`**: "When considering a new role, a key factor for my growth is..." (e.g., mentorship, learning new tech, leadership opportunities, cross-functional projects).
    *   **Reasoning:** Highlights ambition and what they seek for development (Growth Mindset, Values: Achievement).
*   **`work_life_philosophy`**: "My ideal work-life integration looks like..." (Open text, or choices like "Clear boundaries between work/life," "Flexible hours to blend commitments," "Work that feels like a passion so it blends naturally.")
    *   **Reasoning:** Addresses work-life balance expectations (Values, Lifestyle).
*   **`feedback_preference`**: "I prefer to receive feedback that is: (a) Direct and immediate, (b) Scheduled and structured, (c) Focused on positives and growth areas, (d) A mix of all."
    *   **Reasoning:** Important for manager-employee fit and team communication (Communication Styles, Receptiveness to Feedback).

---

**Employer Focused:**

**1. Essentials (Keep & Refine):**

*   **`is_employer`**: "I am an employer/recruiter" (type: boolean) - *Keep.*
*   **`company_name`**: "Company Name" (type: text) - *Keep.*
*   **`company_website`**: "Company Website" (type: text) - *Keep.*
*   **`hiring_for_role`**: "We're hiring for (Title/Position):" (type: text) - *Keep.*
*   **`industry`**: "Our Industry:" (type: text) - *Keep.*
*   **`required_skills`**: "Key Skills We Need:" (type: json_array/tags) - *Keep.*
*   **`job_location_type`**: "This role is: (a) Fully Remote, (b) Hybrid in [City], (c) In-Office in [City]." - *Keep.*

**2. Transformed Generic Fields:**

*   **Original `description`**: "Description"
    *   **NEW 1: `company_mission_in_brief`**: "In one sentence: what problem does your company solve for the world?"
        *   **Reasoning:** Forces clarity on mission, attractive to mission-driven candidates (Values, Purpose).
    *   **NEW 2: `team_culture_snapshot`**: "Describe your team culture in 3 words. What's one 'unwritten rule' or cherished tradition?"
        *   **Reasoning:** Gives a genuine peek into the day-to-day culture beyond corporate speak (Culture Fit, Social Norms).

**3. New Fields for Deeper Connection & Analytics (Employer):**

*   **`ideal_candidate_trait`**: "Beyond skills, a candidate who truly shines here often demonstrates [e.g., proactivity, curiosity, empathy, resilience]."
    *   **Reasoning:** Highlights soft skills and cultural values sought (Values, Personality Traits).
*   **`challenge_opportunity`**: "The biggest challenge/opportunity this role will tackle in the first year is..."
    *   **Reasoning:** Sets realistic expectations and attracts problem-solvers (Transparency, Goal Alignment).
*   **`what_success_looks_like`**: "Success in this role after 90 days means achieving/demonstrating..."
    *   **Reasoning:** Provides clarity for candidates on expectations (Goal Setting, Performance Metrics).
*   **`employee_development_approach`**: "We support employee growth through [e.g., mentorship programs, learning stipends, internal mobility, challenging projects]."
    *   **Reasoning:** Shows commitment to development, attracting growth-oriented candidates (Values: Achievement, Development).
*   **`why_work_here_pitch`**: "The #1 reason people love working at our company is..." (Could be based on internal surveys or leader perspective).
    *   **Reasoning:** Compelling value proposition for candidates (Employer Branding, Culture).

---

By implementing these types of questions, FC-Connections will not only be more engaging but will also build an incredibly rich dataset for nuanced matching, personality analytics, and understanding user motivations on a much deeper level. Remember to iterate and test which questions resonate most!