import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET all projects
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");

        const where: Record<string, unknown> = {};

        if (status) {
            where.status = status;
        }
        if (category) {
            where.category = category;
        }
        if (featured === "true") {
            where.featured = true;
        }

        const projects = await prisma.project.findMany({
            where,
            include: {
                images: {
                    orderBy: { displayOrder: "asc" },
                },
                createdBy: {
                    select: { name: true, email: true },
                },
            },
            orderBy: [
                { displayOrder: "asc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json({ projects });
    } catch (error) {
        console.error("Get projects error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// CREATE project
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

        // Validate required fields
        if (!title || !slug || !category || !sector || !description || !coverImage) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check slug uniqueness
        const existing = await prisma.project.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Slug already exists" },
                { status: 400 }
            );
        }

        const project = await prisma.project.create({
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
                featured: featured || false,
                status: status || "DRAFT",
                metaTitle,
                metaDescription,
                createdById: user.userId,
                images: images?.length
                    ? {
                        create: images.map((img: { imageUrl: string; alt?: string }, index: number) => ({
                            imageUrl: img.imageUrl,
                            alt: img.alt,
                            displayOrder: index,
                        })),
                    }
                    : undefined,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        console.error("Create project error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
