import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { HONEYPOT_FIELD_NAME } from "@/lib/careersSpamGuards";

const SUCCESS_HEADING = "APPLICATION RECEIVED";
const SUCCESS_COPY =
  "Thank you for applying. Our team will review your profile and contact shortlisted candidates using the details provided.";

function initialFormData(role) {
  const data = {};
  if (!role || !Array.isArray(role?.screens)) return data;
  for (const field of role.screens.flatMap((s) => s.fields || [])) {
    data[field.id] = field.type === "multiselect" ? [] : "";
  }
  return data;
}

function inputTypeFor(field) {
  if (field.type === "tel" || field.type === "email" || field.type === "url") return field.type;
  return "text";
}

function autoCompleteFor(id) {
  switch (id) {
    case "fullName":
      return "name";
    case "phone":
      return "tel";
    case "email":
      return "email";
    case "city":
      return "address-level2";
    default:
      return undefined;
  }
}

function reducedMotionActive() {
  return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ConversationalApplicationForm({ role }) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1..N = answer screens, N+1 = review
  const [formData, setFormData] = useState(() => initialFormData(role));
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [applicationRef, setApplicationRef] = useState(null);
  const [utm, setUtm] = useState({ source: "", medium: "", campaign: "", content: "" });

  const startedAtRef = useRef(Date.now());
  const clientSubmissionIdRef = useRef(typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
  const landingPageRef = useRef("");
  const fieldRefs = useRef({});
  const formRef = useRef(null);

  const totalAnswerScreens = role?.screens ? role.screens.length : 0;
  const reviewStep = totalAnswerScreens + 1;

  const scrollToFormTop = useCallback(() => {
    if (typeof window === "undefined" || !formRef || !formRef.current) return;
    try {
      const rect = formRef.current.getBoundingClientRect();
      const navbarOffset = 100;
      const targetY = window.pageYOffset + rect.top - navbarOffset;

      if (rect.top < 0 || rect.top > 250) {
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: reducedMotionActive() ? "auto" : "smooth",
        });
      }
    } catch {
      // scroll fallback
    }
  }, []);

  useEffect(() => {
    if (router && router.isReady) {
      const q = router.query || {};
      setUtm({
        source: q.utm_source || "",
        medium: q.utm_medium || "",
        campaign: q.utm_campaign || "",
        content: q.utm_content || "",
      });
    }
    if (typeof window !== "undefined") {
      landingPageRef.current = window.location.href;
    }
  }, [router]);

  const handleChange = useCallback((id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const toggleMultiselect = useCallback((id, optionValue) => {
    setFormData((prev) => {
      const list = Array.isArray(prev[id]) ? prev[id] : [];
      const next = list.includes(optionValue) ? list.filter((v) => v !== optionValue) : [...list, optionValue];
      return { ...prev, [id]: next };
    });
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  function validateScreenFields(fields) {
    const screenErrors = {};
    if (!Array.isArray(fields)) return screenErrors;

    for (const field of fields) {
      const value = formData[field.id];

      if (field.type === "multiselect") {
        const arr = Array.isArray(value) ? value : [];
        if (field.required && arr.length === 0) {
          screenErrors[field.id] = "Select at least one option";
        }
      } else {
        const str = typeof value === "string" ? value.trim() : "";
        if (field.required && !str) {
          screenErrors[field.id] = "This field is required";
        } else if (str) {
          if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
            screenErrors[field.id] = "Enter a valid email address";
          } else if (field.type === "tel" && (str.length < 6 || str.length > 20)) {
            screenErrors[field.id] = "Enter a valid phone number";
          } else if (field.type === "url" && !/^https?:\/\//i.test(str) && !/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(str)) {
            screenErrors[field.id] = "Enter a valid URL (including http:// or https://)";
          } else if (field.type === "textarea") {
            if (field.minLength && str.length < field.minLength) {
              screenErrors[field.id] = `Please write at least ${field.minLength} characters (currently ${str.length})`;
            } else if (field.maxLength && str.length > field.maxLength) {
              screenErrors[field.id] = `Please keep your response under ${field.maxLength} characters`;
            }
          }
        }
      }
    }

    return screenErrors;
  }

  function handleStart() {
    setCurrentStep(1);
    scrollToFormTop();
  }

  function handleNext() {
    const currentScreen = role?.screens ? role.screens[currentStep - 1] : null;
    if (!currentScreen) return;

    const screenErrors = validateScreenFields(currentScreen.fields);
    if (Object.keys(screenErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...screenErrors }));
      const firstBadId = currentScreen.fields?.find((f) => screenErrors[f.id])?.id;
      if (firstBadId && fieldRefs.current[firstBadId] && typeof fieldRefs.current[firstBadId]?.focus === "function") {
        fieldRefs.current[firstBadId].focus();
      }
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, reviewStep));
    scrollToFormTop();
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    scrollToFormTop();
  }

  function goToScreen(index) {
    setCurrentStep(index);
    scrollToFormTop();
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const target = e.target;
    if (target && (target.tagName === "TEXTAREA" || target.tagName === "BUTTON")) return;
    e.preventDefault();
    handleNext();
  }

  async function handleSubmit() {
    let allErrors = {};
    let firstBadScreenIndex = -1;
    if (role?.screens) {
      role.screens.forEach((screen, idx) => {
        const screenErrors = validateScreenFields(screen.fields);
        if (Object.keys(screenErrors).length > 0 && firstBadScreenIndex === -1) firstBadScreenIndex = idx;
        allErrors = { ...allErrors, ...screenErrors };
      });
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setSubmitError("Please fix the highlighted answers before submitting.");
      if (firstBadScreenIndex >= 0) goToScreen(firstBadScreenIndex + 1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const generatedRef = "IGT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const googleSheetPayload = {
        sheet: "Careers",
        sheet_name: "Careers",
        submitted_at: new Date().toLocaleString(),
        application_reference: generatedRef,
        role: role?.title || "",
        applied_for: role?.title || "",
        appliedFor: role?.title || "",
        name: formData.fullName || "",
        full_name: formData.fullName || "",
        phone: formData.phone || "",
        mobile: formData.phone || "",
        email: formData.email || "",
        city: formData.city || "",
        current_city: formData.city || "",
        notice_period: formData.noticePeriod || "",
        experience: formData.experience || "",
        portfolio_or_showreel: formData.portfolioOrShowreel || "",
        resume_or_linkedin: formData.resumeOrLinkedin || "",
        tools: Array.isArray(formData.tools) ? formData.tools.join(", ") : (formData.tools || ""),
        categories: Array.isArray(formData.categories) ? formData.categories.join(", ") : (formData.categories || ""),
        work_categories: Array.isArray(formData.categories) ? formData.categories.join(", ") : (formData.categories || ""),
        workflow_answer: formData.workflowAnswer || "",
        ai_usage: formData.aiUsage || "",
        judgement_answer: formData.judgementAnswer || "",
        practical_assessment: formData.practicalAssessment || "",
      };

      // Direct post to Google Apps Script Webhook (Careers Sheet)
      await fetch("https://script.google.com/macros/s/AKfycbz7vYFkLog3qAL_6GY2IKj5wx-K5cX_vYFWfCkQUau6m5Q_NPKuU7EI8ipe73SpTceq/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(googleSheetPayload).toString(),
      });

      setApplicationRef(generatedRef);
      if (router && typeof router.push === "function") {
        router.push('/thank-you');
      }
    } catch {
      setSubmitError("We couldn't submit your application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      scrollToFormTop();
    }
  }

  function renderAnswer(field, value) {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      return "Not provided";
    }
    if (Array.isArray(value)) {
      return value.map((v) => field.options?.find((o) => o.value === v)?.label || v).join(", ");
    }
    if (field.options) {
      return field.options.find((o) => o.value === value)?.label || value;
    }
    return value;
  }

  function renderField(field) {
    const value = formData[field.id];
    const error = errors[field.id];
    const baseInputClass = `w-full bg-[var(--bg-primary,#0E0E0E)] border text-base font-body ${
      error ? "border-red-500" : "border-[var(--border-subtle,#333)] focus:border-[#2AB182] focus:ring-1 focus:ring-[#2AB182]"
    } outline-none px-4 py-3 text-[var(--text-primary,#E0E0E0)] transition-colors duration-150 ease-out rounded-sm`;

    if (field.type === "select" || field.type === "multiselect") {
      const isMulti = field.type === "multiselect";
      const current = isMulti ? (Array.isArray(value) ? value : []) : typeof value === "string" ? value : "";

      return (
        <fieldset key={field.id} className="mb-2">
          <legend className="text-xs font-bold text-[var(--text-muted,#666)] uppercase tracking-widest mb-3 font-body">
            {field.label} {field.required && <span className="text-[#2AB182]">*</span>}
          </legend>
          <div className={isMulti ? "flex flex-wrap gap-2" : "flex flex-col gap-2"} role={isMulti ? "group" : "radiogroup"}>
            {field.options?.map((opt, i) => {
              const selected = isMulti ? current.includes(opt.value) : current === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  ref={(el) => {
                    if (i === 0) fieldRefs.current[field.id] = el;
                  }}
                  onClick={() => {
                    if (isMulti) {
                      toggleMultiselect(field.id, opt.value);
                    } else {
                      handleChange(field.id, opt.value);
                    }
                  }}
                  aria-pressed={selected}
                  className={`min-h-[44px] inline-flex items-center text-left px-4 py-2.5 border font-body transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] ${
                    isMulti ? "rounded-full text-sm" : "rounded-sm w-full"
                  } ${
                    selected
                      ? "border-[#2AB182] bg-[#2AB182]/10 text-[var(--text-primary,#E0E0E0)] font-bold"
                      : "border-[var(--border-subtle,#333)] text-[var(--text-secondary,#A0A0A0)] hover:border-[#2AB182]/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {error && (
            <p role="alert" className="text-red-500 text-xs mt-2 font-bold font-body">
              {error}
            </p>
          )}
        </fieldset>
      );
    }

    if (field.type === "textarea") {
      const length = typeof value === "string" ? value.trim().length : 0;
      return (
        <div key={field.id} className="mb-2">
          <label htmlFor={field.id} className="block text-xs font-bold text-[var(--text-muted,#666)] uppercase tracking-widest mb-2 font-body">
            {field.label} {field.required && <span className="text-[#2AB182]">*</span>}
          </label>
          <textarea
            id={field.id}
            ref={(el) => {
              fieldRefs.current[field.id] = el;
            }}
            required={field.required}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={6}
            className={baseInputClass}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.id}-error` : undefined}
          />
          <div className="text-xs text-[var(--text-muted,#666)] mt-2 text-right font-body">
            {length} characters{field.minLength ? ` (minimum ${field.minLength})` : ""}
          </div>
          {error && (
            <p id={`${field.id}-error`} role="alert" className="text-red-500 text-xs mt-1 font-bold font-body">
              {error}
            </p>
          )}
        </div>
      );
    }

    return (
      <div key={field.id} className="mb-2">
        <label htmlFor={field.id} className="block text-xs font-bold text-[var(--text-muted,#666)] uppercase tracking-widest mb-2 font-body">
          {field.label} {field.required && <span className="text-[#2AB182]">*</span>}
        </label>
        <input
          id={field.id}
          ref={(el) => {
            fieldRefs.current[field.id] = el;
          }}
          type={inputTypeFor(field)}
          required={field.required}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => handleChange(field.id, e.target.value)}
          className={baseInputClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.id}-error` : undefined}
          autoComplete={autoCompleteFor(field.id)}
        />
        {error && (
          <p id={`${field.id}-error`} role="alert" className="text-red-500 text-xs mt-2 font-bold font-body">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (applicationRef) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-form-screen bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-8 sm:p-12 text-center rounded-sm max-w-[700px] mx-auto font-body"
      >
        <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[var(--text-primary,#E0E0E0)] mb-4">{SUCCESS_HEADING}</h2>
        <p className="text-[var(--text-secondary,#A0A0A0)] max-w-lg mx-auto mb-8 leading-relaxed font-body">{SUCCESS_COPY}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10 text-sm font-body">
          <div>
            <span className="block text-[var(--text-muted,#666)] uppercase tracking-widest text-xs mb-1 font-body">Role</span>
            <span className="font-bold text-[var(--text-primary,#E0E0E0)] font-body">{role?.title}</span>
          </div>
          <div>
            <span className="block text-[var(--text-muted,#666)] uppercase tracking-widest text-xs mb-1 font-body">Application Reference</span>
            <span className="font-mono font-bold text-[var(--text-primary,#E0E0E0)]">{applicationRef}</span>
          </div>
        </div>
        <a
          href="/careers"
          className="inline-block bg-[#2AB182] text-black px-8 py-4 font-display font-bold uppercase tracking-wider hover:bg-[#22956d] transition-colors duration-150 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182]"
        >
          Return to Careers
        </a>
      </div>
    );
  }

  return (
    <div ref={formRef} className="max-w-[700px] mx-auto font-body">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD_NAME}>Leave this field empty</label>
        <input
          type="text"
          id={HONEYPOT_FIELD_NAME}
          name={HONEYPOT_FIELD_NAME}
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {currentStep === 0 && (
        <div key="intro" className="animate-form-screen bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-6 md:p-10 rounded-sm font-body">
          <p className="text-[#2AB182] font-bold text-xs uppercase tracking-widest mb-3 font-body">{role?.title}</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
            Apply in about {role?.estimatedMinutes}
          </h2>
          <ul className="space-y-4 text-[var(--text-secondary,#A0A0A0)] mb-10 text-sm font-body">
            <li>
              <strong className="text-[var(--text-primary,#E0E0E0)] block mb-1 font-body">Minimum experience</strong>
              {role?.minExperience}
            </li>
            <li>
              <strong className="text-[var(--text-primary,#E0E0E0)] block mb-1 font-body">{role?.applicationMaterialLabel} required</strong>
              You&apos;ll need a link to your {role?.applicationMaterialLabel?.toLowerCase()} to complete this application.
            </li>
            <li>
              <strong className="text-[var(--text-primary,#E0E0E0)] block mb-1 font-body">Estimated time</strong>
              {role?.estimatedMinutes}
            </li>
          </ul>
          <button
            type="button"
            onClick={handleStart}
            className="min-h-[44px] bg-[#2AB182] text-black px-8 py-4 font-display font-bold uppercase tracking-wider hover:bg-[#22956d] transition-colors duration-150 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182]"
          >
            Start Application
          </button>
        </div>
      )}

      {currentStep >= 1 && currentStep <= totalAnswerScreens && (
        <div
          key={currentStep}
          onKeyDown={handleKeyDown}
          className="animate-form-screen bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-6 md:p-10 rounded-sm font-body"
        >
          <div className="mb-8" aria-live="polite">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted,#666)] mb-3 font-body">
              {currentStep} of {totalAnswerScreens}
            </div>
            <div className="flex gap-2 max-w-[280px]">
              {role?.screens?.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-150 ease-out ${
                    i < currentStep ? "bg-[#2AB182]" : "bg-[var(--border-subtle,#333)]"
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
            {role?.screens?.[currentStep - 1]?.title}
          </h3>

          <div className="space-y-6">{role?.screens?.[currentStep - 1]?.fields?.map((field) => renderField(field))}</div>

          <div className="flex items-center justify-between pt-8 mt-8 border-t border-[var(--border-subtle,#333)]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="min-h-[44px] text-[var(--text-muted,#666)] hover:text-[var(--text-primary,#E0E0E0)] font-display font-bold uppercase tracking-widest text-sm transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] rounded-sm"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] bg-[#2AB182] text-black px-8 py-3 font-display font-bold uppercase tracking-wider hover:bg-[#22956d] transition-colors duration-150 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {currentStep === reviewStep && (
        <div key="review" className="animate-form-screen bg-[var(--bg-secondary,#151515)] border border-[var(--border-subtle,#333)] p-6 md:p-10 rounded-sm font-body">
          <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-[var(--text-primary,#E0E0E0)] mb-8">Review &amp; Submit</h3>

          {submitError && (
            <div role="alert" className="bg-red-500/10 border border-red-500/30 p-4 mb-8 rounded-sm font-body">
              <p className="text-red-500 font-bold text-sm font-body">{submitError}</p>
              <p className="text-red-500/80 text-xs mt-1 font-body">Your answers have been kept. You can retry submitting below.</p>
            </div>
          )}

          <div className="space-y-6 mb-10">
            {role?.screens?.map((screen, idx) => (
              <div key={screen.id} className="border border-[var(--border-subtle,#333)] p-5 rounded-sm font-body">
                <div className="flex justify-between items-center mb-3 border-b border-[var(--border-subtle,#333)] pb-3">
                  <h4 className="font-display font-bold text-[var(--text-primary,#E0E0E0)] uppercase tracking-widest text-xs">{screen.title}</h4>
                  <button
                    type="button"
                    onClick={() => goToScreen(idx + 1)}
                    className="text-[#2AB182] text-xs font-display font-bold uppercase hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] rounded-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-3 text-sm font-body">
                  {screen.fields?.map((field) => (
                    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                      <span className="text-[var(--text-muted,#666)] font-bold break-words font-body">{field.label}</span>
                      <span className="col-span-2 text-[var(--text-primary,#E0E0E0)] break-words font-body">{renderAnswer(field, formData[field.id])}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-[var(--border-subtle,#333)]">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="min-h-[44px] text-[var(--text-muted,#666)] hover:text-[var(--text-primary,#E0E0E0)] font-display font-bold uppercase tracking-widest text-sm transition-colors duration-150 ease-out disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] rounded-sm"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`min-h-[44px] bg-[#2AB182] text-black px-10 py-4 font-display font-bold uppercase tracking-wider transition-colors duration-150 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB182] ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[var(--text-primary,#E0E0E0)]"
              }`}
            >
              {isSubmitting ? "Submitting Application" : "Submit Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
