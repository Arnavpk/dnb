import DartsInnerHero from "@/components/play/hi-tech-darts/Dartsinnerhero";
import DartsPromo from "@/components/play/hi-tech-darts/Dartspromo";
import {
    getPage,
    getHeroWithCtaSection,
    getTextImageSections,
} from "@/lib/strapi";

export default async function HiTechDartsPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "hi-tech-darts");
    const sections = page?.sections ?? [];

    const heroWithCtaSection = getHeroWithCtaSection(sections);
    const textImageSections = getTextImageSections(sections);

    return (
        <>
            <DartsInnerHero section={heroWithCtaSection} />
            <DartsPromo section={textImageSections[0]} />
        </>
    );
}