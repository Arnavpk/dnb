"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";

// ─── Blog Post Card ───────────────────────────────────────────────────────────
function BlogCard({ post }) {
    const href = post.external_url || `/blog/${post.slug}`;
    const image = post.cover ? getStrapiMedia(post.cover) : null;
    const isExternal = !!post.external_url;

    return (
        <div className="flex flex-col mb-8">
            {/* Thumbnail */}
            <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block overflow-hidden rounded-[10px]"
            >
                {image && (
                    <img
                        src={image}
                        alt={post.title}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        draggable={false}
                    />
                )}
            </Link>

            {/* Date */}
            {post.date_label && (
                <p className="mt-3 mb-1 text-xs text-black">{post.date_label}</p>
            )}

            {/* Title */}
            <h4 className="font-extrabold text-[26px] text-[#15189a] font-din mb-2 leading-snug">
                <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="hover:underline underline-offset-2 transition-colors"
                >
                    {post.title}
                </Link>
            </h4>

            {/* Excerpt */}
            {post.description && (
                <p className="text-[17px] text-black leading-relaxed mb-3">
                    {post.description}
                </p>
            )}

            {/* Learn More */}
            <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 text-[#15189a] font-semibold text-sm hover:underline underline-offset-2 transition-colors"
            >
                Learn More
                <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogLibrary({ articles = [], categories = [] }) {
    const [activeCategory, setActiveCategory] = useState("all");

    // Build category tabs — "All Categories" first, then from Strapi
    const tabs = [
        { id: "all", label: "All Categories" },
        ...categories.map((c) => ({ id: c.slug, label: c.name })),
    ];

    // Filter articles by selected category slug
    const filtered = activeCategory === "all"
        ? articles
        : articles.filter((a) =>
            a.categories?.some((c) => c.slug === activeCategory)
        );

    return (
        <section className="pt-[80px] pb-10 px-5">
            {/* Header */}
            <div className="container mx-auto px-4 xl:px-8 mb-6">
                <div className="text-center">
                    <h1 className="text-3xl uppercase md:text-4xl font-extrabold text-[#ff6f00] font-din">
                        Blogs Library
                    </h1>
                    <h2 className="mt-2 text-base md:text-lg font-extrabold text-black font-libre">
                        Your Hub for All Things Dave & Buster's
                    </h2>
                </div>
            </div>

            {/* Category tabs */}
            <div className="container mx-auto px-4 xl:px-8 mb-8">
                <ul className="flex flex-wrap justify-center gap-x-1 gap-y-2 border-b border-[#15189a]" role="tablist">
                    {tabs.map((cat) => {
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

            {/* Post grid */}
            <div className="container mx-auto px-4 xl:px-8">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {filtered.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-black/50 py-10">
                        No posts in this category yet.
                    </p>
                )}
            </div>
        </section>
    );
}