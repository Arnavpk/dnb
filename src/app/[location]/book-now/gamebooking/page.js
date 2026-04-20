import GameBookingForm from "@/components/book-now/gamebooking/Gamebookingform";

export default async function GameBookingPage({ params }) {
    const { location } = await params;

    return (
        <GameBookingForm location={location} />
    );
}