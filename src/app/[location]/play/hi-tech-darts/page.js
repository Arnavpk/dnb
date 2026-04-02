import DartsInnerHero from "@/components/play/hi-tech-darts/Dartsinnerhero";
import DartsPromo from "@/components/play/hi-tech-darts/Dartspromo";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <DartsInnerHero />
            <DartsPromo />
        </>
    );
}