"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.413545174665!2d77.61729637405007!3d12.945368615454965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1447fa3fffff%3A0xe76bad49ef412e0c!2sDave%20%26%20Buster's!5e0!3m2!1sen!2sin!4v1738919678334!5m2!1sen!2sin",
    height: 448, // px — matches original height="448"
    title: "Dave & Buster's Bangalore — Google Maps",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LocationMap() {
    return (
        <div className="w-full pb-7">
            <iframe
                src={content.embedUrl}
                title={content.title}
                width="100%"
                height={content.height}
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}