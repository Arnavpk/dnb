import OffersGrid from "@/components/offers/all-offer/Offergrid";
import OffersPageHeader from "@/components/offers/all-offer/Offerpageheader";
import OffersFooterSection from "@/components/offers/all-offer/Offersfootersection";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <OffersPageHeader />
            <OffersGrid />
            <OffersFooterSection />
        </>
    );
}