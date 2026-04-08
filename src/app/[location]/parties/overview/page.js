import PartiesInnerHero from "@/components/parties-n-events/overview/Partiesinnerhero";
import PartiesPromo from "@/components/parties-n-events/overview/Partiespromo";
import PartiesSectionIntro from "@/components/parties-n-events/overview/Partiessectionintro";
import PartiesTabSection from "@/components/parties-n-events/overview/Partiestabsection";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getRichTextSection,
    getTabSection,
} from "@/lib/strapi";

export default async function PartiesOverviewPage({ params }) {
    const { location } = await params;
    const page = await getPage(location, "parties-overview");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const richTextSection = getRichTextSection(sections);
    const tabSection = getTabSection(sections);

    return (
        <>
            <PartiesInnerHero section={heroSection} />
            <PartiesPromo sections={textImageSections} />
            <PartiesSectionIntro section={richTextSection} />
            <PartiesTabSection section={tabSection} />
        </>
    );
}