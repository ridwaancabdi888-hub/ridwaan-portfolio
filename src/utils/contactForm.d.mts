export type ContactField = "name" | "email" | "phone" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: readonly ContactField[];

export function validateField(field: ContactField, value: string): string | undefined;

export function validateContactForm(values: ContactValues): ContactErrors;

export function getFirstInvalidField(errors: ContactErrors): ContactField | undefined;

export function reconcileFieldError(
  errors: ContactErrors,
  field: ContactField,
  value: string,
): ContactErrors;
