import TermsContent from "@/components/terms-of-use/Termscontent";
import TermsOfUseHeader from "@/components/terms-of-use/Termsofuseheader";



export default async function PrivacyPolicyPage({ params }) {


    return (
        <>
            <TermsOfUseHeader />
            <TermsContent />
        </>
    );
}

// console.log("sections:", JSON.stringify(section, null, 2));