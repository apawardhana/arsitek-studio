import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET analytics stats
export async function GET(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get("days") || "30");

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Total page views
        const pageViews = await prisma.analyticsEvent.count({
            where: {
                type: "PAGE_VIEW",
                createdAt: { gte: startDate },
            },
        });

        // Total project views
        const projectViews = await prisma.analyticsEvent.count({
            where: {
                type: "PROJECT_VIEW",
                createdAt: { gte: startDate },
            },
        });

        // Top pages
        const topPages = await prisma.analyticsEvent.groupBy({
            by: ["slug"],
            where: {
                type: "PAGE_VIEW",
                createdAt: { gte: startDate },
            },
            _count: { slug: true },
            orderBy: { _count: { slug: "desc" } },
            take: 10,
        });

        // Top projects
        const topProjects = await prisma.analyticsEvent.groupBy({
            by: ["slug"],
            where: {
                type: "PROJECT_VIEW",
                createdAt: { gte: startDate },
            },
            _count: { slug: true },
            orderBy: { _count: { slug: "desc" } },
            take: 10,
        });

        // Daily views (last 7 days)
        const dailyViews = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const count = await prisma.analyticsEvent.count({
                where: {
                    createdAt: {
                        gte: date,
                        lt: nextDate,
                    },
                },
            });

            dailyViews.push({
                date: date.toISOString().split("T")[0],
                views: count,
            });
        }

        // Total form submissions
        const totalSubmissions = await prisma.formSubmission.count();
        const unreadSubmissions = await prisma.formSubmission.count({
            where: { isRead: false },
        });

        return NextResponse.json({
            pageViews,
            projectViews,
            topPages: topPages.map((p) => ({ slug: p.slug, views: p._count.slug })),
            topProjects: topProjects.map((p) => ({ slug: p.slug, views: p._count.slug })),
            dailyViews,
            submissions: {
                total: totalSubmissions,
                unread: unreadSubmissions,
            },
        });
    } catch (error) {
        console.error("Get analytics stats error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
