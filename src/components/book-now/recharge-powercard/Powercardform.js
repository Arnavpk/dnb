"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
  heading: "DIGITAL POWER CARD",
  // Recharge chips — uses the RECHARGE images (not BUY images)
  chips: [
    {
      id: "41",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163223_999 Chips.jpg",
      alt: "Recharge INR 999 (999 Chips) - 10% off",
      price: 999,
      label: "₹999",
      chips: "999 Chips",
      bonus: "",
    },
    {
      id: "3",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163238_2000 Chips.jpg",
      alt: "Recharge INR 2000 (2000 Chips) - 10% off",
      price: 2000,
      label: "₹2,000",
      chips: "2,000 Chips",
      bonus: "",
    },
    {
      id: "4",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163254_3000 Chips.jpg",
      alt: "Recharge INR 3000 (3000 Chips 600 Bonus) - 10% off",
      price: 3000,
      label: "₹3,000",
      chips: "3,000 Chips",
      bonus: "600 Bonus",
    },
    {
      id: "44",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163311_5000 Chips.jpg",
      alt: "Recharge INR 5000 (5000 Chips 1500 Bonus) - 10% off",
      price: 5000,
      label: "₹5,000",
      chips: "5,000 Chips",
      bonus: "1,500 Bonus",
    },
    {
      id: "7",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163335_7000 Chips.jpg",
      alt: "Recharge INR 7000 (7000 Chips 2800 Bonus) - 10% off",
      price: 7000,
      label: "₹7,000",
      chips: "7,000 Chips",
      bonus: "2,800 Bonus",
    },
    {
      id: "2",
      image: "https://daveandbustersindia.com/book/images/product_image/20260216163351_10000 Chips.jpg",
      alt: "Recharge INR 10000 (10000 Chips 4000 Bonus) - 10% off",
      price: 10000,
      label: "₹10,000",
      chips: "10,000 Chips",
      bonus: "4,000 Bonus",
    },
  ],
  disclaimer: "You must be 18 years or older to purchase a rechargeable card at Dave & Buster's. All details will be sent to the phone number provided during registration.",
  waitingNote: "Waiting rules will be applicable.",
  apiAction: "/api/power-card-recharge",
};

// ─── Shared input style ───────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-full border border-[#15189a] bg-white px-4 py-3 text-sm text-[#15189a] placeholder-[#717580] focus:outline-none focus:ring-2 focus:ring-[#15189a]/20 transition";

const labelCls = "block text-sm font-semibold text-[#232323] mb-1.5";

function Required() {
  return <span className="text-[#dc3232] ml-1">*</span>;
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#e4e4e4] last:border-0">
      <span className="text-sm text-[#717580]">{label}</span>
      <span className="text-sm font-bold text-[#15189a]">{value || "—"}</span>
    </div>
  );
}

// ─── Simple modal ─────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e4e4] shrink-0">
          <h5 className="font-extrabold text-[#15189a] font-din text-lg">{title}</h5>
          <button onClick={onClose} className="text-[#717580] hover:text-[#232323] transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-sm text-[#232323] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── GST ─────────────────────────────────────────────────────────────────────
