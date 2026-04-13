"use client";

const packages = [
    {
        id: "2hr",
        duration: "2 Hours",
        price: "₹2,999",
        chips: "3000 Chips",
        chipsLabel: "Game Credits Loaded",
        play: "2 Hrs Play",
        playLabel: "Unlimited Games",
        tickets: "300 Tickets",
        ticketsLabel: "Redeem for Prizes",
        bestValue: false,
    },
    {
        id: "3hr",
        duration: "3 Hours",
        price: "₹4,999",
        chips: "5000 Chips",
        chipsLabel: "Game Credits Loaded",
        play: "3 Hrs Play",
        playLabel: "Unlimited Games",
        tickets: "500 Tickets",
        ticketsLabel: "Redeem for Prizes",
        bestValue: true,
    },
];

function PackageCard({ pkg }) {
    return (
        <div className={`relative rounded-3xl border-4 p-8 flex flex-col gap-6 bg-white shadow-2xl
            ${pkg.bestValue ? "border-[#ff6f00]" : "border-[#15189a]/30"}`}>

            {pkg.bestValue && (
                <div className="absolute -top-4 right-5">
                    <span className="bg-[#ff6f00] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow">
                        Best Value
                    </span>
                </div>
            )}

            {/* Duration + Price */}
            <div className="border-b border-gray-200 pb-5">
                <p className="text-[#15189a] font-bold text-xl">{pkg.duration}</p>
                <p className="text-[#ff6f00] font-extrabold text-5xl mt-2">{pkg.price}</p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🎮</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.chips}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{pkg.chipsLabel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🕹️</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.play}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{pkg.playLabel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-3xl">🎟️</span>
                    <div>
                        <p className="font-extrabold text-[#15189a] text-xl leading-tight">{pkg.tickets}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{pkg.ticketsLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SummerPackages() {
    return (
        <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1a2f9e 0%, #0d1b64 100%)" }}>
            <div className="container mx-auto px-4 xl:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-white uppercase tracking-tight font-din">
                        Unlimited Arcade Games
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
                    {packages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>


            </div>
        </section>
    );
}