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
import {
  firstInvalidContactField,
  validateContactForm,
  type ContactField,
  type ContactFormErrors,
  type ContactFormValues,
} from "../utils/contactForm.mjs";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import Reveal from "./Reveal";

type SubmitStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "mailto-opened" }
  | { state: "success" }
  | { state: "error"; message: string };

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const CALLMEBOT_PHONE = import.meta.env.VITE_CALLMEBOT_PHONE;
const CALLMEBOT_APIKEY = import.meta.env.VITE_CALLMEBOT_APIKEY;

const initialValues: ContactFormValues = { name: "", email: "", phone: "", subject: "", message: "" };

/**
 * Best-effort WhatsApp notification via CallMeBot (https://www.callmebot.com).
 * This is a static site with no backend, so the API key is necessarily
 * visible client-side — CallMeBot is designed for exactly this use case
 * (a personal "notify me" webhook), not for sending to arbitrary numbers.
 * Fired in "no-cors" mode: the request goes out but the response can't be
 * read, so failures here never block the primary Formspree/mailto delivery.
 */
function notifyWhatsApp(values: ContactFormValues) {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) return;

  const summary = [
    `New portfolio contact form message`,
    `From: ${values.name} (${values.email})`,
    values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
    `Subject: ${values.subject}`,
    `Message: ${values.message.slice(0, 300)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
    CALLMEBOT_PHONE,
  )}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}&text=${encodeURIComponent(summary)}`;

  fetch(url, { mode: "no-cors" }).catch(() => {
    // Best-effort only — Formspree/mailto already carries the message.
  });
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
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  const handleChange = (field: ContactField) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setStatus((prev) => (prev.state === "idle" || prev.state === "submitting" ? prev : { state: "idle" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    const firstInvalidField = firstInvalidContactField(validationErrors);
    if (firstInvalidField) {
      window.requestAnimationFrame(() => document.getElementById(firstInvalidField)?.focus());
      return;
    }

    if (FORMSPREE_ENDPOINT) {
      setStatus({ state: "submitting" });
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("The form service rejected the message.");
        notifyWhatsApp(values);
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
    notifyWhatsApp(values);
    setStatus({ state: "mailto-opened" });
  };

  const fieldClass =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-3)] focus:border-[var(--accent)]";
  const labelClass = "mb-1.5 block text-sm font-medium text-[var(--text)]";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <section id="contact" className="section no-print" aria-labelledby="contact-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="font-display mt-4 text-3xl font-semibold text-[var(--text)] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Have a system or product in mind? Let's build it.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-2)] md:text-lg">
            I'm open to full-time and junior engineering roles, internships, freelance systems and collaboration. The
            fastest way to reach me is WhatsApp or email.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--text-3)]">
            <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" /> {personalInfo.location}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {contactMethods.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover flex items-center gap-3 p-4"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-[var(--text-3)]">{label}</span>
                    <span className="block truncate text-sm font-medium text-[var(--text)]">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <form onSubmit={handleSubmit} noValidate className="card space-y-4 p-6 sm:p-8" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={handleChange("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass}
                  placeholder="Your name"
                />
                {errors.name ? <p id="name-error" className={errorClass}>{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                  placeholder="you@company.com"
                />
                {errors.email ? <p id="email-error" className={errorClass}>{errors.email}</p> : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone / WhatsApp <span className="font-normal text-[var(--text-3)]">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={fieldClass}
                  placeholder="+252 6X XXX XXXX"
                />
                {errors.phone ? <p id="phone-error" className={errorClass}>{errors.phone}</p> : null}
              </div>
              <div>
                <label htmlFor="subject" className={labelClass}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={values.subject}
                  onChange={handleChange("subject")}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={fieldClass}
                  placeholder="Project or role"
                />
                {errors.subject ? <p id="subject-error" className={errorClass}>{errors.subject}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${fieldClass} resize-none`}
                placeholder="Tell me about the system, product or opportunity…"
              />
              {errors.message ? <p id="message-error" className={errorClass}>{errors.message}</p> : null}
            </div>

            <button type="submit" disabled={status.state === "submitting"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {status.state === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              Send message
            </button>

            {status.state === "mailto-opened" ? (
              <p role="status" className="flex items-center gap-2 text-sm text-[var(--accent)]">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Your email app should now be open with this message ready to send.
              </p>
            ) : null}
            {status.state === "success" ? (
              <p role="status" className="flex items-center gap-2 text-sm text-[var(--accent)]">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Message sent successfully. Thank you — I'll get back to you soon.
              </p>
            ) : null}
            {status.state === "error" ? (
              <p role="alert" className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {status.message}
              </p>
            ) : null}

            {!FORMSPREE_ENDPOINT ? (
              <p className="text-xs text-[var(--text-3)]">
                Sending opens your email app with the message ready — nothing is stored by this site.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
