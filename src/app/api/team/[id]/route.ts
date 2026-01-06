import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single team member
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const member = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!member) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Get team member error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// UPDATE team member
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();

        const existing = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        if (body.slug && body.slug !== existing.slug) {
            const slugExists = await prisma.teamMember.findUnique({
                where: { slug: body.slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: "Slug already exists" },
                    { status: 400 }
                );
            }
        }

        const member = await prisma.teamMember.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Update team member error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE team member
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { id } = await params;

        await prisma.teamMember.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete team member error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
