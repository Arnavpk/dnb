import PowerCardForm from "@/components/book-now/buy-powercard/Powercardform";

export default async function RechargePowerCardPage({ params }) {
    const { location } = await params;

    return (
        <PowerCardForm mode="recharge" location={location} />
    );
}