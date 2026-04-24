import { NextResponse } from "next/server";

const VALID_LOCATIONS = ["banglore", "mumbai"]
const DEFAULT_LOCATION = "banglore";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        const prefferedLocation = request.cookies.get("preferred_location")?.value;
        const location = VALID_LOCATIONS.includes(prefferedLocation) ?
            prefferedLocation :
            DEFAULT_LOCATION;

    }
}