import PartiesInnerHero from "@/components/bookings/Partiesinnerhero";
import CorporateEventForm from "@/components/bookings/Corporateeventform";
import {
    getPage,
    getQuoteSection,
    getLocationBySlug,
} from "@/lib/strapi";

export default async function BookingsPage({ params }) {
    const { location: locationSlug } = await params;

    const [page, locationData] = await Promise.all([
        getPage(locationSlug, "bookings"),
        getLocationBySlug(locationSlug),
    ]);

    const sections = page?.sections ?? [];
    const quoteSection = getQuoteSection(sections);

    return (
        <>
            <PartiesInnerHero
                section={quoteSection}
                location={locationData}
            />
            <CorporateEventForm locationSlug={locationSlug} />
        </>
    );
}