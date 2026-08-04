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
  slug: "hr-operations-executive",
  title: "HR & Operations Executive",
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
    "High-performing interns may receive a Pre-Placement Offer (PPO) for a full-time HR & Operations Executive role.",
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

export const careerRoles = {
  "graphic-designer": designer,
  "video-editor": videoEditor,
  "hr-operations-executive": hrOperationsExecutive,
  "hr-operations-intern": hrOperationsIntern,
};

export function getRoleConfig(slug) {
  return careerRoles[slug];
}
