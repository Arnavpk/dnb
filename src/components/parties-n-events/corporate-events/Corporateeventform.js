"use client";

import { useState, useEffect } from "react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    image: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/banner_mobile.jpg",
        alt: "Corporate events at Dave & Buster's Bangalore",
    },
    body: "At Dave & Buster's Bangalore, we're flipping the script on corporate parties. Think less small talk, more smack talk over air hockey. Less dry speeches, more team wins on the arcade floor. With delicious food, drinks that keep conversations flowing, and games that bring out everyone's playful side, it's the perfect corporate outing in Bangalore your coworkers will actually want to attend.",

    form: {
        // Endpoint — replace with your Next.js API route or external endpoint
        action: "/api/party-booking",

        // Time slots for the event
        timeSlots: [
            "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
            "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
            "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
            "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
            "10:30 PM", "11:00 PM", "11:30 PM",
        ],

        // Map of page paths → preset event + location values
        // Mirrors the original WordPress inline script logic
        eventMap: {
            "/bangalore/parties/corporate-events/": { event: "Corporate Event", location: "Bangalore" },
            "/bangalore/parties/birthday-party/": { event: "Birthday Party", location: "Bangalore" },
            "/bangalore/parties/social-events/": { event: "Social Event", location: "Bangalore" },
            "/mumbai/parties/corporate-events/": { event: "Corporate Event", location: "Mumbai" },
            "/mumbai/parties/birthday-party/": { event: "Birthday Party", location: "Mumbai" },
            "/mumbai/parties/social-events/": { event: "Social Event", location: "Mumbai" },
        },
    },
};

// ─── Shared input / label styles ─────────────────────────────────────────────
const inputCls =
    "w-full rounded-lg border border-[#e4e4e4] bg-white px-4 py-2.5 text-sm text-[#232323] placeholder-[#a8a8a8] focus:outline-none focus:border-[#15189a] focus:ring-1 focus:ring-[#15189a] transition";

const labelCls = "block text-sm font-semibold text-[#232323] mb-1";

