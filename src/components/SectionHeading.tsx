import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  id?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, action, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="font-display mt-4 text-3xl font-semibold text-[var(--text)] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-4 text-base leading-relaxed text-[var(--text-2)] md:text-lg">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
