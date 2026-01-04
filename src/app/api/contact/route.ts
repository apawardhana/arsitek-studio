import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create transporter - using Gmail SMTP
        // You need to enable "Less secure app access" or use App Password
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "apaw.sugiri@gmail.com", // Recipient email
            replyTo: email, // So you can reply directly to the sender
            subject: `[Arsitek Studio] New Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3D3D2C; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #3D3D2C;">Name:</td>
                            <td style="padding: 10px 0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #3D3D2C;">Email:</td>
                            <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #3D3D2C;">Phone:</td>
                            <td style="padding: 10px 0;">${phone || "Not provided"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #3D3D2C;">Project Type:</td>
                            <td style="padding: 10px 0;">${subject}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #F5F3EE; border-left: 4px solid #C9A227;">
                        <h3 style="margin: 0 0 10px 0; color: #3D3D2C;">Message:</h3>
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #666;">
                        This email was sent from the Arsitek Studio website contact form.
                    </p>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
