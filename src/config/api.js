// API Environment Configuration helper
// Local URLs are allowed only in development; a deployed build must never call localhost.

export const getApiBaseUrl = () => {
  const envMode = (process.env.NEXT_PUBLIC_ENV || "").trim().toLowerCase();

  if (process.env.NODE_ENV !== "production" && ["local", "localhost"].includes(envMode)) {
    return process.env.NEXT_PUBLIC_LOCALHOST_API_URL || "http://localhost:8000/api/v1/invictus-enquiries";
  }

  return (
    process.env.NEXT_PUBLIC_PRODUCTION_API_URL ||
    "https://api.invictusglobaltech.com/api/v1/invictus-enquiries"
  );
};
