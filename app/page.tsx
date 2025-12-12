import { Navigation } from "@/components/sections/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

import { WarpTransition, WarpBackground } from "@/components/ui/warp-transition";

export default function Home() {
  return (
    <main className="min-h-screen relative perspective-[2000px]"> {/* Deep Perspective */}
      <WarpBackground />
      <Navigation />

      <div className="flex flex-col gap-32 pb-32"> {/* Spacing for "Slide" feel */}
        <WarpTransition><HeroSection /></WarpTransition>
        <WarpTransition><AboutSection /></WarpTransition>
        <WarpTransition><ProjectsSection /></WarpTransition>
        <WarpTransition><ExperienceSection /></WarpTransition>
        <WarpTransition><TestimonialsSection /></WarpTransition>
        <WarpTransition><ContactSection /></WarpTransition>
      </div>
    </main>
  );
}
