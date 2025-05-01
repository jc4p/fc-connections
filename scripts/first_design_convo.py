import google.generativeai as genai
import os
import sys

# --- Configuration ---
# Ensure you have the Gemini API key set as an environment variable: GEMINI_API_KEY
GEMINI_MODEL_NAME = "gemini-2.5-pro-preview-03-25"
TIMELINE_DOC_PATH = "docs/DEVELOPMENT_TIMELINE.md"
PAGE_BREAKDOWN_DOC_PATH = "docs/PAGE_BREAKDOWN.md"
MVP_DOC_PATH = "docs/MVP_REQUIREMENTS.md"
PM_STANDUP_DAY_1_PATH = "standups/week_1/1_PM.md" # Added PM Standup Doc
PM_STANDUP_DAY_2_PATH = "standups/week_1/2_PM.md" # Added PM Standup Doc
OUTPUT_FILE_PATH = "docs/DESIGN_REQUIREMENTS.md" # Output file path
# --- End Configuration ---

def read_doc_content(filepath):
    """Safely reads the content of a document file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: Document file not found at {filepath}")
        return None
    except IOError as e:
        print(f"Error reading document file {filepath}: {e}")
        return None

def generate_prompt(timeline_content, breakdown_content, mvp_content, pm_day1_content, pm_day2_content):
    """Creates the prompt for the Gemini API with an enhanced persona and separated asks."""

    prompt = f"""
You are a legendary Chief Design Officer and strategic consultant, a veteran with over 30 years of experience shaping digital experiences across countless industries, from scrappy startups to Fortune 500 giants. You cut your teeth designing interactive digital lookbooks for high-fashion brands back in the 90s when the web was young, you've navigated platform shifts from desktop to mobile to VR, and you've seen design trends come and go (and come back again). You have a sharp eye for usability, a deep understanding of brand storytelling, and a pragmatic approach to integrating design into fast-paced development cycles. Your advice is highly sought after for its clarity, foresight, and actionable nature.

**Project Briefing:**
A development team is building "FC-Connections," a Farcaster mini-app for fostering connections (partner, friend, job). They're using Next.js/Cloudflare Workers and are impressively already functional component building in Week 1 of a 6-week timeline. They have basic brand guidelines and a clear MVP scope. The Product Manager (PM) has been tracking progress.

**Client's Project Goals & Ethos (from {MVP_DOC_PATH}):**
```
{mvp_content}
```

**Client's Development Timeline (from {TIMELINE_DOC_PATH}):**
```
{timeline_content}
```

**Client's Page Structure & Component Plan (from {PAGE_BREAKDOWN_DOC_PATH}):**
```
{breakdown_content}
```

**Recent PM Assessments (from {PM_STANDUP_DAY_1_PATH} & {PM_STANDUP_DAY_2_PATH}):**
```
Day 1 PM Notes:
{pm_day1_content}
---
Day 2 PM Notes:
{pm_day2_content}
```

**Your Task:**
The team needs your seasoned guidance. They're moving fast on the functional side but recognize the need for a dedicated design pass to elevate the app from functional to *desirable*. They need both a strategic approach and immediate next steps.

Please structure your advice into two distinct sections:

**Part 1: Strategic Playbook (The Long Game)**
Drawing upon your vast experience, advise them on the **optimal overall process and key considerations for integrating a high-impact design pass** within their tight 6-week schedule. Address:

1.  **Strategic Timing:** When to inject focused design refinement in a 6-week sprint (distinct phase vs. iterative)? Trade-offs?
2.  **The Process - Your Playbook:** Recommended workflow given functional work exists (Heuristic review? Friction finding? Targeted mocks? Lightweight prototyping? Usability checks?). What *works* under pressure?
3.  **Tangible Design Deliverables:** Essential, high-value design outputs for this timeframe (Refined component specs? Key screen mocks? UX recommendations? Micro-interactions?).
4.  **Bridging Design & Dev:** Effective collaboration tactics when code is being written (Shared tools? Check-ins? Design QA?).
5.  **Ruthless Prioritization:** Where to focus design for maximum MVP impact?

**Part 2: Immediate Actions (Next 24-48 Hours)**
Based on the PM's standup notes and the current situation (end of Week 1, Day 2), provide **specific, actionable tasks for the Product Manager (PM) and Development Team** to execute *immediately* to prepare for an effective design pass. What groundwork needs to be laid *right now*?

*   What **inputs** should the PM prepare for the designers *now*? (e.g., A status deck based on the PM notes showing current page/component readiness? Loom walkthroughs of built features? List of known UX concerns?)
*   Are there any **quick checks or decisions** the team should make in the next day or two before design gets deeply involved?
*   How should the PM **communicate** this upcoming design focus to the development team?

Give them direct, actionable advice for both the overall strategy and the immediate next steps, all from your decades of experience. Be opinionated, be practical.
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

    # Read document contents
    print(f"Reading documents: {TIMELINE_DOC_PATH}, {PAGE_BREAKDOWN_DOC_PATH}, {MVP_DOC_PATH}, {PM_STANDUP_DAY_1_PATH}, {PM_STANDUP_DAY_2_PATH}")
    timeline_content = read_doc_content(TIMELINE_DOC_PATH)
    breakdown_content = read_doc_content(PAGE_BREAKDOWN_DOC_PATH)
    mvp_content = read_doc_content(MVP_DOC_PATH)
    pm_day1_content = read_doc_content(PM_STANDUP_DAY_1_PATH)
    pm_day2_content = read_doc_content(PM_STANDUP_DAY_2_PATH)

    if not all([timeline_content, breakdown_content, mvp_content, pm_day1_content, pm_day2_content]): # Check all docs
        print("Could not read all required documents. Exiting.")
        sys.exit(1)

    # Generate the prompt
    prompt = generate_prompt(timeline_content, breakdown_content, mvp_content, pm_day1_content, pm_day2_content)

    # Call Gemini API
    print(f"\nSending request to Gemini model: {GEMINI_MODEL_NAME}...")
    response_text = None
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        response = model.generate_content(prompt)

        print("\n--- Gemini Response: Design Pass Guidance --- (from the Maestro)")
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