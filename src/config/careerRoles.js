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

export const careerRoles = {
  "graphic-designer": designer,
  "video-editor": videoEditor,
};

export function getRoleConfig(slug) {
  return careerRoles[slug];
}
