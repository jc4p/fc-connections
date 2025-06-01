import google.generativeai as genai
import os
import sys
import sqlite3

# --- Configuration ---
# Ensure you have the Gemini API key set as an environment variable: GEMINI_API_KEY
GEMINI_MODEL_NAME = "gemini-2.5-pro-preview-05-06"
SCHEMA_SQL_PATH = "api/schema.sql"
OUTPUT_FILE_PATH = "docs/FIELD_DEFINITIONS_AUDIT.md"
# --- End Configuration ---

def read_schema_content(filepath):
    """Safely reads the content of the schema SQL file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: Schema file not found at {filepath}")
        return None
    except IOError as e:
        print(f"Error reading schema file {filepath}: {e}")
        return None

def extract_field_definitions(schema_content):
    """Extracts the current field definitions from the schema content."""
    # Extract the INSERT statements for profile_field_definitions
    field_definitions = {
        'partner': [],
        'friend': [],
        'job': []
    }
    
    lines = schema_content.split('\n')
    current_profile_type = None
    in_insert_block = False
    
    for line in lines:
        line = line.strip()
        
        # Look for INSERT statements for profile_field_definitions
        if 'INSERT INTO profile_field_definitions' in line:
            in_insert_block = True
            continue
            
        # Look for profile type comments
        if '-- Partner Profile Fields' in line:
            current_profile_type = 'partner'
        elif '-- Friend Profile Fields' in line:
            current_profile_type = 'friend'
        elif '-- Job Profile Fields' in line:
            current_profile_type = 'job'
            
        # Extract field definitions from VALUES statements
        if in_insert_block and line.startswith("('"):
            # Parse the VALUES line: ('partner', 'seeking', 'Looking For', 'text', 1, 1),
            try:
                # Remove parentheses and split by commas, handling quoted strings
                parts = []
                current_part = ""
                in_quotes = False
                for char in line[1:-2]:  # Remove outer parentheses and comma
                    if char == "'" and not in_quotes:
                        in_quotes = True
                    elif char == "'" and in_quotes:
                        in_quotes = False
                    elif char == ',' and not in_quotes:
                        parts.append(current_part.strip().strip("'"))
                        current_part = ""
                        continue
                    current_part += char
                parts.append(current_part.strip().strip("'"))
                
                if len(parts) >= 4:
                    profile_type = parts[0]
                    field_key = parts[1]
                    field_label = parts[2]
                    field_type = parts[3]
                    
                    field_definitions[profile_type].append({
                        'field_key': field_key,
                        'field_label': field_label,
                        'field_type': field_type
                    })
            except:
                # Skip malformed lines
                continue
                
        # Check if we're done with the current INSERT block
        if in_insert_block and line == '' and current_profile_type:
            in_insert_block = False
    
    return field_definitions

def generate_prompt(field_definitions):
    """Creates the prompt for the Gemini API to suggest better field questions."""
    
    
    # Format current fields for the prompt
    current_fields_text = ""
    for profile_type, fields in field_definitions.items():
        current_fields_text += f"\n**{profile_type.upper()} PROFILE FIELDS:**\n"
        for field in fields:
            current_fields_text += f"- {field['field_key']}: \"{field['field_label']}\" (type: {field['field_type']})\n"
    
    prompt = f"""
You are an expert UX researcher, behavioral psychologist, and dating/social app consultant with deep experience in creating highly addictive, engaging profile questions that drive user retention and reveal deep personality insights. You understand that the best apps combine psychological hooks with meaningful data collection to create sticky experiences while building rich user profiles for future analytics and matching algorithms.

**Context:**
I'm building "FC-Connections," a Farcaster mini-app for fostering authentic connections across three types: romantic partners, friendships, and professional networking. We want to create an addictive experience that makes users feel comfortable sharing increasingly personal information while building a rich dataset for future personality analytics and algorithmic matching.

**Current Field Definitions:**
Here are the current profile fields we have defined:
{current_fields_text}

**Your Task:**
I want you to analyze these current field definitions and suggest MUCH BETTER, more engaging questions that will:

