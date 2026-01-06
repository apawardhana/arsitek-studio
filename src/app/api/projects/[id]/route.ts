import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single project
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { displayOrder: "asc" },
                },
                createdBy: {
                    select: { name: true, email: true },
                },
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Get project error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// UPDATE project
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
        const {
            title,
            slug,
            category,
            sector,
            description,
            coverImage,
            client,
            location,
            year,
            featured,
            status,
            metaTitle,
            metaDescription,
            images,
        } = body;

        // Check if project exists
        const existing = await prisma.project.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Check slug uniqueness (exclude current project)
        if (slug && slug !== existing.slug) {
            const slugExists = await prisma.project.findUnique({
                where: { slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: "Slug already exists" },
                    { status: 400 }
                );
            }
        }

        // Update project
        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                slug,
                category,
                sector,
                description,
                coverImage,
                client,
                location,
                year: year ? parseInt(year) : null,
                featured,
                status,
                metaTitle,
                metaDescription,
            },
            include: {
                images: true,
            },
        });

        // Update images if provided
        if (images) {
            // Delete existing images
            await prisma.projectImage.deleteMany({
                where: { projectId: id },
            });

            // Create new images
            if (images.length > 0) {
                await prisma.projectImage.createMany({
                    data: images.map((img: { imageUrl: string; alt?: string }, index: number) => ({
                        projectId: id,
                        imageUrl: img.imageUrl,
                        alt: img.alt,
                        displayOrder: index,
                    })),
                });
            }
        }

        // Fetch updated project with images
        const updatedProject = await prisma.project.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { displayOrder: "asc" },
                },
            },
        });

        return NextResponse.json({ project: updatedProject });
    } catch (error) {
        console.error("Update project error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE project
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

        // Check if project exists
        const existing = await prisma.project.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Delete project (cascade will delete images)
        await prisma.project.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete project error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
