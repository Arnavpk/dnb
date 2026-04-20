"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    games: [
        { value: "6", label: "Hi-tech Darts", slotDuration: 15 },
        { value: "7", label: "Nitro Bowling", slotDuration: 15 },
        { value: "8", label: "Immersive Pool", slotDuration: 30 },
        // When API is ready, fetch games dynamically and pass as prop
    ],
    guestOptions: [1, 2, 3, 4, 5, 6],
    // Venue open/close hours for slot generation
    venueOpen: "11:00",
    venueClose: "23:30",
    // How many slots to show initially before "View More"
    initialSlotCount: 19,
    disclaimer:
        "You must be 18 years or older to purchase a rechargeable card at Dave & Buster's. All details will be sent to the phone number provided during registration.",
    waitingNote: "Waiting rules will be applicable.",
    apiAction: "/api/game-booking",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputCls =
    "w-full rounded-full border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] placeholder-[#15189a]/50 focus:outline-none focus:ring-2 focus:ring-[#15189a]/20 transition";

const selectCls =
    "w-full rounded-full border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] focus:outline-none focus:ring-2 focus:ring-[#15189a]/20 transition appearance-none cursor-pointer";

const labelCls = "block text-sm font-semibold text-[#232323] mb-1.5";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-[#e4e4e4] last:border-0">
            <span className="text-sm text-[#717580]">{label}</span>
            <span className="text-sm font-bold text-[#15189a]">{value || "—"}</span>
        </div>
    );
}

// ─── Generate time slots between open and close hours ────────────────────────
// Returns array of "HH:MM" strings spaced by `intervalMinutes`
function generateSlots(openTime, closeTime, intervalMinutes) {
    const slots = [];
    const [openH, openM] = openTime.split(":").map(Number);
    const [closeH, closeM] = closeTime.split(":").map(Number);
    const openTotal = openH * 60 + openM;
    const closeTotal = closeH * 60 + closeM;

    for (let t = openTotal; t <= closeTotal; t += intervalMinutes) {
        const h = Math.floor(t / 60);
        const m = t % 60;
        // Format as 12-hour for display, keep 24h as value
        const display12 = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
        const value24 = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        slots.push({ display: display12, value: value24 });
    }
    return slots;
}

// ─── GST ─────────────────────────────────────────────────────────────────────
const GAME_PRICES = { "6": 599, "7": 699, "8": 799 }; // per person — update when API ready
const GST_RATE = 0.09;

function calcAmounts(gameId, guests) {
    const base = (GAME_PRICES[gameId] ?? 0) * (parseInt(guests) || 0);
    const cgst = Math.round(base * GST_RATE);
    const sgst = Math.round(base * GST_RATE);
    const total = base + cgst + sgst;
    return { base, cgst, sgst, total };
}

// ─── Step indicator data ──────────────────────────────────────────────────────
const STEPS = [
    { key: "booking", num: 1, title: "Select Game", desc: "Game, date & guests" },
    { key: "slots", num: 2, title: "Choose Time Slot", desc: "Pick your start time" },
    { key: "personal", num: 3, title: "Your Details", desc: "Name, phone & email" },
    { key: "summary", num: 4, title: "Review & Pay", desc: "Confirm and pay" },
];

