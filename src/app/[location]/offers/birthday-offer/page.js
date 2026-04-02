import BirthdayBowlingOffer from "@/components/offers/birthday-offers/Birthdaybowlingoffer";
import BirthdayCelebrate from "@/components/offers/birthday-offers/Birthdaycelebrate";
import BirthdayOfferBanner from "@/components/offers/birthday-offers/Birthdayofferbanner";
import TermsAndConditions from "@/components/offers/birthday-offers/Termsandconditions";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <BirthdayOfferBanner />
            <BirthdayBowlingOffer />
            <BirthdayCelebrate />
            <TermsAndConditions />
        </>
    );
}