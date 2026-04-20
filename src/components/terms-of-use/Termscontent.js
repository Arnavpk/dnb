"use client";

import { Mail, Phone, MapPin } from "lucide-react";

// ─────────────────────────────────────────────
// CMS-ready content object — swap with Strapi
// ─────────────────────────────────────────────
const content = {
    sections: [
        {
            id: "agreement",
            heading: "Agreement to Terms",
            headingAccent: true,
            paragraphs: [
                `For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean Malpani Arcade Pvt Ltd, whose registered office is 1Modi Baug, Office No. 6, 2nd Floor, Bhamburda, Ganesh Khind Road Pune, Pune- MH 411016. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.`,
            ],
        },
        {
            id: "governed-by",
            heading: "Your use of the website and/or purchase from us are governed by following Terms and Conditions:",
            paragraphs: [
                "The content of the pages of this website is subject to change without notice.",
                "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
                "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.",
                "Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
                "All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
                "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
                "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.",
                "You may not create a link to our website from another website or document without Malpani Arcade Private Limited prior written consent.",
                "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.",
            ],
        },
        {
            id: "cancellations",
            heading: "Cancellations / Refunds",
            headingAccent: true,
            paragraphs: [
                "All bookings made, whether online or at the counter, are final. Cancellations are not allowed once a booking has been confirmed. We do not offer refunds for any cancellations, either full or partial regardless of when they are made in relation to the booking date. This policy applies uniformly across all outlets for all guests. Modifications to booking details, such as time changes, group size, or other adjustments, are also not permitted once the booking has been completed.",
                "However, we do understand that unforeseen circumstances can arise. While we do not offer refunds or cancellations, we do provide the flexibility to reschedule your booking. If you are unable to make it at your original booking time, you may contact the respective outlet directly to request a reschedule. This must be done at least three hours prior to your scheduled time slot. Rescheduling is not guaranteed and will depend on availability at the outlet, as well as specific operational considerations at that location. We recommend reaching out as early as possible to increase the likelihood of finding a convenient alternative slot.",
                "Please be aware that if you fail to show up for your booking and do not contact the outlet in time to reschedule, your booking will be considered forfeited. In such cases, no rescheduling will be offered. This policy is in place to help us manage operations effectively and offer timely experiences to all our guests.",
            ],
        },
        {
            id: "support",
            heading: null,
            paragraphs: [
                "For any questions, assistance, or further support, you are welcome to reach out to us at hey@daveandbustersindia.com. Our team is always happy to help and guide you through the process to make your experience as smooth as possible.",
            ],
            emailLink: {
                label: "hey@daveandbustersindia.com",
                href: "mailto:hey@daveandbustersindia.com",
            },
        },
        {
            id: "liability",
            heading: null,
            paragraphs: [
                "We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
            ],
        },
    ],
    contact: {
        heading: "Contact Us",
        intro:
            "In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:",
        name: "Dave & Buster's Bangalore",
        address: "Mantri Avenue Mall, 1st Floor, 80ft road, Koramangala, Bangalore – 560034",
        email: "hey@daveandbustersindia.com",
        phone: "+91 90280 43567",
        phoneHref: "tel:+919028043567",
    },
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function TermsContent() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="max-w-screen-md mx-auto px-6">

                {/* ── Text sections ── */}
                <div className="space-y-10">
                    {content.sections.map((section) => (
                        <div key={section.id}>
                            {section.heading && (
                                <h2
                                    className={`font-bold mb-3 ${section.headingAccent
                                        ? "text-[#15189a] text-xl uppercase tracking-wide"
                                        : "text-gray-800 text-base"
                                        }`}
                                >
                                    {section.heading}
                                </h2>
                            )}
                            <div className="space-y-4">
                                {section.paragraphs.map((para, i) => {
                                    // Inline email link replacement for the support section
                                    if (section.emailLink && para.includes(section.emailLink.label)) {
                                        const [before, after] = para.split(section.emailLink.label);
                                        return (
                                            <p key={i} className="text-gray-600 text-sm leading-relaxed">
                                                {before}
                                                <a
                                                    href={section.emailLink.href}
                                                    className="text-[#15189a] hover:underline font-medium"
                                                >
                                                    {section.emailLink.label}
                                                </a>
                                                {after}
                                            </p>
                                        );
                                    }
                                    return (
                                        <p key={i} className="text-gray-600 text-sm leading-relaxed">
                                            {para}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-gray-200 my-10" />

                {/* ── Contact block ── */}
                <div>
                    <h2 className="text-[#15189a] text-xl font-bold uppercase tracking-wide mb-3">
                        {content.contact.heading}
                    </h2>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                        {content.contact.intro}
                    </p>

                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 space-y-4">
                        <p className="text-gray-800 font-semibold text-base">
                            {content.contact.name}
                        </p>

                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                            <span>{content.contact.address}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="w-4 h-4 shrink-0 text-amber-500" />
                            <a
                                href={`mailto:${content.contact.email}`}
                                className="hover:text-amber-500 transition-colors"
                            >
                                {content.contact.email}
                            </a>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Phone className="w-4 h-4 shrink-0 text-amber-500" />
                            <a
                                href={content.contact.phoneHref}
                                className="hover:text-amber-500 transition-colors"
                            >
                                {content.contact.phone}
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}