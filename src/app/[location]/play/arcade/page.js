

import ArcadePromo from "@/components/play/arcade/Arcadepromo";
import CoreGames from "@/components/play/arcade/Coregames";
import GameGallery from "@/components/play/arcade/Gamegallery";
import PartiesCallout from "@/components/play/arcade/Partiescallout";
import VideoHero from "@/components/play/arcade/Videohero";

export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            <VideoHero />
            <ArcadePromo />
            <CoreGames />
            <GameGallery />
            <PartiesCallout />
        </>
    );
}