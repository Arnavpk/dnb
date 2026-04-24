// lib/token.js
// ─── Client-side token manager ────────────────────────────────────────────────
// Fetches token from our Next.js API route (which handles encryption + caching)
// Stores in sessionStorage so it persists across page navigations in same tab

const TOKEN_KEY = "dnb_token";
const TOKEN_EXPIRY_KEY = "dnb_token_expiry";

function isExpired(expiryTime) {
    if (!expiryTime) return true;
    return Date.now() >= Number(expiryTime) - 60_000; // 60s buffer
}

function getStoredToken() {
    if (typeof window === "undefined") return null;
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!token || isExpired(expiry)) return null;
    return token;
}

function storeToken(token, expiry) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(expiry));
}

/**
 * Get a valid auth token.
 * Uses sessionStorage cache first, then fetches from /api/generate-token.
 */
export async function getToken() {
    // 1. Check sessionStorage cache
    const stored = getStoredToken();
    if (stored) return stored;

    // 2. Fetch from our API route
    const res = await fetch("/api/generate-token", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch token");

    const data = await res.json();
    if (!data.success) throw new Error(data.error ?? "Token fetch failed");

    // 3. Cache in sessionStorage
    storeToken(data.token, data.expiry);

    return data.token;
}