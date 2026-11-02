import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { FilmGrain } from './components/FilmGrain';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Manifesto } from './components/sections/Manifesto';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { SelectedWork } from './components/sections/SelectedWork';
import { TechStack } from './components/sections/TechStack';
import { Numbers } from './components/sections/Numbers';
import { WhyPanthrix } from './components/sections/WhyPanthrix';
import { Testimonials } from './components/sections/Testimonials';
import { EngagementFaq } from './components/sections/EngagementFaq';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/sections/Footer';
import { ProjectModal } from './components/ui/ProjectModal';
import { ContactBriefModal } from './components/ui/ContactBriefModal';
import { ProjectItem } from './data/work';

export function App() {
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#C8CCD4] selection:bg-[#F55B17] selection:text-white">
      {/* Preloader with SVG draw and physical split reveal */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Film Grain 3% texture */}
      <FilmGrain />

      {/* Floating Navigation */}
      <Navbar onOpenBrief={() => setIsBriefModalOpen(true)} />

      {/* Main Storytelling Sections with root entrance reveal */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0.85 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {/* Act 1: The Hunt Begins */}
        <Hero onOpenBrief={() => setIsBriefModalOpen(true)} />
        <Manifesto />

        {/* Act 2: The Craft */}
        <Services onOpenBrief={() => setIsBriefModalOpen(true)} />
        <Process />

        {/* Act 3: The Proof */}
        <SelectedWork onSelectProject={(p) => setSelectedProject(p)} />
        <TechStack />
        <Numbers />
        <WhyPanthrix />
        <Testimonials />

        {/* Terms & Models */}
        <EngagementFaq onOpenBrief={() => setIsBriefModalOpen(true)} />

        {/* Act 4: The Strike */}
        <FinalCTA onOpenBrief={() => setIsBriefModalOpen(true)} />
      </motion.main>

      {/* Signature Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBrief={() => setIsBriefModalOpen(true)}
      />

      <ContactBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />
    </div>
  );
}

export default App;
