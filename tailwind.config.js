/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            // ── Fonts ──────────────────────────────────────────────────────────
            // --alt-font: 'DINBuster'      → font-din
            // --primary-font: Libre Franklin → font-libre
            // --404-font: Press Start 2P   → font-arcade
            fontFamily: {
                din: ["var(--font-din)", "sans-serif"],
                libre: ["var(--font-libre)", "sans-serif"],
                arcade: ['"Press Start 2P"', "cursive"],
            },

            // ── Colors ─────────────────────────────────────────────────────────
            colors: {
                // Brand core
                primary: "#15189a", // --primary-color
                secondary: "#ff6f00", // --secondary-color
                aqua: "#22d8ff", // --aqua
                pink: "#ff00bd", // --pink
                yellow: "#FFBA00", // --yellow
                "dark-blue": "#040651", // --dark-blue
                red: "#FF0000", // --red
                "light-red": "#feedec", // --light-red
                green: "#2ebb79", // --green
                "crusoe-green": "#d39121", // --crusoe-green

                // Grays
                "dark-gray": "#232323", // --dark-gray
                "medium-gray": "#717580", // --medium-gray
                "extra-medium-gray": "#e4e4e4", // --extra-medium-gray
                "light-gray": "#a8a8a8", // --light-gray
                "very-light-gray": "#f7f7f7", // --very-light-gray
                "light-medium-gray": "#eaeaeb", // --light-medium-gray

                // Slate blues (dark UI)
                "charcoal-blue": "#202329", // --charcoal-blue
                "slate-blue": "#262b35", // --slate-blue
                "medium-slate-blue": "#374162", // --medium-slate-blue
                "extra-medium-slate-blue": "#23262d", // --extra-medium-slate-blue
                "dark-slate-blue": "#1f232c", // --dark-slate-blue
                "extra-dark-slate-blue": "#121418", // --extra-dark-slate-blue
                "extra-very-slate-blue": "#161620", // --extra-very-slate-blue

                // Accents
                "tussock-yellow": "#BC8947", // --tussock-yellow
                "aluminium-grey": "#80858F", // --aluminium-grey
                "solitude-blue": "#f0f4fd", // --solitude-blue
                "golden-yellow": "#fd961e", // --golden-yellow
                "selago": "#eaedff", // --selago
                "white-ice": "#d8f5ef", // --white-ice
                "cornflower-blue": "#445fed", // --cornflower-blue
                "jade": "#00AF6B", // --jade
                "orange": "#ef991f", // --orange
                "majorelle-blue": "#724ade", // --majorelle-blue
                "light-majorelle-blue": "#f2edfe", // --light-majorelle-blue
                "spring-wood": "#f9f6f3", // --spring-wood
                "tropical-blue": "#1ea3b1", // --tropical-blue
                "camarone": "#20642b", // --camarone
                "seal-brown": "#0e0708", // --seal-brown
                "wasabi": "#8ea63a", // --Wasabi

                // Utility aliases
                white: "#ffffff", // --white
                black: "#000000", // --black
                "light-white": "#FCFCFC", // --light-white
            },

            // ── Background images ───────────────────────────────────────────────
            // Reusable gradient shorthands used across the site
            backgroundImage: {
                // Section background — dark navy (used in most sections)
                "gradient-section":
                    "linear-gradient(135deg, #15189a 0%, #0d1440 60%, #15189a 100%)",

                // Footer gradient — primary → aqua
                "gradient-footer":
                    "linear-gradient(to bottom, #15189a, #22d8ff)",

                // Parties / Bowling callout box — orange → pink
                "gradient-orange-pink":
                    "linear-gradient(to bottom, #ff6f00, #ff00bd)",

                // btn-secondary / PartiesInnerHero CTA — orange → yellow
                "gradient-btn-secondary":
                    "linear-gradient(to bottom, #ff6f00, #FFBA00)",

                // btn-primary hover — dark navy
                "gradient-btn-primary-hover":
                    "linear-gradient(to bottom, #040651, #15189a)",

                // HowItWorks / PowerCardSteps yellow section
                "gradient-yellow":
                    "linear-gradient(135deg, #f5c400 0%, #f0b800 100%)",
            },

            // ── Border radius ───────────────────────────────────────────────────
            // --border-radius-24px used extensively on cards
            borderRadius: {
                "4xl": "24px",   // maps to border-radius-24px
                "5xl": "25px",   // maps to .is-content-area border-radius: 25px
            },

            // ── Spacing extras ──────────────────────────────────────────────────
            spacing: {
                "15px": "15px",
                "20px": "20px",
                "25px": "25px",
                "30px": "30px",
                "35px": "35px",
                "40px": "40px",
                "50px": "50px",
                "55px": "55px",
                "100px": "100px",
            },

            // ── Min / max heights ───────────────────────────────────────────────
            minHeight: {
                "450px": "450px",
                "550px": "550px",
            },

            // ── Heights ─────────────────────────────────────────────────────────
            height: {
                "35px": "35px",
                "450px": "450px",
                "550px": "550px",
            },

            // ── Width ───────────────────────────────────────────────────────────
            width: {
                "35px": "35px",
            },

            // ── Container ───────────────────────────────────────────────────────
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "1rem",
                    md: "1.5rem",
                    lg: "2rem",
                    xl: "2rem",
                    "2xl": "2rem",
                },
            },

            // ── Screens — mirrors Bootstrap breakpoints in :root ────────────────
            screens: {
                sm: "576px",  // --bs-breakpoint-sm
                md: "768px",  // --bs-breakpoint-md
                lg: "992px",  // --bs-breakpoint-lg
                xl: "1200px", // --bs-breakpoint-xl
                "2xl": "1400px", // --bs-breakpoint-xxl
            },

            // ── Typography ──────────────────────────────────────────────────────
            fontSize: {
                "fs-12": ["12px", { lineHeight: "1.5" }],
                "fs-13": ["13px", { lineHeight: "1.5" }],
                "fs-14": ["14px", { lineHeight: "1.5" }],
                "fs-16": ["16px", { lineHeight: "1.5" }],
                "fs-18": ["18px", { lineHeight: "1.6" }],
                "fs-20": ["20px", { lineHeight: "1.6" }],
                "fs-22": ["22px", { lineHeight: "1.4" }],
                "fs-24": ["24px", { lineHeight: "1.4" }],
            },

            // ── Box shadows ─────────────────────────────────────────────────────
            boxShadow: {
                card: "0 4px 24px rgba(21, 24, 154, 0.10)",
                hero: "0 8px 40px rgba(21, 24, 154, 0.18)",
            },

            // ── Transition ──────────────────────────────────────────────────────
            transitionDuration: {
                DEFAULT: "300ms",
                slow: "500ms",
                slider: "700ms",
                swiper: "1000ms",
            },
        },
    },

    plugins: [],
};

export default config;