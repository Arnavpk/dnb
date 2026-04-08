import FAQPageHeader from "@/components/about/faq/Faqpageheader";
import FAQAccordion from "@/components/about/faq/Faqaccordion";
import {
    getPage,
    getHeroSection,
    getFaqSection,
} from "@/lib/strapi";

export default async function FAQPage({ params }) {
    const { location } = await params;
    const page = await getPage(location, "faq");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const faqSection = getFaqSection(sections);

    return (
        <>
            <FAQPageHeader section={heroSection} />
            <FAQAccordion section={faqSection} />
        </>
    );
}