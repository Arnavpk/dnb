import BirthdayOfferBanner from "@/components/offers/birthday-offers/Birthdayofferbanner";
import BirthdayBowlingOffer from "@/components/offers/birthday-offers/Birthdaybowlingoffer";
import BirthdayCelebrate from "@/components/offers/birthday-offers/Birthdaycelebrate";
import TermsConditions from "@/components/offers/birthday-offers/Termsandconditions";
import {
    getPage,
    getSliderSection,
    getStepSection,
    getTextImageSections,
    getRichTextSection,
} from "@/lib/strapi";

export default async function BirthdayOfferPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "birthday-offer");
    const sections = page?.sections ?? [];

    const sliderSection = getSliderSection(sections);
    const stepSections = sections.filter((s) => s.__component === "shared.step-section");
    const textImageSections = getTextImageSections(sections);
    const richTextSection = getRichTextSection(sections);

    return (
        <>
            <BirthdayOfferBanner section={sliderSection} />
            <BirthdayBowlingOffer section={stepSections[0]} />
            <BirthdayCelebrate
                section={textImageSections[0]}
                stepSection={stepSections[1]}
            />
            <TermsConditions section={richTextSection} />
        </>
    );
}