"use client";

// Props:
//   section — shared.hero-video from getHeroVideoSection(sections)
//             cta_link → YouTube video ID or full YouTube URL
//             title    → iframe title (accessibility)
const FALLBACK = {
    youtubeId: "nWzWHsyQmwM",
    title: "D&B Bangalore",
};

function extractYoutubeId(url) {
    if (!url) return null;
    // If it's already just an ID (no slashes or dots)
    if (!url.includes("/") && !url.includes(".")) return url;
    // Extract from full URL
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
}

export default function VideoHero({ section }) {
    const rawLink = section?.cta_link || null;
    const youtubeId = rawLink ? extractYoutubeId(rawLink) : FALLBACK.youtubeId;
    const title = section?.title || FALLBACK.title;

    const embedSrc = [
        `https://www.youtube.com/embed/${youtubeId}`,
        `?start=1`,
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