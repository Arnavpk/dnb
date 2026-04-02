import BirthdayInnerHero from "@/components/parties-n-events/birthday-parties/Birthdayinnerhero";
import BirthdayIntro from "@/components/parties-n-events/birthday-parties/Birthdayintro";
import BirthdayPromo from "@/components/parties-n-events/birthday-parties/Birthdaypromo";

// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <BirthdayInnerHero />
            <BirthdayPromo />
            <BirthdayIntro />
        </>
    );
}