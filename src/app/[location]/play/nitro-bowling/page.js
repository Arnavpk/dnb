import BowlingGallery from "@/components/play/nitro-bowling/Bowlinggallery";
import BowlingInnerHero from "@/components/play/nitro-bowling/Bowlinginnerhero";
import BowlingPartiesCallout from "@/components/play/nitro-bowling/Bowlingpartiescallout";
import BowlingPromo from "@/components/play/nitro-bowling/Bowlingpromo";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <BowlingInnerHero />
            <BowlingPromo />
            <BowlingGallery />
            <BowlingPartiesCallout />
        </>
    );
}