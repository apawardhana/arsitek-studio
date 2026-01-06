import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET all team members
export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: [
                { displayOrder: "asc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json({ members });
    } catch (error) {
        console.error("Get team members error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// CREATE team member
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
        const { name, slug, role, photo, bio, email, linkedin, department, displayOrder } = body;

        if (!name || !slug || !role || !photo || !department) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existing = await prisma.teamMember.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Slug already exists" },
                { status: 400 }
            );
        }

        const member = await prisma.teamMember.create({
            data: {
                name,
                slug,
                role,
                photo,
                bio,
                email,
                linkedin,
                department,
                displayOrder: displayOrder || 0,
            },
        });

        return NextResponse.json({ member }, { status: 201 });
    } catch (error) {
        console.error("Create team member error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
