import VRInnerHero from "@/components/play/vr/Vrinnerhero";
import VRPromo from "@/components/play/vr/Vrpromo";
import PowerCardSteps from "@/components/play/vr/Powercardsteps";
import VRPartiesCallout from "@/components/play/vr/Vrpartiescallout";
import {
    getPage,
    getHeroSection,
    getTextImageSections,
    getStepSection,
    getBannerSection,
} from "@/lib/strapi";

export default async function VRPage({ params }) {
    const { location } = await params;

    const page = await getPage(location, "vr");
    const sections = page?.sections ?? [];

    const heroSection = getHeroSection(sections);
    const textImageSections = getTextImageSections(sections);
    const stepSection = getStepSection(sections);
    const bannerSection = getBannerSection(sections);

    return (
        <>
            <VRInnerHero section={heroSection} />
            <VRPromo section={textImageSections[0]} />
            <PowerCardSteps section={stepSection} />
            <VRPartiesCallout section={bannerSection} />
        </>
    );
}