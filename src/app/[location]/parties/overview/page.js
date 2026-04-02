import PartiesInnerHero from "@/components/parties-n-events/overview/Partiesinnerhero";
import PartiesPromo from "@/components/parties-n-events/overview/Partiespromo";
import PartiesSectionIntro from "@/components/parties-n-events/overview/Partiessectionintro";
import PartiesTabSection from "@/components/parties-n-events/overview/Partiestabsection";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <PartiesInnerHero />
            <PartiesPromo />
            <PartiesSectionIntro />
            <PartiesTabSection />
        </>
    );
}