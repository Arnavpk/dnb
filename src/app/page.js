import { redirect } from "next/navigation";

// Default city — change this when you add more cities
const DEFAULT_CITY = "bangalore";

export default function RootPage() {
    redirect(`/${DEFAULT_CITY}`);
}