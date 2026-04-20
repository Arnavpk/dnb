import PrivacyPolicyContent from "@/components/privacy-policy/Privacypolicycontent";
import PrivacyPolicyHeader from "@/components/privacy-policy/Privacypolicyheader";


export default async function PrivacyPolicyPage({ params }) {


    return (
        <>
            <PrivacyPolicyHeader />
            <PrivacyPolicyContent />
        </>
    );
}

// console.log("sections:", JSON.stringify(section, null, 2));