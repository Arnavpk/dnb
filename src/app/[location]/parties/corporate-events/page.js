import CorporateEventForm from "@/components/parties-n-events/corporate-events/Corporateeventform";
import CorporatePageHeader from "@/components/parties-n-events/corporate-events/Corporatepageheader";
import FlavorsCarousel from "@/components/parties-n-events/corporate-events/Flavorscarousel";
import MenuListSection from "@/components/parties-n-events/corporate-events/Menulistsection";
import TeamBuildingIntro from "@/components/parties-n-events/corporate-events/Teambuildingintro";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getRichTextSection,
    getCarouselSection,
} from "@/lib/strapi";

export default async function CorporateEventsPage({ params }) {
    const { location } = await params;
    const page = await getPage(location, "corporate-events");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const richTextSection = getRichTextSection(sections);
    const carouselSection = getCarouselSection(sections);

    // First text-image-section → CorporateEventForm (image + body)
    // Second text-image-section → MenuListSection (image + menu items)
    const formImageSection = textImageSections[0] ?? null;
    const menuSection = textImageSections[1] ?? null;

    return (
        <>
            <CorporatePageHeader section={heroSection} />
            <CorporateEventForm section={formImageSection} />
            <FlavorsCarousel section={carouselSection} />
            <TeamBuildingIntro section={richTextSection} />
            <MenuListSection section={menuSection} />
        </>
    );
}