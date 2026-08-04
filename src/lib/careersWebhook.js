// Forwards one structured application row to the Google Sheet via Apps Script webhook.
// Never throws — caller checks `ok` property.
export async function sendToCareersSheet(row) {
  const url = process.env.CAREERS_SHEETS_WEBHOOK_URL;
  const secret = process.env.CAREERS_SHEETS_WEBHOOK_SECRET;

  if (!url || !secret) {
    return { ok: false, error: "Careers Sheets webhook is not configured." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, row }),
    });

    if (!response.ok) {
      return { ok: false, error: `Sheet webhook responded with status ${response.status}.` };
    }

    const payload = await response.json().catch(() => null);
    if (!payload || payload.success !== true) {
      return { ok: false, error: "Sheet webhook did not confirm the write." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to reach the Sheet webhook." };
  }
}
