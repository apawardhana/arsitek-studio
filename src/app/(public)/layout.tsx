import prisma from "@/lib/db";
import ClientLayout from "@/components/layout/ClientLayout";

async function getSettings() {
    const settings = await prisma.companyInfo.findUnique({
        where: { id: "main" },
    });
    return settings;
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSettings();

    return (
        <ClientLayout settings={settings}>{children}</ClientLayout>
    );
}
