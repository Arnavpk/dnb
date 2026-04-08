import OffersPageHeader from "@/components/offers/all-offer/Offerpageheader";
import OffersGrid from "@/components/offers/all-offer/Offergrid";
import OffersFooterSection from "@/components/offers/all-offer/Offersfootersection";
import {
    getPage,
    getHeroWithCtaSection,
    getFooterDataRightSections,
    getBannerSection,
    getRichTextSection,
} from "@/lib/strapi";

export default async function AllOffersPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "all-offers");
    const sections = page?.sections ?? [];

    const heroWithCtaSection = getHeroWithCtaSection(sections);
    const footerDataRightSections = getFooterDataRightSections(sections);
    const bannerSection = getBannerSection(sections);
    const richTextSection = getRichTextSection(sections);

    return (
        <>
            <OffersPageHeader section={heroWithCtaSection} />
            <OffersGrid cards={footerDataRightSections} />
            <OffersFooterSection
                section={bannerSection}
                richText={richTextSection}
            />
        </>
    );
}