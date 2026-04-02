"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── CMS-ready content object ────────────────────────────────────────────────
// In production: replace with data fetched from Strapi's blog/posts API
const content = {
    heading: "Blogs Library",
    subheading: "Your Hub for All Things Dave & Buster's",

    categories: [
        { id: "all", label: "All Categories" },
        { id: "eat-drinks", label: "Eat & Drinks" },
        { id: "games", label: "Games" },
        { id: "parties-events", label: "Parties & Events" },
        { id: "uncategorized", label: "Uncategorized" },
        { id: "watch", label: "Watch" },
    ],

    // Each post has a categories[] array matching category ids above
    posts: [
        {
            id: "best-sports-bar-bangalore-ipl-2026",
            href: "https://daveandbustersindia.com/blog/best-sports-bar-in-bangalore-to-watch-ipl-2026-live/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/8.-Best-Sports-Bar-in-Bangalore-to-Watch-IPL-2026-Live.jpg.jpeg", alt: "Best Sports Bar in Bangalore to Watch IPL 2026 Live" },
            date: "Mar 23, 2026",
            title: "Best Sports Bar in Bangalore to Watch IPL 2026 Live",
            excerpt: "Are you seriously going to watch the biggest tournament of the year buffering on your phone? We completely understand the...",
            categories: ["all", "eat-drinks", "games", "watch"],
        },
        {
            id: "ipl-live-screening-mumbai",
            href: "https://daveandbustersindia.com/blog/ipl-live-screening-at-the-best-sports-bar-in-mumbai/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/7.-IPL-Live-Screening-at-the-Best-Sports-Bar-in-Mumbai.jpg.jpeg", alt: "IPL Live Screening at the Best Sports Bar in Mumbai" },
            date: "Mar 23, 2026",
            title: "IPL Live Screening at the Best Sports Bar in Mumbai",
            excerpt: "Are you seriously going to watch the biggest tournament of the year on your phone? We completely understand the usual...",
            categories: ["all", "eat-drinks", "games", "watch"],
        },
        {
            id: "student-id-offer-bangalore",
            href: "https://daveandbustersindia.com/blog/student-id-offer-in-bangalore-enjoy-50-off-nitro-bowling/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/6.-Student-ID-Offer-in-Bangalore-Enjoy-50-Off-Nitro-Bowling.jpg.jpeg", alt: "Student ID Offer in Bangalore Enjoy 50% Off Nitro Bowling" },
            date: "Mar 13, 2026",
            title: "Student ID Offer in Bangalore Enjoy 50% Off Nitro Bowling",
            excerpt: "Are you surviving on instant noodles just to save up for the weekend? College life in Bangalore is absolutely amazing...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "happy-hours-mumbai",
            href: "https://daveandbustersindia.com/blog/happy-hours-in-mumbai-with-11-drinks-double-the-fun/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/5.-Happy-Hours-in-Mumbai-with-11-Drinks-–-Double-the-Fun.jpg.jpeg", alt: "Happy Hours in Mumbai with 1+1 Drinks – Double the Fun" },
            date: "Mar 13, 2026",
            title: "Happy Hours in Mumbai with 1+1 Drinks – Double the Fun",
            excerpt: "Are you tired of paying premium prices for watered-down cocktails? We completely understand the pain. You finish a long day...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "things-to-do-koramangala",
            href: "https://daveandbustersindia.com/blog/things-to-do-in-koramangala-after-work/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/4.-Things-to-Do-in-Koramangala-After-Work.jpg.jpeg", alt: "Things to Do in Koramangala After Work" },
            date: "Mar 09, 2026",
            title: "Things to Do in Koramangala After Work",
            excerpt: "Are you seriously just going to sit in traffic for two hours? You know exactly how it goes. You finally...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "indoor-date-night-mumbai",
            href: "https://daveandbustersindia.com/blog/indoor-date-night-ideas-in-mumbai-that-arent-movies/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/3.-Indoor-Date-Night-Ideas-in-Mumbai-That-Arent-Movies.jpg.jpeg", alt: "Indoor Date Night Ideas in Mumbai That Aren't Movies" },
            date: "Mar 09, 2026",
            title: "Indoor Date Night Ideas in Mumbai That Aren't Movies",
            excerpt: "Are you seriously considering another movie date? You know the exact drill. You book the tickets online. You sit in...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "womens-day-bangalore",
            href: "https://daveandbustersindia.com/blog/womens-day-celebration-in-bangalore-2026/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/2.-Womens-Day-Celebration-in-Bangalore.jpg.jpeg", alt: "Women's Day Celebration in Bangalore (2026)" },
            date: "Mar 04, 2026",
            title: "Women's Day Celebration in Bangalore (2026)",
            excerpt: "Are you seriously doing another polite brunch this year? We all have that one specific group chat. The one that...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "womens-day-mumbai",
            href: "https://daveandbustersindia.com/blog/best-womens-day-celebration-in-mumbai-2026/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/03/1.-Best-Womens-Day-Celebration-in-Mumbai.jpg.jpeg", alt: "Best Women's Day Celebration in Mumbai (2026)" },
            date: "Mar 04, 2026",
            title: "Best Women's Day Celebration in Mumbai (2026)",
            excerpt: "Are you seriously doing another polite brunch this year? We all have that one group chat. The one that starts...",
            categories: ["all", "eat-drinks", "games"],
        },
        {
            id: "corporate-team-outings-mumbai",
            href: "https://daveandbustersindia.com/blog/corporate-team-outings-in-mumbai-best-indoor-venues-for-fun-bonding/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/01/6.-Corporate-Team-Outings-in-Mumbai-Best-Indoor-Venues-for-Fun-Bonding.jpg-1.jpeg", alt: "Corporate Team Outings in Mumbai: Best Indoor Venues for Fun & Bonding" },
            date: "Jan 29, 2026",
            title: "Corporate Team Outings in Mumbai: Best Indoor Venues for Fun & Bonding",
            excerpt: "The phrase \"team building\" usually makes people groan. We've all been there. The awkward trust falls...",
            categories: ["all", "uncategorized"],
        },
        {
            id: "game-zones-mumbai",
            href: "https://daveandbustersindia.com/blog/game-zones-in-mumbai-that-are-perfect-for-weekend-plans/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2026/02/5.-Game-Zones-in-Mumbai-That-Are-Perfect-for-Weekend-Plans.jpg.jpeg", alt: "Game Zones in Mumbai That Are Perfect for Weekend Plans" },
            date: "Feb 12, 2026",
            title: "Game Zones in Mumbai That Are Perfect for Weekend Plans",
            excerpt: "Is your weekend routine on autopilot? We have all been there. You wake up on Saturday. You text the group...",
            categories: ["all", "parties-events", "games"],
        },
        {
            id: "sports-bar-bangalore",
            href: "https://daveandbustersindia.com/blog/sports-bar-in-bangalore-where-fans-eat-drink-play-together/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Sports-Bar-in-Bangalore-Where-Fans-Eat-Drink-Play-Together.webp", alt: "Sports Bar in Bangalore: Where Fans Eat, Drink & Play Together" },
            date: "Sep 22, 2025",
            title: "Sports Bar in Bangalore: Where Fans Eat, Drink & Play Together",
            excerpt: "Ever watched a last-ball thriller at home and thought, this would be insane with a big pint and a crowd...",
            categories: ["all", "watch"],
        },
        {
            id: "best-sports-bar-bangalore",
            href: "https://daveandbustersindia.com/blog/best-sports-bar-in-bangalore-experience-thrilling-game-nights/",
            image: { src: "https://daveandbustersindia.com/wp-content/uploads/2025/04/Sport-bar-in-Bangalore.png", alt: "Best Sports Bar in Bangalore – Experience Thrilling Game Nights at Dave & Buster's" },
            date: "Apr 04, 2025",
            title: "Best Sports Bar in Bangalore – Experience Thrilling Game Nights at Dave & Buster's",
            excerpt: "In the lively city of Bangalore, a place where technology meets tradition, a new culture has been steadily emerging–the sports...",
            categories: ["all", "watch"],
        },
    ],
};

