import BowlingInnerHero from "@/components/play/nitro-bowling/Bowlinginnerhero";
import BowlingPromo from "@/components/play/nitro-bowling/Bowlingpromo";
import BowlingGallery from "@/components/play/nitro-bowling/Bowlinggallery";
import BowlingPartiesCallout from "@/components/play/nitro-bowling/Bowlingpartiescallout";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getArcadeImagesSection,
    getBannerSection,
} from "@/lib/strapi";

export default async function NitroBowlingPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "nitro-bowling");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const arcadeImagesSection = getArcadeImagesSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <BowlingInnerHero section={heroSection} />
            <BowlingPromo section={textImageSections[0]} />
            <BowlingGallery section={arcadeImagesSection} />
            <BowlingPartiesCallout section={bannerSection} />
        </>
    );
}