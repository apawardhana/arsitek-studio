import prisma from "@/lib/db";
import ProjectsContent from "./ProjectsContent";

export const metadata = {
    title: "Portfolio | Arsitek Studio",
    description: "Explore our portfolio of architectural, interior, and engineering projects.",
};

async function getProjects() {
    const projects = await prisma.project.findMany({
        where: {
            status: "PUBLISHED",
        },
        orderBy: [
            { displayOrder: "asc" },
            { createdAt: "desc" },
        ],
    });
    return projects;
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return <ProjectsContent initialProjects={projects} />;
}
