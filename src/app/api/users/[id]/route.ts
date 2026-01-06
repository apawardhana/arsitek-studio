import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser, isAdmin, hashPassword } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// DELETE user (Admin only)
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const { id } = await params;

        // Prevent self-deletion
        if (id === currentUser.userId) {
            return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// UPDATE user (Admin only)
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, email, password, role } = body;

        const updateData: Record<string, unknown> = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email.toLowerCase();
        if (role) updateData.role = role;
        if (password) updateData.password = await hashPassword(password);

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
