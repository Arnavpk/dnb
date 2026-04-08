"use client";

import Link from "next/link";

const FALLBACK = {
    phoneGroup: "+91 90280 43567",
    phoneGeneral: "+91 80 6908 8400",
    hours: "Monday-Sunday 12pm-12am IST",
    address: "Dave & Buster's Bangalore, 1st Floor, Mantri Avenue, KHB Games Village, Koramangala, Bangalore, Karnataka 560047",
};

// Props:
//   location — location object from Strapi
//              phone_group    → group booking number
//              phone_general  → general enquiry number
//              business_hours → hours string
//              address        → full address string
export default function ContactInfo({ location }) {
    const phoneGroup = location?.phone_group || FALLBACK.phoneGroup;
    const phoneGeneral = location?.phone_general || FALLBACK.phoneGeneral;
    const hours = location?.business_hours || FALLBACK.hours;
    const address = location?.address || FALLBACK.address;

    return (
        <section className="bg-[#15189a] text-white py-12 md:py-16">
            <div className="container mx-auto px-4 xl:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

                    {/* Guest Relations */}
                    <div>
                        <p className="text-[20px] font-semibold mb-1 text-white">GUEST RELATIONS</p>
                        <div className="mt-4 space-y-2">
                            <p className="text-sm md:text-base text-white/85">
                                For Group Booking —{" "}
                                <Link href={`tel:${phoneGroup.replace(/\D/g, "")}`}
                                    className="text-[#ff6f00] font-semibold hover:underline underline-offset-2">
                                    {phoneGroup}
                                </Link>
                            </p>
                            <p className="text-sm md:text-base text-white/85">
                                For General Enquiry —{" "}
                                <Link href={`tel:${phoneGeneral.replace(/\D/g, "")}`}
                                    className="text-[#ff6f00] font-semibold hover:underline underline-offset-2">
                                    {phoneGeneral}
                                </Link>
                            </p>
                            <p className="text-sm md:text-base font-semibold text-white pt-1">
                                BUSINESS HOURS :
                            </p>
                            <p className="text-sm md:text-base text-white/85">{hours}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-[20px] font-semibold mb-1 text-white">ADDRESS :</p>
                        <div className="mt-4">
                            <address className="not-italic text-sm md:text-base text-white/85 leading-relaxed">
                                {address}
                            </address>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}