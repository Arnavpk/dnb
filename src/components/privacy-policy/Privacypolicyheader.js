"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Privacy Policy",
    description:
        'We at Malpani Arcade Private Limited, along with our subsidiaries and related companies (collectively, "Malpani Arcade"), respect your concerns about privacy. This Privacy Notice applies to personal information we collect on daveandbustersindia.com or other media form, media channel, mobile website, mobile application related, linked or otherwise connected to it or any guest Wi-Fi network in any of our stores around the world (collectively, the "Sites" or "Web Sites") on which we have posted this Privacy Notice directly or by hyperlink. This Privacy Notice describes the types of personal information we may collect on the Sites, how we may use the information, with whom we may share it and the choices available to you regarding our use of the information. We also describe the measures we take to safeguard the information and communicate how to contact us about our privacy practices.',
    // Background images — empty in source, set when assets are available
    images: {
        desktop: "",
        mobile: "",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PrivacyPolicyHeader() {
    const hasBackground = !!content.images.desktop;

    return (
        <section
            className="relative w-full overflow-hidden text-white"
            style={
                !hasBackground
                    ? { background: "#15189a" }
                    : {}
            }
        >
            {/* Background image — only when src is set */}
            {hasBackground && (
                <>
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
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "rgba(21,24,154,0.6)" }}
                    />
                </>
            )}

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 xl:px-8">
                <div className="flex justify-center items-start py-14 md:py-16 text-center">
                    <div className="w-full mt-6">

                        {/* H1 — page-header-title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-din mb-6">
                            {content.heading}
                        </h1>

                        {/* Description — page-header-description */}
                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-left md:text-center">
                            {content.description}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}