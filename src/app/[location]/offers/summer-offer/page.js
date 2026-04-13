import SummerOfferBanner from "@/components/offers/summer-offers/Summerofferbanner";
import SummerPackages from "@/components/offers/summer-offers/Summerpackages";
import SummerTerms from "@/components/offers/summer-offers/Summerterms";


export default async function SummerOfferPage({ params }) {
    const { location } = await params;
    return (
        <>
            <SummerOfferBanner location={location} />
            <SummerPackages />
            <SummerTerms />
        </>
    );
}