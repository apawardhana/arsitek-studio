import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST - Track analytics event
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, slug } = body;

        if (!type || !slug) {
            return NextResponse.json(
                { error: "Type and slug are required" },
                { status: 400 }
            );
        }

        // Get user agent and referrer from headers
        const userAgent = request.headers.get("user-agent") || undefined;
        const referrer = request.headers.get("referer") || undefined;

        // Get IP from headers (for proxied requests)
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined;

        await prisma.analyticsEvent.create({
            data: {
                type,
                slug,
                userAgent,
                referrer,
                ip,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Track analytics error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
