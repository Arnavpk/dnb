// lib/strapi.js
// ─── Matched exactly to your Strapi 5 schema.json files ──────────────────────
//
// COLLECTION TYPES (src/api/):
//   location  → name, slug, address, heroImage(media[]), pages → Page[]
//   page      → title, slug, location → Location, sections(dynamiczone), SEO
//   article   → title, description, slug, cover, author, category, blocks
//
// SHARED COMPONENTS used in page.sections dynamiczone:
//   shared.hero-section       → title, subtitle, background_image(media[])
//   shared.carousel           → slides: carousel-slide[]
//   shared.carousel-slide     → title, subtitle, desktop_image(media), mobile_image(media), cta_text, cta_link
//   shared.banner             → image, link, title, subtitle
//   shared.tab-section        → title, subtitle, tabs: tab-item[]
//   shared.tab-item           → label, heading, description, tab_card: tab-card[]
//   shared.tab-card           → title, description, image(media[]), cta_text, cta_link
//   shared.text-image-section → title, description(blocks), image(media), image_position("left"|"right"), cta_text, cta_link
//   shared.hero-video         → title, subtitle, video(media[]), cta_text, cta_link
//   shared.arcade-images      → title, img1..img5(media[])
//   shared.arcade-games       → title, subtitle, img1..img3(media[]), img1_title..img3_title
//   shared.watch-bottam       → title, description, img1..img3(media[])
//   shared.step-section       → title, steps: step-item[]
//   shared.step-item          → step_number, title, description, image(media[])
//   shared.footer-data        → title, description(blocks)
//   shared.footer-data-right  → image(media), image_title, image_description(string)
//   shared.slider             → files(media[])
//   shared.media              → file(media)
//   shared.seo                → metaTitle, metaDescription, shareImage(media)
//   shared.rich-text          → body(richtext)
//   shared.quote              → title, body

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

// ─── IMAGE HELPERS ────────────────────────────────────────────────────────────

// Get URL from a single or multiple Strapi media field
export function getStrapiMedia(mediaField) {
    if (!mediaField) return null;
    const media = Array.isArray(mediaField) ? mediaField[0] : mediaField;
    if (!media?.url) return null;
    return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

// Get ALL URLs from a multiple media field
export function getStrapiMediaAll(mediaField) {
    if (!mediaField) return [];
    const arr = Array.isArray(mediaField) ? mediaField : [mediaField];
    return arr
        .filter((m) => m?.url)
        .map((m) => (m.url.startsWith("http") ? m.url : `${STRAPI_URL}${m.url}`));
}

// ─── BLOCKS → PLAIN TEXT ──────────────────────────────────────────────────────
// Converts Strapi blocks (rich text JSON) to a plain string
// Used for description fields typed as "blocks"
export function blocksToText(blocks = []) {
    if (!blocks?.length) return "";
    return blocks
        .map((block) => block.children?.map((c) => c.text).join("") ?? "")
        .join("\n");
}

// ─── CORE FETCH ───────────────────────────────────────────────────────────────

export async function fetchStrapi(endpoint, options = {}) {
    const url = `${STRAPI_URL}/api${endpoint}`;

    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        },
        next: { revalidate: options.revalidate ?? 60 },
    });

    if (!res.ok) {
        console.error(`[Strapi] ${res.status} — ${url}`);
        return null;
    }

    const json = await res.json();
    return json.data ?? json;
}

// ─── LOCATIONS ────────────────────────────────────────────────────────────────

export async function getLocations() {
    return fetchStrapi("/locations?populate=heroImage&filters[publishedAt][$notNull]=true&sort=name:asc");
}

