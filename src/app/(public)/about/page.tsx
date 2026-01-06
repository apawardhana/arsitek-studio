import prisma from "@/lib/db";
import AboutContent from "./AboutContent";

export const metadata = {
    title: "About Us | Arsitek Studio",
    description: "Learn about Arsitek Studio's legacy of architectural excellence and our philosophy of human-centered design.",
};

async function getAboutData() {
    const settings = await prisma.companyInfo.findUnique({
        where: { id: "main" },
    });
    return settings;
}

export default async function AboutPage() {
    const settings = await getAboutData();

    return <AboutContent initialSettings={settings} />;
}