// ─── Blog Post Card ───────────────────────────────────────────────────────────
function BlogCard({ post }) {
    return (
        <div className="flex flex-col mb-8">
            {/* Thumbnail */}
            <Link href={post.href} className="block overflow-hidden rounded-[10px]">
                <img
                    src={post.image.src}
                    alt={post.image.alt}
                    className="w-100% h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                />
            </Link>

            {/* Meta */}
            <p className="mt-3 mb-1 text-[17px] text-xs text-black">{post.date}</p>

            {/* Title — alt-font + text-secondary-color: #ff6f00 */}
            <h4 className="font-extrabold text-[26px] text-[#15189a] font-din mb-2 leading-snug">
                <Link href={post.href} className="hover:underline underline-offset-2 transition-colors">
                    {post.title}
                </Link>
            </h4>

            {/* Excerpt */}
            <p className="text-[17px] text-black leading-relaxed mb-3">
                {post.excerpt}
            </p>

            {/* Learn More — btn-link text-primary-color: #15189a → on dark bg use #FFBA00 */}
            <Link
                href={post.href}
                className="inline-flex items-center gap-1 text-[#15189a] font-semibold text-sm hover:underline underline-offset-2 transition-colors"
            >
                Learn More
                <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogLibrary() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filtered = content.posts.filter((p) =>
        p.categories.includes(activeCategory)
    );

    return (
        <section
            className="pt-[80px] pb-10 px-5"
        // style={{ background: "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)" }}
        >
            {/* ── Header ──────────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 mb-6">
                <div className="text-center">
                    {/* text-secondary-color: #ff6f00 */}
                    <h1 className="text-3xl uppercase md:text-4xl font-extrabold text-[#ff6f00] font-din">
                        {content.heading}
                    </h1>
                    <h2 className="mt-2 text-base md:text-lg font-extrabold text-black font-libre">
                        {content.subheading}
                    </h2>
                </div>
            </div>

            {/* ── Category tabs ────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 xl:px-8 mb-8">
                <ul
                    className="flex flex-wrap justify-center gap-x-1 gap-y-2 border-b border-[#15189a]"
                    role="tablist"
                >
                    {content.categories.map((cat) => {
                        const isActive = cat.id === activeCategory;
                        return (
                            <li key={cat.id} role="presentation">
                                <button
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative px-4 py-3 text-sm uppercase tracking-wide transition-colors
                    ${isActive
                                            ? "text-[#15189a] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#15189a]"
                                            : "text-[#15189a] hover:text-[#15189a]"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ── Post grid — 2 cols on md+, 1 col on mobile ───────────────────── */}
            <div className="container mx-auto px-4 xl:px-8">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {filtered.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white/50 py-10">
                        No posts in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}