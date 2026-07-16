import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { personalInfo } from "../data/personalInfo";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import SectionHeading from "./SectionHeading";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SubmitStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "mailto-opened" }
  | { state: "success" }
  | { state: "error"; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const initialValues: FormValues = { name: "", email: "", subject: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!values.email.trim() || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = "Please enter a subject.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const contactMethods = [
  { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: Mail },
  {
    label: "WhatsApp",
    value: personalInfo.whatsappNumber,
    href: `${personalInfo.whatsappLink}?text=${encodeURIComponent(personalInfo.whatsappPrefilledMessage)}`,
    icon: MessageCircle,
  },
  { label: "GitHub", value: `github.com/${personalInfo.githubUsername}`, href: personalInfo.githubUrl, icon: GithubIcon },
  { label: "LinkedIn", value: `linkedin.com/in/${personalInfo.linkedinUsername}`, href: personalInfo.linkedinUrl, icon: LinkedinIcon },
];

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  const handleChange = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (FORMSPREE_ENDPOINT) {
      setStatus({ state: "submitting" });
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("The form service rejected the message.");
        setStatus({ state: "success" });
        setValues(initialValues);
      } catch (error) {
        setStatus({
          state: "error",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong while sending your message.",
        });
      }
      return;
    }

    const body = `From: ${values.name} (${values.email})\n\n${values.message}`;
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setStatus({ state: "mailto-opened" });
  };

  return (
    <section id="contact" className="no-print scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          subtitle="Have an internship, junior role, freelance project or collaboration in mind? Send a message or reach out directly."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <MapPin className="h-4 w-4 text-[var(--color-accent-cyan)]" aria-hidden="true" />
              {personalInfo.location}
            </div>
            <ul className="space-y-3">
              {contactMethods.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-border-hover)]"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent-cyan)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-[var(--color-text-muted)]">{label}</span>
                      <span className="block text-sm font-medium text-[var(--color-text-primary)]">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:col-span-3"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                placeholder="Your name"
              />
              {errors.name ? (
                <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={values.subject}
                onChange={handleChange("subject")}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                placeholder="Project opportunity"
              />
              {errors.subject ? (
                <p id="subject-error" className="mt-1 text-xs text-red-400">{errors.subject}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent)]"
                placeholder="Tell me a bit about the opportunity or project..."
              />
              {errors.message ? (
                <p id="message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status.state === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-soft)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.state === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              Send Message
            </button>

            {status.state === "mailto-opened" ? (
              <p role="status" className="flex items-center gap-2 text-sm text-[var(--color-accent-cyan)]">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Your email app should now be open with this message ready to send.
              </p>
            ) : null}
            {status.state === "success" ? (
              <p role="status" className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Message sent successfully. Thank you — I'll get back to you soon.
              </p>
            ) : null}
            {status.state === "error" ? (
              <p role="alert" className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {status.message}
              </p>
            ) : null}

            {!FORMSPREE_ENDPOINT ? (
              <p className="text-xs text-[var(--color-text-muted)]">
                This form opens your email client to send the message directly — no
                third-party backend is connected yet.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
