import { getRoleConfig } from "@/config/careerRoles";
import { parseApplicationPayload } from "@/lib/careersValidation";
import { computeScreeningFlags } from "@/lib/careersScreening";
import { buildSheetRow } from "@/lib/careersSheetRow";
import { sendToCareersSheet } from "@/lib/careersWebhook";
import {
  HONEYPOT_FIELD_NAME,
  isHoneypotTripped,
  hasMinimumDuration,
  createWindowRateLimiter,
  createDuplicateGuard,
} from "@/lib/careersSpamGuards";

const rateLimiter = createWindowRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });
const duplicateGuard = createDuplicateGuard({ ttlMs: 30 * 60 * 1000 });

const GENERIC_FAILURE = "We couldn't submit your application. Please try again.";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ success: false, error: "Invalid request body." });
  }

  const role = getRoleConfig(typeof body.role === "string" ? body.role : "");
  if (!role) {
    return res.status(400).json({ success: false, error: "Unknown role." });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "unknown";

  if (!rateLimiter.check(ip)) {
    return res.status(429).json({ success: false, error: GENERIC_FAILURE });
  }

  if (isHoneypotTripped(body[HONEYPOT_FIELD_NAME])) {
    return res.status(400).json({ success: false, error: GENERIC_FAILURE });
  }

  if (!hasMinimumDuration(body.elapsedMs)) {
    return res.status(400).json({ success: false, error: GENERIC_FAILURE });
  }

  const clientSubmissionId = typeof body.clientSubmissionId === "string" ? body.clientSubmissionId : "";
  if (!clientSubmissionId || !duplicateGuard.checkAndMark(clientSubmissionId)) {
    return res.status(409).json({ success: false, error: GENERIC_FAILURE });
  }

  const parsed = parseApplicationPayload(role, body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error });
  }

  const screeningFlags = computeScreeningFlags(role, parsed.data.formData);
  const applicationReference = (
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 10)
  )
    .slice(0, 8)
    .toUpperCase();
  const submittedAt = new Date().toISOString();

  const row = buildSheetRow(role, parsed.data.formData, {
    submittedAt,
    applicationReference,
    screeningFlags,
    utm: parsed.data.utm,
    landingPage: parsed.data.landingPage,
  });

  const webhookResult = await sendToCareersSheet(row);
  if (!webhookResult.ok) {
    console.error("Careers sheet webhook failed:", webhookResult.error);
    return res.status(502).json({
      success: false,
      error: "We couldn't submit your application right now. Please try again.",
    });
  }

  return res.status(200).json({ success: true, applicationRef: applicationReference });
}
