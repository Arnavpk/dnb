import ComingSoonBanner from "@/components/about/delhi/Comingsoonbanner";
import DelhiAnnouncementBox from "@/components/about/delhi/Delhiannouncementbox";
import DelhiComingSoonHeader from "@/components/about/delhi/Delhicomingsoonheader";
import DelhiRegisterForm from "@/components/about/delhi/Delhiregisterform";


// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <DelhiComingSoonHeader />
            <DelhiRegisterForm />
            <ComingSoonBanner />
            <DelhiAnnouncementBox />
        </>
    );
}