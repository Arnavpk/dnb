import PoolInnerHero from "@/components/play/immersive-pool/Poolinnerhero";
import PoolPromo from "@/components/play/immersive-pool/Poolpromo";
import PoolCoreGames from "@/components/play/immersive-pool/Poolcoregames";
import PoolGallery from "@/components/play/immersive-pool/Poolgallery";
import PoolPartiesCallout from "@/components/play/immersive-pool/Poolpartiescallout";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getArcadeGamesSection,
    getArcadeImagesSection,
    getBannerSection,
} from "@/lib/strapi";

export default async function ImmersivePoolPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "immersive-pool");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const arcadeGamesSection = getArcadeGamesSection(sections);
    const arcadeImagesSection = getArcadeImagesSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <PoolInnerHero section={heroSection} />
            <PoolPromo section={textImageSections[0]} />
            <PoolCoreGames section={arcadeGamesSection} />
            <PoolGallery section={arcadeImagesSection} />
            <PoolPartiesCallout section={bannerSection} />
        </>
    );
}