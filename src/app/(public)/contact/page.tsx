import prisma from "@/lib/db";
import ContactContent from "./ContactContent";

export const metadata = {
    title: "Contact Us | Arsitek Studio",
    description: "Get in touch with Arsitek Studio to discuss your next architectural project.",
};

async function getSettings() {
    const settings = await prisma.companyInfo.findUnique({
        where: { id: "main" },
    });
    return settings;
}

export default async function ContactPage() {
    const settings = await getSettings();

    return <ContactContent initialSettings={settings} />;
}
