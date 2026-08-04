// Lightweight spam protection for the public careers apply endpoint.

export const HONEYPOT_FIELD_NAME = "company_website";
export const MIN_SUBMIT_MS = 4000;

export function isHoneypotTripped(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function hasMinimumDuration(elapsedMs, minMs = MIN_SUBMIT_MS) {
  return typeof elapsedMs === "number" && Number.isFinite(elapsedMs) && elapsedMs >= minMs;
}

export function createWindowRateLimiter({ windowMs, max }) {
  const hits = new Map();

  return {
    check(key) {
      const now = Date.now();
      const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
      recent.push(now);
      hits.set(key, recent);
      return recent.length <= max;
    },
  };
}

export function createDuplicateGuard({ ttlMs }) {
  const seen = new Map();

  return {
    checkAndMark(key) {
      const now = Date.now();
      for (const [existingKey, seenAt] of seen) {
        if (now - seenAt > ttlMs) seen.delete(existingKey);
      }
      if (seen.has(key)) return false;
      seen.set(key, now);
      return true;
    },
  };
}
