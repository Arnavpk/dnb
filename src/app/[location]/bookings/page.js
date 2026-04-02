import PartiesInnerHero from "@/components/bookings/Partiesinnerhero";
import CorporateEventForm from "@/components/bookings/Corporateeventform";


export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <PartiesInnerHero />
            <CorporateEventForm />
        </>
    );
}