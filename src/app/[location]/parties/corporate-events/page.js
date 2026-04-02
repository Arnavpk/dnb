import CorporateEventForm from "@/components/parties-n-events/corporate-events/Corporateeventform";
import CorporatePageHeader from "@/components/parties-n-events/corporate-events/Corporatepageheader";
import FlavorsCarousel from "@/components/parties-n-events/corporate-events/Flavorscarousel";
import MenuListSection from "@/components/parties-n-events/corporate-events/Menulistsection";
import TeamBuildingIntro from "@/components/parties-n-events/corporate-events/Teambuildingintro";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <CorporatePageHeader />
            <CorporateEventForm />
            <FlavorsCarousel />
            <TeamBuildingIntro />
            <MenuListSection />
        </>
    );
}