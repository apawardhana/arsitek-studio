import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Sample project data - akan diganti dengan data dari Sanity CMS
const projectsData: Record<string, {
    title: string;
    category: string;
    sector: string;
    location: string;
    year: number;
    client: string;
    description: string;
    coverImage: string;
    images: string[];
}> = {
    "harmony-residence": {
        title: "Harmony Residence",
        category: "Architecture",
        sector: "Residential",
        location: "Jakarta, Indonesia",
        year: 2023,
        client: "Private Client",
        description:
            "Harmony Residence is a stunning contemporary home that seamlessly blends modern architecture with natural elements. The design emphasizes open spaces, natural light, and a strong connection between indoor and outdoor living areas. Sustainable materials and energy-efficient systems were integrated throughout the project, creating a home that is both beautiful and environmentally responsible.",
        coverImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        ],
    },
    "urban-oasis-tower": {
        title: "Urban Oasis Tower",
        category: "Architecture",
        sector: "Commercial",
        location: "Surabaya, Indonesia",
        year: 2023,
        client: "PT Urban Development",
        description:
            "Urban Oasis Tower is a landmark commercial development that redefines the city skyline. The 40-story tower features innovative structural engineering, green building technologies, and premium office spaces. Sky gardens at every fifth floor provide natural ventilation and spaces for relaxation.",
        coverImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
        ],
    },
};

interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData[slug];

    if (!project) {
        return {
            title: "Project Not Found | Arsitek Studio",
        };
    }

    return {
        title: `${project.title} | Arsitek Studio`,
        description: project.description.substring(0, 160),
        openGraph: {
            title: `${project.title} | Arsitek Studio`,
            description: project.description.substring(0, 160),
            images: [project.coverImage],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = await params;
    const project = projectsData[slug];

    if (!project) {
        notFound();
    }

    return (
        <>
            {/* Hero Image */}
            <section className="relative h-[70vh] min-h-[500px]">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </section>

            {/* Project Info */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                {project.category}
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-8">
                                {project.title}
                            </h1>
                            <p className="text-foreground-muted text-lg leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Project Details Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6 lg:sticky lg:top-32">
                                <div className="border-b border-border pb-4">
                                    <span className="text-foreground-muted text-xs uppercase tracking-widest block mb-1">
                                        Client
                                    </span>
                                    <span className="text-foreground">{project.client}</span>
                                </div>
                                <div className="border-b border-border pb-4">
                                    <span className="text-foreground-muted text-xs uppercase tracking-widest block mb-1">
                                        Location
                                    </span>
                                    <span className="text-foreground">{project.location}</span>
                                </div>
                                <div className="border-b border-border pb-4">
                                    <span className="text-foreground-muted text-xs uppercase tracking-widest block mb-1">
                                        Year
                                    </span>
                                    <span className="text-foreground">{project.year}</span>
                                </div>
                                <div className="border-b border-border pb-4">
                                    <span className="text-foreground-muted text-xs uppercase tracking-widest block mb-1">
                                        Category
                                    </span>
                                    <span className="text-foreground">{project.category}</span>
                                </div>
                                <div className="pb-4">
                                    <span className="text-foreground-muted text-xs uppercase tracking-widest block mb-1">
                                        Sector
                                    </span>
                                    <span className="text-foreground">{project.sector}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            <section className="section-padding bg-accent-cream">
                <div className="container-custom">
                    <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
                        Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden group cursor-pointer"
                            >
                                <Image
                                    src={image}
                                    alt={`${project.title} - Image ${index + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full aspect-[4/3] object-cover hover-zoom"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 bg-background border-t border-border">
                <div className="container-custom flex justify-between items-center">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Projects
                    </Link>
                    <Link href="/contact" className="btn-outline">
                        Start Your Project
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
}
