import WatchInnerHero from "@/components/watch/Watchinnerhero";
import WatchSportsSection from "@/components/watch/Watchsportssection";
import CtaButtons from "@/components/watch/Ctabuttons";
import {
    getPage,
    getHeroSection,
    getWatchBottomSection,
    getBannerSection,
} from "@/lib/strapi";

export default async function WatchPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "watch");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const watchBottomSection = getWatchBottomSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <WatchInnerHero section={heroSection} />
            <WatchSportsSection section={watchBottomSection} />
            <CtaButtons section={bannerSection} />
        </>
    );
}