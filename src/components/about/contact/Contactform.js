"use client";

import { useState } from "react";

// ─── Shared input / label styles (matches site form aesthetic) ────────────────
const inputCls =
    "w-full rounded-lg border border-[#15189a] bg-white px-4 py-2.5 text-sm text-[#232323] placeholder-[#15189a] focus:outline-none focus:border-[#15189a] focus:ring-1 focus:ring-[#15189a] transition";
const labelCls = "block text-sm font-semibold text-black mb-1";

function Required() {
    return <span className="text-[#FF0000] ml-0.5">*</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactForm() {
    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("idle"); // idle | submitting | success | error

    const set = (key) => (e) =>
        setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });
            setStatus(res.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    return (
        <section
            className="py-12 md:py-16"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                {status === "success" ? (
                    <div className="text-center py-16">
                        <p className="text-2xl font-bold text-[#FFBA00] font-din mb-2">
                            Message Sent! 🎉
                        </p>
                        <p className="text-white/75 text-sm">
                            Thanks for reaching out. We'll get back to you as soon as possible.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">

                            {/* First Name */}
                            <div>
                                <label className={labelCls}>
                                    First Name <Required />
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={400}
                                    placeholder="First name"
                                    className={inputCls}
                                    value={fields.firstName}
                                    onChange={set("firstName")}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className={labelCls}>
                                    Last Name <Required />
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={400}
                                    placeholder="Last name"
                                    className={inputCls}
                                    value={fields.lastName}
                                    onChange={set("lastName")}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelCls}>
                                    Email <Required />
                                </label>
                                <input
                                    type="email"
                                    required
                                    maxLength={400}
                                    placeholder="Email address"
                                    className={inputCls}
                                    value={fields.email}
                                    onChange={set("email")}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={labelCls}>
                                    Phone Number <Required />
                                </label>
                                <input
                                    type="tel"
                                    required
                                    maxLength={400}
                                    placeholder="Phone number"
                                    className={inputCls}
                                    value={fields.phone}
                                    onChange={set("phone")}
                                />
                            </div>

                            {/* Subject — full width */}
                            <div className="sm:col-span-2">
                                <label className={labelCls}>
                                    Subject <Required />
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={400}
                                    placeholder="Subject"
                                    className={inputCls}
                                    value={fields.subject}
                                    onChange={set("subject")}
                                />
                            </div>

                            {/* Message — full width, optional */}
                            <div className="sm:col-span-2">
                                <label className={labelCls}>Message</label>
                                <textarea
                                    rows={6}
                                    maxLength={2000}
                                    placeholder="Your message…"
                                    className={`${inputCls} resize-none`}
                                    value={fields.message}
                                    onChange={set("message")}
                                />
                            </div>

                            {/* Submit — full width */}
                            <div className="sm:col-span-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full sm:w-auto px-8 py-3 rounded-full
                             text-white font-bold text-sm uppercase tracking-wide
                             transition-all duration-300 disabled:opacity-60"
                                    style={{
                                        background: "#15189a",
                                    }}
                                // onMouseEnter={(e) => {
                                //     if (status !== "submitting")
                                //         e.currentTarget.style.background =
                                //             "linear-gradient(to bottom, #040651, #15189a)";
                                // }}
                                // onMouseLeave={(e) => {
                                //     e.currentTarget.style.background =
                                //         "linear-gradient(to bottom, #ff6f00, #FFBA00)";
                                // }}
                                >
                                    {status === "submitting" ? "Submitting…" : "Submit Form"}
                                </button>

                                {status === "error" && (
                                    <p className="mt-3 text-sm text-[#FF0000]">
                                        Something went wrong. Please try again or call us directly.
                                    </p>
                                )}
                            </div>

                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}