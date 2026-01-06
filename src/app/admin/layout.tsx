import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export const metadata = {
    title: "Admin - Arsitek Studio",
    description: "Content Management System for Arsitek Studio",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get current path from headers
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";

    // Skip auth check for login page
    if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
        return <>{children}</>;
    }

    const user = await getCurrentUser();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar userRole={user.role as "ADMIN" | "EDITOR"} userName={user.email.split("@")[0]} />
            <div className="ml-64">
                <Header userName={user.email.split("@")[0]} userRole={user.role as "ADMIN" | "EDITOR"} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
