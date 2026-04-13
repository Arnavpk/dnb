"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const inputCls =
    "w-full rounded-full border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] placeholder-[#15189a]/60 focus:outline-none focus:ring-2 focus:ring-[#15189a]/30 transition";
const selectCls =
    "w-full rounded-full border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] focus:outline-none focus:ring-2 focus:ring-[#15189a]/30 transition appearance-none cursor-pointer";
const textareaCls =
    "w-full rounded-2xl border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] placeholder-[#15189a]/60 focus:outline-none focus:ring-2 focus:ring-[#15189a]/30 transition resize-none";
const labelCls = "block text-sm font-semibold text-[#232323] mb-1.5";

const eventMap = {
    "/bangalore/parties/corporate-events/": { event: "Corporate Event", location: "Bangalore" },
    "/bangalore/parties/birthday-party/": { event: "Birthday Party", location: "Bangalore" },
    "/bangalore/parties/social-events/": { event: "Social Event", location: "Bangalore" },
    "/mumbai/parties/corporate-events/": { event: "Corporate Event", location: "Mumbai" },
    "/mumbai/parties/birthday-party/": { event: "Birthday Party", location: "Mumbai" },
    "/mumbai/parties/social-events/": { event: "Social Event", location: "Mumbai" },
};

const LOCATIONS = ["Bangalore", "Mumbai"];
const EVENT_TYPES = ["Corporate Event", "Birthday Party", "Social Event"];
const TIMES = [
    "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
    "11:00 PM", "11:30 PM",
];

function Required() {
    return <span className="text-[#dc3232] ml-0.5">*</span>;
}

function CustomSelect({ value, onChange, required, children }) {
    return (
        <div className="relative">
            <select value={value} onChange={onChange} required={required} className={selectCls}>
                {children}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#15189a]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </span>
        </div>
    );
}

function SectionHeading({ children }) {
    return (
        <h4 className="text-xl md:text-2xl font-extrabold text-[#15189a] uppercase tracking-tight mt-2 mb-6">
            {children}
        </h4>
    );
}

// Props:
//   locationSlug — from params.location (e.g. "bangalore")
//                  used to capitalize and preset the location dropdown
export default function CorporateEventForm({ locationSlug }) {
    const pathname = usePathname();
    const isBookingPage = pathname?.includes("/bookings");

    const preset = Object.entries(eventMap).find(
        ([url]) => pathname?.includes(url)
    )?.[1];

    // Capitalize location slug for dropdown (bangalore → Bangalore)
    const locationPreset = preset?.location
        ?? (locationSlug
            ? locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1)
            : "");

    const [fields, setFields] = useState({
        location: locationPreset,
        eventType: preset?.event ?? "",
        date: "",
        time: "",
        guests: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: "",
    });

    useEffect(() => {
        if (preset && !isBookingPage) {
            setFields((f) => ({ ...f, location: preset.location, eventType: preset.event }));
        }
    }, [pathname]);

    const [status, setStatus] = useState("idle");
    const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/party-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });
            setStatus(res.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <section className="bg-white py-16 text-center">
                <p className="text-2xl font-bold text-[#15189a] mb-2">🎉 Booking Submitted!</p>
                <p className="text-[#717580] text-sm">
                    We'll be in touch shortly to confirm your event details.
                </p>
            </section>
        );
    }

    return (
        <section className="bg-white py-10 md:py-14">
            <div className="mx-auto px-[15px]" style={{ maxWidth: "88%" }}>
                <form onSubmit={handleSubmit} noValidate>

                    {/* Party Details */}
                    <SectionHeading>Party Details</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10">

                        <div>
                            <label className={labelCls}>Location <Required /></label>
                            {isBookingPage ? (
                                <CustomSelect value={fields.location} onChange={set("location")} required>
                                    <option value="">—Please choose an option—</option>
                                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                                </CustomSelect>
                            ) : (
                                <p className="text-sm font-bold text-[#15189a] py-3">
                                    📍 {fields.location}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelCls}>Event Type <Required /></label>
                            {isBookingPage ? (
                                <CustomSelect value={fields.eventType} onChange={set("eventType")} required>
                                    <option value="">—Please choose an option—</option>
                                    {EVENT_TYPES.map((e) => <option key={e} value={e}>{e}</option>)}
                                </CustomSelect>
                            ) : (
                                <p className="text-sm font-bold text-[#15189a] py-3">
                                    🥳 {fields.eventType}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelCls}>Select Date <Required /></label>
                            <input type="date" required
                                min={new Date().toISOString().split("T")[0]}
                                className={inputCls}
                                value={fields.date} onChange={set("date")} />
                        </div>

                        <div>
                            <label className={labelCls}>Select Time <Required /></label>
                            <CustomSelect value={fields.time} onChange={set("time")} required>
                                <option value="">Time of event</option>
                                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </CustomSelect>
                        </div>

                        <div>
                            <label className={labelCls}>Number of Guests <Required /></label>
                            <input type="number" required min={15} step={1}
                                placeholder="Number of guests"
                                className={inputCls}
                                value={fields.guests} onChange={set("guests")} />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <SectionHeading>Contact Details</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

                        <div>
                            <label className={labelCls}>First Name <Required /></label>
                            <input type="text" required maxLength={400} placeholder="First name"
                                className={inputCls} value={fields.firstName} onChange={set("firstName")} />
                        </div>

                        <div>
                            <label className={labelCls}>Last Name <Required /></label>
                            <input type="text" required maxLength={400} placeholder="Last name"
                                className={inputCls} value={fields.lastName} onChange={set("lastName")} />
                        </div>

                        <div>
                            <label className={labelCls}>Email <Required /></label>
                            <input type="email" required maxLength={400} placeholder="Email address"
                                className={inputCls} value={fields.email} onChange={set("email")} />
                        </div>

                        <div>
                            <label className={labelCls}>Phone Number <Required /></label>
                            <input type="tel" required maxLength={400} placeholder="Phone number"
                                className={inputCls} value={fields.phone} onChange={set("phone")} />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelCls}>Special Requests (Optional)</label>
                            <textarea rows={6} maxLength={2000}
                                className={textareaCls}
                                value={fields.specialRequests} onChange={set("specialRequests")} />
                        </div>

                        <div className="md:col-span-2 mt-2">
                            <button type="submit" disabled={status === "submitting"}
                                className="px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-all duration-300 disabled:opacity-60"
                                style={{ background: "#15189a" }}>
                                {status === "submitting" ? "Submitting…" : "Submit form"}
                            </button>
                            {status === "error" && (
                                <p className="mt-3 text-sm text-[#dc3232]">
                                    Something went wrong. Please try again or call +91 8069088400.
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}