import CtaButtons from "@/components/watch/Ctabuttons";
import WatchInnerHero from "@/components/watch/Watchinnerhero";
import WatchSportsSection from "@/components/watch/Watchsportssection";

export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            <WatchInnerHero />
            <WatchSportsSection />
            <CtaButtons />
        </>
    );
}