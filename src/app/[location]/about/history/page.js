import HistoryInnerHero from "@/components/about/history/Historyinnerhero";
import HistoryIntro from "@/components/about/history/Historyintro";
import HistoryTimeline from "@/components/about/history/Historytimeline";
import TestimonialWithImages from "@/components/about/history/Testimonialwithimages";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <HistoryInnerHero />
            <HistoryIntro />
            <HistoryTimeline />
            <TestimonialWithImages />
        </>
    );
}