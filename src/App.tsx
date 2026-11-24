import { MotionConfig } from "framer-motion";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GitHubStats from "./components/GitHubStats";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";
import FeaturedProjects from "./components/projects/FeaturedProjects";
import ProjectGallery from "./components/projects/ProjectGallery";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Skills from "./components/Skills";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-ink)]"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <ProjectGallery />
        <Services />
        <Journey />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </MotionConfig>
  );
}
