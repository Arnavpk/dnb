import HistoryInnerHero from "@/components/about/history/Historyinnerhero";
import HistoryIntro from "@/components/about/history/Historyintro";
import HistoryTimeline from "@/components/about/history/Historytimeline";
import TestimonialWithImages from "@/components/about/history/Testimonialwithimages";
import {
    getPage,
    getHeroSection,
    getRichTextSection,
    getTextImageSections,
    getQuoteSection,
    getArcadeImagesSection,
} from "@/lib/strapi";

export default async function HistoryPage({ params }) {
    const { location } = await params;
    const page = await getPage(location, "history");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const richTextSection = getRichTextSection(sections);
    const textImageSections = getTextImageSections(sections);
    const quoteSection = getQuoteSection(sections);
    const arcadeImagesSection = getArcadeImagesSection(sections);

    return (
        <>
            <HistoryInnerHero section={heroSection} />
            <HistoryIntro section={richTextSection} />
            <HistoryTimeline sections={textImageSections} />
            <TestimonialWithImages quoteSection={quoteSection} imagesSection={arcadeImagesSection} />
        </>
    );
}