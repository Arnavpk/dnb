"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import {
    MapPin, Calendar, Search,
    ChevronDown, X, Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CitySelectModal from "@/components/Cityselectmodal";

// ─── Static nav structure — location slug injected at render time ─────────────
function buildNav(loc) {
    return [
        { label: "Eat & Drink", href: `/${loc}/eat-n-drink/` },
        {
            label: "Play",
            href: `/${loc}/play/overview`,
            children: [
                { label: "Overview", href: `/${loc}/play/overview` },
                { label: "Arcade", href: `/${loc}/play/arcade/` },
                { label: "VR", href: `/${loc}/play/vr/` },
                { label: "Hi-Tech Darts", href: `/${loc}/play/hi-tech-darts/` },
                { label: "Nitro Bowling", href: `/${loc}/play/nitro-bowling/` },
                { label: "Immersive Pool", href: `/${loc}/play/immersive-pool/` },
            ],
        },
        { label: "Watch", href: `/${loc}/watch/` },
        {
            label: "Parties & Events",
            href: `/${loc}/parties`,
            children: [
                { label: "Overview", href: `/${loc}/parties/overview/` },
                { label: "Corporate Events", href: `/${loc}/parties/corporate-events/` },
                { label: "Birthday Party", href: `/${loc}/parties/birthday-party/` },
                { label: "Social Events", href: `/${loc}/parties/social-events/` },
            ],
        },
        {
            label: "Offers",
            href: `/${loc}/offers`,
            children: [
                { label: "Birthday Offer", href: `/${loc}/offers/birthday-offer/` },
                { label: "All Offers", href: `/${loc}/offers/all-offer` },
                { label: "Summer Offers", href: `/${loc}/offers/summer-offer` },
            ],
        },
        {
            label: "About",
            href: `/${loc}/about`,
            children: [
                { label: "Contact Us", href: `/${loc}/about/contact` },
                { label: "Blog", href: `/${loc}/about/blog` },
                { label: "Delhi (Coming Soon)", href: `/${loc}/about/delhi-coming-soon` },
                { label: "FAQ", href: `/${loc}/about/faq` },
                { label: "History", href: `/${loc}/about/history` },
            ],
        },
    ];
}

const LOGO = {
    src: "https://daveandbustersindia.com/wp-content/uploads/2024/09/dnb-logo-tilted-white.svg",
    alt: "Dave & Buster Logo",
};

const BOOK_NOW_ITEMS = [
    { label: "🍽️ Reserve a Table", href: "#", modal: "bookatableform" },
    { label: "🎮 Book Games", href: "/book/bookings/gamebooking" },
    { label: "💳 Buy Power Card", href: "/book/bookings/powercard/buy" },
    { label: "💳 Recharge Power Card", href: "/book/bookings/powercard/recharge" },
];

// City slug → display label map
const CITY_LABELS = {
    bangalore: "Bangalore",
    mumbai: "Mumbai",
    delhi: "Delhi",
};

