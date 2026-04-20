import SummerOfferBanner from "@/components/offers/summer-offers/Summerofferbanner";
import SummerPackages from "@/components/offers/summer-offers/Summerpackages";
import SummerTerms from "@/components/offers/summer-offers/Summerterms";
import {
    getPage,
    getHeroWithCtaSection,
    getPackagesSection,
    getRichTextSection,
} from "@/lib/strapi";

export default async function SummerOfferPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "summer-offer");
    const sections = page?.sections ?? [];

    const heroWithCtaSection = getHeroWithCtaSection(sections);
    const packagesSection = getPackagesSection(sections);
    const richTextSection = getRichTextSection(sections);

    return (
        <>
            <SummerOfferBanner section={heroWithCtaSection} location={location} />
            <SummerPackages section={packagesSection} />
            <SummerTerms section={richTextSection} location={location} />
        </>
    );
}