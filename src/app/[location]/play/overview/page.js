import GamesCarousel from "@/components/play/overview/Gamescarousel ";
import GamesShowcase from "@/components/play/overview/GamesShowcase";
import HowItWorks from "@/components/play/overview/Howitworks";
import InnerHero from "@/components/play/overview/Innerhero";
import SectionIntro from "@/components/play/overview/SectionIntro";

export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <InnerHero />
            <GamesShowcase />
            <HowItWorks />
            <SectionIntro />
            <GamesCarousel />
        </>
    );
}