1. **Maximize Stickiness**: Create questions that are genuinely fun and interesting to answer, making users want to spend more time on the app and come back to update/refine their answers
2. **Encourage Sharing**: Make people feel psychologically safe and excited to share personal information by framing questions in ways that feel like self-discovery rather than interrogation
3. **Build Addiction**: Use psychological principles (curiosity gaps, personalization, social validation) to make the profile creation process genuinely enjoyable and something users want to revisit
4. **Enable Future Analytics**: Design questions that will let us map users to personality spectrums, behavioral patterns, and psychological frameworks (Big Five, attachment styles, values hierarchies, etc.) for sophisticated matching and insights
5. **Create Connection**: Questions that give people real conversation starters and compatibility insights
6. **Show Authentic Personality**: Help people express their unique character in ways that feel genuine, not performative

**Examples of the depth and stickiness I'm looking for:**
- Instead of "What are your interests?" → "What's something you do that makes you completely lose track of time?"
- Instead of "Tell us about yourself" → "What's a weird hill you're willing to die on?"
- Instead of "What do you do for fun?" → "If you had to teach a masterclass on something non-work related, what would it be?"
- Instead of "Relationship goals" → "How do you know when you really trust someone?"

**For each profile type, please:**

1. **Keep essential fields** that are genuinely necessary (like age, location for partner profiles)
2. **Transform generic fields** into psychologically engaging, personality-revealing questions
3. **Suggest NEW fields** that would create better connections, encourage oversharing, and map to personality frameworks
4. **Explain your reasoning** including psychological principles used and what personality dimensions each question reveals
5. **Consider gamification** elements that could make answering questions feel like a game or self-discovery tool

**Guidelines:**
- Questions should feel like fun personality quizzes that people want to share and compare
- Design questions that can be used to map to psychological frameworks and analysis (Big Five, attachment styles, values hierarchies, etc.)
- Include questions that reveal values, decision-making patterns, social behaviors, and emotional responses
- Make answering feel like getting to know yourself better, not just filling out a form
- Consider questions that people will want to come back and update as they evolve
- Think about what data points would be valuable for machine learning and personality clustering
- Questions should be appropriate for the profile type but push boundaries of traditional "safe" questions

Please provide your recommendations in a structured format with clear reasoning for each suggested change, including what personality dimensions or behavioral patterns each question is designed to reveal.
"""
    return prompt

def save_output(content, filepath):
    """Saves the provided content to the specified filepath."""
    try:
        # Ensure the directory exists
        output_dir = os.path.dirname(filepath)
        if output_dir:
            os.makedirs(output_dir, exist_ok=True)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\nOutput successfully saved to: {filepath}")
    except IOError as e:
        print(f"\nError saving output to {filepath}: {e}")
    except Exception as e:
        print(f"\nAn unexpected error occurred while saving output: {e}")

def main():
    # Configure Gemini API
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        print("Please set the GEMINI_API_KEY environment variable to your API key.")
        sys.exit(1)
    try:
        genai.configure(api_key=api_key)
    except Exception as e:
        print(f"Error configuring Gemini API: {e}")
        sys.exit(1)

    # Read schema content
    print(f"Reading schema file: {SCHEMA_SQL_PATH}")
    schema_content = read_schema_content(SCHEMA_SQL_PATH)
    
    if not schema_content:
        print("Could not read schema file. Exiting.")
        sys.exit(1)

    # Extract field definitions
    print("Extracting current field definitions...")
    field_definitions = extract_field_definitions(schema_content)
    
    print("Current field definitions found:")
    for profile_type, fields in field_definitions.items():
        print(f"  {profile_type}: {len(fields)} fields")

    # Generate the prompt
    prompt = generate_prompt(field_definitions)

    # Call Gemini API
    print(f"\nSending request to Gemini model: {GEMINI_MODEL_NAME}...")
    response_text = None
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        response = model.generate_content(prompt)

        print("\n--- Gemini Response: Field Definitions Audit ---")
        # Extract response text
        if hasattr(response, 'text'):
             response_text = response.text
             print(response_text)
        elif hasattr(response, 'parts'):
             response_text = "".join(part.text for part in response.parts if hasattr(part, 'text'))
             print(response_text)
        else:
             print("Received response object does not contain expected text.")
             print(f"Full Response Object: {response}")

        print("--- End of Response ---")

        # Save the response if text was extracted
        if response_text:
            save_output(response_text, OUTPUT_FILE_PATH)
        else:
            print("\nSkipping save because no valid response text was extracted.")

    except Exception as e:
        print(f"\nAn error occurred while calling the Gemini API: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()