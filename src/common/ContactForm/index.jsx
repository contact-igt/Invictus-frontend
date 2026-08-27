import { getApiBaseUrl } from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

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
            let ip = "";
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                ip = ipData.ip || "";
            } catch (e) {
                // IP lookup fallback
            }

            try {
                const apiBase = getApiBaseUrl();

                // 1. Submit to Invictus Lead Backend API (Admin Panel DB) first
                try {
                    await fetch(`${apiBase}/general/public`, {
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
                } catch (apiErr) {
                    console.error("Invictus Backend API Submission Error:", apiErr);
                }

                // 2. Submit to Google Apps Script Webhook (Google Sheets Backup)
                const newFormData = {
                    sheet: "Sheet1",
                    sheet_name: "Sheet1",
                    name: values.name,
                    mobile: values.mobile,
                    email: values.email,
                    industry: values.industry,
                    applied_for: "General Inquiry",
                    appliedFor: "General Inquiry",
                    ip_address: ip,
                };
                await fetch("https://script.google.com/macros/s/AKfycbxEccKBZ_qCJeCfYeDNuVpTrE94yyLEHAdBuS6AZwRaGhgMNGVWe35y-09U3_hl_kJ27w/exec", {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(newFormData).toString(),
                });

                formik.resetForm();
                setFormStatus("success");
                router.push('/thank-you');
            } catch (err) {
                setError("Something went wrong. Please try again.");
                setFormStatus("idle");
            }
        },
    });

    return (
        <div className="p-8 md:p-20 flex flex-col justify-center bg-[var(--navbar-bg)] backdrop-blur-sm">
            {formStatus === "success" ? (
                <div className="text-center animate-fade-in">
                    <CheckCircle className="mx-auto text-[#2AB182] w-16 h-16 mb-6" />
                    <h3 className="font-display text-3xl uppercase text-[var(--text-primary)] mb-2">Received</h3>
                    <p className="font-body text-[var(--text-muted)]">We'll analyze your business and get back to you shortly.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-8 text-[#2AB182] font-bold underline underline-offset-4">
                        Submit another
                    </button>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">Name</label>
                        <input
                            required
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full font-body bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <small className="block font-body !text-[13px] text-red-500 mt-2">{formik.errors.name}</small>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">Mobile</label>
                        <input
                            required
                            name="mobile"
                            type="tel"
                            placeholder="+91 99999 99999"
                            className="w-full font-body bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                            {...formik.getFieldProps('mobile')}
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                            <small className="!text-[13px] font-body text-red-500">{formik.errors.mobile}</small>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">Email</label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full font-body bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <small className="!text-[13px] font-body text-red-500">{formik.errors.email}</small>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold font-body">Industry</label>
                        <select
                            name="industry"
                            className="w-full bg-transparent border-b border-[var(--border-subtle)] py-3 focus:border-[#2AB182] outline-none transition-colors text-lg text-[var(--text-primary)] font-body appearance-none rounded-none cursor-pointer"
                            {...formik.getFieldProps('industry')}
                        >
                            <option value="" disabled>Select Industry</option>
                            <option>Healthcare</option>
                            <option>EdTech</option>
                            <option>E-commerce</option>
                            <option>Automobile</option>
                            <option>Consulting</option>
                            <option>SaaS</option>
                            <option>Other</option>
                        </select>
                        {formik.touched.industry && formik.errors.industry && (
                            <small className="!text-[13px] font-body text-red-500">{formik.errors.industry}</small>
                        )}
                    </div>
                    {error && <small className="block !text-[13px] font-body text-red-500 mb-3">{error}</small>}
                    <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-display font-bold uppercase tracking-widest py-5 mt-8 hover:bg-[#2AB182] hover:text-black active:bg-[#2AB182] active:text-black transition-all duration-300 disabled:opacity-50"
                    >
                        {formStatus === 'submitting' ? 'Sending...' : 'Submit Application'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;