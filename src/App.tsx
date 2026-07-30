import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PortfolioSidebar from "./components/PortfolioSidebar";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div className="portfolio-shell min-h-dvh lg:flex lg:gap-5 lg:p-5">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <PortfolioSidebar />
      <div className="min-w-0 flex-1 px-3 pb-24 pt-20 lg:px-0 lg:pb-0 lg:pt-0">
        <div className="portfolio-window overflow-hidden rounded-[1.65rem] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-2xl shadow-black/25">
          <div className="browser-bar no-print sticky top-0 z-40 hidden h-12 items-center border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/94 px-5 backdrop-blur-xl lg:flex">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff605c]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd44]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#00ca4e]" />
            </div>
            <div className="mx-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-16 py-1.5 text-[11px] text-[var(--color-text-muted)]">
              ridwaan.dev / portfolio
            </div>
            <span className="w-[47px] text-right font-mono text-[10px] text-[var(--color-accent-cyan)]">
              ONLINE
            </span>
          </div>
          <main id="main-content">
            <Hero />
            <About />
            <Services />
            <Skills />
            <Projects />
            <Education />
            <Experience />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
