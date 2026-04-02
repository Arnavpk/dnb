"use client";

import {
    Gamepad2,
    CircleDot,
    Crosshair,
    Waves,
    Glasses,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
} from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    logo: {
        src: "https://daveandbustersindia.com/wp-content/uploads/2024/10/dnb-logo-white.svg",
        alt: "Dave & Buster's Logo",
        href: "/",
    },
    address:
        "1st Floor, Mantri Avenue, KHB Games Village, Koramangala, Bangalore, Karnataka 560047",
    socials: [
        { label: "X (Twitter)", href: "https://x.com/dandb_india/", icon: "twitter" },
        { label: "Instagram", href: "https://www.instagram.com/daveandbustersindia", icon: "instagram" },
        { label: "Facebook", href: "https://www.facebook.com/DaveAndBustersIND", icon: "facebook" },
        { label: "YouTube", href: "https://www.youtube.com/@DaveAndBustersIndia", icon: "youtube" },
    ],
    quickLinks: {
        heading: "Quick Links",
        items: [
            { label: "Home", href: "/" },
            { label: "Contact Us", href: "/bangalore/contact-us/" },
            { label: "History", href: "/history/" },
            { label: "FAQ's", href: "/bangalore/faq/" },
            { label: "Privacy Policy", href: "/privacy-policy/" },
            { label: "Terms of Use", href: "/terms-of-use/" },
        ],
    },
    games: {
        heading: "Games",
        items: [
            { label: "Arcade", href: "/bangalore/play/arcade/", icon: "gamepad" },
            { label: "Nitro Bowling", href: "/bangalore/play/nitro-bowling/", icon: "circle-dot" },
            { label: "Hi-Tech Darts", href: "/bangalore/play/hi-tech-darts/", icon: "crosshair" },
            { label: "Immersive Pool", href: "/bangalore/play/immersive-pool/", icon: "waves" },
            { label: "VR", href: "/bangalore/play/vr/", icon: "glasses" },
        ],
    },
    pageLinks: {
        heading: "Page Links",
        items: [
            { label: "Eat & Drink", href: "/bangalore/eat-drink/" },
            { label: "Watch", href: "/bangalore/watch/" },
            { label: "Parties & Events", href: "/bangalore/parties/" },
            { label: "Offers", href: "/bangalore/offers/" },
            { label: "Blogs", href: "/blog/" },
        ],
    },
    copyright: "© 2026 Malpani Arcade Private Limited",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SocialIcon({ type }) {
    const cls = "w-5 h-5";
    if (type === "twitter") return <Twitter className={cls} />;
    if (type === "instagram") return <Instagram className={cls} />;
    if (type === "facebook") return <Facebook className={cls} />;
    if (type === "youtube") return <Youtube className={cls} />;
    return null;
}

function GameIcon({ type }) {
    const cls = "w-4 h-4 shrink-0";
    if (type === "gamepad") return <Gamepad2 className={cls} />;
    if (type === "circle-dot") return <CircleDot className={cls} />;
    if (type === "crosshair") return <Crosshair className={cls} />;
    if (type === "waves") return <Waves className={cls} />;
    if (type === "glasses") return <Glasses className={cls} />;
    return null;
}

function FooterHeading({ children }) {
    return (
        <p className="text-white text-lg font-semibold mb-4 relative after:absolute after:left-0 after:-bottom-1.5 after:w-8 after:h-0.5 after:bg-amber-400 after:rounded-full">
            {children}
        </p>
    );
}

// ─── Footer Component ─────────────────────────────────────────────────────────
export default function Footer() {
    return (
        <footer
            className="text-white pt-12 pb-4"
            // .footer-dark: background linear #15189a (top) → #22d8ff (bottom)
            style={{ background: "linear-gradient(to bottom, #15189a, #22d8ff)" }}
        >
            <div className="max-w-screen-xl mx-auto px-6">

                {/* ── Main grid ─────────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <a href={content.logo.href} className="inline-block mb-5">
                            <img
                                src={content.logo.src}
                                alt={content.logo.alt}
                                className="h-12 w-auto"
                            />
                        </a>

                        <p className="text-sm leading-relaxed text-white/90 mb-6 max-w-xs">
                            {content.address}
                        </p>

                        {/* Social icons
                .social-icons ul li a:
                  color: black, width/height: 45px, padding: 10px,
                  border-radius: 50%, background: white, display: flex,
                  align/justify: center
                .social-icons a: margin: 0 15px (first: ml-0, last: mr-0) */}
                        <ul className="flex items-center gap-0">
                            {content.socials.map((s, i) => (
                                <li
                                    key={s.label}
                                    className={`${i === 0 ? "ml-0" : "ml-[15px]"} ${i === content.socials.length - 1 ? "mr-0" : "mr-[15px]"
                                        }`}
                                    style={{ margin: `0 ${i === content.socials.length - 1 ? "0" : "15px"} 0 ${i === 0 ? "0" : "0"}` }}
                                >
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex items-center justify-center rounded-full text-black bg-white transition-opacity hover:opacity-80"
                                        style={{ width: 45, height: 45, padding: 10, boxSizing: "border-box" }}
                                    >
                                        <SocialIcon type={s.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <FooterHeading>{content.quickLinks.heading}</FooterHeading>
                        <ul className="space-y-2.5">
                            {content.quickLinks.items.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-sm text-white/90 hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Games */}
                    <div>
                        <FooterHeading>{content.games.heading}</FooterHeading>
                        <ul className="space-y-2.5">
                            {content.games.items.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors">
                                        <GameIcon type={item.icon} />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Page Links */}
                    <div>
                        <FooterHeading>{content.pageLinks.heading}</FooterHeading>
                        <ul className="space-y-2.5">
                            {content.pageLinks.items.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-sm text-white/90 hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Divider ───────────────────────────────────────────────────── */}
                <div className="border-t border-white/20 pt-4">
                    <p className="text-center text-xs text-white/80">
                        {content.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}