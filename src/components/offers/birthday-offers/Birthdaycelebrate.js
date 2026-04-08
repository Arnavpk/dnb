"use client";

import { getStrapiMedia, blocksToText } from "@/lib/strapi";

const FALLBACK = {
    headingPrimary: "CELEBRATE YOUR BIRTHDAY AT",
    headingSecondary: "DAVE & BUSTER'S",
    subheading: "Celebrate your special day with free bowling, delicious food & exciting arcade games — unforgettable fun with friends and family!",
    // imageSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/04/company-outings.jpg",
    imageAlt: "Birthday celebration at Dave & Buster's Bangalore",
    features: [
        {
            id: "experience",
            iconSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group.png",
            iconAlt: "Target Icon",
            title: "The Ultimate Birthday Experience",
            body: "Plan your perfect day with bowling, arcade games, great food, and signature drinks.",
        },
        {
            id: "flexible",
            iconSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group-1.png",
            iconAlt: "Target Icon",
            title: "FLEXIBLE BOOKING WINDOW",
            body: "Your party, your schedule. This birthday offer is valid for five days surrounding your special day.",
        },
        {
            id: "booking",
            iconSrc: "https://daveandbustersindia.com/wp-content/uploads/2025/09/Group-2.png",
            iconAlt: "Target Icon",
            title: "EASY ONLINE BOOKING",
            body: "Booking your birthday discounts is simple. Visit the official Dave & Buster's India website.",
        },
    ],
};

// Normalize shared.text-image-section → celebrate shape
function normalizeCelebrate(section, stepSection) {
    const headingPrimary = FALLBACK.headingPrimary;
    const headingSecondary = FALLBACK.headingSecondary;
    const subheading = section?.title || FALLBACK.subheading;
    const imageSrc = section?.image ? getStrapiMedia(section.image) ?? FALLBACK.imageSrc : FALLBACK.imageSrc;
    const imageAlt = section?.title || FALLBACK.imageAlt;

    const features = stepSection?.steps?.length
        ? stepSection.steps.map((step, i) => ({
            id: step.id ?? i,
            iconSrc: step.image ? getStrapiMedia(step.image) ?? "" : FALLBACK.features[i]?.iconSrc ?? "",
            iconAlt: step.title ?? "",
            title: step.title ?? "",
            body: step.description ?? "",
        }))
        : FALLBACK.features;

    return { headingPrimary, headingSecondary, subheading, imageSrc, imageAlt, features };
}

// Props:
//   section     — shared.text-image-section from getTextImageSections(sections)[1]
//   stepSection — shared.step-section from getStepSection(sections)
export default function BirthdayCelebrate({ section, stepSection }) {
    const { headingPrimary, headingSecondary, subheading, imageSrc, imageAlt, features } =
        normalizeCelebrate(section, stepSection);

    return (
        <section className="bg-white pb-0 pt-[81px] mb-0">
            {/* Heading block */}
            <div className="pb-10">
                <div className="container mx-auto px-4 xl:px-8">
                    <div className="flex justify-center">
                        <div className="w-full md:w-10/12 text-center">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15189a] uppercase tracking-tight mb-2">
                                {headingPrimary}{" "}
                                <span className="text-[#ff6f00]">{headingSecondary}</span>
                            </h3>
                            <p className="text-[#15189a] text-sm md:text-base leading-relaxed">
                                {subheading}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image + features */}
            <div className="container mx-auto px-4 xl:px-8 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    <div className="order-1 lg:order-1">
                        <div className="overflow-hidden rounded-[24px] shadow-lg">
                            {imageSrc ? (
                                <img src={imageSrc} alt={imageAlt}
                                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy" draggable={false} />
                            ) : (
                                <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl" />
                            )}
                        </div>
                    </div>
                    <div className="order-2 lg:order-2 flex flex-col gap-8">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                                    {feature.iconSrc ? (
                                        <img src={feature.iconSrc} alt={feature.iconAlt}
                                            className="w-full h-full object-contain" loading="lazy" draggable={false} />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                    )}
                                </div>
                                <div>
                                    <h5 className="text-base font-extrabold text-[#15189a] uppercase mb-1">
                                        {feature.title}
                                    </h5>
                                    <p className="text-black text-sm leading-relaxed">{feature.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}