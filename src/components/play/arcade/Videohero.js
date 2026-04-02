"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    video: {
        youtubeId: "nWzWHsyQmwM",
        title: "D&B Bangalore",
        startAt: 1,
    },
    // Fallback poster shown before iframe loads (optional — set to null to skip)
    poster: null,
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VideoHero() {
    const { youtubeId, title, startAt } = content.video;

    const embedSrc = [
        `https://www.youtube.com/embed/${youtubeId}`,
        `?start=${startAt}`,
        `&autoplay=1`,
        `&mute=1`,
        `&loop=1`,
        `&playlist=${youtubeId}`,
        `&controls=0`,
        `&showinfo=0`,
        `&modestbranding=1`,
        `&rel=0`,
        `&enablejsapi=1`,
    ].join("");

    return (
        <section className="relative overflow-hidden h-[550px] md:h-[550px] p-0">
            {/* ── Dark overlay ────────────────────────────────────────────────── */}
            {/* <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" /> */}

            {/* ── YouTube background iframe ────────────────────────────────────
           The iframe is scaled up and centered to eliminate letterboxing.
           Aspect ratio of 16:9 — we ensure it always covers the container
           by making it wider than the viewport and centering it.          */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <iframe
                    src={embedSrc}
                    title={title}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute w-[177.78vh] min-w-full h-[56.25vw] min-h-full
                     top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     pointer-events-none"
                />
            </div>
        </section>
    );
}