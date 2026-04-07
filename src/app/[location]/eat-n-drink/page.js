import InnerPageHeader from "@/components/eat-n-drink/InnerPageHeader";
import MenuShowcase from "@/components/eat-n-drink/Menushowcase";
import MenuHighlights from "@/components/eat-n-drink/Menuhighlights";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getFooterDataSection,
    getFooterDataRightSections,
} from "@/lib/strapi";

export default async function EatNDrinkPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "eat-n-drink");
    // ✅ Guard: if page not found in Strapi, sections is empty array
    const sections = page?.sections ?? [];

    // console.log("=== RAW SECTIONS ===");
    // console.log(JSON.stringify(sections, null, 2));

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const footerData = getFooterDataSection(sections);
    const footerDataRightSections = getFooterDataRightSections(sections);

    return (
        <>
            <InnerPageHeader section={heroSection} location={location} />
            <MenuShowcase rows={textImageSections} />
            <MenuHighlights data={footerData} cards={footerDataRightSections} />
        </>
    );
}

// console.log("sections:", JSON.stringify(section, null, 2));