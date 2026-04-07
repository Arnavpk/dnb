// app/[location]/page.jsx
import { notFound } from "next/navigation";
import HeroSlider from "@/components/Heroslider";
import FullWidthBanner from "@/components/FullwidthBanner";
import HowDoYouDnB from "@/components/HowDoYouDNB";
import ImageTextSection from "@/components/ImageTextSection";
import {
    getLocationBySlug,
    getPage,
    getCarouselSection,
    getTabSection,
    getBannerSection,
    getTextImageSections,
    getStrapiMedia,
} from "@/lib/strapi";

// ─── Valid cities ─────────────────────────────────────────────────────────────
const VALID_CITIES = ["bangalore", "mumbai"];

// ─── Static params for Next.js build ─────────────────────────────────────────
export async function generateStaticParams() {
    return VALID_CITIES.map((city) => ({ location: city }));
}

// ─── Page metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
    const { location } = await params;
    const page = await getPage(location, "home");

    // Use Strapi SEO component if available, fallback to defaults
    const seo = Array.isArray(page?.SEO) ? page.SEO[0] : page?.SEO;
    const cityName = location.charAt(0).toUpperCase() + location.slice(1);

    return {
        title:
            seo?.metaTitle ??
            `Dave & Buster's ${cityName} — Eat, Drink, Play & Watch`,
        description:
            seo?.metaDescription ??
            `Dave & Buster's ${cityName}: arcade games, VR, bowling, darts, food & sports bar.`,
        openGraph: {
            images: seo?.shareImage ? [getStrapiMedia(seo.shareImage)] : [],
        },
    };
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function CityHomePage({ params }) {
    const { location } = await params;

    // 1. Validate location exists in Strapi — shows 404 for unknown slugs
    const locationData = await getLocationBySlug(location);
    if (!locationData) notFound();

    // 2. Fetch the "home" page for this location
    //    Requires a Page entry in Strapi with slug="home" linked to this location
    const page = await getPage(location, "home");
    const sections = page?.sections ?? [];

    // 3. Extract sections from the dynamiczone by __component type

    // shared.carousel → HeroSlider
    // slides: [{ id, title, subtitle, cta_text, cta_link, image(media[]) }]
    const carouselSection = getCarouselSection(sections);
    const slides = carouselSection?.slides ?? [];

    // shared.banner → FullWidthBanner
    // { image, link, title, subtitle }
    const bannerSection = getBannerSection(sections);

    // shared.tab-section → HowDoYouDnB
    // { title, subtitle, tabs: [{ label, heading, description, tab_card[] }] }
    const tabSection = getTabSection(sections);

    // shared.text-image-section[] → ImageTextSection
    // [{ title, description(blocks), image(media[]) }]
    const textImageSections = getTextImageSections(sections);

    return (
        <>
            <HeroSlider slides={slides} />
            <FullWidthBanner section={bannerSection} />
            <HowDoYouDnB section={tabSection} />
            <ImageTextSection rows={textImageSections} />
        </>
    );
}