const GST_RATE = 0.09;
function calcAmounts(price = 0) {
  const cgst  = Math.round(price * GST_RATE);
  const sgst  = Math.round(price * GST_RATE);
  return { base: price, cgst, sgst, total: price + cgst + sgst };
}

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  { key: "chips",    num: 1, title: "Select Chips",  desc: "Choose your chip package" },
  { key: "personal", num: 2, title: "Your Details",  desc: "Name, phone & email" },
  { key: "summary",  num: 3, title: "Review & Pay",  desc: "Confirm and pay" },
];
function stepIndex(step) { return STEPS.findIndex((s) => s.key === step); }

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PowerCardRechargeForm() {
  const [step, setStep]           = useState("chips");
  const [cardNumber, setCardNumber] = useState("0");
  const [selectedChip, setSelectedChip] = useState(null);
  const [personal, setPersonal]   = useState({ name: "", phone: "", email: "", acceptedTerms: true });
  const [status, setStatus]       = useState("idle");
  const [tncOpen, setTncOpen]     = useState(false);
  const [ppOpen, setPpOpen]       = useState(false);
  const scrollRef = useRef(null);

  const setP = (key) => (e) =>
    setPersonal((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const chip           = content.chips.find((c) => c.id === selectedChip);
  const personalValid  = personal.name && personal.phone.length === 10 && personal.email && personal.acceptedTerms;
  const { base, cgst, sgst, total } = calcAmounts(chip?.price);

  // Mobile horizontal scroll helpers
  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 220,  behavior: "smooth" });

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const res = await fetch(content.apiAction, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chipId: selectedChip, cardNumber, ...personal }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setStep("done");
    } catch { setStatus("error"); }
  };

  if (step === "done") {
    return (
      <section className="bg-white py-20 text-center">
        <p className="text-3xl font-extrabold text-[#15189a] font-din mb-3">🎉 Recharge Confirmed!</p>
        <p className="text-[#717580]">Details sent to {personal.phone} and {personal.email}.</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto px-[15px]" style={{ maxWidth: "88%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── LEFT: Form card ──────────────────────────────────── */}
            <div
              className="rounded-2xl p-6 md:p-8 border border-[#e4e4e4]"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            >

              {/* ══ STEP 1: Chip selection ═══════════════════════════ */}
              {step === "chips" && (
                <>
                  {/* Title */}
                  <h4 className="text-xl font-extrabold text-[#15189a] uppercase font-din text-center mb-5">
                    {content.heading}
                  </h4>

                  {/* Existing card number — visible for recharge page */}
                  <div className="mb-5">
                    <label className={labelCls}>Enter Existing Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter existing card number"
                        className={`${inputCls} pr-10`}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      {/* Green tick when not empty — matches screenshot */}
                      {cardNumber && cardNumber !== "" && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 9l4.5 4.5L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chip amount label */}
                  <div className="mb-3">
                    <p className="font-bold text-sm text-[#232323]">
                      Select chip amount <Required />
                    </p>
                  </div>

                  {/* ── Desktop: 3-col grid ── */}
                  <div className="hidden md:grid grid-cols-3 gap-3 mb-6">
                    {content.chips.map((c) => {
                      const isSelected = selectedChip === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedChip(c.id)}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200
                            ${isSelected
                              ? "border-[#ff6f00] shadow-lg scale-[1.03]"
                              : "border-transparent hover:border-[#15189a]"
                            }`}
                        >
                          <img
                            src={c.image}
                            alt={c.alt}
                            className="w-full h-auto object-cover block"
                            loading="lazy"
                            draggable={false}
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#ff6f00] rounded-full flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* ── Mobile: horizontal scroll carousel ── */}
                  <div className="md:hidden relative mb-6">
                    {/* Left arrow */}
                    <button
                      type="button"
                      onClick={scrollLeft}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-[#ff6f00] text-white flex items-center justify-center shadow-md"
                    >
                      <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>

                    {/* Scrollable chips */}
                    <div
                      ref={scrollRef}
                      className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2 snap-x snap-mandatory"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {content.chips.map((c) => {
                        const isSelected = selectedChip === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedChip(c.id)}
                            className={`relative flex-none w-[180px] rounded-xl overflow-hidden border-2 transition-all duration-200 snap-start
                              ${isSelected
                                ? "border-[#ff6f00] shadow-lg scale-[1.03]"
                                : "border-transparent"
                              }`}
                          >
                            <img
                              src={c.image}
                              alt={c.alt}
                              className="w-full h-auto object-cover block"
                              loading="lazy"
                              draggable={false}
                            />
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-[#ff6f00] rounded-full flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right arrow */}
                    <button
                      type="button"
                      onClick={scrollRight}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-[#ff6f00] text-white flex items-center justify-center shadow-md"
                    >
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Selected summary pill */}
                  {chip && (
                    <div className="mb-5 flex items-center justify-between bg-[#f0f2ff] rounded-xl px-4 py-3">
                      <div>
                        <p className="font-extrabold text-[#15189a]">{chip.label}</p>
                        <p className="text-xs text-[#717580]">
                          {chip.chips}{chip.bonus ? ` + ${chip.bonus}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedChip(null)}
                        className="text-xs text-[#717580] hover:text-[#dc3232] transition-colors"
                      >
                        ✕ Clear
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!selectedChip}
                    onClick={() => setStep("personal")}
                    className="w-full py-3 rounded-full font-bold text-sm uppercase tracking-wide text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(180deg, #040651, #15189a)" }}
                    onMouseEnter={(e) => { if (selectedChip) e.currentTarget.style.background = "linear-gradient(180deg, #15189a, #040651)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(180deg, #040651, #15189a)"; }}
                  >
                    Continue
                  </button>
                </>
              )}

              {/* ══ STEP 2: Personal Details ══════════════════════════ */}
              {step === "personal" && (
                <>
                  <button type="button" onClick={() => setStep("chips")} className="text-sm text-[#15189a] font-semibold mb-5 flex items-center gap-1 hover:underline">
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
                      <input type="tel" required placeholder="Enter 10 digit mobile number" maxLength={10} pattern="\d{10}" className={inputCls} value={personal.phone} onChange={setP("phone")} />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address <Required /></label>
                      <input type="email" required placeholder="Enter your email address" className={inputCls} value={personal.email} onChange={setP("email")} />
                    </div>
                    <div className="flex items-start gap-2 text-sm text-[#232323]">
                      <input type="checkbox" id="tnc-pcr" checked={personal.acceptedTerms} onChange={setP("acceptedTerms")} className="mt-0.5 accent-[#15189a]" />
                      <label htmlFor="tnc-pcr">
                        I accept{" "}
                        <button type="button" onClick={() => setTncOpen(true)} className="text-[#ff6f00] font-semibold hover:underline">Terms & Conditions</button>
                        {" "}and{" "}
                        <button type="button" onClick={() => setPpOpen(true)} className="text-[#ff6f00] font-semibold hover:underline">Privacy Policy</button>
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

              {/* ══ STEP 3: Summary ══════════════════════════════════ */}
              {step === "summary" && (
                <>
                  <button type="button" onClick={() => setStep("personal")} className="text-sm text-[#15189a] font-semibold mb-5 flex items-center gap-1 hover:underline">
                    ← Back
                  </button>

                  <h4 className="text-xl font-extrabold text-[#15189a] uppercase font-din mb-6 text-center">📄 Summary</h4>

                  <p className="text-sm text-[#717580] mb-4 flex items-center gap-2">
                    <span>📍</span> Mumbai
                    <span>·</span>
                    <span>📞</span> {personal.phone}
                  </p>

                  <div className="rounded-xl border border-[#e4e4e4] p-4 mb-4">
                    <p className="text-sm font-extrabold text-[#15189a] mb-2">💳 Power Card</p>
                    <SummaryRow label={`${chip?.label} — ${chip?.chips}${chip?.bonus ? ` + ${chip.bonus}` : ""}`} value={`₹${base}`} />
                  </div>

                  <div className="rounded-xl border border-[#e4e4e4] p-4 mb-6">
                    <SummaryRow label="Subtotal"  value={`₹${base}`} />
                    <SummaryRow label="CGST (9%)" value={`₹${cgst}`} />
                    <SummaryRow label="SGST (9%)" value={`₹${sgst}`} />
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#e4e4e4]">
                      <span className="font-extrabold text-[#15189a] text-lg">Total</span>
                      <span className="font-extrabold text-[#15189a] text-lg">₹{total}</span>
                    </div>
                  </div>

                  {status === "error" && <p className="text-[#dc3232] text-sm mb-3">Something went wrong. Please try again.</p>}

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

            {/* ── RIGHT: Step progress ─────────────────────────────── */}
            <div className="hidden lg:flex flex-col gap-4 justify-center">
              {STEPS.map((s) => {
                const currentIdx = stepIndex(step);
                const thisIdx    = stepIndex(s.key);
                const isActive   = step === s.key;
                const isDone     = thisIdx < currentIdx;
                return (
                  <div key={s.key} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${isActive ? "border-[#ff6f00] bg-[#fff8f0]" : isDone ? "border-[#15189a]/30 bg-white" : "border-[#e4e4e4] bg-white opacity-40"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${isActive ? "bg-[#ff6f00] text-white" : isDone ? "bg-[#15189a] text-white" : "bg-[#e4e4e4] text-[#717580]"}`}>
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

          {/* ── Disclaimer ──────────────────────────────────────────── */}
          <div className="mt-10 max-w-2xl mx-auto text-center space-y-1">
            <p className="text-xs md:text-sm text-[#717580] leading-relaxed">{content.disclaimer}</p>
            <p className="text-xs md:text-sm text-[#717580]">{content.waitingNote}</p>
          </div>
        </div>
      </section>

      {/* ── T&C Modal ─────────────────────────────────────────────── */}
      <Modal isOpen={tncOpen} onClose={() => setTncOpen(false)} title="Terms & Conditions">
        <p className="text-[#717580]">No Terms & Conditions found.</p>
      </Modal>

      {/* ── Privacy Policy Modal ─────────────────────────────────── */}
      <Modal isOpen={ppOpen} onClose={() => setPpOpen(false)} title="Privacy Policy">
        <p>
          For the full Privacy Policy, please visit{" "}
          <Link href="/privacy-policy" className="text-[#ff6f00] font-semibold hover:underline" onClick={() => setPpOpen(false)}>
            our Privacy Policy page
          </Link>.
        </p>
      </Modal>
    </>
  );
}