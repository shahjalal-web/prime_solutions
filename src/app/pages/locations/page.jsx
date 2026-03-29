import LocationsClient from "./LocationsClient";

export const revalidate = 60;

export const metadata = {
    title: "Service Areas | Water Damage Restoration VA, DC & MD | Prime Solution Restoration",
    description:
        "Prime Solution Restoration serves Northern Virginia, Washington DC, and Maryland. Find 24/7 water damage restoration, mold remediation, and fire damage services near you.",
    openGraph: {
        title: "Service Areas | Prime Solution Restoration",
        description: "Find restoration services near you across VA, DC & MD.",
        url: "https://www.psolutionservices.com/pages/locations",
    },
};

async function getCities() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

export default async function ServiceAreasPage() {
    const cities = await getCities();

    return <LocationsClient cities={cities} />;
}
