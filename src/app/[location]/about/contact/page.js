import ContactForm from "@/components/about/contact/Contactform";
import ContactInfo from "@/components/about/contact/contactinfo";
import ContactIntro from "@/components/about/contact/Contactintro";
import ContactPageHeader from "@/components/about/contact/Contactpageheader";
import ContactPartiesCallout from "@/components/about/contact/Contactpartiescallout";
import LocationMap from "@/components/about/contact/Locationmap";


// app/[location]/page.js
export default async function HomePage({ params }) {
    // params.location will be "bangalore", "mumbai", etc. based on the URL
    const { location } = await params;

    return (
        <>
            {/* Now the slider knows which city the user is looking at */}
            <ContactPageHeader />
            <ContactIntro />
            <ContactForm />
            <ContactPartiesCallout />
            <LocationMap />
            <ContactInfo />
        </>
    );
}