export async function getLocationBySlug(slug) {
    const data = await fetchStrapi(
        `/locations?filters[slug][$eq]=${slug}&filters[publishedAt][$notNull]=true&populate=heroImage`
    );
    return Array.isArray(data) ? (data[0] ?? null) : null;
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
// Using indexed populate syntax required by Strapi 5 for dynamic zones.

const SECTIONS_POPULATE = [
    "populate[0]=sections",
    "populate[1]=sections.background_image",
    "populate[2]=sections.image",
    "populate[3]=sections.video",
    "populate[4]=sections.slides",
    "populate[5]=sections.slides.desktop_image",
    "populate[6]=sections.slides.mobile_image",
    "populate[7]=sections.tabs",
    "populate[8]=sections.tabs.tab_card",
    "populate[9]=sections.tabs.tab_card.image",
    "populate[10]=sections.img1",
    "populate[11]=sections.img2",
    "populate[12]=sections.img3",
    "populate[13]=sections.img4",
    "populate[14]=sections.img5",
    "populate[15]=sections.steps",
    "populate[16]=sections.steps.image",
    "populate[17]=sections.files",
    "populate[18]=sections.file",
    "populate[19]=sections.shareImage",
    "populate[20]=SEO",
    "populate[21]=SEO.shareImage",
    "populate[22]=location",
    "populate[23]=sections.slides.image",
    "populate[24]=sections.image.formats",
    // ── NEW: explicit deep populate for footer-data-right ──
    "populate[25]=sections.image.url",
    "populate[26]=sections.image.formats.thumbnail",
    "populate[27]=sections.image.formats.medium",
    "populate[28]=sections.image.formats.large",
    "populate[29]=sections.backgroundimage",
    "populate[30]=sections.faqs",
].join("&");

export async function getPage(locationSlug, pageSlug) {
    const data = await fetchStrapi(
        `/pages?filters[location][slug][$eq]=${locationSlug}&filters[slug][$eq]=${pageSlug}&filters[publishedAt][$notNull]=true&${SECTIONS_POPULATE}`
    );
    return Array.isArray(data) ? (data[0] ?? null) : null;
}

export async function getPagesByLocation(locationSlug) {
    return fetchStrapi(
        `/pages?filters[location][slug][$eq]=${locationSlug}&filters[publishedAt][$notNull]=true&fields[0]=slug&fields[1]=title`
    );
}

// ─── SECTION EXTRACTORS ───────────────────────────────────────────────────────

// → shared.carousel → HeroSlider
export function getCarouselSection(sections = []) {
    return sections.find((s) => s.__component === "shared.carousel") ?? null;
}

export function getHeroWithCtaSection(sections = []) {
    return sections.find((s) => s.__component === "shared.hero-with-cta") ?? null;
}

// → shared.tab-section → HowDoYouDnB
export function getTabSection(sections = []) {
    return sections.find((s) => s.__component === "shared.tab-section") ?? null;
}

// → shared.hero-section → InnerPageHeader
export function getHeroSection(sections = []) {
    return sections.find((s) => s.__component === "shared.hero-section") ?? null;
}

// → shared.banner → FullWidthBanner
export function getBannerSection(sections = []) {
    return sections.find((s) => s.__component === "shared.banner") ?? null;
}

// → shared.text-image-section[] → MenuShowcase / ImageTextSection
// Returns ALL text-image-section entries in order
// Each: { title, description(blocks), image(media), image_position, cta_text, cta_link }
export function getTextImageSections(sections = []) {
    return sections.filter((s) => s.__component === "shared.text-image-section");
}

// → shared.footer-data → MenuHighlights left column
// { title, description(blocks) }
export function getFooterDataSection(sections = []) {
    return sections.find((s) => s.__component === "shared.footer-data") ?? null;
}

// → shared.footer-data-right[] → MenuHighlights cards
// Returns ALL footer-data-right entries in order
// Each: { image(media), image_title, image_description(string) }
export function getFooterDataRightSections(sections = []) {
    return sections.filter((s) => s.__component === "shared.footer-data-right");
}

// → shared.arcade-images → Gamegallery
export function getArcadeImagesSection(sections = []) {
    return sections.find((s) => s.__component === "shared.arcade-images") ?? null;
}

// → shared.arcade-games → Coregames
export function getArcadeGamesSection(sections = []) {
    return sections.find((s) => s.__component === "shared.arcade-games") ?? null;
}

// → shared.hero-video → Videohero
export function getHeroVideoSection(sections = []) {
    return sections.find((s) => s.__component === "shared.hero-video") ?? null;
}

// → shared.step-section → Howitworks / Powercardsteps
export function getStepSection(sections = []) {
    return sections.find((s) => s.__component === "shared.step-section") ?? null;
}

// → shared.watch-bottam → Watchsportssection
export function getWatchBottomSection(sections = []) {
    return sections.find((s) => s.__component === "shared.watch-bottam") ?? null;
}

// → shared.slider
export function getSliderSection(sections = []) {
    return sections.find((s) => s.__component === "shared.slider") ?? null;
}

// → shared.media
export function getMediaSection(sections = []) {
    return sections.find((s) => s.__component === "shared.media") ?? null;
}

// → shared.rich-text
export function getRichTextSection(sections = []) {
    return sections.find((s) => s.__component === "shared.rich-text") ?? null;
}

// → shared.quote
export function getQuoteSection(sections = []) {
    return sections.find((s) => s.__component === "shared.quote") ?? null;
}

export function getFaqSection(sections = []) {
    return sections.find((s) => s.__component === "shared.faq-section") ?? null;
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

export async function getArticles(categorySlug) {
    const categoryFilter = categorySlug
        ? `&filters[category][slug][$eq]=${categorySlug}`
        : "";
    return fetchStrapi(
        `/articles?${categoryFilter}&populate=cover,category,author&sort=publishedAt:desc`
    );
}

export async function getArticleBySlug(slug) {
    const data = await fetchStrapi(
        `/articles?filters[slug][$eq]=${slug}&populate=cover,category,author`
    );
    return Array.isArray(data) ? (data[0] ?? null) : null;
}

export async function getCategories() {
    return fetchStrapi("/categories?sort=name:asc");
}