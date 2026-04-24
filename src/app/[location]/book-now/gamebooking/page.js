import GameBookingForm from "@/components/book-now/gamebooking/Gamebookingform";

const LOCATION_IDS = {
    bangalore: 1,
    mumbai: 2,
};

export default async function GameBookingPage({ params }) {
    const { location } = await params;
    const locationId = LOCATION_IDS[location.toLowerCase()];

    return (
        <GameBookingForm locationId={locationId} location={location} />
    );
}