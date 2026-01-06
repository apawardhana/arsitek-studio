import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET all services
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { displayOrder: "asc" },
        });

        return NextResponse.json({ services });
    } catch (error) {
        console.error("Get services error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// CREATE service
export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { number, title, slug, description, icon, displayOrder } = body;

        if (!number || !title || !slug || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existing = await prisma.service.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Slug already exists" },
                { status: 400 }
            );
        }

        const service = await prisma.service.create({
            data: {
                number,
                title,
                slug,
                description,
                icon,
                displayOrder: displayOrder ? parseInt(displayOrder) : 0,
            },
        });

        return NextResponse.json({ service }, { status: 201 });
    } catch (error) {
        console.error("Create service error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
