import Header from "@/components/Header";
import Footer from "@/components/footer";
import { getPagesByLocation, getLocationBySlug } from "@/lib/strapi";

export default async function LocationLayout({ children, params }) {
    const { location } = await params;

    const [pages, locationData] = await Promise.all([
        getPagesByLocation(location),
        getLocationBySlug(location),
    ]);

    return (
        <>
            <Header pages={pages ?? []} locationSlug={location} />
            <main>{children}</main>
            <Footer
                locationSlug={location}
                pages={pages ?? []}
                locationData={locationData}
            />
        </>
    );
}