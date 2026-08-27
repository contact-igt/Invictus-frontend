// Static content + question configuration for the public career roles.
// One shared field-id contract lets a single ConversationalApplicationForm, validator,
// screening engine and sheet-row mapper drive both roles without per-role branching.

export const EXPERIENCE_OPTIONS = [
  { value: "under_6_months", label: "Less than 6 months" },
  { value: "6_to_11_months", label: "6–11 months" },
  { value: "1_to_2_years", label: "1–2 years" },
  { value: "2_to_4_years", label: "2–4 years" },
  { value: "over_4_years", label: "More than 4 years" },
];

export const EXPERIENCE_BELOW_ONE_YEAR_VALUES = ["under_6_months", "6_to_11_months"];

function contactScreen() {
  return {
    id: "contact",
    title: "Contact details",
    fields: [
      { id: "fullName", type: "text", label: "Full name", required: true },
      { id: "phone", type: "tel", label: "WhatsApp / mobile number", required: true },
      { id: "email", type: "email", label: "Email", required: true },
    ],
  };
}

function locationScreen() {
  return {
    id: "location",
    title: "Location and availability",
    fields: [
      { id: "city", type: "text", label: "Current city", required: true },
      { id: "noticePeriod", type: "text", label: "Notice period", required: true, placeholder: "e.g. Immediate, 15 days, 1 month" },
    ],
  };
}

function experienceScreen(question) {
  return {
    id: "experience",
    title: "Experience",
    fields: [
      { id: "experience", type: "select", label: question, required: true, options: EXPERIENCE_OPTIONS },
    ],
  };
}

