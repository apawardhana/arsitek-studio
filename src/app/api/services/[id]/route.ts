import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single service
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const service = await prisma.service.findUnique({
            where: { id },
        });

        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ service });
    } catch (error) {
        console.error("Get service error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// UPDATE service
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

        const existing = await prisma.service.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        const updateData = { ...body };
        if (updateData.displayOrder !== undefined) {
            updateData.displayOrder = parseInt(updateData.displayOrder);
        }

        const service = await prisma.service.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ service });
    } catch (error) {
        console.error("Update service error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE service
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

        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete service error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
