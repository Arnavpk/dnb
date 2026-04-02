import PoolCoreGames from "@/components/play/immersive-pool/Poolcoregames";
import PoolGallery from "@/components/play/immersive-pool/Poolgallery";
import PoolInnerHero from "@/components/play/immersive-pool/Poolinnerhero";
import PoolPartiesCallout from "@/components/play/immersive-pool/Poolpartiescallout";
import PoolPromo from "@/components/play/immersive-pool/Poolpromo";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <PoolInnerHero />
            <PoolPromo />
            <PoolCoreGames />
            <PoolGallery />
            <PoolPartiesCallout />
        </>
    );
}