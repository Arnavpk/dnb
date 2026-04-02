import FAQPageHeader from "@/components/about/faq/Faqpageheader";
import FAQAccordion from "@/components/about/faq/Faqaccordion";


// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <FAQPageHeader />
            <FAQAccordion />

        </>
    );
}