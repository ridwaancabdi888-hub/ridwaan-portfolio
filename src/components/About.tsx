import { personalInfo } from "../data/personalInfo";
import Reveal from "./Reveal";

const principles = [
  { title: "Data model first", text: "Every system starts with a clear relational schema, constraints and access rules." },
  { title: "Secure by default", text: "Roles, permissions, row-level security, validation and audit logs — not afterthoughts." },
  { title: "Built for real users", text: "Somali-first, mobile-first interfaces for the people who use them every day." },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="font-display mt-4 text-3xl font-semibold text-[var(--text)] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Software that runs real businesses.
          </h2>
          <dl className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {personalInfo.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm">
                <dt className="text-[var(--text-3)]">{fact.label}</dt>
                <dd className="text-[var(--text)]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-5 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
            {personalInfo.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {principles.map((item) => (
              <li key={item.title} className="card p-5">
                <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
