"use client";

import { useState } from "react";

// ─── Shared input style ───────────────────────────────────────────────────────
const inputCls =
    "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition backdrop-blur-sm";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    formHeading: "Register yourself for updates",
    backgroundImage:
        "https://daveandbustersindia.com/wp-content/uploads/2025/02/Gift-Card-Desk.png",
    fields: [
        { id: "fullName", name: "your-name", type: "text", placeholder: "Full Name*", required: true },
        { id: "email", name: "your-email", type: "email", placeholder: "Email ID*", required: true },
    ],
    submitLabel: "Submit",
    action: "/api/delhi-register",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DelhiRegisterForm() {
    const [fields, setFields] = useState({ fullName: "", email: "" });
    const [status, setStatus] = useState("idle");

    const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch(content.action, {
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
        <section className="bg-[#15189a] p-0 m-0">
            <div className="container mx-auto px-4 xl:px-8">
                {/* .form-background — background image, rounded top corners, 10% padding */}
                <div
                    className="rounded-t-[30px] overflow-hidden relative"
                    style={{
                        backgroundImage: `url(${content.backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        paddingTop: "10%",
                        paddingBottom: "10%",
                    }}
                >
                    {/* Overlay so form stays legible over the background image */}
                    <div className="absolute inset-0" />

                    <div className="relative max-w-2xl mx-auto px-4">
                        {status === "success" ? (
                            <div className="text-center py-10">
                                <p className="text-2xl font-bold text-[#FFBA00] font-din mb-2">
                                    You're on the list! 🎉
                                </p>
                                <p className="text-white/80 text-sm">
                                    We'll keep you updated on all things Delhi D&B!
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                {/* Heading */}
                                <p className="text-center text-white font-semibold text-base mb-6">
                                    {content.formHeading}
                                </p>

                                {/* Two-col input row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {content.fields.map((field) => (
                                        <input
                                            key={field.id}
                                            type={field.type}
                                            required={field.required}
                                            maxLength={400}
                                            placeholder={field.placeholder}
                                            className={inputCls}
                                            value={fields[field.id]}
                                            onChange={set(field.id)}
                                            autoComplete={field.type === "email" ? "email" : "name"}
                                        />
                                    ))}
                                </div>

                                {/* Submit — centered */}
                                <div className="flex justify-center mt-8">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="px-10 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-all duration-300 disabled:opacity-60"
                                        style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                            "linear-gradient(to bottom, #040651, #15189a)")
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                            "linear-gradient(to bottom, #ff6f00, #FFBA00)")
                                        }
                                    >
                                        {status === "submitting" ? "Submitting…" : content.submitLabel}
                                    </button>
                                </div>

                                {status === "error" && (
                                    <p className="text-center mt-3 text-sm text-[#FF0000]">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}