"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Contact Us",
    subheading: "QUESTIONS?  COMPLIMENTS?  OPPORTUNITIES?",
    description:
        "We would love to hear from you. Whether you have a question about our games, food, or events, want to plan an unforgettable party, or simply want to share your feedback, the Dave & Buster's India team is always here to help. Reach out to us with your queries and we will get back to you as quickly as possible.\n\nHave thoughts, ideas, or just want to say hello?\n\nFor general inquiries, please fill out the form below, or you can call us directly at +91 90280 43567 using the Dave & Buster's phone number, available Monday to Sunday from 12 PM to 12 AM IST.\n\nIf you are looking for our location details, you can find complete information about the Dave & Buster's address on our website.",
    images: {
        desktop:
            "https://daveandbustersindia.com/wp-content/uploads/2025/07/Contact-Us_Desktop.jpg",
        mobile:
            "https://daveandbustersindia.com/wp-content/uploads/2025/07/Contact-Us_Mobile.jpg",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactPageHeader() {
    return (
        <section className="relative w-full overflow-hidden text-white">
            {/* ── Responsive background image ─────────────────────────────────── */}
            <picture>
                <source media="(max-width: 991px)" srcSet={content.images.mobile} />
                <img
                    src={content.images.desktop}
                    alt={content.heading}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    draggable={false}
                />
            </picture>

            {/* ── Dark overlay for readability ─────────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
            // style={{ background: "rgba(21,24,154,0.65)" }}
            />

            {/* ── Content — centered, col-md-12 text-center ───────────────────── */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-start py-16 md:py-20 text-center">
                    <div className="w-full mt-6">

                        {/* H1 — page-header-title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-din">
                            {content.heading}
                        </h1>

                        {/* H3 — no bottom margin (mb-0) */}
                        <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-white">
                            {content.subheading}
                        </h3>

                        {/* Description — page-header-description, multi-paragraph via \n\n split */}
                        <div className="mt-6 max-w-3xl mx-auto text-left md:text-center space-y-3">
                            {content.description.split("\n\n").map((para, i) => (
                                <p key={i} className="text-white text-sm md:text-base leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}