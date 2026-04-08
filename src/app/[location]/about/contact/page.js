import ContactPageHeader from "@/components/about/contact/Contactpageheader";
import ContactIntro from "@/components/about/contact/Contactintro";
import ContactForm from "@/components/about/contact/Contactform";
import ContactPartiesCallout from "@/components/about/contact/Contactpartiescallout";
import LocationMap from "@/components/about/contact/Locationmap";
import ContactInfo from "@/components/about/contact/contactinfo";
import {
    getPage,
    getHeroSection,
    getQuoteSection,
    getBannerSection,
    getLocationBySlug,
} from "@/lib/strapi";

export default async function ContactPage({ params }) {
    const { location: locationSlug } = await params;

    const [page, locationData] = await Promise.all([
        getPage(locationSlug, "contact"),
        getLocationBySlug(locationSlug),
    ]);

    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const quoteSection = getQuoteSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <ContactPageHeader section={heroSection} />
            <ContactIntro section={quoteSection} location={locationData} />
            <ContactForm />
            <ContactPartiesCallout section={bannerSection} />
            <LocationMap location={locationData} />
            <ContactInfo location={locationData} />
        </>
    );
}