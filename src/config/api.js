// API Environment Configuration helper
// Evaluates API Base URL based on NEXT_PUBLIC_ENV ("local" | "production")

export const getApiBaseUrl = () => {
  const envMode = (process.env.NEXT_PUBLIC_ENV || "local").trim().toLowerCase();

  if (envMode === "production") {
    return (
      process.env.NEXT_PUBLIC_PRODUCTION_API_URL ||
      "https://api.invictusglobaltech.com/api/v1/invictus-enquiries"
    );
  }

  return (
    process.env.NEXT_PUBLIC_LOCALHOST_API_URL ||
    "http://localhost:8000/api/v1/invictus-enquiries"
  );
};
