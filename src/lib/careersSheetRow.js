// Canonical Google Sheet column order — must stay in sync with the header row
// written by Apps Script webhook.
export const SHEET_COLUMNS = [
  "submitted_at",
  "application_reference",
  "role",
  "applied_for",
  "full_name",
  "phone",
  "email",
  "current_city",
  "notice_period",
  "experience",
  "portfolio_or_showreel",
  "resume_or_linkedin",
  "tools",
  "work_categories",
  "workflow_answer",
  "ai_usage",
  "judgement_answer",
  "practical_assessment",
  "screening_flags",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "landing_page",
  "status",
];

function fieldById(role, id) {
  return role.screens.flatMap((s) => s.fields).find((f) => f.id === id);
}

function labelForValue(role, fieldId, value) {
  const field = fieldById(role, fieldId);
  const option = field?.options?.find((o) => o.value === value);
  return option ? option.label : value;
}

function labelsForValues(role, fieldId, values) {
  return values.map((v) => labelForValue(role, fieldId, v)).join("; ");
}

export function buildSheetRow(role, data, meta) {
  const tools = Array.isArray(data.tools) ? data.tools : [];
  const categories = Array.isArray(data.categories) ? data.categories : [];

  return {
    submitted_at: meta.submittedAt,
    application_reference: meta.applicationReference,
    role: role.title,
    applied_for: role.title || meta.appliedFor || "General Application",
    appliedFor: role.title || meta.appliedFor || "General Application",
    full_name: String(data.fullName ?? ""),
    phone: String(data.phone ?? ""),
    email: String(data.email ?? ""),
    current_city: String(data.city ?? ""),
    notice_period: String(data.noticePeriod ?? ""),
    experience: labelForValue(role, "experience", String(data.experience ?? "")),
    portfolio_or_showreel: String(data.portfolioOrShowreel ?? ""),
    resume_or_linkedin: String(data.resumeOrLinkedin ?? ""),
    tools: labelsForValues(role, "tools", tools),
    work_categories: labelsForValues(role, "categories", categories),
    workflow_answer: labelForValue(role, "workflowAnswer", String(data.workflowAnswer ?? "")),
    ai_usage: labelForValue(role, "aiUsage", String(data.aiUsage ?? "")),
    judgement_answer: String(data.judgementAnswer ?? ""),
    practical_assessment: labelForValue(role, "practicalAssessment", String(data.practicalAssessment ?? "")),
    screening_flags: (meta.screeningFlags || []).join("; "),
    utm_source: meta.utm?.source || "",
    utm_medium: meta.utm?.medium || "",
    utm_campaign: meta.utm?.campaign || "",
    utm_content: meta.utm?.content || "",
    landing_page: meta.landingPage || "",
    status: "New",
  };
}
