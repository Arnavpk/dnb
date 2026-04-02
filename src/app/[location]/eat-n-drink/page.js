import InnerPageHeader from "@/components/eat-n-drink/InnerPageHeader";
import MenuHighlights from "@/components/eat-n-drink/Menuhighlights";
import MenuShowcase from "@/components/eat-n-drink/Menushowcase";



export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <InnerPageHeader />
            <MenuShowcase />
            <MenuHighlights />
        </>
    );
}