"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Compass } from "lucide-react";
import Link from "next/link";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    heading: "Choose Your Location",
    useMyLocation: "Use My Location",
    cities: [
        {
            id: "mumbai",
            label: "Mumbai",
            slug: "mumbai",
            href: "/mumbai/",
            comingSoon: false,
            icon: "https://daveandbustersindia.com/wp-content/uploads/2025/08/MUM-icon.svg",
            iconAlt: "Mumbai Icon",
        },
        {
            id: "bangalore",
            label: "Bangalore",
            slug: "bangalore",
            href: "/bangalore/",
            comingSoon: false,
            icon: "https://daveandbustersindia.com/wp-content/uploads/2025/08/BLR-icon.svg",
            iconAlt: "BLR icon",
        },
        {
            id: "delhi",
            label: "Delhi (Coming Soon..)",
            slug: "delhi",
            href: "https://daveandbustersindia.com/delhi-coming-soon/",
            comingSoon: true,
            icon: "https://daveandbustersindia.com/wp-admin/images/India%20Gate_Delhi%20icon.png",
            iconAlt: "Delhi",
        },
    ],
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CitySelectModal({ isOpen, onClose, onSelectCity }) {
    const router = useRouter();
    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelect = (city) => {
        onSelectCity?.(city.label);
        onClose();

        if (!city.comingSoon) {
            // Get current path e.g. "/bangalore/eat-n-drink"
            // Replace the first segment with the new city slug
            const currentPath = window.location.pathname; // "/bangalore/eat-n-drink"
            const segments = currentPath.split("/").filter(Boolean); // ["bangalore", "eat-n-drink"]

            // Replace city segment (index 0) with new slug
            segments[0] = city.slug;

            router.push(`/${segments.join("/")}`); // "/mumbai/eat-n-drink"
        }
    };

    const handleUseLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            () => onClose(),
            () => onClose()
        );
    };

    // Separate active cities from coming soon
    const activeCities = content.cities.filter((c) => !c.comingSoon);
    const comingSoonCities = content.cities.filter((c) => c.comingSoon);

    return (
        <div
            className="fixed inset-0 z-[600] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="citySelectModalLabel"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

            {/* Modal card */}
            <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 text-[#717580] hover:text-[#232323] transition-colors p-1 z-10"
                >
                    <X size={20} strokeWidth={2} />
                </button>

                {/* Header — border-0 pb-0 justify-content-center */}
                <div className="flex justify-center pt-6 pb-0 px-6">
                    <h4
                        id="citySelectModalLabel"
                        className="text-xl font-extrabold text-[#15189a] uppercase tracking-tight font-din text-center"
                    >
                        {content.heading}
                    </h4>
                </div>

                {/* Body */}
                <div className="px-6 pt-5 pb-6">

                    {/* Use My Location — d-flex align-items-center justify-content-between mb-4 */}
                    <button
                        type="button"
                        onClick={handleUseLocation}
                        className="w-full flex items-center justify-between mb-6 px-4 py-3 rounded-full border border-[#e4e4e4] hover:border-[#15189a] hover:bg-[#f7f7f7] transition-colors"
                    >
                        <span className="text-sm font-semibold text-[#232323]">
                            {content.useMyLocation}
                        </span>
                        {/* feather icon-feather-compass */}
                        <Compass size={18} strokeWidth={2} className="text-[#232323]" />
                    </button>

                    {/* Active cities — d-flex flex-wrap justify-content-center gap-2 */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        {activeCities.map((city) => (
                            <button
                                key={city.id}
                                type="button"
                                onClick={() => handleSelect(city)}
                                data-location-slug={city.slug}
                                data-location-name={city.label}
                                className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl hover:bg-[#f7f7f7] transition-colors group min-w-[90px]"
                            >
                                <img
                                    src={city.icon}
                                    alt={city.iconAlt}
                                    className="w-14 h-14 object-contain"
                                    draggable={false}
                                />
                                <span className="text-sm font-semibold text-[#232323] group-hover:text-[#15189a] transition-colors">
                                    {city.label}
                                </span>
                            </button>
                        ))}
                    </div>

                </div>

                {/* Delhi Coming Soon — rendered outside modal-body per source HTML structure */}
                {comingSoonCities.map((city) => (
                    <div key={city.id} className="border-t border-[#e4e4e4] px-6 py-4 flex justify-center">
                        <Link
                            href={city.href}
                            onClick={onClose}
                            className="flex flex-col items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f7f7f7] transition-colors group"
                        >
                            <img
                                src={city.icon}
                                alt={city.iconAlt}
                                className="w-14 h-14 object-contain"
                                draggable={false}
                            />
                            <span className="text-sm font-semibold text-[#232323] group-hover:text-[#15189a] transition-colors">
                                {city.label}
                            </span>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    );
}