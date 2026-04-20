import VideoHero from "@/components/play/arcade/Videohero";
import ArcadePromo from "@/components/play/arcade/Arcadepromo";
import CoreGames from "@/components/play/arcade/Coregames";
import GameGallery from "@/components/play/arcade/Gamegallery";
import PartiesCallout from "@/components/play/arcade/Partiescallout";
import {
    getPage,
    getHeroVideoSection,
    getTextImageSections,
    getArcadeGamesSection,
    getArcadeImagesSection,
    getBannerSection,
} from "@/lib/strapi";

export default async function ArcadePage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "arcade");
    const sections = page?.sections ?? [];

    const heroVideoSection = getHeroVideoSection(sections);
    const textImageSections = getTextImageSections(sections);
    const arcadeGamesSection = getArcadeGamesSection(sections);
    const arcadeImagesSection = getArcadeImagesSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <VideoHero section={heroVideoSection} />
            <ArcadePromo section={textImageSections[0]} />
            <CoreGames section={arcadeGamesSection} />
            <GameGallery section={arcadeImagesSection} />
            <PartiesCallout section={bannerSection} location={location} />
        </>
    );
}