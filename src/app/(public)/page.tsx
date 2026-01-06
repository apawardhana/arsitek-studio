import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import prisma from "@/lib/db";

export const revalidate = 0;

async function getHomeData() {
  const [services, companyInfo, projects] = await Promise.all([
    prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    prisma.companyInfo.findUnique({
      where: { id: "main" },
    }),
    prisma.project.findMany({
      where: {
        status: "PUBLISHED",
        featured: true,
      },
      take: 4,
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return {
    services,
    companyInfo,
    projects,
  };
}

export default async function Home() {
  const { services, companyInfo, projects } = await getHomeData();

  // Map companyInfo to stats format
  const stats = [
    { number: companyInfo?.yearsExperience || 10, suffix: "+", label: "Years of Experience" },
    { number: companyInfo?.projectsCompleted || 100, suffix: "+", label: "Projects Completed" },
    { number: companyInfo?.awards || 10, suffix: "+", label: "Design Awards" },
    { number: companyInfo?.teamSize || 20, suffix: "+", label: "Team Members" },
  ];

  return (
    <>
      {/* Hero Section - Full Screen Slider */}
      <HeroSlider />

      {/* Services Section - What We Do */}
      <ServicesSection initialServices={services} />

      {/* Stats Section */}
      <StatsSection initialStats={stats} />

      {/* Featured Projects */}
      <FeaturedProjects initialProjects={projects} />
    </>
  );
}
