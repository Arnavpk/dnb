import PowerCardSteps from "@/components/play/vr/Powercardsteps";
import VRInnerHero from "@/components/play/vr/Vrinnerhero";
import VRPartiesCallout from "@/components/play/vr/Vrpartiescallout";
import VRPromo from "@/components/play/vr/Vrpromo";

export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <VRInnerHero />
            <VRPromo />
            <PowerCardSteps />
            <VRPartiesCallout />
        </>
    );
}