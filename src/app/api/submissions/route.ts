import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const submissions = await prisma.formSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ submissions });
    } catch (error) {
        console.error("Get submissions error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const submission = await prisma.formSubmission.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
            },
        });

        return NextResponse.json({ success: true, submission });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