function Required() {
    return <span className="text-[#FF0000] ml-0.5">*</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CorporateEventForm() {
    const today = new Date().toISOString().split("T")[0];

    // Detect if we're on the /bookings page (show dropdowns) or a party page (show static)
    const [isBookingPage, setIsBookingPage] = useState(false);
    const [presetLocation, setPresetLocation] = useState("Bangalore");
    const [presetEvent, setPresetEvent] = useState("Corporate Event");

    useEffect(() => {
        const path = window.location.pathname;
        const booking = path.includes("/bookings");
        setIsBookingPage(booking);

        if (!booking) {
            for (const [url, vals] of Object.entries(content.form.eventMap)) {
                if (path.includes(url)) {
                    setPresetLocation(vals.location);
                    setPresetEvent(vals.event);
                    break;
                }
            }
        }
    }, []);

    // Controlled form state
    const [fields, setFields] = useState({
        location: "Bangalore",
        partyType: "Corporate Event",
        date: "",
        time: "",
        guests: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: "",
    });
    const [status, setStatus] = useState("idle");

    const set = (key) => (e) =>
        setFields((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch(content.form.action, {
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
            className="py-0"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10 items-start">

                    {/* ── Left: image + body text ─────────────────────────────────── */}
                    <div className="order-2 lg:order-1 py-10">
                        <div className="overflow-hidden rounded-3xl shadow-2xl mb-8">
                            <img
                                src={content.image.src}
                                alt={content.image.alt}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                draggable={false}
                            />
                        </div>
                        <p className="text-black text-sm md:text-base leading-relaxed">
                            {content.body}
                        </p>
                    </div>

                    {/* ── Right: booking form ──────────────────────────────────────── */}
                    <div className="order-1 lg:order-2 py-10">
                        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                            {status === "success" ? (
                                <div className="text-center py-10">
                                    <p className="text-2xl font-bold text-[#15189a] mb-2">🎉 Request Sent!</p>
                                    <p className="text-[#717580] text-sm">Our team will be in touch with you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>

                                    {/* Party Details heading */}
                                    <div className="mb-4">
                                        <h4 className="text-lg font-bold text-[#15189a] border-b border-[#e4e4e4] pb-2">
                                            Party Details
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                        {/* Location */}
                                        <div>
                                            {/* <label className={labelCls}>
                                                📍 Location
                                            </label> */}
                                            {isBookingPage ? (
                                                <select className={inputCls} value={fields.location} onChange={set("location")} required>
                                                    <option value="">— Please choose —</option>
                                                    <option value="Bangalore">Bangalore</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                </select>
                                            ) : (
                                                <p className="text-sm font-semibold text-[#232323] py-2.5">
                                                    📍 {presetLocation}
                                                </p>
                                            )}
                                        </div>

                                        {/* Event Type */}
                                        <div>
                                            {/* <label className={labelCls}>
                                                🥳 Event Type
                                            </label> */}
                                            {isBookingPage ? (
                                                <select className={inputCls} value={fields.partyType} onChange={set("partyType")} required>
                                                    <option value="">— Please choose —</option>
                                                    <option value="Corporate Event">Corporate Event</option>
                                                    <option value="Birthday Party">Birthday Party</option>
                                                    <option value="Social Event">Social Event</option>
                                                </select>
                                            ) : (
                                                <p className="text-sm font-semibold text-[#232323] py-2.5">
                                                    🥳 {presetEvent}
                                                </p>
                                            )}
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <label className={labelCls}>
                                                Select Date <Required />
                                            </label>
                                            <input
                                                type="date"
                                                min={today}
                                                required
                                                className={inputCls}
                                                value={fields.date}
                                                onChange={set("date")}
                                            />
                                        </div>

                                        {/* Time */}
                                        <div>
                                            <label className={labelCls}>
                                                Select Time <Required />
                                            </label>
                                            <select className={inputCls} value={fields.time} onChange={set("time")} required>
                                                <option value="">Time of event</option>
                                                {content.form.timeSlots.map((t) => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Guests */}
                                        <div className="sm:col-span-2">
                                            <label className={labelCls}>
                                                Number of Guests <Required />
                                            </label>
                                            <input
                                                type="number"
                                                min={15}
                                                step={1}
                                                required
                                                placeholder="Number of guests"
                                                className={inputCls}
                                                value={fields.guests}
                                                onChange={set("guests")}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Details heading */}
                                    <div className="mb-4 mt-6">
                                        <h4 className="text-lg font-bold text-[#15189a] border-b border-[#e4e4e4] pb-2">
                                            Contact Details
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* First Name */}
                                        <div>
                                            <label className={labelCls}>First Name <Required /></label>
                                            <input type="text" required placeholder="First name" className={inputCls} value={fields.firstName} onChange={set("firstName")} />
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label className={labelCls}>Last Name <Required /></label>
                                            <input type="text" required placeholder="Last name" className={inputCls} value={fields.lastName} onChange={set("lastName")} />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className={labelCls}>Email <Required /></label>
                                            <input type="email" required placeholder="Email address" className={inputCls} value={fields.email} onChange={set("email")} />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className={labelCls}>Phone Number <Required /></label>
                                            <input type="tel" required placeholder="Phone number" className={inputCls} value={fields.phone} onChange={set("phone")} />
                                        </div>

                                        {/* Special Requests */}
                                        <div className="sm:col-span-2">
                                            <label className={labelCls}>Special Requests (Optional)</label>
                                            <textarea
                                                rows={4}
                                                maxLength={2000}
                                                placeholder="Any special requests or notes..."
                                                className={`${inputCls} resize-none`}
                                                value={fields.specialRequests}
                                                onChange={set("specialRequests")}
                                            />
                                        </div>

                                        {/* Submit */}
                                        <div className="sm:col-span-2 mt-2">
                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full py-3 rounded-full text-white bg-[#15189a] font-bold text-sm uppercase tracking-wide transition-all duration-300 disabled:opacity-60"
                                                // style={{ background: "linear-gradient(to bottom, #15189a, #040651)" }}
                                                onMouseEnter={(e) => { if (status !== "submitting") e.currentTarget.style.background = "linear-gradient(to bottom, #040651, #15189a)"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #15189a, #040651)"; }}
                                            >
                                                {status === "submitting" ? "Submitting…" : "Submit Form"}
                                            </button>
                                            {status === "error" && (
                                                <p className="mt-2 text-sm text-center text-[#FF0000]">
                                                    Something went wrong. Please try again.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}