import { journey } from "../data/journey";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container-page">
        <SectionHeading
          id="journey-title"
          eyebrow="Experience & development journey"
          title="Shipping steadily, one system at a time."
          subtitle="A timeline of the work I've built and deployed, taken from my repository and deployment history."
        />
        <ol className="relative border-l border-[var(--border)] md:ml-[11rem]">
          {journey.map((entry, index) => (
            <Reveal as="li" key={entry.title} delay={index * 0.04} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
              <span
                className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--bg)] ${
                  index === 0 ? "bg-[var(--accent)]" : "bg-[var(--border-strong)]"
                }`}
                aria-hidden="true"
              />
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)] md:absolute md:-left-[11rem] md:top-0.5 md:w-[9.5rem] md:text-right">
                {entry.period}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[var(--text)] md:mt-0">{entry.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-2)] md:text-base">{entry.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {entry.highlights.map((item) => (
                  <li key={item} className="chip">{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