function stepIndex(step) {
    return STEPS.findIndex((s) => s.key === step);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GameBookingForm({ games = null, location = "bangalore" }) {
    // `games` prop — for when API is ready, pass fetched games array here.
    // Falls back to content.games if not provided.
    const gameList = games ?? content.games;

    const [step, setStep] = useState("booking");

    const [booking, setBooking] = useState({
        game: "", date: "", guests: "", timeSlot: "",
    });

    const [personal, setPersonal] = useState({
        name: "", phone: "", email: "", acceptedTerms: true,
    });

    const [showAllSlots, setShowAllSlots] = useState(false);
    const [status, setStatus] = useState("idle");

    const setB = (key) => (e) => setBooking((f) => ({ ...f, [key]: e.target.value }));
    const setP = (key) => (e) =>
        setPersonal((f) => ({
            ...f,
            [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        }));

    // Derive selected game object
    const selectedGame = gameList.find((g) => g.value === booking.game);

    // Generate slots based on selected game's interval
    const allSlots = useMemo(() => {
        if (!selectedGame) return [];
        return generateSlots(
            content.venueOpen,
            content.venueClose,
            selectedGame.slotDuration
        );
    }, [selectedGame]);

    const visibleSlots = showAllSlots
        ? allSlots
        : allSlots.slice(0, content.initialSlotCount);

    // Validation
    const bookingValid = booking.game && booking.date && booking.guests;
    const slotValid = !!booking.timeSlot;
    const personalValid = personal.name && personal.phone.length === 10 && personal.email && personal.acceptedTerms;

    const { base, cgst, sgst, total } = calcAmounts(booking.game, booking.guests);

    const handleSubmit = async () => {
        setStatus("submitting");
        try {
            const res = await fetch(content.apiAction, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...booking, ...personal }),
            });
            setStatus(res.ok ? "done" : "error");
            if (res.ok) setStep("done");
        } catch {
            setStatus("error");
        }
    };

    // ── Confirmation screen ───────────────────────────────────────────────────
    if (step === "done") {
        return (
            <section className="bg-white py-20 text-center">
                <p className="text-3xl font-extrabold text-[#15189a] font-din mb-3">🎉 Booking Confirmed!</p>
                <p className="text-[#717580]">Details sent to {personal.phone} and {personal.email}.</p>
            </section>
        );
    }

    return (
        <section className="bg-white py-12 md:py-16">
            <div className="mx-auto px-[15px]" style={{ maxWidth: "88%" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* ── LEFT: Multi-step form ─────────────────────────────────── */}
                    <div
                        className="rounded-2xl p-6 md:p-8 shadow-xl border border-[#e4e4e4]"
                        style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
                    >

                        {/* ══ STEP 1: Game, Date, Guests ══════════════════════════ */}
                        {step === "booking" && (
                            <>
                                <h4 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-6 text-center">
                                    Book a Game
                                </h4>

                                <div className="space-y-5">
                                    <div>
                                        <label className={labelCls}>Choose your game <Required /></label>
                                        <CustomSelect
                                            value={booking.game}
                                            onChange={(e) => {
                                                setB("game")(e);
                                                setBooking((f) => ({ ...f, game: e.target.value, timeSlot: "" }));
                                                setShowAllSlots(false);
                                            }}
                                            required
                                        >
                                            <option value="">Select Game</option>
                                            {gameList.map((g) => (
                                                <option key={g.value} value={g.value}>{g.label}</option>
                                            ))}
                                        </CustomSelect>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Select visit date <Required /></label>
                                        <input
                                            type="date"
                                            required
                                            min={new Date().toISOString().split("T")[0]}
                                            className={inputCls}
                                            value={booking.date}
                                            onChange={setB("date")}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelCls}>No. of guests <Required /></label>
                                        <CustomSelect value={booking.guests} onChange={setB("guests")} required>
                                            <option value="">Select no. of guests</option>
                                            {content.guestOptions.map((n) => (
                                                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                                            ))}
                                        </CustomSelect>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    disabled={!bookingValid}
                                    onClick={() => { setShowAllSlots(false); setStep("slots"); }}
                                    className="w-full mt-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                                    onMouseEnter={(e) => { if (bookingValid) e.currentTarget.style.background = "linear-gradient(180deg, #15189a, #040651)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(180deg, #040651, #15189a)"; }}
                                >
                                    Continue
                                </button>
                            </>
                        )}

                        {/* ══ STEP 2: Time Slot ════════════════════════════════════ */}
                        {step === "slots" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setStep("booking")}
                                    className="text-sm text-[#15189a] font-semibold mb-5 flex items-center gap-1 hover:underline"
                                >
                                    ← Back
                                </button>

                                {/* Game name + slot duration badge — matches source HTML */}
                                <div className="flex items-center gap-3 mb-5">
                                    <h4 className="text-xl font-extrabold text-[#15189a] font-din">
                                        {selectedGame?.label}
                                    </h4>
                                    <span className="text-sm font-bold text-[#ff00bd] bg-[#ff00bd]/10 px-3 py-0.5 rounded-full">
                                        {selectedGame?.slotDuration} Minutes
                                    </span>
                                </div>

                                <p className="text-xs text-[#717580] mb-4">
                                    Select your preferred start time for{" "}
                                    <strong className="text-[#15189a]">{booking.date}</strong>
                                </p>

                                {/* Slot grid — wrapping buttons */}
                                <div className="flex flex-wrap gap-2">
                                    {visibleSlots.map((slot) => {
                                        const isSelected = booking.timeSlot === slot.value;
                                        return (
                                            <button
                                                key={slot.value}
                                                type="button"
                                                onClick={() => setBooking((f) => ({ ...f, timeSlot: slot.value }))}
                                                className={`px-3 py-2 rounded-lg text-sm font-bold border-2 transition-all duration-200
                                                    ${isSelected
                                                        ? "bg-[#15189a] border-[#15189a] text-white shadow-md scale-105"
                                                        : "bg-white border-[#e4e4e4] text-[#15189a] hover:border-[#15189a] hover:bg-[#f0f2ff]"
                                                    }`}
                                            >
                                                {slot.display}
                                            </button>
                                        );
                                    })}

                                    {/* View More — shown when slots are truncated */}
                                    {!showAllSlots && allSlots.length > content.initialSlotCount && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllSlots(true)}
                                            className="px-3 py-2 rounded-lg text-sm font-bold border-2 border-dashed border-[#ff6f00] text-[#ff6f00] hover:bg-[#fff8f0] transition-all"
                                        >
                                            VIEW MORE
                                        </button>
                                    )}
                                </div>

                                {/* Selected slot confirmation pill */}
                                {booking.timeSlot && (
                                    <div className="mt-5 flex items-center gap-2 text-sm">
                                        <span className="text-[#717580]">Selected:</span>
                                        <span className="bg-[#15189a] text-white px-3 py-1 rounded-full font-bold text-xs">
                                            {allSlots.find((s) => s.value === booking.timeSlot)?.display}
                                        </span>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    disabled={!slotValid}
                                    onClick={() => setStep("personal")}
                                    className="w-full mt-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                                    onMouseEnter={(e) => { if (slotValid) e.currentTarget.style.background = "linear-gradient(180deg, #15189a, #040651)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(180deg, #040651, #15189a)"; }}
                                >
                                    Continue
                                </button>
                            </>
                        )}

                        {/* ══ STEP 3: Personal Details ══════════════════════════════ */}
                        {step === "personal" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setStep("slots")}
                                    className="text-sm text-[#15189a] font-semibold mb-5 flex items-center gap-1 hover:underline"
                                >
                                    ← Back
                                </button>

                                <h4 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-6 text-center">
                                    Personal Details
                                </h4>

                                <div className="space-y-5">
                                    <div>
                                        <label className={labelCls}>Name <Required /></label>
                                        <input type="text" required placeholder="Enter your full name" className={inputCls} value={personal.name} onChange={setP("name")} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Mobile Number <Required /></label>
                                        <input
                                            type="tel" required placeholder="Enter 10 digit mobile number"
                                            maxLength={10} pattern="\d{10}" className={inputCls}
                                            value={personal.phone} onChange={setP("phone")}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Email Address <Required /></label>
                                        <input type="email" required placeholder="Enter your email address" className={inputCls} value={personal.email} onChange={setP("email")} />
                                    </div>

                                    <div className="flex items-start gap-2 text-sm text-[#232323]">
                                        <input type="checkbox" id="tnc" checked={personal.acceptedTerms} onChange={setP("acceptedTerms")} className="mt-0.5 accent-[#15189a]" />
                                        <label htmlFor="tnc">
                                            I accept{" "}
                                            <Link href="/terms-of-use" className="text-[#ff6f00] font-semibold hover:underline">Terms & Conditions</Link>
                                            {" "}and{" "}
                                            <Link href="/privacy-policy" className="text-[#ff6f00] font-semibold hover:underline">Privacy Policy</Link>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    disabled={!personalValid}
                                    onClick={() => setStep("summary")}
                                    className="w-full mt-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                                    onMouseEnter={(e) => { if (personalValid) e.currentTarget.style.background = "linear-gradient(180deg, #15189a, #040651)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(180deg, #040651, #15189a)"; }}
                                >
                                    Review Order
                                </button>
                            </>
                        )}

                        {/* ══ STEP 4: Summary + Pay ════════════════════════════════ */}
                        {step === "summary" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setStep("personal")}
                                    className="text-sm text-[#15189a] font-semibold mb-5 flex items-center gap-1 hover:underline"
                                >
                                    ← Back
                                </button>

                                <h4 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-6 text-center">
                                    📄 Summary
                                </h4>

                                <p className="text-sm text-[#717580] mb-4 flex items-center gap-1">
                                    <span>📍</span> {location.charAt(0).toUpperCase() + location.slice(1)}
                                </p>

                                <div className="rounded-xl border border-[#e4e4e4] p-4 mb-4">
                                    <SummaryRow label="Game" value={selectedGame?.label} />
                                    <SummaryRow label="Visit Date" value={booking.date} />
                                    <SummaryRow label="Time Slot" value={allSlots.find((s) => s.value === booking.timeSlot)?.display} />
                                    <SummaryRow label="Guests" value={booking.guests} />
                                </div>

                                <div className="rounded-xl border border-[#e4e4e4] p-4 mb-6">
                                    <SummaryRow label="Subtotal" value={`₹${base}`} />
                                    <SummaryRow label="CGST (9%)" value={`₹${cgst}`} />
                                    <SummaryRow label="SGST (9%)" value={`₹${sgst}`} />
                                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#e4e4e4]">
                                        <span className="font-extrabold text-[#15189a] text-lg">Total</span>
                                        <span className="font-extrabold text-[#15189a] text-lg">₹{total}</span>
                                    </div>
                                </div>

                                {status === "error" && (
                                    <p className="text-[#dc3232] text-sm mb-3">Something went wrong. Please try again.</p>
                                )}

                                <button
                                    type="button"
                                    disabled={status === "submitting"}
                                    onClick={handleSubmit}
                                    className="w-full py-3 rounded-full font-bold text-sm uppercase tracking-wide text-black transition-all duration-300 disabled:opacity-60"
                                    style={{ background: "linear-gradient(to bottom, #ff6f00, #FFBA00)" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #e66400, #e6a800)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(to bottom, #ff6f00, #FFBA00)"; }}
                                >
                                    {status === "submitting" ? "Processing…" : "Proceed to Pay"}
                                </button>
                            </>
                        )}
                    </div>

                    {/* ── RIGHT: Step progress indicator ───────────────────────── */}
                    <div className="hidden lg:flex flex-col gap-4 justify-center">
                        {STEPS.map((s) => {
                            const currentIdx = stepIndex(step);
                            const thisIdx = stepIndex(s.key);
                            const isActive = step === s.key;
                            const isDone = thisIdx < currentIdx;
                            return (
                                <div
                                    key={s.key}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all
                    ${isActive ? "border-[#ff6f00] bg-[#fff8f0]" : isDone ? "border-[#15189a]/30 bg-white" : "border-[#e4e4e4] bg-white opacity-40"}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0
                      ${isActive ? "bg-[#ff6f00] text-white" : isDone ? "bg-[#15189a] text-white" : "bg-[#e4e4e4] text-[#717580]"}`}
                                    >
                                        {isDone ? "✓" : s.num}
                                    </div>
                                    <div>
                                        <p className={`font-bold text-sm ${isActive ? "text-[#ff6f00]" : "text-[#15189a]"}`}>{s.title}</p>
                                        <p className="text-xs text-[#717580]">{s.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* ── Disclaimer ──────────────────────────────────────────────── */}
                <div className="mt-10 max-w-2xl mx-auto text-center space-y-1">
                    <p className="text-xs md:text-sm text-[#717580] leading-relaxed">{content.disclaimer}</p>
                    <p className="text-xs md:text-sm text-[#717580]">{content.waitingNote}</p>
                </div>
            </div>
        </section>
    );
}