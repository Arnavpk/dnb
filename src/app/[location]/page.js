// app/[location]/page.js
import { redirect } from "next/navigation";
import HeroSlider from "@/components/Heroslider";
import FullWidthBanner from "@/components/FullwidthBanner";
import HowDoYouDnB from "@/components/HowDoYouDNB";
import ImageTextSection from "@/components/ImageTextSection";

export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <HeroSlider />
            <FullWidthBanner />
            <HowDoYouDnB />
            <ImageTextSection />
        </>
    );
}