import SocialEventsInnerHero from "@/components/parties-n-events/social-events/Socialeventsinnerhero";
import SocialEventsIntro from "@/components/parties-n-events/social-events/Socialeventsinto";
import SocialEventsPromo from "@/components/parties-n-events/social-events/Socialeventspromo";
import PartyPlannerCard from "@/components/parties-n-events/social-events/Partyplannercard";
import {
    getPage,
    getHeroWithCtaSection,
    getQuoteSection,
    getTextImageSections,
    getBannerSection,
} from "@/lib/strapi";

export default async function SocialEventsPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "social-events");
    const sections = page?.sections ?? [];

    const heroWithCtaSection = getHeroWithCtaSection(sections);
    const quoteSection = getQuoteSection(sections);
    const textImageSections = getTextImageSections(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <SocialEventsInnerHero section={heroWithCtaSection} />
            <SocialEventsIntro section={quoteSection} />
            <SocialEventsPromo rows={textImageSections} />
            <PartyPlannerCard section={bannerSection} />
        </>
    );
}