import HeroSlider from "@/components/home/HeroSlider";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Screen Slider */}
      <HeroSlider />

      {/* Services Section - What We Do */}
      <ServicesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Projects */}
      <FeaturedProjects />
    </>
  );
}
