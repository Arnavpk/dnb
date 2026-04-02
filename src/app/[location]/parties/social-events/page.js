import PartyPlannerCard from "@/components/parties-n-events/social-events/Partyplannercard";
import SocialEventsInnerHero from "@/components/parties-n-events/social-events/Socialeventsinnerhero";
import SocialEventsIntro from "@/components/parties-n-events/social-events/Socialeventsinto";
import SocialEventsPromo from "@/components/parties-n-events/social-events/Socialeventspromo";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <SocialEventsInnerHero />
            <SocialEventsIntro />
            <SocialEventsPromo />
            <PartyPlannerCard />
        </>
    );
}