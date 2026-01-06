import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@arsitekstudio.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@arsitekstudio.com",
            password: adminPassword,
            role: "ADMIN",
        },
    });
    console.log("✅ Created admin user:", admin.email);

    // Create editor user
    const editorPassword = await bcrypt.hash("editor123", 12);
    const editor = await prisma.user.upsert({
        where: { email: "editor@arsitekstudio.com" },
        update: {},
        create: {
            name: "Editor",
            email: "editor@arsitekstudio.com",
            password: editorPassword,
            role: "EDITOR",
        },
    });
    console.log("✅ Created editor user:", editor.email);

    // Create company info
    await prisma.companyInfo.upsert({
        where: { id: "main" },
        update: {},
        create: {
            id: "main",
            name: "Arsitek Studio",
            tagline: "Designing Tomorrow's Spaces Today",
            story:
                "Founded in 2010, Arsitek Studio has been at the forefront of architectural innovation in Indonesia.",
            philosophy:
                "We believe that great architecture should harmonize with nature and enhance the human experience.",
            vision: "To be the leading architectural firm in Southeast Asia, known for sustainable and innovative designs.",
            mission:
                "To create spaces that inspire, function beautifully, and stand the test of time while respecting our environment.",
            yearsExperience: 14,
            projectsCompleted: 150,
            teamSize: 35,
            awards: 12,
            email: "hello@arsitekstudio.com",
            phone: "+62 21 1234 5678",
            address: "Jl. Sudirman No. 123, Jakarta Selatan, Indonesia",
            instagram: "@arsitekstudio",
            linkedin: "https://linkedin.com/company/arsitekstudio",
        },
    });
    console.log("✅ Created company info");

    // Create services
    const services = [
        {
            number: "01",
            title: "Architecture",
            slug: "architecture",
            description:
                "Creating innovative architectural designs that blend aesthetics with functionality, from concept to completion.",
        },
        {
            number: "02",
            title: "Interior Design",
            slug: "interior-design",
            description:
                "Transforming spaces into inspiring environments that reflect your personality and enhance daily living.",
        },
        {
            number: "03",
            title: "Landscape",
            slug: "landscape",
            description:
                "Designing outdoor spaces that harmonize with nature and create sustainable, beautiful environments.",
        },
        {
            number: "04",
            title: "Engineering",
            slug: "engineering",
            description:
                "Delivering structural and MEP engineering solutions that ensure safety, efficiency, and sustainability.",
        },
    ];

    for (const service of services) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {},
            create: {
                ...service,
                displayOrder: parseInt(service.number),
            },
        });
    }
    console.log("✅ Created", services.length, "services");

    // Create sample projects
    const projects = [
        {
            title: "Modern Villa Bali",
            slug: "modern-villa-bali",
            category: "Architecture",
            sector: "Residential",
            description:
                "A stunning contemporary villa in Bali featuring open-concept living spaces, infinity pool, and sustainable materials.",
            coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            client: "Private Client",
            location: "Bali, Indonesia",
            year: 2024,
            featured: true,
            status: "PUBLISHED",
        },
        {
            title: "Eco Resort Lombok",
            slug: "eco-resort-lombok",
            category: "Architecture",
            sector: "Hospitality",
            description:
                "An eco-friendly resort designed with sustainable principles, featuring bamboo structures and renewable energy systems.",
            coverImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
            client: "Green Hospitality Group",
            location: "Lombok, Indonesia",
            year: 2023,
            featured: true,
            status: "PUBLISHED",
        },
        {
            title: "Office Tower Jakarta",
            slug: "office-tower-jakarta",
            category: "Architecture",
            sector: "Commercial",
            description:
                "A 25-story modern office tower in Jakarta CBD with smart building technology and LEED certification.",
            coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            client: "Jakarta Property Group",
            location: "Jakarta, Indonesia",
            year: 2023,
            featured: false,
            status: "PUBLISHED",
        },
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: {
                ...project,
                createdById: admin.id,
            },
        });
    }
    console.log("✅ Created", projects.length, "sample projects");

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📝 Login credentials:");
    console.log("   Admin: admin@arsitekstudio.com / admin123");
    console.log("   Editor: editor@arsitekstudio.com / editor123");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
