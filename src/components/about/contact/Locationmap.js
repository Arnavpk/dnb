"use client";

const FALLBACK_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.413545174665!2d77.61729637405007!3d12.945368615454965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1447fa3fffff%3A0xe76bad49ef412e0c!2sDave%20%26%20Buster's!5e0!3m2!1sen!2sin!4v1738919678334!5m2!1sen!2sin";

// Props:
//   location — location object from Strapi with map_embed_url field
export default function LocationMap({ location }) {
    const embedUrl = location?.map_embed_url || FALLBACK_EMBED;

    return (
        <div className="w-full pb-7">
            <iframe
                src={embedUrl}
                title="Dave & Buster's Location — Google Maps"
                width="100%"
                height={448}
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}