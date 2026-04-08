import InnerHero from "@/components/play/overview/Innerhero";
import GamesShowcase from "@/components/play/overview/GamesShowcase";
import HowItWorks from "@/components/play/overview/Howitworks";
import SectionIntro from "@/components/play/overview/SectionIntro";
import GamesCarousel from "@/components/play/overview/Gamescarousel ";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getStepSection,
    getQuoteSection,
    getCarouselSection,
} from "@/lib/strapi";

export default async function PlayOverviewPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "overview");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const stepSection = getStepSection(sections);
    const quoteSection = getQuoteSection(sections);
    const carouselSection = getCarouselSection(sections);

    return (
        <>
            <InnerHero section={heroSection} />
            <GamesShowcase rows={textImageSections} />
            <HowItWorks section={stepSection} />
            <SectionIntro section={quoteSection} />
            <GamesCarousel section={carouselSection} />
        </>
    );
}