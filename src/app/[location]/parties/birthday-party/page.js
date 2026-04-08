import BirthdayInnerHero from "@/components/parties-n-events/birthday-parties/Birthdayinnerhero";
import BirthdayPromo from "@/components/parties-n-events/birthday-parties/Birthdaypromo";
import BirthdayIntro from "@/components/parties-n-events/birthday-parties/Birthdayintro";
import {
    getPage,
    getHeroWithCtaSection,
    getTextImageSections,
    getQuoteSection,
} from "@/lib/strapi";

export default async function BirthdayPartyPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "birthday-party");
    const sections = page?.sections ?? [];

    const heroWithCtaSection = getHeroWithCtaSection(sections);
    const textImageSections = getTextImageSections(sections);
    const quoteSection = getQuoteSection(sections);

    return (
        <>
            <BirthdayInnerHero section={heroWithCtaSection} />
            <BirthdayPromo section={textImageSections[0]} />
            <BirthdayIntro section={quoteSection} />
        </>
    );
}