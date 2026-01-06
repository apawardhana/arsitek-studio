import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser, isAdmin } from "@/lib/auth";

// GET company info
export async function GET() {
    try {
        let info = await prisma.companyInfo.findUnique({
            where: { id: "main" },
        });

        if (!info) {
            // Create default company info
            info = await prisma.companyInfo.create({
                data: {
                    id: "main",
                    name: "Arsitek Studio",
                },
            });
        }

        return NextResponse.json({ info });
    } catch (error) {
        console.error("Get settings error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// UPDATE company info (Admin only)
export async function PUT(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const info = await prisma.companyInfo.upsert({
            where: { id: "main" },
            update: body,
            create: {
                id: "main",
                ...body,
            },
        });

        return NextResponse.json({ info });
    } catch (error) {
        console.error("Update settings error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
