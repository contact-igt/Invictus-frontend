import { EXPERIENCE_BELOW_ONE_YEAR_VALUES } from "../config/careerRoles.js";

// Generates HR-facing flags for the Google Sheet. Flags never block a submission or
// reject a candidate — they only help HR filter.
export function computeScreeningFlags(role, data) {
  const flags = [];

  if (data.experience && EXPERIENCE_BELOW_ONE_YEAR_VALUES.includes(data.experience)) {
    flags.push("EXPERIENCE_BELOW_1_YEAR");
  }

  if (!data.portfolioOrShowreel || !data.portfolioOrShowreel.trim()) {
    if (role.missingMaterialFlag) {
      flags.push(role.missingMaterialFlag);
    }
  }

  if (role.screeningRules) {
    for (const rule of role.screeningRules) {
      const value = rule.fieldId === "workflowAnswer" ? data.workflowAnswer : data.aiUsage;
      if (value === rule.optionValue) {
        flags.push(rule.flag);
      }
    }
  }

  if (data.practicalAssessment === "no") {
    flags.push("PRACTICAL_TEST_DECLINED");
  }

  return flags;
}
