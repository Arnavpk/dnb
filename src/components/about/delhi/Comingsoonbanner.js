"use client";

// ─── CMS-ready content object ────────────────────────────────────────────────
const content = {
    image: {
        src: "https://daveandbustersindia.com/images/COMINGSOONORANGE.png",
        alt: "DNB Coming Soon To Mumbai",
    },
};

// ─── Main Component ───────────────────────────────────────────────────────────
// .img_ht { margin-top: -102px } pulls this image up to overlap the section above it.
// This creates the visual effect of the banner bleeding into/under the previous section.
export default function ComingSoonBanner() {
    return (
        <section className="mt-[-102px] z-20 insert-0 p-0 m-0 overflow-hidden">
            <img
                src={content.image.src}
                alt={content.image.alt}
                className="w-full h-auto block max-w-full"
                loading="lazy"
                draggable={false}
            />
        </section>
    );
}