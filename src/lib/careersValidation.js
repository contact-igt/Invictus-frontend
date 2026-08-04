import { z } from "zod";

export function normalizeUrl(input) {
  if (typeof input !== "string") return "";
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function optionValues(field) {
  const values = (field.options || []).map((o) => o.value);
  if (values.length === 0) return ["__no_options__"];
  return values;
}

function fieldValidator(field) {
  switch (field.type) {
    case "email": {
      const base = z.string().trim().toLowerCase().email("Enter a valid email address");
      return field.required ? base : z.union([base, z.literal("")]);
    }
    case "tel": {
      const base = z.string().trim().min(6, "Enter a valid phone number").max(20, "Enter a valid phone number");
      return field.required ? base : z.union([base, z.literal("")]);
    }
    case "url": {
      const base = z.string().trim().url("Enter a valid URL");
      return field.required ? base : z.union([base, z.literal("")]);
    }
    case "select": {
      const base = z.enum(optionValues(field));
      return field.required ? base : z.union([base, z.literal("")]);
    }
    case "multiselect": {
      const opts = optionValues(field);
      const base = z.array(z.enum(opts)).max(opts.length);
      return field.required ? base.min(1, "Select at least one option") : base;
    }
    case "textarea": {
      const base = z
        .string()
        .trim()
        .min(field.minLength ?? 1, `Minimum ${field.minLength ?? 1} characters`)
        .max(field.maxLength ?? 10000, `Maximum ${field.maxLength ?? 10000} characters`);
      return field.required ? base : z.union([base, z.literal("")]);
    }
    case "text":
    default: {
      const base = z.string().trim().min(1, "This field is required");
      return field.required ? base : z.union([base, z.literal("")]);
    }
  }
}

function allFields(role) {
  return role.screens.flatMap((screen) => screen.fields);
}

function buildFormDataSchema(role) {
  const shape = {};
  for (const field of allFields(role)) {
    shape[field.id] = fieldValidator(field);
  }
  return z.object(shape).strict();
}

function buildRequestSchema(role) {
  return z
    .object({
      role: z.literal(role.slug),
      elapsedMs: z.number().optional().default(0),
      clientSubmissionId: z.string().min(1, "Missing submission id"),
      utm: z
        .object({
          source: z.string().optional().default(""),
          medium: z.string().optional().default(""),
          campaign: z.string().optional().default(""),
          content: z.string().optional().default(""),
        })
        .optional()
        .default({ source: "", medium: "", campaign: "", content: "" }),
      landingPage: z.string().optional().default(""),
      formData: buildFormDataSchema(role),
    })
    .strict();
}

function normalizeUrlFields(role, formData) {
  if (typeof formData !== "object" || formData === null) return formData;
  const urlFieldIds = new Set(allFields(role).filter((f) => f.type === "url").map((f) => f.id));
  const source = formData;
  const normalized = { ...source };
  for (const id of urlFieldIds) {
    const value = source[id];
    if (typeof value === "string") {
      normalized[id] = normalizeUrl(value);
    }
  }
  return normalized;
}

export function parseApplicationPayload(role, rawBody) {
  if (typeof rawBody !== "object" || rawBody === null) {
    return { success: false, error: "Invalid request body." };
  }
  const body = rawBody;
  const candidate = {
    role: body.role,
    elapsedMs: body.elapsedMs,
    clientSubmissionId: body.clientSubmissionId,
    utm: body.utm,
    landingPage: body.landingPage,
    formData: normalizeUrlFields(role, body.formData),
  };

  const schema = buildRequestSchema(role);
  const result = schema.safeParse(candidate);

  if (!result.success) {
    return { success: false, error: "Please check your answers and try again." };
  }

  return { success: true, data: result.data };
}
