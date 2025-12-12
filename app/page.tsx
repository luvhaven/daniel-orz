import { Navigation } from "@/components/sections/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

import { StackedLayout } from "@/components/ui/stacked-layout";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-primary/30">
      <Navigation />
      <StackedLayout>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </StackedLayout>
    </main>
  );
}
