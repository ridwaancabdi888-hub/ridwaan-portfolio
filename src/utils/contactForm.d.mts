export type ContactField = "name" | "email" | "phone" | "subject" | "message";

export type ContactFormValues = Record<ContactField, string>;
export type ContactFormErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: ContactField[];

export function validateContactForm(values: ContactFormValues): ContactFormErrors;
export function firstInvalidContactField(errors: ContactFormErrors): ContactField | null;
