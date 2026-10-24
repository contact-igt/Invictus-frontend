import { getApiBaseUrl } from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FloatingInput } from "@/common/FloatingInput";
import { cn } from "@/lib/utils";

const ContactForm = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [formStatus, setFormStatus] = useState("idle");

    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            industry: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is Required"),
            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
                .required("Mobile number is required"),
            email: Yup.string().email("Invalid email address").required("Email is Required"),
            industry: Yup.string().required("Industry is Required"),
        }),
        onSubmit: async (values) => {
            setFormStatus("submitting");
            setError(null);
            try {
                const apiBase = getApiBaseUrl();

                const response = await fetch(`${apiBase}/general/public`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: values.name,
                        mobile: values.mobile,
                        email: values.email,
                        industry: values.industry,
                    }),
                });

                if (!response.ok) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(data?.message || "Unable to submit your enquiry.");
                }

                formik.resetForm();
                setFormStatus("success");
                router.push('/thank-you');
            } catch (err) {
                setError(err.message || "Something went wrong. Please try again.");
                setFormStatus("idle");
            }
        },
    });

    return (
        <div className="w-full">
            {formStatus === "success" ? (
                <div className="text-center py-12 animate-fade-in bg-[var(--bg-card)]/40 p-8 rounded-xl border border-[var(--border-subtle)]">
                    <CheckCircle className="mx-auto text-[#2AB182] w-16 h-16 mb-6" />
                    <h3 className="font-display text-3xl uppercase text-[var(--text-primary)] mb-2">Received</h3>
                    <p className="font-body text-[var(--text-muted)]">We&apos;ll analyze your business and get back to you shortly.</p>
                    <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="mt-8 text-[#2AB182] font-bold underline underline-offset-4 hover:text-[#22956d] transition-colors"
                    >
                        Submit another
                    </button>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Floating Name Input */}
                    <FloatingInput
                        label="Name"
                        id="name-input"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                    />

                    {/* Floating Mobile Input */}
                    <FloatingInput
                        label="Mobile"
                        id="mobile-input"
                        name="mobile"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.mobile}
                        touched={formik.touched.mobile}
                    />

                    {/* Floating Email Input */}
                    <FloatingInput
                        label="Email"
                        id="email-input"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                    />

                    {/* Industry Selection Field with Floating-style Label */}
                    <div className="space-y-1.5">
                        <div className="relative">
                            <select
                                id="industry-select"
                                name="industry"
                                required
                                aria-required="true"
                                aria-invalid={Boolean(formik.touched.industry && formik.errors.industry)}
                                aria-describedby={formik.touched.industry && formik.errors.industry ? "industry-error" : undefined}
                                aria-label="Select your industry"
                                value={formik.values.industry}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={cn(
                                    "peer w-full px-4 py-3.5 rounded-lg bg-transparent font-body text-base text-[var(--text-primary)] outline-none transition-all duration-200 appearance-none cursor-pointer pr-10",
                                    "border border-[var(--border-subtle)] focus:border-[#2AB182] focus:ring-1 focus:ring-[#2AB182]",
                                    Boolean(formik.touched.industry && formik.errors.industry) && "border-red-500/80 focus:border-red-500 focus:ring-red-500/50"
                                )}
                            >
                                <option value="" disabled className="bg-[var(--bg-primary)] text-[var(--text-muted)]">
                                    Select Industry
                                </option>
                                <option value="Healthcare" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Healthcare</option>
                                <option value="EdTech" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">EdTech</option>
                                <option value="E-commerce" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">E-commerce</option>
                                <option value="Automobile" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Automobile</option>
                                <option value="Consulting" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Consulting</option>
                                <option value="SaaS" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">SaaS</option>
                                <option value="Other" className="bg-[var(--bg-primary)] text-[var(--text-primary)]">Other</option>
                            </select>
                            <label
                                htmlFor="industry-select"
                                className={cn(
                                    "absolute pointer-events-none select-none transition-all duration-200",
                                    Boolean(formik.values.industry)
                                        ? "-top-2.5 left-3 text-xs px-1.5 font-semibold tracking-wider uppercase bg-[var(--bg-primary)] text-[var(--text-muted)] peer-focus:text-[#2AB182]"
                                        : "left-4 top-3.5 text-base text-[var(--text-muted)] font-body peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1.5 peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-[#2AB182] peer-focus:bg-[var(--bg-primary)]"
                                )}
                            >
                                Select Industry
                            </label>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                                <ChevronDown className="w-4 h-4 text-[#2AB182]" />
                            </div>
                        </div>
                        {formik.touched.industry && formik.errors.industry && (
                            <small id="industry-error" role="alert" className="block font-body text-[13px] text-red-500 mt-1 pl-1">
                                {formik.errors.industry}
                            </small>
                        )}
                    </div>

                    {error && (
                        <small role="alert" className="block text-[13px] font-body text-red-500 mb-3 pl-1">
                            {error}
                        </small>
                    )}

                    <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-display font-bold uppercase tracking-widest py-4 sm:py-5 mt-8 rounded-lg hover:bg-[#2AB182] hover:text-black active:bg-[#22956d] active:text-black focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-lg"
                    >
                        {formStatus === 'submitting' ? 'Sending...' : 'Submit Application'}
                    </button>

                    <p className="text-xs text-[var(--text-muted)] font-body mt-4 text-center">
                        By submitting, you agree to our <Link href="/terms" className="underline hover:text-[#2AB182] transition-colors">Terms of Service</Link> and acknowledge our <Link href="/privacy" className="underline hover:text-[#2AB182] transition-colors">Privacy Policy</Link>.
                    </p>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
