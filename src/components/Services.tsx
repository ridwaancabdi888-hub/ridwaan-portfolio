import { services } from "../data/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What I build."
          subtitle="From a single landing page to a multi-tenant platform — scoped, designed, built, tested and deployed."
        />
        <Reveal>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.id} className="flex flex-col bg-[var(--bg)] p-7 transition-colors hover:bg-[var(--bg-soft)]">
                <Icon className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-[var(--text)]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-2)]">{service.description}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[var(--text-3)]">{service.examples}</p>
              </li>
            );
          })}
        </ul>
        </Reveal>
      </div>
    </section>
  );
}