// ─── Nav Dropdown ─────────────────────────────────────────────────────────────
function NavDropdown({ item, alignRight = false }) {
    const [open, setOpen] = useState(false);
    return (
        <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                className="flex items-center gap-1 text-[#15189a] py-2"
                style={{ fontFamily: '"Libre Franklin", sans-serif', fontWeight: 700, fontSize: "20px" }}
                onClick={() => setOpen((o) => !o)}
            >
                {item.label}
                <ChevronDown size={20} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <ul className={`absolute top-full ${alignRight ? "right-0" : "left-0"} mt-0 bg-white rounded-lg shadow-xl min-w-[190px] z-50 py-2`}>
                    {item.children.map((child) => (
                        <li key={child.label}>
                            <Link href={child.href} className="block px-4 py-2 text-sm text-[#15189a] font-medium hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                                {child.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

// ─── Book Now Dropdown ────────────────────────────────────────────────────────
function BookNowDropdown({ onReserve }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 text-[#15189a] whitespace-nowrap"
                style={{ border: "4px solid #15189a", borderRadius: "50px", padding: "6px 16px", backgroundColor: "transparent", fontFamily: '"Libre Franklin", sans-serif', fontWeight: 600, fontSize: "18px" }}
            >
                <span>Book Now</span>
                <Calendar size={18} strokeWidth={2} />
            </button>
            {open && (
                <ul className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl min-w-[220px] z-50 py-2">
                    {BOOK_NOW_ITEMS.map((item) => (
                        <li key={item.label}>
                            {item.modal === "bookatableform" ? (
                                <button type="button" onClick={() => { onReserve(); setOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-[#15189a] font-medium hover:bg-gray-50 transition-colors">
                                    {item.label}
                                </button>
                            ) : (
                                <Link href={item.href} className="block px-4 py-2 text-sm text-[#15189a] font-medium hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose, onReserve, onCitySelect, nav, cityLabel }) {
    const [expandedItem, setExpandedItem] = useState(null);
    const [bookOpen, setBookOpen] = useState(false);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto xl:hidden">
            <div className="flex justify-between items-center px-4 py-4 bg-[#ff6f00]">
                <Image src={LOGO.src} alt={LOGO.alt} width={100} height={60} unoptimized />
                <button type="button" onClick={onClose} className="text-white p-2"><X size={24} /></button>
            </div>

            <div className="px-4 py-3 border-b border-gray-200">
                <button type="button" className="flex items-center gap-2 text-[#15189a] font-bold w-full" onClick={() => setBookOpen((o) => !o)}>
                    <Calendar size={18} />
                    <span>Book Now</span>
                    <ChevronDown size={16} className={`ml-auto transition-transform ${bookOpen ? "rotate-180" : ""}`} />
                </button>
                {bookOpen && (
                    <ul className="mt-2">
                        {BOOK_NOW_ITEMS.map((item) => (
                            <li key={item.label}>
                                {item.modal === "bookatableform" ? (
                                    <button type="button" onClick={onReserve} className="block w-full text-left px-2 py-2 text-sm text-[#15189a] font-medium">{item.label}</button>
                                ) : (
                                    <Link href={item.href} className="block px-2 py-2 text-sm text-[#15189a] font-medium" onClick={onClose}>{item.label}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <nav className="flex-1">
                <ul>
                    {nav.map((item) => (
                        <li key={item.label}>
                            {item.children ? (
                                <>
                                    <button type="button" className="flex items-center justify-between w-full py-3 px-4 text-[#15189a] font-bold text-base border-b border-gray-200" onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}>
                                        {item.label}
                                        <ChevronDown size={16} className={`transition-transform ${expandedItem === item.label ? "rotate-180" : ""}`} />
                                    </button>
                                    {expandedItem === item.label && (
                                        <ul className="bg-gray-50">
                                            {item.children.map((child) => (
                                                <li key={child.label}>
                                                    <Link href={child.href} className="block px-8 py-2 text-[#15189a] text-sm border-b border-gray-100" onClick={onClose}>{child.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link href={item.href} className="block py-3 px-4 text-[#15189a] font-bold text-base border-b border-gray-200" onClick={onClose}>{item.label}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ background: "#15189a" }} className="w-full">
                <button type="button" onClick={onCitySelect} className="flex items-center justify-center gap-2 w-full py-2 text-white font-semibold text-sm">
                    <MapPin size={16} />
                    <span>{cityLabel}</span>
                    <ChevronDown size={14} className="ml-1" />
                </button>
            </div>
        </div>
    );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
    const params = useParams();
    const pathname = usePathname();

    // Derive current location slug from URL — this is always correct
    const locationSlug = params?.location ?? "bangalore";
    const cityLabel = CITY_LABELS[locationSlug] ?? locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1);

    // Build nav with current location
    const nav = buildNav(locationSlug);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [reserveOpen, setReserveOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] bg-[#ff6f00] shadow-lg overflow-visible">

                {/* ── DESKTOP (xl+) ───────────────────────────────────────────── */}
                <div className="hidden xl:flex items-center justify-between w-full mx-auto"
                    style={{ height: "160px", maxWidth: "1408px", paddingLeft: "15px", paddingRight: "15px", fontFamily: '"Libre Franklin", sans-serif' }}>

                    <Link href={`/${locationSlug}/`} className="flex-none flex items-center"
                        style={{ padding: "0 15px", alignSelf: "stretch", marginTop: "-20px", marginBottom: "-20px" }}>
                        <Image src={LOGO.src} alt={LOGO.alt} width={210} height={210} unoptimized style={{ width: "210px", height: "210px" }} />
                    </Link>

                    <div className="flex-none flex" style={{ flexDirection: "row-reverse", alignContent: "flex-end", alignSelf: "stretch", padding: "0 15px" }}>
                        <div className="flex flex-col" style={{ paddingTop: "1rem", alignSelf: "stretch", justifyContent: "space-between", paddingBottom: "0.75rem" }}>

                            <div className="flex items-center justify-between" style={{ gap: "16px", marginBottom: "0.75rem" }}>
                                <button type="button" onClick={() => setCityOpen(true)}
                                    className="flex items-center gap-2 font-medium text-white whitespace-nowrap cursor-pointer"
                                    style={{ background: "linear-gradient(180deg, #040651, #15189a)", borderRadius: "50px", padding: "6px 16px", fontFamily: '"Libre Franklin", sans-serif', fontSize: "18px" }}>
                                    <span>{cityLabel}</span>
                                    <MapPin size={16} strokeWidth={2} />
                                </button>

                                <BookNowDropdown onReserve={() => setReserveOpen(true)} />

                                <div>
                                    {searchOpen ? (
                                        <div className="flex items-center gap-2 bg-white" style={{ borderRadius: "50px", padding: "6px 16px" }}>
                                            <Search size={15} className="text-[#15189a]" />
                                            <input autoFocus type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                                className="bg-transparent text-[#15189a] text-sm outline-none w-36"
                                                style={{ fontFamily: '"Libre Franklin", sans-serif', fontWeight: 700 }} />
                                            <button type="button" onClick={() => setSearchOpen(false)}><X size={15} className="text-[#15189a]" /></button>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => setSearchOpen(true)}
                                            className="flex items-center gap-2 text-[#15189a]"
                                            style={{ fontFamily: '"Libre Franklin", sans-serif', fontWeight: 700, fontSize: "18px" }}>
                                            <Search size={18} strokeWidth={2.5} />
                                            <span>Search</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <nav style={{ alignSelf: "stretch" }}>
                                <ul className="flex items-center justify-between p-0 m-0 list-none"
                                    style={{ columnGap: "4rem", marginLeft: 0, alignSelf: "stretch", alignItems: "center", fontFamily: '"Libre Franklin", sans-serif' }}>
                                    {nav.map((item, index) =>
                                        item.children ? (
                                            <NavDropdown key={item.label} item={item} alignRight={index >= nav.length - 2} />
                                        ) : (
                                            <li key={item.label}>
                                                <Link href={item.href} className="block text-[#15189a] py-1"
                                                    style={{ fontFamily: '"Libre Franklin", sans-serif', fontWeight: 700, fontSize: "20px" }}>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE (below xl) ───────────────────────────────────────── */}
                <div className="xl:hidden">
                    <div className="flex items-center justify-between px-3" style={{ minHeight: "110px" }}>
                        <Link href={`/${locationSlug}/`} className="shrink-0" style={{ marginBottom: "-10px" }}>
                            <Image src={LOGO.src} alt={LOGO.alt} width={160} height={110} unoptimized style={{ width: "160px", height: "auto" }} />
                        </Link>
                        <div className="flex items-center gap-3 pb-1">
                            <button type="button" onClick={() => setSearchOpen((o) => !o)} className="flex flex-col items-center gap-1" aria-label="Search">
                                <span className="flex items-center justify-center bg-white rounded-full" style={{ width: "48px", height: "48px" }}>
                                    <Search size={20} className="text-[#15189a]" strokeWidth={2.5} />
                                </span>
                                <span className="text-white text-[11px] font-semibold">Search</span>
                            </button>
                            <button type="button" onClick={() => setReserveOpen(true)} className="flex flex-col items-center gap-1" aria-label="Book Now">
                                <span className="flex items-center justify-center bg-white rounded-full" style={{ width: "48px", height: "48px" }}>
                                    <Calendar size={20} className="text-[#15189a]" strokeWidth={2.5} />
                                </span>
                                <span className="text-white text-[11px] font-semibold">Book Now</span>
                            </button>
                            <button type="button" onClick={() => setMobileOpen(true)} className="flex flex-col items-center gap-1" aria-label="Menu">
                                <span className="flex items-center justify-center rounded-full" style={{ width: "48px", height: "48px", backgroundColor: "#15189a" }}>
                                    <Menu size={22} className="text-white" strokeWidth={2.5} />
                                </span>
                                <span className="text-[11px] opacity-0 select-none">Menu</span>
                            </button>
                        </div>
                    </div>

                    {searchOpen && (
                        <div className="px-4 pb-3">
                            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                                <Search size={16} className="text-white" />
                                <input autoFocus type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent text-white placeholder-white/70 text-sm outline-none flex-1" />
                                <button onClick={() => setSearchOpen(false)}><X size={16} className="text-white" /></button>
                            </div>
                        </div>
                    )}

                    <div className="w-full" style={{ background: "#15189a" }}>
                        <button type="button" onClick={() => setCityOpen(true)}
                            className="flex items-center justify-center gap-2 w-full py-2 text-white font-semibold text-sm">
                            <MapPin size={14} />
                            <span>{cityLabel}</span>
                            <ChevronDown size={13} className="ml-1" />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onReserve={() => { setMobileOpen(false); setReserveOpen(true); }}
                onCitySelect={() => { setMobileOpen(false); setCityOpen(true); }}
                nav={nav}
                cityLabel={cityLabel}
            />

            <CitySelectModal
                isOpen={cityOpen}
                onClose={() => setCityOpen(false)}
                onSelectCity={() => { }}
            />

            <div className="h-[146px] xl:h-[160px]" />
        </>
    );
}