const designer = {
  slug: "graphic-designer",
  title: "Graphic Designer",
  department: "Creative",
  minExperience: "At least 1 year of relevant professional design experience",
  freshersAllowed: "Freshers with strong skills can also apply",
  applicationMaterialLabel: "Portfolio",
  estimatedMinutes: "2–3 minutes",
  summary:
    "Create original, high-quality visual communication for social media, performance campaigns, presentations, brands and digital platforms.",
  positioning: [
    "Canva may support the workflow.",
    "AI may support ideation and production.",
    "Neither replaces design fundamentals.",
    "Canva-only template editing is insufficient.",
    "AI-generated visuals with minor edits are insufficient.",
    "You must understand typography, layout, hierarchy, composition, spacing and colour.",
    "You must be able to build original designs using professional tools.",
    "Portfolio quality and personal contribution matter.",
  ],
  responsibilities: [
    "Social-media creatives.",
    "Performance-ad creatives.",
    "Presentation and document design.",
    "Original compositions.",
    "Cross-format adaptations.",
    "Brand consistency.",
    "Client revisions.",
    "Collaboration with marketing and content teams.",
    "Organised source files.",
    "Responsible AI-assisted workflows.",
  ],
  requirements: [
    "Minimum one year of experience.",
    "Portfolio required.",
    "Adobe Photoshop.",
    "Working Illustrator knowledge.",
    "Typography and layout knowledge.",
    "Social-media design experience.",
    "Ability to explain design decisions.",
    "Ability to receive feedback.",
    "Ability to meet deadlines.",
  ],
  preferred: [
    "Figma.",
    "InDesign.",
    "After Effects basics.",
    "Presentation design.",
    "Branding.",
    "Performance-ad creative experience.",
  ],
  missingMaterialFlag: "PORTFOLIO_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("How many years of professional design experience do you have?"),
    {
      id: "portfolio",
      title: "Portfolio",
      fields: [
        { id: "portfolioOrShowreel", type: "url", label: "Portfolio URL", required: true, placeholder: "https://" },
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools can you use independently?",
          required: true,
          options: [
            { value: "photoshop", label: "Adobe Photoshop" },
            { value: "illustrator", label: "Adobe Illustrator" },
            { value: "indesign", label: "Adobe InDesign" },
            { value: "figma", label: "Figma" },
            { value: "canva", label: "Canva" },
            { value: "after_effects", label: "Adobe After Effects" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Work categories",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which categories of work have you done?",
          required: true,
          options: [
            { value: "social_media", label: "Social-media design" },
            { value: "performance_ads", label: "Performance-ad creatives" },
            { value: "branding", label: "Branding" },
            { value: "presentation", label: "Presentation design" },
            { value: "print", label: "Print collateral" },
            { value: "ui_support", label: "UI-support graphics" },
            { value: "motion_basics", label: "Motion-design basics" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Workflow",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Which statement best describes your usual design workflow?",
          required: true,
          options: [
            { value: "canva_templates_only", label: "I mainly modify existing Canva templates." },
            { value: "canva_from_scratch", label: "I use Canva but usually build layouts from scratch." },
            { value: "photoshop_illustrator_with_canva", label: "I mainly work in Photoshop or Illustrator and use Canva when appropriate." },
            { value: "professional_tools_own_layouts", label: "I choose professional tools based on the project and build most layouts myself." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "AI usage",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "How do you use AI tools in your design workflow?",
          required: true,
          options: [
            { value: "ai_primary", label: "AI creates most of the design and I make small edits." },
            { value: "ai_ideas", label: "I use AI mainly for ideas and asset exploration." },
            { value: "ai_selective", label: "I use AI selectively while creating the final design myself." },
            { value: "ai_rare", label: "I rarely use AI." },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Design judgement",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label:
            "Choose one project from your portfolio. Briefly explain the objective, your personal contribution and why the final design works.",
          required: true,
          minLength: 120,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical assessment",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short, time-bounded fictional design assessment if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
  screeningRules: [
    { fieldId: "workflowAnswer", optionValue: "canva_templates_only", flag: "CANVA_ONLY_WORKFLOW" },
    { fieldId: "workflowAnswer", optionValue: "professional_tools_own_layouts", flag: "PROFESSIONAL_TOOL_SELECTED" },
    { fieldId: "aiUsage", optionValue: "ai_primary", flag: "AI_PRIMARY_WORKFLOW" },
  ],
};

const videoEditor = {
  slug: "video-editor",
  title: "Video Editor",
  department: "Creative",
  minExperience: "At least 1 year of relevant professional video-editing experience",
  freshersAllowed: "Freshers with strong skills can also apply",
  applicationMaterialLabel: "Showreel",
  estimatedMinutes: "2–3 minutes",
  summary:
    "Edit engaging short-form and long-form content for social media, campaigns, interviews, education and brand communication.",
  positioning: [
    "AI and automation may support transcription, captions, cleanup and ideation.",
    "Templates may be used when appropriate.",
    "Final editing judgement must remain with the editor.",
    "You must understand pacing, retention, hooks, narrative, sound and visual rhythm.",
    "Template-only or one-click editing is insufficient.",
    "A professional showreel is required.",
  ],
  responsibilities: [
    "Social-media reels.",
    "Performance-ad videos.",
    "Interviews.",
    "Educational videos.",
    "Strong hooks.",
    "Pacing and retention.",
    "Captions.",
    "Motion graphics.",
    "Music and sound.",
    "Platform exports.",
    "Organised project files.",
    "Client revisions.",
    "Responsible AI-assisted workflows.",
  ],
  requirements: [
    "Showreel required.",
    "Professional editing software.",
    "Pacing and storytelling.",
    "Short-form editing experience.",
    "Caption and sound understanding.",
    "Ability to explain editing decisions.",
    "Deadline discipline.",
    "Feedback handling.",
  ],
  preferred: [
    "Adobe Premiere Pro.",
    "Adobe After Effects.",
    "DaVinci Resolve.",
    "Final Cut Pro.",
    "Adobe Audition.",
    "CapCut as a supporting tool.",
  ],
  missingMaterialFlag: "SHOWREEL_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("How many years of professional video-editing experience do you have?"),
    {
      id: "showreel",
      title: "Showreel",
      fields: [
        { id: "portfolioOrShowreel", type: "url", label: "Showreel URL", required: true, placeholder: "https://" },
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools can you use independently?",
          required: true,
          options: [
            { value: "premiere_pro", label: "Adobe Premiere Pro" },
            { value: "after_effects", label: "Adobe After Effects" },
            { value: "davinci_resolve", label: "DaVinci Resolve" },
            { value: "final_cut_pro", label: "Final Cut Pro" },
            { value: "capcut", label: "CapCut" },
            { value: "audition", label: "Adobe Audition" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Content categories",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which categories of content have you edited?",
          required: true,
          options: [
            { value: "social_reels", label: "Social-media reels" },
            { value: "performance_ads", label: "Performance ads" },
            { value: "interviews", label: "Interviews" },
            { value: "brand_films", label: "Brand films" },
            { value: "youtube", label: "YouTube videos" },
            { value: "educational", label: "Educational content" },
            { value: "motion_graphics", label: "Motion graphics" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Workflow",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Which statement best describes your normal editing workflow?",
          required: true,
          options: [
            { value: "templates_automatic", label: "I mainly use ready-made templates and automatic editing." },
            { value: "templates_customised", label: "I use templates but customise pacing, structure and visual treatment." },
            { value: "manual_with_templates", label: "I mainly edit manually and use templates only when useful." },
            { value: "manual_project_based", label: "I build edits manually and select tools based on the project." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "AI usage",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "How do you use AI-assisted tools in your editing workflow?",
          required: true,
          options: [
            { value: "ai_primary", label: "AI generates most of the final edit." },
            { value: "ai_support_tasks", label: "I use AI for transcription, captions, cleanup or ideation." },
            { value: "ai_selective", label: "I use AI selectively and manually control the final edit." },
            { value: "ai_rare", label: "I rarely use AI." },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Editing judgement",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label: "Choose one video from your showreel. Explain your personal contribution and why the opening works.",
          required: true,
          minLength: 120,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical assessment",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short, time-bounded assessment using fictional or practice footage if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
  screeningRules: [
    { fieldId: "workflowAnswer", optionValue: "templates_automatic", flag: "TEMPLATE_PRIMARY_WORKFLOW" },
    { fieldId: "workflowAnswer", optionValue: "manual_project_based", flag: "PROFESSIONAL_EDITOR_SELECTED" },
    { fieldId: "aiUsage", optionValue: "ai_primary", flag: "AI_PRIMARY_WORKFLOW" },
  ],
};

const hrOperationsExecutive = {
  slug: "hr-operations-associate",
  title: "HR & Operations Associate",
  department: "HR & Operations",
  location: "Chennai (Hybrid)",
  salary: "Prior experience in HR recruitment, onboarding, or administrative coordination.",
  probationPeriod: "1 Month",
  minimumCommitment: "1 Year",
  minExperience: "Chennai (Hybrid) • Probation: 1 Month • Commitment: 1 Year",
  freshersAllowed: "Prior experience in HR recruitment, onboarding, or administrative coordination.",
  applicationMaterialLabel: "Resume or LinkedIn",
  estimatedMinutes: "2–3 minutes",
  summary:
    "Manage recruitment, onboarding, employee documentation, attendance, leave tracking, daily business operations, and client communication.",
  positioning: [
    "Manage recruitment, onboarding, employee documentation, attendance, and leave management.",
    "Coordinate task allocation, workflow, and daily business operations.",
    "Handle client communication, meetings, requirement gathering, and follow-ups.",
    "Prepare MOMs, reports, SOPs, and operational documentation.",
    "Monitor project progress and ensure timely task completion.",
    "Support process improvements and team productivity initiatives.",
  ],
  responsibilities: [
    "Manage recruitment, onboarding, employee documentation, attendance, and leave management.",
    "Coordinate task allocation, workflow, and daily business operations.",
    "Handle client communication, meetings, requirement gathering, and follow-ups.",
    "Prepare MOMs, reports, SOPs, and operational documentation.",
    "Monitor project progress and ensure timely task completion.",
    "Support process improvements and team productivity initiatives.",
  ],
  requirements: [
    "Bachelor's degree in any discipline.",
    "Strong communication and coordination skills.",
    "Good organizational and multitasking abilities.",
    "Proficiency in Google Workspace/MS Office.",
    "Ability to work independently and collaboratively in a hybrid work environment.",
    "Probation Period: 1 Month | Minimum Commitment: 1 Year.",
  ],
  preferred: [
    "Client communication, requirement gathering, and meeting follow-up skills.",
    "Demonstrated ability to prepare MOMs, SOPs, and operational reports.",
    "Fluency in Google Workspace (Docs, Sheets, Slides) and MS Office.",
  ],
  missingMaterialFlag: "RESUME_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("How many years of relevant HR or operations experience do you have?"),
    {
      id: "resume",
      title: "Resume & Profile",
      fields: [
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL", required: true, placeholder: "https://" },
        { id: "portfolioOrShowreel", type: "url", label: "Portfolio / Work Samples (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Software",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools are you proficient in?",
          required: true,
          options: [
            { value: "google_workspace", label: "Google Workspace (Docs/Sheets/Slides)" },
            { value: "ms_office", label: "MS Office (Word/Excel/PowerPoint)" },
            { value: "hr_software", label: "HRIS / Recruitment Portals" },
            { value: "notion_trello", label: "Notion / Trello / Task Trackers" },
            { value: "slack_teams", label: "Slack / Teams" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Key Functional Areas",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which operational areas have you handled?",
          required: true,
          options: [
            { value: "recruitment_onboarding", label: "Recruitment & Onboarding" },
            { value: "employee_docs_leave", label: "Employee Documentation & Leave Management" },
            { value: "workflow_task_allocation", label: "Workflow & Task Allocation" },
            { value: "client_communication_moms", label: "Client Communication & MOMs" },
            { value: "sops_operational_reports", label: "SOPs & Operational Reports" },
            { value: "project_progress_monitoring", label: "Project Progress Monitoring" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Work Mode & Commitment",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Are you comfortable working in Chennai (Hybrid) with a 1-year minimum commitment?",
          required: true,
          options: [
            { value: "chennai_hybrid_1year_ready", label: "Yes, fully comfortable with Chennai Hybrid & 1-year commitment." },
            { value: "chennai_hybrid_flexible", label: "Comfortable with Chennai Hybrid, open to discussing commitment." },
            { value: "remote_preferred", label: "Prefer fully remote work." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "AI & Productivity Tools",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "How do you leverage AI tools (ChatGPT/Gemini/Claude) in HR & operations?",
          required: true,
          options: [
            { value: "ai_documentation_drafting", label: "Drafting emails, SOPs, MOMs, and operational content." },
            { value: "ai_process_research", label: "Researching best practices and process improvements." },
            { value: "ai_selective", label: "Using AI selectively when helpful." },
            { value: "ai_rare", label: "Rarely use AI tools." },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Operations & HR Scenario",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label: "Describe a situation where you managed multiple tasks or client follow-ups under tight deadlines. How did you ensure accuracy and timeliness?",
          required: true,
          minLength: 120,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical Assessment",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short HR & operations scenario assessment if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
};

const hrOperationsIntern = {
  slug: "hr-operations-intern",
  title: "HR & Operations Intern",
  department: "HR & Operations",
  location: "Chennai (Hybrid)",
  duration: "3 Months (Month 1: Unpaid Training | Months 2 & 3: Performance Stipend)",
  minExperience: "Chennai (Hybrid) • Duration: 3 Months • PPO Available",
  freshersAllowed: "Freshers & Final-Year Students Can Apply",
  applicationMaterialLabel: "Resume or LinkedIn",
  estimatedMinutes: "2–3 minutes",
  summary:
    "Assist in recruitment, interview scheduling, candidate follow-ups, onboarding, documentation, client meeting MOMs, and operational trackers.",
  positioning: [
    "Duration: 3 Months (Month 1: Unpaid Training & Evaluation | Months 2 & 3: Performance-based stipend).",
    "High-performing interns may receive a Pre-Placement Offer (PPO) for a full-time position",
    "Minimum Commitment: 6–12 months (including internship and full-time employment if selected through PPO).",
    "Assist in recruitment, interview scheduling, and candidate follow-ups.",
    "Attend client meetings, prepare MOMs, and follow up on action items.",
  ],
  responsibilities: [
    "Assist in recruitment, interview scheduling, and candidate follow-ups.",
    "Support onboarding, documentation, attendance, and leave tracking.",
    "Coordinate with internal teams and monitor task progress.",
    "Attend client meetings, prepare MOMs, and follow up on action items.",
    "Maintain reports, trackers, and operational documentation.",
    "Support day-to-day HR and operational activities.",
  ],
  requirements: [
    "Bachelor's degree or final-year student (any discipline).",
    "Good communication and organizational skills.",
    "Basic knowledge of Google Workspace/MS Office.",
    "Eagerness to learn HR, operations, and client management.",
    "Minimum Commitment: 6–12 months (including internship & full-time employment via PPO).",
    "Structure: Month 1 Unpaid Training & Evaluation; Months 2 & 3 Performance-based Stipend.",
  ],
  preferred: [
    "Strong verbal and written English communication skills.",
    "Good note-taking ability for MOMs and client meetings.",
    "Familiarity with Google Sheets, Docs, and MS Office.",
    "Enthusiasm for learning HR, recruitment, and project coordination.",
  ],
  missingMaterialFlag: "RESUME_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("What is your current education or experience status?"),
    {
      id: "resume",
      title: "Resume & Profile",
      fields: [
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL", required: true, placeholder: "https://" },
        { id: "portfolioOrShowreel", type: "url", label: "Portfolio / Work Samples (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools Familiarity",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools are you familiar with?",
          required: true,
          options: [
            { value: "google_workspace", label: "Google Workspace (Docs/Sheets/Slides)" },
            { value: "ms_office", label: "MS Office (Word/Excel/PowerPoint)" },
            { value: "canva", label: "Canva / Basic Design" },
            { value: "slack_whatsapp", label: "Slack / WhatsApp Business" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Learning Interests",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which areas are you most excited to assist with and learn?",
          required: true,
          options: [
            { value: "recruitment_scheduling", label: "Recruitment & Interview Scheduling" },
            { value: "onboarding_docs", label: "Onboarding & Employee Documentation" },
            { value: "client_meetings_moms", label: "Client Meetings & MOM Preparation" },
            { value: "task_tracking_operations", label: "Task Tracking & Operations Coordination" },
            { value: "reports_trackers", label: "Reports & Trackers Maintenance" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Internship Structure & Commitment",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Are you comfortable with the 3-month internship structure (Month 1 evaluation, Months 2-3 stipend), Chennai Hybrid mode & PPO pathway?",
          required: true,
          options: [
            { value: "internship_ready_ppo", label: "Yes, ready for 3-month internship & PPO pathway in Chennai (Hybrid)." },
            { value: "internship_only", label: "Interested in 3-month internship only." },
            { value: "remote_only", label: "Seeking fully remote internship only." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "AI Awareness",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "How do you use AI tools (ChatGPT/Gemini) to improve learning and productivity?",
          required: true,
          options: [
            { value: "ai_learning_writing", label: "Drafting notes, learning new concepts, and organizing information." },
            { value: "ai_selective", label: "Using AI selectively when helpful." },
            { value: "ai_rare", label: "Rarely use AI tools." },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Motivation & Goals",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label: "Why are you interested in this HR & Operations internship at Invictus, and what skills or experience do you hope to build?",
          required: true,
          minLength: 120,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical Assessment",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short screening task if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
};

const telecallingExecutive = {
  slug: "telecalling-executive",
  title: "Telecalling Executive",
  department: "Healthcare & Telecalling",
  location: "Chennai (Work From Home)",
  salary: "",
  employmentType: "Full-time",
  minExperience: "Chennai (Work From Home) • Full-time",
  freshersAllowed: "Freshers with good communication skills can also apply",
  applicationMaterialLabel: "Resume or LinkedIn",
  estimatedMinutes: "2–3 minutes",
  summary:
    "We are looking for a Telecalling Executive to handle and follow up with leads generated through digital marketing campaigns for a reputed healthcare client. The role involves patient communication, lead management, follow-ups, and coordination with the marketing team.",
  positioning: [
    "Work Mode: Work From Home (Full-time).",
    "Location Focus: Healthcare client base in Chennai.",
    "Call and communicate with leads generated through marketing campaigns.",
    "Understand patient requirements and provide relevant information.",
    "Update lead details, call status, and follow-ups in CRM, Google Sheets, or MS Excel.",
    "Maintain high professional empathy and patient coordination standards.",
  ],
  responsibilities: [
    "Call and communicate with leads generated through marketing campaigns.",
    "Understand patient requirements and provide relevant information.",
    "Follow up with interested and pending leads regularly.",
    "Update lead details, call status, and follow-ups in CRM, Google Sheets, or MS Excel.",
    "Maintain accurate records of all calls and lead interactions.",
    "Share daily lead and follow-up updates with the concerned team.",
    "Coordinate with the marketing team regarding lead quality and conversion.",
    "Escalate relevant patient queries to the appropriate hospital team when required.",
  ],
  requirements: [
    "Good verbal communication and interpersonal skills.",
    "Basic knowledge of Google Sheets / MS Excel / CRM.",
    "Good follow-up and coordination skills.",
    "Basic healthcare/medical knowledge is preferred.",
    "Familiarity with women and child care services is an added advantage.",
    "Previous experience in healthcare telecalling, patient coordination, or customer support is preferred.",
    "Freshers with good communication skills can also apply.",
  ],
  preferred: [
    "Communication",
    "Patient Coordination",
    "Lead Follow-up",
    "CRM Management",
    "Google Sheets",
    "MS Excel",
    "Healthcare",
  ],
  missingMaterialFlag: "RESUME_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("How many years of relevant telecalling, patient coordination, or customer support experience do you have?"),
    {
      id: "resume",
      title: "Resume & Profile",
      fields: [
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL", required: true, placeholder: "https://" },
        { id: "portfolioOrShowreel", type: "url", label: "Portfolio / Work Samples (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Software",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools and software are you proficient in?",
          required: true,
          options: [
            { value: "google_sheets", label: "Google Sheets" },
            { value: "ms_excel", label: "MS Excel" },
            { value: "crm_management", label: "CRM Management Systems" },
            { value: "telephony_whatsapp", label: "Cloud Telephony / WhatsApp Business" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Core Competencies",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which key areas align with your experience?",
          required: true,
          options: [
            { value: "healthcare_telecalling", label: "Healthcare / Medical Telecalling" },
            { value: "patient_coordination", label: "Patient Coordination" },
            { value: "lead_followup", label: "Lead Follow-up & Nurturing" },
            { value: "women_child_care", label: "Women & Child Care Services Knowledge" },
            { value: "customer_support", label: "Customer Support & Lead Management" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Work Mode & Schedule",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Are you comfortable with Work From Home (Full-time, ₹10k–15k/month) handling healthcare leads?",
          required: true,
          options: [
            { value: "wfh_fulltime_ready", label: "Yes, fully comfortable with Work From Home (Full-time)." },
            { value: "wfh_flexible", label: "Comfortable with WFH, open to discussing schedule." },
            { value: "office_preferred", label: "Prefer in-office role." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "Language Fluency",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "Which languages can you communicate in fluently with patient leads?",
          required: true,
          options: [
            { value: "tamil_english", label: "Tamil & English" },
            { value: "tamil_english_hindi", label: "Tamil, English & Hindi" },
            { value: "english_only", label: "English" },
            { value: "other_regional", label: "Other Regional Languages" },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Patient Lead Coordination Scenario",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label: "Describe how you would handle a hesitant patient lead who inquired about healthcare services. How do you follow up respectfully while maintaining accurate CRM notes?",
          required: true,
          minLength: 100,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical Evaluation",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short telecalling scenario assessment if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
};

const socialMediaManager = {
  slug: "social-media-manager",
  title: "Social Media Manager",
  department: "Marketing & Content",
  location: "Chennai / Hybrid",
  salary: "",
  employmentType: "Full-time",
  minExperience: "Chennai / Hybrid • Full-time • 1–2 years",
  freshersAllowed: "",
  applicationMaterialLabel: "Resume or LinkedIn",
  estimatedMinutes: "2–3 minutes",
  summary:
    "Develop engaging content, identify digital trends, and build strong brand stories across social media platforms. Transform ideas, trends, and research into impactful social media content, with healthcare-related content experience an added advantage.",
  positioning: [
    "Location: Chennai / Hybrid. Employment Type: Full-Time. Experience: 1–2 Years.",
    "Develop and execute social media content strategies aligned with brand objectives.",
    "Plan and maintain monthly and weekly social media content calendars.",
    "Develop creative concepts and scripts for Reels, short-form videos, and social campaigns.",
    "Coordinate with graphic designers, video editors, marketers, and other creative team members.",
    "Ensure consistent brand tone, messaging, and communication across all platforms.",
    "We're looking for someone who doesn't just follow trends but understands why content works.",
  ],
  responsibilities: [
    "Develop and execute social media content strategies aligned with brand objectives.",
    "Create engaging content for Instagram, LinkedIn, Facebook, and other relevant platforms.",
    "Plan and maintain monthly and weekly social media content calendars.",
    "Research industry topics, audience interests, competitors, and emerging digital trends.",
    "Write compelling captions, social media copy, campaign content, and brand stories.",
    "Develop creative concepts and scripts for Reels, short-form videos, and social campaigns.",
    "Coordinate with graphic designers, video editors, marketers, and other creative team members.",
    "Identify trending formats, topics, audio, hashtags, and content opportunities.",
    "Create content that educates, engages, and encourages audience interaction.",
    "Monitor social media performance and identify opportunities to improve engagement and reach.",
    "Ensure consistent brand tone, messaging, and communication across all platforms.",
    "Support promotional campaigns, product/service launches, and brand-building initiatives.",
    "Stay updated with changes in social media algorithms, content formats, and platform best practices.",
  ],
  requirements: [
    "1–2 years of experience in social media management, content creation, digital marketing, or a related role.",
    "Strong content writing, copywriting, and storytelling skills.",
    "Experience creating Reels, captions, campaigns, and social media concepts.",
    "Strong understanding of Instagram trends and digital marketing.",
    "Ability to research topics and convert complex information into simple, engaging content.",
    "Good understanding of audience behaviour and social media engagement.",
    "Ability to generate creative content ideas independently.",
    "Strong communication, organization, and time-management skills.",
    "Ability to manage multiple content requirements and deadlines.",
    "Basic understanding of social media analytics and performance metrics.",
    "Ability to collaborate effectively with design, video, marketing, and business teams.",
  ],
  preferred: [
    "Experience creating healthcare, medical, hospital, clinic, wellness, or health-tech content.",
    "Understanding of healthcare communication and the ability to create informative yet audience-friendly content.",
    "Familiarity with tools such as Canva, Meta Business Suite, Instagram Insights, or similar social media tools.",
    "Basic knowledge of SEO, hashtags, keyword research, and content optimization.",
    "Awareness of current AI-assisted content and research tools is an advantage.",
  ],
  missingMaterialFlag: "RESUME_MISSING",
  screens: [
    contactScreen(),
    locationScreen(),
    experienceScreen("How many years of social media management, content creation, or digital marketing experience do you have?"),
    {
      id: "resume",
      title: "Resume & Portfolio",
      fields: [
        { id: "resumeOrLinkedin", type: "url", label: "Resume or LinkedIn URL", required: true, placeholder: "https://" },
        { id: "portfolioOrShowreel", type: "url", label: "Work samples / portfolio URL (optional)", required: false, placeholder: "https://" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Software",
      fields: [
        {
          id: "tools",
          type: "multiselect",
          label: "Which tools are you proficient in?",
          required: true,
          options: [
            { value: "canva", label: "Canva" },
            { value: "meta_business_suite", label: "Meta Business Suite" },
            { value: "instagram_insights", label: "Instagram Insights" },
            { value: "scheduling_tools", label: "Scheduling tools (Buffer / Later / Hootsuite)" },
            { value: "ai_content_tools", label: "AI content / research tools" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "categories",
      title: "Content Experience",
      fields: [
        {
          id: "categories",
          type: "multiselect",
          label: "Which types of content have you created?",
          required: true,
          options: [
            { value: "reels_shortform", label: "Reels & short-form video concepts/scripts" },
            { value: "captions_copy", label: "Captions & social media copy" },
            { value: "content_calendars", label: "Content calendars & planning" },
            { value: "campaigns", label: "Campaigns & launches" },
            { value: "brand_storytelling", label: "Brand storytelling" },
            { value: "healthcare_content", label: "Healthcare / wellness / health-tech content" },
            { value: "other", label: "Other" },
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "Work Mode & Commitment",
      fields: [
        {
          id: "workflowAnswer",
          type: "select",
          label: "Are you comfortable with a full-time role based in Chennai (Hybrid)?",
          required: true,
          options: [
            { value: "chennai_hybrid_ready", label: "Yes, fully comfortable with Chennai (Hybrid), full-time." },
            { value: "chennai_hybrid_flexible", label: "Comfortable with Chennai (Hybrid), open to discussing details." },
            { value: "remote_preferred", label: "Prefer fully remote work." },
          ],
        },
      ],
    },
    {
      id: "ai_usage",
      title: "AI & Research Tools",
      fields: [
        {
          id: "aiUsage",
          type: "select",
          label: "How do you use AI-assisted content and research tools in your workflow?",
          required: true,
          options: [
            { value: "ai_ideation_research", label: "For ideation, research, and turning topics into content angles." },
            { value: "ai_drafting", label: "For drafting captions, scripts, and copy that I refine myself." },
            { value: "ai_selective", label: "Selectively, keeping creative direction my own." },
            { value: "ai_rare", label: "Rarely use AI tools." },
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Content Judgement",
      fields: [
        {
          id: "judgementAnswer",
          type: "textarea",
          label:
            "Pick one piece of social media content you created that performed well. Explain the idea, your role in making it, and why it connected with the audience.",
          required: true,
          minLength: 120,
          maxLength: 700,
        },
      ],
    },
    {
      id: "practical",
      title: "Practical Assessment",
      fields: [
        {
          id: "practicalAssessment",
          type: "select",
          label: "Are you willing to complete a short content / Reel concept assessment if shortlisted?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],
};

export const careerRoles = {
  "graphic-designer": designer,
  "video-editor": videoEditor,
  "hr-operations-executive": hrOperationsExecutive,
  "hr-operations-intern": hrOperationsIntern,
  "social-media-manager": socialMediaManager,
  // "telecalling-executive": telecallingExecutive,
};

export function getRoleConfig(slug) {
  return careerRoles[slug];
}
