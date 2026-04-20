import PowerCardForm from "@/components/book-now/buy-powercard/Powercardform";

export default async function BuyPowerCardPage({ params }) {
    const { location } = await params;

    return (
        <PowerCardForm mode="buy" location={location} />
    );
}